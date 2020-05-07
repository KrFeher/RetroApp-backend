const mongo = require("./mongoUtil");

getRetros = async () => {
  let retros;
  let error;
  try {
    const retrodb = mongo.getDb();
    const cursor = await retrodb.collection("retro").find({});
    retros = await cursor.toArray();
  } catch (err) {
    console.log(err);
    error = err;
  }
  return { retros, error };
};

getRetro = async (id) => {
  let retro;
  let error;
  try {
    const retrodb = mongo.getDb();
    retro = await retrodb.collection("retro").findOne({ _id: id });
    if (!retro) error = true;
  } catch (err) {
    console.log(err);
    error = err;
  }
  return { retro, error };
};

deleteRetro = async (id) => {
  const retrodb = mongo.getDb();
  await retrodb.collection("retro").deleteOne({ _id: id });
};

addRetro = async (id) => {
  const retrodb = mongo.getDb();
  await retrodb.collection("retro").insertOne({ _id: id, opinions: [] });
};

insertUserOpinions = async (retroId, opinions) => {
  const opinionWithVotes = opinions.map((opinion) => ({ ...opinion, votes: 0 }));
  const retrodb = mongo.getDb();
  await retrodb.collection("retro").update({ _id: retroId }, { $addToSet: { opinions: { $each: opinionWithVotes } } });
};

addVotesToOpinions = async (retroId, votedOpinions) => {
  const retrodb = mongo.getDb();
  await retrodb.collection("retro").update(
    { _id: retroId },
    { $inc: { "opinions.$[opinion].votes": 1 } },
    {
      multi: true,
      arrayFilters: [{ "opinion._id": { $in: votedOpinions } }],
    }
  );
};

mongo.init();

module.exports = {
  addRetro,
  deleteRetro,
  getRetro,
  getRetros,
  insertUserOpinions,
  addVotesToOpinions,
};
