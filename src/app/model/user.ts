export type User = {
    id?: string,
    username: string,
    email: string,
    password: string,
    _links?: {
        self: {
            href: string
        }
    }
};