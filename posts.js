const myMongo = require('./mongo')
//connects to mongo

 exports.addCars = post =>{
   return myMongo.createDocument('Cars', post)
 }
 exports.getCars = (x) =>{
 	return myMongo.getEverything('Cars', {searchBy: '1'})

}
exports.deleteCars = (id) =>{
	return myMongo.deleteDocument('Cars', id)
}



exports.updateCar = (newPoints, id) =>{
	console.log(id)
	console.log(newPoints)
	return myMongo.updateDocument('Cars', id, newPoints)

}

