"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeInput = sanitizeInput;
function sanitizeInput(data, dateFields = []) {
    for (const field of dateFields) {
        if (data[field]) {
            const d = new Date(data[field]);
            if (isNaN(d.getTime())) {
                throw new Error(`Invalid date format for field '${field}'`);
            }
            data[field] = d.toISOString();
        }
    }
}
