declare namespace Express {
    export interface Request {
        user: {
            id: string
        } // adiciona uma informação nova dentro do Request
    }
}