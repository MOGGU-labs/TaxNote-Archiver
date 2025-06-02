export function filterRequiredFields(
    data: Record<string, any>,
    optionalFields: string[] = []
    ): Record<string, any> {
    const filtered: Record<string, any> = {};
    const missingFields: string[] = [];

    for (const [key, value] of Object.entries(data)) {
        const isOptional = optionalFields.includes(key);

        if (value === undefined || value === null || value === '') {
        if (!isOptional) {
            missingFields.push(key);
        } //skip setting optional fields that are invalid
        } else {
        filtered[key] = value;
        }
    }

    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    return filtered;
}
