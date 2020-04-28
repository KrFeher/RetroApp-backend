const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://retrobackend:ywhQAFjrCtOKOJUJ@cluster-1-rxwrb.mongodb.net/retrodb?retryWrites=true&w=majority";

let exampleRetros = [
  { _id: "Example retro 1", opinions: [] },
  { _id: "Example retro 2", opinions: [] },
  { _id: "Example retro 3", opinions: [] },
];

init = () => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connecting to database...");
  client.connect(async (err) => {
    if (err) throw err;
    const retrodb = client.db("retrodb");
    try {
      const allCollections = await retrodb.listCollections().toArray();
      if (!allCollections.find((collection) => collection.name === "retro")) {
        console.log("Retro collection does not exist. Reacreating it...");
        await retrodb.createCollection("retro");
        insertExamples(retrodb);
      }
    } catch (error) {
      console.log(error);
    }
    console.log("Closing connection to db...");
    client.close();
  });
};

deleteOldEntries = () => {
  console.log("Deleting old database entries:");
  // to be developed when db attached
};

insertExamples = async (db) => {
  console.log("Inserting examples to database...");
  await db.collection("retro").insertMany(exampleRetros);
};

getRetros = async () => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  let retros;
  let error;
  try {
    await client.connect();
    const retrodb = client.db("retrodb");
    const cursor = await retrodb.collection("retro").find({});
    retros = await cursor.toArray();
  } catch (err) {
    console.log(err);
    error = err;
  } finally {
    client.close();
  }
  return { retros, error };
};

getRetro = async (id) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  let retro;
  let error;
  try {
    await client.connect();
    const retrodb = client.db("retrodb");
    retro = await retrodb.collection("retro").findOne({ _id: id });
    if (!retro) error = true;
  } catch (err) {
    console.log(err);
    error = err;
  } finally {
    client.close();
  }
  return { retro, error };
};

deleteRetro = async (id) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const retrodb = client.db("retrodb");
    await retrodb.collection("retro").deleteOne({ _id: id });
  } finally {
    client.close();
  }
};

addRetro = async (id) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const retrodb = client.db("retrodb");
    await retrodb.collection("retro").insertOne({ _id: id, opinions: [] });
  } finally {
    client.close();
  }
};

insertUserOpinions = async (retroId, opinions) => {
  const opinionWithVotes = opinions.map(opinion => ({...opinion, votes: 0}))
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const retrodb = client.db("retrodb");
    await retrodb.collection("retro").update({ _id: retroId }, { $addToSet: { opinions: { $each: opinionWithVotes } } });
  } finally {
    client.close();
  }
};

addVotesToOpinions = async (retroId, votedOpinions) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const retrodb = client.db("retrodb");
    await retrodb.collection("retro").update(
      { _id: retroId },
      { $inc: { "opinions.$[opinion].votes" : 1 } },
      {
        multi: true,
        arrayFilters: [ { "opinion._id": { $in: votedOpinions } } ]
      }
   )
  } finally {
    client.close();
  }
};

init();

module.exports = {
  addRetro,
  deleteRetro,
  getRetro,
  getRetros,
  insertUserOpinions,
  addVotesToOpinions,
};
