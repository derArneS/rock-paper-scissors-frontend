export type User = {
    id?: string,
    username: string,
    email: string,
    password: string,
    rock?: number,
    paper?: number,
    scissors?: number,
    computerRock?: number,
    computerPaper?: number,
    computerScissors?: number,
    _links?: {
        self: {
            href: string
        }
    }
};