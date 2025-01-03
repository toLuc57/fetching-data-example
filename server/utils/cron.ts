import { logger } from "../model"
import { checkLatestBuild } from "./checkLatestBuild"
import { checkAvgSpreadsExcelIni } from "./checkAvgSpreadsExcelIni"

export async function setupCronJobs() {
    try {
        logger.info(`Starting checking latest build`)
        await checkLatestBuild()
        logger.info(`Checking latest build successfully`)

        logger.info(`Starting checking avg spreads excel ini`)
        await checkAvgSpreadsExcelIni()
        logger.info(`Done checking avg spreads excel ini`)
        // Something else
    } catch (e) {
        throw e
    }
}