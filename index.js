const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const morgan = require("morgan");
const cors = require("cors");
const db = require("./db.js");
const { eventsHandler, broadcastMessage } = require('./serverEvents')

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.get("/api/retros", async (req, res) => {
  const result = await db.getRetros();
  result.error ? res.sendStatus(500) : res.send(result.retros);
});

app.get("/api/retro/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.getRetro(id);
  result.error ? res.sendStatus(500) : res.send(result.retro);
});

app.post("/api/retro/opinions/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await db.insertUserOpinions(id, req.body.opinions);
    const response = await db.getRetros();
    const retros = response.retros || [];
    broadcastMessage(retros);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/api/retro/opinions/votes/:id", async (req, res) => {
  try {
    const retroId = req.params.id;
    await db.addVotesToOpinions(retroId, req.body.votedOpinions);
    const response = await db.getRetros();
    const retros = response.retros || [];
    broadcastMessage(retros);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/api/retro/:id", async (req, res) => {
  try {
    const retroId = req.params.id;
    await db.addRetro(retroId);
    const response = await db.getRetros();
    const retros = response.retros || [];
    broadcastMessage(retros);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.delete("/api/retro/:id", async (req, res) => {
  try {
    const retroId = req.params.id;
    await db.deleteRetro(retroId);
    const response = await db.getRetros();
    const retros = response.retros || [];
    broadcastMessage(retros);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

// this handles the 'server-side-events' messages from server
app.get('/api/events', eventsHandler);

app.listen(port, () => console.log(`Listening to port ${port}...`));
