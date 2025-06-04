import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AuthRequest extends Request {
    user?: { id_user: number; username: string };
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
        return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Unauthorized: Token missing' });
        return;
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
        res.status(403).json({ message: 'Invalid or expired token' });
        return;
        }

        req.user = user as { id_user: number; username: string };
        next();
    });
    };
