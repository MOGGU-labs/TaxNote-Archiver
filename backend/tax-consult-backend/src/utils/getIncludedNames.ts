import { TableConfig } from "../config/TableConfig";
// Returns include object for Prisma queries based on config.includeRelations
export function getIncludeRelations(config: TableConfig): Record<string, boolean> | undefined {
    if (!config.includeRelations) return undefined;

    const include: Record<string, boolean> = {};
    for (const key in config.includeRelations) {
        if (config.includeRelations[key]) {
            include[key] = true;
        }
    }
    return Object.keys(include).length > 0 ? include : undefined;
}
