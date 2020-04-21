let exampleRetros = [
  { id: "Example retro 1", opinions: [] },
  { id: "Example retro 2", opinions: [] },
  { id: "Example retro 3", opinions: [] },
];

init = () => {
  console.log("Inserting examples for testing purposes");
  insertExamples();
};

deleteOldEntries = () => {
  console.log("Deleting old database entries:");
  // to be developed when db attached
};

insertExamples = () => {
  // to be developed when db attached
};

getRetros = () => {
  return exampleRetros;
};

getRetro = (id) => {
  return exampleRetros.find((retro) => retro.id === id);
};

deleteRetro = (id) => {
  exampleRetros = exampleRetros.filter((retro) => retro.id !== id);
};

addRetro = (id) => {
  exampleRetros.push({ id, opinions: [] });
};

insertUserOpinions = async (retroId, opinions) => {
  const opinionsWithInitialVotes = opinions.map((opinion) => {
    return { ...opinion, votes: 0 };
  });
  const index = exampleRetros.findIndex((retro) => retro.id === retroId);
  exampleRetros[index].opinions = exampleRetros[index].opinions.concat(opinionsWithInitialVotes);
};

addVotesToOpinions = async (retroId, votedOpinions) => {
  const index = exampleRetros.findIndex((retro) => retro.id === retroId);
  const choosenRetro = exampleRetros[index];

  votedOpinions.forEach((opinionId) => {
    const foundOpinion = choosenRetro.opinions.find((opinion) => opinion.id === opinionId);
    if (foundOpinion) {
      foundOpinion.votes = foundOpinion.votes ? foundOpinion.votes + 1 : 1;
    }
  });
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
