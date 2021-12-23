const mongoShared = require('./mongo-shared')



mongoShared.connectToServer( function( err, client ) {
	if (err) console.log(err);
	console.log('connected to mongo')
	// load the endpoints
	require('./routes/express')
  } );

