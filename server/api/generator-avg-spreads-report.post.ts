// import * as XLSX from 'xlsx/xlsx.mjs'
import XLSX from 'xlsx-js-style'
import { logger } from '../model'

const styleTitle = {
    alignment: {
        vertical: 'center',
        horizontal: 'center',
    },
    font: {
        bold: true,
        sz: 22,
        underline: true,
    },
}

const styleHeader = {
    alignment: {
        vertical: 'center',
        horizontal: 'center',
    },
    font: {
        bold: true,
    },
    border: {
        top: { style: 'thin', color: { rgb: '000000' } },
        left: { style: 'thin', color: { rgb: '000000' } },
        bottom: { style: 'thin', color: { rgb: '000000' } },
        right: { style: 'thin', color: { rgb: '000000' } },
    },
}

const styleValue = {
    alignment: {
        vertical: 'center',
        horizontal: 'center',
    },
    numFmt: "0.00",
}

export default defineEventHandler(async (event) => {
    if(event._method !== "POST") return
    
    try {
        const body = await readBody(event)

        if (!body) throw createError({ status: 400, message: "Invalid body" })

        var wb = XLSX.utils.book_new()
        for(const tradingSession in body.reports) {
            const report = body.reports[tradingSession]
            const header = report.brokersHeader.concat(report.otherBrokers)
            
            const ws = XLSX.utils.aoa_to_sheet([[`${body.title} ${tradingSession}`]]);
            ws['A1'].s = styleTitle
            ws['!merges'] = [
                {
                    s: { r: 0, c: 0 }, // start at cell A1
                    e: { r: 0, c: header.length }, 
                },
            ]
            var startRow = 6
            XLSX.utils.sheet_add_aoa(ws, [["Symbol"]], { origin: { r: startRow-1, c: 0 } })
            ws[XLSX.utils.encode_cell({ r: startRow-1, c: 0 })].s = styleHeader
            XLSX.utils.sheet_add_aoa(ws, [header], { origin: { r: startRow-1, c: 1 } })
            for(var col = 1; col < header.length + 1; col++){
                ws[XLSX.utils.encode_cell({ r: startRow-1, c: col })].s = styleHeader
            }
            
            for(const symbolName of report.symbolsHeader){
                XLSX.utils.sheet_add_aoa(ws, [[symbolName]], { origin: { r: startRow, c: 0 } })
                ws[XLSX.utils.encode_cell({ r: startRow, c: 0 })].s = styleHeader
                var startCol = 1
                for(const brokerName of header){
                    const address = { r: startRow, c: startCol++ }
                    if(!report.avgSpread[symbolName] || !report.avgSpread[symbolName][brokerName]){
                        XLSX.utils.sheet_add_aoa(ws, [[null]], { origin: address})
                    }
                    else {
                        XLSX.utils.sheet_add_aoa(ws, [[report.avgSpread[symbolName][brokerName].value]], { origin: address })
                        ws[XLSX.utils.encode_cell(address)].s = styleValue
                        if(report.avgSpread[symbolName][brokerName].isMin){
                            ws[XLSX.utils.encode_cell(address)].s = {
                                ...styleValue,
                                fill: {
                                    fgColor: {
                                        rgb: '00FF00' 
                                    }
                                }
                            }
                        }
                    }                    
                }
                startRow++
            }
            
            XLSX.utils.book_append_sheet(wb, ws, tradingSession || 'Sheet', true);
        }

        XLSX.writeFile(wb, './public/avg-spreads-excel-report.xlsx');
        logger.info('Write/Update avg-spreads-excel-report.xlsx file successfully')

        return { message: 'Success' }
    } catch (e) {
        logger.error(e)
        throw e
    }
})