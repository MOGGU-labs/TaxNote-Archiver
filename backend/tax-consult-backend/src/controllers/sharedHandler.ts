import { Request, Response, RequestHandler } from 'express';
import prisma from '../prisma/client';
import { TableConfig } from '../config/TableConfig';
import { sanitizeInput } from '../utils/sanitizeInput';
import { formatDateFields } from '../utils/formatDate';
import { paginateList } from '../utils/paginateList';
import { filterRequiredFields } from "../utils/filterRequiredFields";

// Helper to get Prisma model delegate
function getModel(modelName: keyof typeof prisma) {
    return prisma[modelName] as any;
    }

    const sharedHandler = {
    list: (config: TableConfig): RequestHandler => async (req, res) => {
        try {
            //Configure Page
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 5;

            //Soft Delete Check
            const where = config.softDelete
                ? { [config.softDeleteField!]: false }
                : {};

            //Order from Ascending or Descending (check TableConfig.ts for more information)
            const orderBy = config.defaultOrderField
                ? { [config.defaultOrderField]: config.defaultOrderDirection ?? 'asc' }
                : undefined;

            //Query Exec
            const result = await paginateList({
                prisma,
                model: config.model,
                page,
                limit,
                where,
                orderBy
            });

            //Reformat Date to use (DD/MM/YYYY) and (HH/MM)
            const formatted = formatDateFields(result.data, config.dateFields ?? []);

            //Response Success
            res.json({
                ...result, // includes page, limit, total records, totalPages
                data: formatted // replace raw data with formatted version
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'List failed' });
    }
    },

    create: (config: TableConfig): RequestHandler => async (req, res) => {
        try {
        const model = getModel(config.model);
        const data = filterRequiredFields(req.body, config.optionalFields ?? []);
        sanitizeInput(data, config.dateFields ?? []);
        // Build uniqueness check
        let whereUnique = {};
        if (config.uniqueFields) {
            whereUnique = Object.fromEntries(
            config.uniqueFields.map(f => [f, data[f]])
            );
        }

        // Check for soft-deleted duplicate
        if (config.softDelete && config.uniqueFields) {
            const existing = await model.findFirst({
            where: {
                ...whereUnique,
                [config.softDeleteField!]: true
            }
            });

            if (existing) {
            const updated = await model.update({
                where: { [config.idField]: existing[config.idField] },
                data: {
                ...data,
                [config.softDeleteField!]: false
                }
            });
            res.status(200).json({ reactivated: true, data: updated });
            return;
            }
        }

        // Check for hard duplicate
        if (config.uniqueFields) {
            const conflict = await model.findFirst({ where: whereUnique });
            if (conflict) {
            res.status(409).json({ error: 'Duplicate entry' });
            return;
            }
        }

        // Auto-generate custom code
        if (config.codeField && config.codePrefix) {
            const count = await model.count();
            data[config.codeField] = `${config.codePrefix}${String(count + 1).padStart(4, '0')}`;
        }
        
        const created = await model.create({ data });
        res.status(201).json(created);
        } catch (err) {
        console.error('Create error:', err); // ✅ show actual error in terminal
        res.status(500).json({ error: 'Create failed', details: err });
        }
    },

    update: (config: TableConfig): RequestHandler => async (req, res) => {
        try {
        const model = getModel(config.model);
        const id = Number(req.params.id);
        
        const data = filterRequiredFields(req.body, config.optionalFields ?? []);
        sanitizeInput(data, config.dateFields ?? []);

        const updated = await model.update({
            where: { [config.idField]: id },
            data
        });

        res.json(updated);
        } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Update failed' });
        }
    },

    softDelete: (config: TableConfig): RequestHandler => async (req, res) => {
        try {
        const model = getModel(config.model);
        const id = Number(req.params.id);

        const deleted = await model.update({
            where: { [config.idField]: id },
            data: { [config.softDeleteField!]: true }
        });

        res.json({ deleted: true, data: deleted });
        } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Delete failed' });
        }
    },

    listDeleted: (config: TableConfig): RequestHandler => async (req, res) => {
        try {
        const model = getModel(config.model);
        const where = config.softDelete
            ? { [config.softDeleteField!]: true }
            : {};

        const records = await model.findMany({ where });
        res.json(records);
        } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'List failed' });
        }
    },
};


export default sharedHandler;
