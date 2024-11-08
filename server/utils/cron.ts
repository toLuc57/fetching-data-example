import { logger } from "../model"
import { checkLatestBuild } from "./checkLatestBuild"

export async function setupCronJobs() {
    try {
        logger.info(`Starting checking latest build`)
        await checkLatestBuild()

        // Something else
    } catch (e) {
        throw e
    }
}