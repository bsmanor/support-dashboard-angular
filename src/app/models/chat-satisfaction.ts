export interface ChatSatisfaction {
    response: {
        ['key']: {
            bad?: number,
            good?: number,
            chats?: number
        };
    };
}
