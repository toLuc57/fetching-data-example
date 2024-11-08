import {NitroApp} from 'nitropack'
import {defineNitroPlugin} from '#imports'
import {setupCronJobs} from '../utils/cron'

export default defineNitroPlugin(async (nitroApp: NitroApp) => {
    try {
        setupCronJobs()
    }catch (e) {
        console.error(e)
    }
})