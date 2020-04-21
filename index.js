const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const morgan = require("morgan");
const cors = require("cors");
const db = require("./db.js");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.get("/auth/login/", async (req, res) => {
  const opinions = await db.getOpinions();
  res.send(opinions);
});

app.get("/api/retros", async (req, res) => {
  const retros = await db.getRetros();
  res.send(retros);
});

app.get("/api/retro/:id", async (req, res) => {
  const id = req.params.id;
  const retro = await db.getRetro(id);
  res.send(retro);
});

app.post("/api/retro/opinions/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await db.insertUserOpinions(id, req.body.opinions);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/api/retro/opinions/votes/:id", async (req, res) => {
  try {
    const retroId = req.params.id;
    await db.addVotesToOpinions(retroId, req.body.votedOpinions);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/api/retro/:id", async (req, res) => {
  try {
    const retroId = req.params.id;
    await db.addRetro(retroId);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.delete("/api/retro/:id", async (req, res) => {
  try {
    const retroId = req.params.id;
    await db.deleteRetro(retroId);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(port, () => console.log(`Listening to port ${port}...`));
