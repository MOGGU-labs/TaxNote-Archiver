"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../prisma/client"));
const sanitizeInput_1 = require("../utils/sanitizeInput");
const fomatDate_1 = require("../utils/fomatDate");
// Helper to get Prisma model delegate
function getModel(modelName) {
    return client_1.default[modelName];
}
const sharedHandler = {
    list: (config) => async (req, res) => {
        try {
            const model = getModel(config.model);
            const where = config.softDelete
                ? { [config.softDeleteField]: false }
                : {};
            const orderBy = config.defaultOrderField
                ? { [config.defaultOrderField]: config.defaultOrderDirection ?? 'asc' }
                : undefined;
            const records = await model.findMany({
                where,
                orderBy
            });
            const formatted = (0, fomatDate_1.formatDateFields)(records, config.dateFields ?? []);
            res.json(formatted);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: 'List failed' });
        }
    },
    create: (config) => async (req, res) => {
        try {
            const model = getModel(config.model);
            const data = req.body;
            (0, sanitizeInput_1.sanitizeInput)(data, config.dateFields ?? []);
            // Build uniqueness check
            let whereUnique = {};
            if (config.uniqueFields) {
                whereUnique = Object.fromEntries(config.uniqueFields.map(f => [f, data[f]]));
            }
            // Check for soft-deleted duplicate
            if (config.softDelete && config.uniqueFields) {
                const existing = await model.findFirst({
                    where: {
                        ...whereUnique,
                        [config.softDeleteField]: true
                    }
                });
                if (existing) {
                    const updated = await model.update({
                        where: { [config.idField]: existing[config.idField] },
                        data: {
                            ...data,
                            [config.softDeleteField]: false
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
        }
        catch (err) {
            console.error('Create error:', err); // ✅ show actual error in terminal
            res.status(500).json({ error: 'Create failed', details: err });
        }
    },
    update: (config) => async (req, res) => {
        try {
            const model = getModel(config.model);
            const id = Number(req.params.id);
            const data = req.body;
            const updated = await model.update({
                where: { [config.idField]: id },
                data
            });
            res.json(updated);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Update failed' });
        }
    },
    softDelete: (config) => async (req, res) => {
        try {
            const model = getModel(config.model);
            const id = Number(req.params.id);
            const deleted = await model.update({
                where: { [config.idField]: id },
                data: { [config.softDeleteField]: true }
            });
            res.json({ deleted: true, data: deleted });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Delete failed' });
        }
    },
    listDeleted: (config) => async (req, res) => {
        try {
            const model = getModel(config.model);
            const where = config.softDelete
                ? { [config.softDeleteField]: true }
                : {};
            const records = await model.findMany({ where });
            res.json(records);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: 'List failed' });
        }
    },
};
exports.default = sharedHandler;
