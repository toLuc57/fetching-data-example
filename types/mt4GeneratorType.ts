export interface Category {
    name: string
    formDate: Date
    toDate: Date
    minLoss: number
    maxLoss: number
    minProfit: number
    maxProfit: number
    minLotSize: number
    maxLotSize: number
    sumProfit: number
    sumLoss: number
}

interface BalanceParams {
    date: Date
    number: number
}

interface FixedBalance {
type: FIXED_BALANCE_TYPE;
amount: number;
}

export enum FIXED_BALANCE_TYPE {
    FIRST_DAY_TRADING,
    LAST_DAY_TRADING
}

interface ReportParams {
    category: Category[]
    additionalBalance: BalanceParams[]
    fixedBalance: FixedBalance[]
}

export interface GeneratorConfig {
    owner: string
    leverage: number
    excludeOpenTrades: boolean
    brokerName: string
    symbols: string[]
    removedSymbol: string[]
    isSendMail: boolean
    to: string
    bbc: string[]
    reportParams: ReportParams
}

export interface GeneratorConfigResponse 
    extends Omit<GeneratorConfig, 'bbc' | "symbols"> {
        bbc: string
        symbols: string
    }