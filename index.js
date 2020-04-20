const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db.js');

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

app.get('/auth/login/', async (req, res) => {
  const opinions = await db.getOpinions();
  res.send(opinions);
});

app.get('/api/test', async (req, res) => {
  res.send('Test successful');
});

app.get('/api/retros', async (req, res) => {
  const retros = await db.getRetros();
  res.send(retros);
});

// app.post('/api/opinions/', async (req, res) => {
//   console.log(req.body);
//   const opinion = await db.insertManyOpinions(req.body);
//   const opinions = await db.getOpinions();
//   console.log(opinion);
//   console.log(opinions);
//   io.emit('new-opinions', opinions);
//   res.send(opinion);
// });


app.listen(port, () => console.log(`Listening to port ${port}...`));
