import express from 'express';
import * as get from './routes/route'

const app = express();
const PORT = 3000;

app.use(express.json())
app.use('/api',get.route)
app.use('/myadmin',get.route)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});