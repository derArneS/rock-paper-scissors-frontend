export type GameResult = {
    result: string,
    message: string,
    _links: {
        self: {
            href: string
        },
        computer: {
            href: string
        }
    }
};