const url = require('./url'); //import url file
const uri = url.url;  //set uri

const MongoClient = require('mongodb').MongoClient; //import mongoclient

//Add block data to db
const addBlockToDB = (_blockNumber, _hash, _burnedFees) => {
  MongoClient.connect(uri, function (err, db) {
    var dbo = db.db("Avalanche");

    var dbData = {
      $set: {
        "_id": _blockNumber,
        "hash": _hash,
        "burnedFees": _burnedFees,
        "time": Date()
      }
    }
    const filter = { "_id": _blockNumber };    //filter per blockId
    dbo.collection("Blocks").updateOne(filter, dbData, { upsert: true });
  })
}

//Get stored data from database
const getData = async () => {
  let cursor;
  MongoClient.connect(uri, async function (err, db) {

    //Database fields
    var db = db.db("Avalanche");
    var collection = db.collection("Blocks");

    const options = {
      projection: { _id: 1, hash: 1, burnedFees: 1, time: 1 },
    };

    cursor = collection.find({}, options);
    await cursor.forEach(console.dir);
  })
  return cursor;
}

module.exports = {
  addBlockToDB,
  getData
}