import { writeFile } from 'node:fs/promises'
import ini from 'ini'
import { logger } from '../model'
import { extractArray } from '../utils/helper'

export default defineEventHandler(async (event) => {
    if(event._method !== "POST") return

    try {
        const body = await readBody(event)

        if (!body) throw createError({ status: 400, message: "Invalid body" })
        
        console.log(body)
        logger.info('Write/Update avg-spreads-excel-report.ini file')
        const config: Config = {
            Settings: {
                TradingDayBeginsAt: body.settings.trainingDayBeginAt,
                ExportNonGBE: body.settings.exportNonGBEBrokers ? 'true' : 'false',
                LogLevel: 'Emergency',
            }, 
            GBEBrokers: {},
            OtherBrokers: {},
        }

        for(const key of body.settings.tradingSessions) {
            config.Settings[key.name + 'TradingSession'] = 
                `${key.timeBeginAt}-${key.timeEndAt}`
        }
        for(const key of extractArray(body.gbeBrokers)) {
            config.GBEBrokers[key] = ''
        }
        for(const key of extractArray(body.otherBrokers)) {
            config.OtherBrokers[key] = ''
        }
        const text = ini.stringify(config)
        await writeFile('./public/avg-spreads-excel-report.ini', text)
        logger.info('Write/Update avg-spreads-excel-report.ini file successfully')
        return {
            message : 'Success',
        }
    } catch (e) {
        logger.error('Write/Update avg-spreads-excel-report.ini file failed')
        throw e
    }
})

interface Config {
    [section: string]: { [key: string]: string }
}