const mongoShared = require("./mongo-shared");
const db = mongoShared.getDb();
const ObjectID = require('./mongo-shared').ObjectID

exports.createDocument = (collection, newDocument) => {
  return db.collection(collection).insertOne(newDocument) 
 };
 exports.getEverything = (collection) => {
  return db.collection(collection).find({searchBy: '1'}).toArray();
 };
 exports.deleteDocument = (collection, id) => {
  return db.collection(collection).deleteOne({_id: ObjectID(id)})
 };

 exports.updateDocument = (collection, id, newPoints) => {
  return db.collection(collection).updateOne({ _id: ObjectID(id) }, {$set: {points: newPoints}});
};

