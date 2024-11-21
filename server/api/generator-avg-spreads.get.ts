import { AvgSpreadsResponse } from '~/types/averageSpreadsTypes';
import { readFile } from "fs/promises"
import ini from 'ini'

export default defineEventHandler(async (event) => {
    try {
        // Get data
        let text = await readFile(`./public/avg-spreads-excel-report.ini`,{
            encoding : 'utf-8'
        })
        const config = ini.parse(text)
        const value: AvgSpreadsResponse = {
            gbeBrokers: extractString(config.GBEBrokers),
            otherBrokers: extractString(config.OtherBrokers),
            settings: {
                trainingDayBeginAt: config.Settings.TradingDayBeginsAt,
                exportNonGBEBrokers: config.Settings.ExportNonGBE,
                tradingSessions: extractTradingSessions(config.Settings),
            },
        }
        return {
            message : 'Success',
            value
        }
    } catch (e) {
        throw e
    }
})

function extractString(object: any) {
    const arrStr = [];
    for(const key in object) 
        arrStr.push(key)
    
    return arrStr.join(', ')
}

function extractTradingSessions(object: any) {
    const tradingSessions = [];
    for(const key in object) 
        if(key.endsWith('TradingSession')){
            const times = object[key].split('-')

            tradingSessions.push({
                name: key.replace('TradingSession', ''),
                timeBeginAt: times[0],
                timeEndAt: times[1],
            })
        }
    
    return tradingSessions
}