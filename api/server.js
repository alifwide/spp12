const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const crudRouter = require('./routes/crud_router');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api/v1/crud/', crudRouter);

app.listen(3001, () => {
	console.log('server is running at port : 3001');
});