import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import prisma from './prisma/client'; // Adjust the import path as needed

dotenv.config();

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET!;
const PORT = parseInt(process.env.PORT!);


// Extend Express Request to include user property
interface AuthRequest extends Request {
    user?: { id_user: number; username: string };
}

// === Register new user ===
app.post('/auth/register', async (req: Request, res: Response): Promise<void> => {
    const { username, password, full_name, email } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required' });
        return;
    }

    try {
        const existingUser = await prisma.users.findUnique({ where: { username } });
        if (existingUser) {
        res.status(409).json({ message: 'Username already taken' });
        return;
        }

        const password_hash = await bcrypt.hash(password, 10);

        const user = await prisma.users.create({
        data: { username, password_hash, full_name, email },
        });

        res.status(201).json({ message: 'User registered', userId: user.id_user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Registration failed' });
    }
});

// === Login user ===
app.post('/auth/login', async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required' });
        return;
    }

    try {
        const user = await prisma.users.findUnique({ where: { username } });
        if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
        }

        const isValid = await bcrypt.compare(password, user.password_hash);
        if (!isValid) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
        }

        const token = jwt.sign(
        { id_user: user.id_user, username: user.username },
        JWT_SECRET,
        { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Login failed' });
    }
});

// === JWT Authentication Middleware ===
const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Token missing' });
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

// === Protected route ===
app.get('/protected', authenticateJWT, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
        }

        const user = await prisma.users.findUnique({
        where: { id_user: req.user.id_user },
        select: { id_user: true, username: true, full_name: true, email: true, created_at: true },
        });

        if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get profile' });
    }
});

// === Start server ===
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
