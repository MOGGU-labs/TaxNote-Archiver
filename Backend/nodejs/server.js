const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let dataPajak = [];
let currentId = 1;

app.get('/api/pajak', (req, res) => {
  res.json(dataPajak);
});

app.post('/api/pajak', (req, res) => {
  const item = { id: currentId++, ...req.body };
  dataPajak.push(item);
  res.status(201).json(item);
});

app.get('/api/pajak/:id', (req, res) => {
  const item = dataPajak.find(i => i.id == req.params.id);
  if (!item) return res.sendStatus(404);
  res.json(item);
});

app.put('/api/pajak/:id', (req, res) => {
  const index = dataPajak.findIndex(i => i.id == req.params.id);
  if (index === -1) return res.sendStatus(404);
  dataPajak[index] = { id: parseInt(req.params.id), ...req.body };
  res.json(dataPajak[index]);
});

app.delete('/api/pajak/:id', (req, res) => {
  dataPajak = dataPajak.filter(i => i.id != req.params.id);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
