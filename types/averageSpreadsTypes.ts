export interface TradingSessions {
    name: string
    timeBeginAt: string
    timeEndAt: string
}

interface Settings {
    trainingDayBeginAt: number
    tradingSessions: TradingSessions[]
    exportNonGBEBrokers: boolean
}

export interface AvgSpreads {
    settings: Settings
    gbeBrokers: string[]
    outputTables: string[]
}

export interface AvgSpreadsResponse 
    extends Omit<AvgSpreads, 'gbeBrokers' | 'outputTables'> {
        gbeBrokers: string
        outputTables: string
    }