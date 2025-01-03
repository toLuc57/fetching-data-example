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

        
        if(Object.keys(config).length === 0) 
            throw createError({ status: 400, message: "Please set the config first!" })

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
        const day = (config.Settings.Date ?? '2024-11-05').replace(/-/g, '');
        
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
            
            const minArr: Map<string, { value: number, broker: string}> = new Map()
            // Add avgSpread to avgSpread
            for (const record of records) {
                if(record.Symbol === null || record.BrokerName === null) continue
                
                symbolsHeader.push(record.Symbol)
                if (!avgSpread[record.Symbol]) 
                    avgSpread[record.Symbol!] = {}
    
                avgSpread[record.Symbol][record.BrokerName] = {
                    value: record._avg.AvgSpread || Infinity,
                    isMin: false,
                }
                if(
                    minArr.has(record.Symbol) 
                    && minArr.get(record.Symbol)!.value <= avgSpread[record.Symbol][record.BrokerName].value
                )
                    continue
                
                minArr.set(record.Symbol, {
                    value: avgSpread[record.Symbol][record.BrokerName].value,
                    broker: record.BrokerName
                })
            }
            // Set isMin to true for all symbols
            for(const symbol of symbolsHeader) 
                if(minArr.has(symbol)) 
                    avgSpread[symbol][minArr.get(symbol)!.broker].isMin = true
            
            reports[tradingSession.name] = {
                brokersHeader,
                otherBrokers,
                symbolsHeader,
                avgSpread,
            }
        }
        
        return {
            reports,
            day: parseCustomTimestamp(day),
            message: 'Success'
        }
    } catch (e) {
        throw e
    }
})