let exampleRetros = [{ id: "Example retro 1", opinions: [] }, { id: "Example retro 2", opinions: []  }, { id: "Example retro 3", opinions: []  }];

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
}

insertRetro = async (retroName) => {
  // to be developed when db attached
};

insertUserOpinions = async (id, opinions) => {
  const index = exampleRetros.findIndex((retro => retro.id === id));
  exampleRetros[index].opinions = exampleRetros[index].opinions.concat(opinions);
};

getAllOpinions = async () => {
  // to be developed when db attached
};

init();

module.exports = {
  getRetro,
  getRetros,
  insertUserOpinions,
};
