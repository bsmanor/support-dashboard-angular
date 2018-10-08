export interface TodoItem {
    title?: string;
    content?: string;
    updates?: TodoUpdate[];
    lastUpdate?: string;
    createdBy?: string;
    createdAtDate?: string;
    status?: string;

}

export interface TodoUpdate {
    date: string;
    content: string;
}
