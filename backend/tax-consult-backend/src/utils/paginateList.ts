import { PrismaClient } from '@prisma/client';

interface Paginatelist {
    prisma: PrismaClient;
    model: keyof PrismaClient;
    page?: number;
    limit?: number;
    where?: Record<string, any>;
    orderBy?: Record<string, 'asc' | 'desc'>;
    include?: Record<string, boolean | object>;  // Add this line
}

interface PaginatedResult<T> {
    data: T[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export async function paginateList<T>({
    prisma,
    model,
    page = 1,
    limit = 5,
    where = {},
    orderBy,
    include,  // Add this here too
}: Paginatelist): Promise<PaginatedResult<T>> {
    const repo = prisma[model] as any;

    const total = await repo.count({ where });
    const data = await repo.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include,  // Pass include here
    });

    return {
        data,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
    };
}
