import axios, { Axios } from "axios"
import * as cheerio from "cheerio"
import {prisma, logger} from "../model"

export default defineEventHandler(async (event) => {

    const response = await axios.get('https://www.metatrader4.com/en/releasenotes')
    
    const {title, version, description} = getData(response.data)
    
    const getRecord = await prisma.version.findFirst()
    let data = getRecord;
    if(!getRecord) {
        data = await prisma.version.create({
            data: {
                version,
                title,
                description
            },
        })
        logger.log({level: 'info', message: `Create record ${data.title} successfully`})
    }
    else if(getRecord.version != version) {
        data = await prisma.version.update({
            where: {
                id: getRecord.id    
            },
            data: {
                version,
                title,
                description
            },
        })
        logger.log({level: 'info', message: `Update record ${data.title} ${version} - ${getRecord.version} successfully`})
    }
    else 
        logger.log({level: 'info', message: `No need update record ${data!.title} ${data!.version}`})

    
    return {
        title: data!.title,
        version: data!.version,
        description: data!.description,
    }
})

function getData(data: any) {
    const $ = cheerio.load(data)

    const title = $('.newsList .item:first-child .title').text().split(' ')[0]
    const version = $('.newsList .item:first-child .title').text().split(' ')[1].split(/(\s|&nbsp;)/g)[2]
    const description = $('.newsList .item:first-child .description').text()

    if(!title || !version || !description) {
        logger.log({level: 'error', message: 'Error get data from server'})
        throw new Error('Error get data from server')
    }

    return {
        title,
        version,
        description
    }
}