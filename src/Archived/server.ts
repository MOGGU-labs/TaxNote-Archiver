import express from 'express';
import { createTest, deleteTest, getAllTests, updateTest } from './basicpriv';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Route Methods
app.get('/api/test/create', createTest);

app.post('/api/test/all', getAllTests );

app.put('/api/test/update', updateTest);

app.delete('/api/test/delete', deleteTest);

//check farts from the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
