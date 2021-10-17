const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const { ports, endpoints } = require('./configs/server.config')
const crud_router = require('./routes/crud_router');
const authorize_router = require('./routes/authorization_router');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use(endpoints.BASE_ENDPOINT + endpoints.CRUD_ENDPOINT , crud_router);
app.use(endpoints.BASE_ENDPOINT + endpoints.AUTHORIZATION_ENDPOINT , authorize_router);

app.listen(ports.SERVER_PORT, () => {
	console.log('server is running at port : ' + ports.SERVER_PORT);
});