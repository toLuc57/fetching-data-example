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
    otherBrokers: string[]
}

export interface AvgSpreadsResponse 
    extends Omit<AvgSpreads, 'gbeBrokers' | 'otherBrokers'> {
        gbeBrokers: string
        otherBrokers: string
    }

//Type of Report
export interface ReportParams {
    brokersHeader: string[]
    otherBrokers: string[]
    symbolsHeader: string[]
    // avgSpread[symbol][broker]
    avgSpread: Record<string, Record<string, { value: number, isMin: boolean }>>
}