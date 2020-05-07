var config = require('config');

const client = require("mongodb").MongoClient;
const uri = config.db_url;
const dbName = config.db_name;

let _db;

module.exports = {
  init: () => {
    console.log(`Trying to connect to ${uri} with db name $${dbName}`)
    client.connect( uri,  { useNewUrlParser: true, useUnifiedTopology: true }, async ( err, client ) => {
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