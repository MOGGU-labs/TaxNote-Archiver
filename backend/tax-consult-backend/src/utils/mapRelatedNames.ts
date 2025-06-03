export function mapRelatedNames(
    data: any[],
    includeRelations: Record<string, boolean> | undefined
): any[] {
    return data.map(item => {
        if (includeRelations?.clients && item.clients) {
            if (item.clients.nama_client) {
                item.client_name = item.clients.nama_client;
            }
            if (item.clients.client_code) {   
                item.client_code = item.clients.client_code;
            }
        }
        if (includeRelations?.users && item.users?.full_name) {
            item.author_name = item.users.full_name;
        }
        if (includeRelations?.cases && item.cases) {
            // Map relevant case fields to flat names
            item.case_name = item.cases.case_name;
            item.case_number = item.cases.case_number;
            // Add more fields as needed
        }
        if (includeRelations?.clients) delete item.clients;
        if (includeRelations?.users) delete item.users;
        if (includeRelations?.cases) delete item.cases;

        return item;
    });
}
