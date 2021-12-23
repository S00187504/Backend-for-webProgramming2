const multiparty = require('multiparty')
//links to frontend

const posts=require('../posts')

exports.loadRoutes = app =>{


	app.get('/car/:searchBy', (req, res) => {
		posts.getCars(req.params.searchBy).then(data=>{
			res.send(data)
		})
	})
	// app.post('/car', (req,res)=>{
	// 	posts.addCar(req.body).then(data=>{
	// 		res.send(data)
	// 	})
	// })

	app.post('/car',async (req,res)=>{
		var form = new multiparty.Form();
		form.parse(req, async function(err, fields, files) {
			const post = {
				carID: fields?.firstName[0] ||'',
				carMake: fields?.lastName[0] || '', 
				carModel: fields?.points[0] || '',
				fuelType: fields?.team[0] || '',
				carYear: fields?.searchBy[0] || '',
				carCounty: fields?.searchBy[0] || '',

			}
			posts.addCar(post).then(data=>{
				res.send(data)
			})
		});
	})
	app.delete('/car/:id', (req,res)=>{
		posts.deleteCar(req.params.id).then(data=>{
			res.send(data)
		})
	})


	app.put('/car/edit-car/:id',async (req,res)=>{
		var form = new multiparty.Form();
		form.parse(req, async function(err, fields, files) {
			const points = fields?.[0] || ''
			posts.updateCar(points, req.params.id).then(data=>{
				res.send(data)
			})
		});
	})




}














