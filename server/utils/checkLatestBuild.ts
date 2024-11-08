import axios, { Axios } from "axios"
import * as cheerio from 'cheerio'
import {prisma , logger} from '../model'

export async function checkLatestBuild(){
    try {
        const response = await axios.get('https://www.metatrader4.com/en/releasenotes')
    
        const {title, version, description, releasedAt} = extractBuildNumber(response.data)
        
        const getRecord = await prisma.latestBuild.findFirst()
        if(!getRecord || (getRecord?.version || 0) < version) {
            const data = await prisma.latestBuild.create({
                data: {
                    version,
                    title,
                    description,
                    releasedAt,
                },
            })
            logger.log({level: 'info', message: `Create record ${data.title} successfully`})
        }
        else {
            await prisma.latestBuild.update({
                where: {
                    id: getRecord?.id
                },
                data: {
                    createAt: new Date(),
                },
            })
            logger.log({level: 'info', message: `No new build version found.`});
        }
    } catch (e) {
        console.error(e)
    }
}

function extractBuildNumber(data: any) {
    const $ = cheerio.load(data)

    const title = $('.newsList .item:first-child .title').text().split(' ')[0]
    const version = $('.newsList .item:first-child .title').text().split(' ')[1].split(/(\s|&nbsp;)/g)[2]
    const description = $('.newsList .item:first-child .description').text()
    const releasedAt = $('.newsList .item:first-child .date').text()

    if(!title || !version || !description) {
        logger.log({level: 'error', message: 'Error get data from server'})
        throw new Error('Error get data from server')
    }

    return {
        title,
        version,
        description,
        releasedAt,
    }
}