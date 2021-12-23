const express = require('express')
var cors = require('cors')
const PORT = process.env.PORT || 3001

const app = express();
app.use(express.urlencoded());

//TODO: add cognito-express package here to cover authentication and add the connected user to res.local...

app.use(express.json());
app.use(cors())

require('./posts').loadRoutes(app)

app.listen(PORT, () => console.log("listening on PORT " + PORT))
exports = {app}