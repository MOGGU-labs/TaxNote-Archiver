import express from 'express';
import * as que from './queries'

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get('/api/status',que.checkStatus);
app.post('/api/data',que.PostData);
app.delete('/api/data',que.deleteAll);
app.get('/api/data',que.getAllData);

app.get('/api/data/:id',que.getDataById);
app.put('/api/data/:id',que.updateData);
app.delete('/api/data/:id',que.deleteData);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});