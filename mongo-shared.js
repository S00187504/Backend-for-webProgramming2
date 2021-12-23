const {MongoClient, ObjectID} = require( 'mongodb' );
const car_db = 'CarsDB'
const url = "mongodb://localhost:27017/CarsDB";

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
      if(err){
        console.log(err)
      }
      _db  = client.db(car_db);
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  },
  ObjectID
};
