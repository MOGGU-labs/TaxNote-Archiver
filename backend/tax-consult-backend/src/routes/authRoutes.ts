import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client';
import { authenticateJWT, AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET!;

// Register
router.post('/register', async (req: Request, res: Response) => {
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

// Login
router.post('/login', async (req: Request, res: Response) => {
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
      { expiresIn: '10m' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Protected route example
router.get('/protected', authenticateJWT, async (req: AuthRequest, res: Response) => {
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

export default router;
