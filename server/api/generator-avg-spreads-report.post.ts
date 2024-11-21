import { ReportParams } from "~/types/averageSpreadsTypes"
import { prisma } from "../model"

export default defineEventHandler(async (event) => {
    if(event._method !== "POST") return
    
    try {
        const body = await readBody(event)

        if (!body) throw createError({ status: 400, message: "Invalid body" })
        
        throw createError({ status: 505, message:"Test" })
    } catch (e) {
        throw e
    }
})