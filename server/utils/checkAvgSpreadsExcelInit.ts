import fs from 'fs'
import { logger } from "../model"
import { readFile } from "fs/promises"
import ini from 'ini'

export async function checkAvgSpreadsExcelInit() {
    // Create ini file if not exist
    if (!fs.existsSync('./public/avg-spreads-excel-report.ini')) {
        fs.writeFile('./public/avg-spreads-excel-report.ini', '', () => {});
        logger.info('Create avg-spreads-excel-report.ini file successfully and set to empty')
    }    
}
