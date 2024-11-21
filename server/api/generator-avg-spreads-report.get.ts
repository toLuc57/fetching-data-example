import { ReportParams } from "~/types/averageSpreadsTypes"
import { prisma } from "../model"
import { readFile } from "fs/promises"
import ini from 'ini'
import { extractString, extractTradingSessions } from '../utils/helper'

export default defineEventHandler(async (event) => {
    try {
        let text = await readFile(`./public/avg-spreads-excel-report.ini`,{
            encoding : 'utf-8'
        })
        const config = ini.parse(text)
        // If config.gbeBrokers is empty, it will be set to default value (GBELD, GBENY, GBETY)
        const brokersHeader = (config.GBEBrokers ? extractString(config.GBEBrokers) : 'GBELD, GBENY, GBETY').split(', ')
        // If config.otherBrokers is empty, it will be set to default value (get all from database)

        const otherBrokers = config.OtherBrokers ? 
            extractString(config.OtherBrokers).split(', ') 
            : await prisma.averageSpreads.groupBy({
                by: ['BrokerName']
            }).then((res) => res.map((item) => item.BrokerName)) as string[]

        // Do later
        // const outputTables = config.OutputTables ? extractString(config.OutputTables).split(', ') : []
        
        const symbolsHeader: string[] = []
        const day = '20241105'
        
        const reports : Record<string, ReportParams> = {}
        for(const tradingSession of (extractTradingSessions(config.Settings))){
            const avgSpread : Record<string, Record<string, { value: number, isMin: boolean }>> = {}

            // YYYYMMDD + HHmm + ssSSS
            const startTime = BigInt(day + tradingSession.timeBeginAt.replace(':', '') + '00000')
            const endTime = BigInt(day + tradingSession.timeEndAt.replace(':', '') + '00000')
            
            const records = await prisma.averageSpreads.groupBy({
                by: ['BrokerName', 'Symbol'],
                where: {
                    TimeStamp: {
                        lt: endTime,
                        gt: startTime,
                    },
                    BrokerName: {
                        in: brokersHeader.concat(otherBrokers),
                    },
                },
                _avg: {
                    AvgSpread: true,
                },
            })
            
            // Add avgSpread to avgSpread
            for (const record of records) {
                if(record.Symbol === null || record.BrokerName === null) continue
                
                symbolsHeader.push(record.Symbol)
                var min = Infinity
                if (!avgSpread[record.Symbol]) 
                    avgSpread[record.Symbol!] = {}
                else {
                    let minBrokerInSymbol = ''
                    for (const key in avgSpread[record.Symbol]) {
                        if (avgSpread[record.Symbol][key].value < min) {
                            minBrokerInSymbol = key
                            min = avgSpread[record.Symbol][key].value
                            avgSpread[record.Symbol][key].isMin = false
                        }
                    }
                    avgSpread[record.Symbol][minBrokerInSymbol].isMin = true
                }
    
                avgSpread[record.Symbol][record.BrokerName] = {
                    value: record._avg.AvgSpread ? record._avg.AvgSpread : Infinity,
                    isMin: false,
                }
            }

            reports[tradingSession.name] = {
                brokersHeader,
                otherBrokers,
                symbolsHeader,
                avgSpread,
            }
        }
        
        return {
            reports,
            day: day.slice(0, 4) + '-' + day.slice(4, 6) + '-' + day.slice(6, 8),
            message: 'Success'
        }
    } catch (e) {
        throw e
    }
})