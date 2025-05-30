"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateFields = formatDateFields;
function formatDateFields(records, dateFields = []) {
    return records.map((record) => {
        const formatted = { ...record };
        dateFields.forEach((field) => {
            if (formatted[field]) {
                const date = new Date(formatted[field]);
                if (!isNaN(date.getTime())) {
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
                    const year = date.getFullYear();
                    const hours = String(date.getHours()).padStart(2, '0');
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    // Final format: DD/MM/YYYY HH:MM
                    formatted[field] = `${day}/${month}/${year} ${hours}:${minutes}`;
                }
            }
        });
        return formatted;
    });
}
