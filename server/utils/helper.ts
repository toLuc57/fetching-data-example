export function extractArray (str: string) {
    return str.split(',').map((item) => item.trim())
}


export function extractString(object: any) {
    const arrStr = [];
    for(const key in object) 
        arrStr.push(key)
    
    return arrStr.join(', ')
}

export function extractTradingSessions(object: any) {
    const tradingSessions = [];
    for(const key in object) 
        if(key.endsWith('TradingSession')){
            const times = object[key].split('-')

            tradingSessions.push({
                name: key.replace('TradingSession', ''),
                timeBeginAt: times[0],
                timeEndAt: times[1],
            })
        }
    
    return tradingSessions
}

export function parseSessionTime(timeString: string) {
    //hh:mm-hh:mm
    const regex = /^\s*(\d{1,2})\s*:(\d{1,2})\s*-\s*(\d{1,2})\s*:\s*(\d{1,2})\s*$/
    
    const match = timeString.match(regex)
    if (!match) {
        throw new Error('Invalid time format')
    }
    
    const [_, startHour, startMinute, endHour, endMinute] = match
    return {
        startHour: parseInt(startHour, 10),
        startMinute: parseInt(startMinute, 10),
        endHour: parseInt(endHour, 10),
        endMinute: parseInt(endMinute, 10),
    }
}

export function parseCustomTimestamp(timestamp: string) {
    //YYYY-MM-DD HH:mm:ss.SSS
    const year = Number(timestamp.slice(0, 4));
    const month = Number(timestamp.slice(4, 6)) - 1;
    const date = Number(timestamp.slice(6, 8));

    return new Date(Date.UTC(year, month, date));
}