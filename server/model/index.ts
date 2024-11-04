import { PrismaClient } from '@prisma/client'
import winston, { level } from 'winston';

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        winston.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({filename: 'logs/combined.log', level: 'info'}),
        new winston.transports.File({filename: 'logs/error.log', level: 'error'}),
    ],
})

export const prisma = new PrismaClient()