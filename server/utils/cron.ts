import { logger } from "../model"
import { checkLatestBuild } from "./checkLatestBuild"
import { checkAvgSpreadsExcelInit } from "./checkAvgSpreadsExcelInit"

export async function setupCronJobs() {
    try {
        logger.info(`Starting checking latest build`)
        await checkLatestBuild()
        logger.info(`Checking latest build successfully`)

        logger.info(`Starting checking avg spreads excel init`)
        await checkAvgSpreadsExcelInit()
        logger.info(`Done checking avg spreads excel init`)
        // Something else
    } catch (e) {
        throw e
    }
}