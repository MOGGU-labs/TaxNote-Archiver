import { PrismaClient } from '@prisma/client';

export interface TableConfig {
    // Table details
    model: keyof PrismaClient;
    idField: string;
    uniqueFields?: string[];
    
    // Soft-delete status
    softDelete?: boolean;
    softDeleteField?: string;
    
    // Code Prefix
    codeField?: string;
    codePrefix?: string;
    
    // Date reformat & date based reordering
    dateFields?: string[];
    defaultOrderField?: string;
    defaultOrderDirection?: 'asc' | 'desc';
    
    // Field Filters
    requiredFields?: string[];
    optionalFields?: string[];
    
    //Table Relations
    includeRelations?: {
        [relationName: string]: boolean;
    };
}
