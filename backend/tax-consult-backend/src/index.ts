import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import clientrouter from './routes/clientRoutes';
import caserouter from './routes/caseRoutes';
import consultrouter from './routes/consultRoutes';
import devrouter from './routes/devRoutes';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.use('/clients',clientrouter)
app.use('/cases',caserouter)
app.use('/consults',consultrouter)
app.use('/myadmin',devrouter)

app.get('/', (req, res) => {
  res.send('API is working 🚀');
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
