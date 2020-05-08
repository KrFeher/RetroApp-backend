var config = require('config');

const client = require("mongodb").MongoClient;
const userName = config.db_username;
const password = config.db_password;
const dbName = config.db_name;
const constructedUrl = `mongodb+srv://${userName}:${password}@cluster-1-rxwrb.mongodb.net/${dbName}?retryWrites=true&w=majority`

let _db;

module.exports = {
  init: () => {
    console.log(`Trying to connect to ${constructedUrl} with db name ${dbName}`)
    client.connect( constructedUrl, { useNewUrlParser: true, useUnifiedTopology: true }, async ( err, client ) => {
      if (err) throw err;

      _db = client.db(dbName);
      try {
      const allCollections = await _db.listCollections().toArray();
      if (!allCollections.find((collection) => collection.name === "retro")) {
        console.log("Retro collection does not exist. Reacreating it...");
        await _db.createCollection("retro");
      }
    } catch (error) {
         console.log(error);
    }
  })
},

  getDb: () => {
    return _db;
  }
};