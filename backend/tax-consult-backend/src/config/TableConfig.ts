import { PrismaClient } from '@prisma/client';

export interface TableConfig {
    model: keyof PrismaClient;
    idField: string;
    uniqueFields?: string[];
    softDelete?: boolean;
    softDeleteField?: string;
    codeField?: string;
    codePrefix?: string;
    dateFields?: string[];
    defaultOrderField?: string;
    defaultOrderDirection?: 'asc' | 'desc';
}

