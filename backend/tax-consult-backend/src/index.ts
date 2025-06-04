import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import clientRouter from './routes/clientRoutes';
import caseRouter from './routes/caseRoutes';
import consultRouter from './routes/consultRoutes';
import devRouter from './routes/devRoutes';
import authRouter from './routes/authRoutes'; // <-- add this

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes
app.use('/auth', authRouter); // <-- add this
app.use('/clients', clientRouter);
app.use('/cases', caseRouter);
app.use('/consults', consultRouter);
app.use('/myadmin', devRouter);

app.get('/', (req, res) => {
  res.send('API is working 🚀');
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
