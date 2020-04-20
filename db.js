const exampleRetros = [{ id: "Example retro 1" }, { id: "Example retro 2" }, { id: "Example retro 3" }];

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

insertRetro = async (retroName) => {
  // to be developed when db attached
};

insertUserOpinions = async (opinions) => {
  // to be developed when db attached
};

getAllOpinions = async () => {
  // to be developed when db attached
};

init();

module.exports = {
  getRetros,
};
