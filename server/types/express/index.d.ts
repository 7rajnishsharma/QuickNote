import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: { id: string }; // Adjust the type as needed
        }
    }
}
