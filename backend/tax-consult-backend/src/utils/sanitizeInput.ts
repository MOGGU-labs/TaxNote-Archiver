export function sanitizeInput(data: any, dateFields: string[] = []) {
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
