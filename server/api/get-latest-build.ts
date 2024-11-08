import { prisma } from "../model"

export default defineEventHandler(async (event) => {    
    const getRecord = await prisma.latestBuild.findFirst({
        orderBy: {
            id: 'desc',
        },
    });
    
    return {
        title: getRecord!.title,
        version: getRecord!.version,
        description: getRecord!.description,
        releasedAt: getRecord!.releasedAt,
    }
})
