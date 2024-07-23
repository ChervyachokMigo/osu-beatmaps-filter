const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//GET REQUESTS
const request_names_get = fs.readdirSync(path.join(__dirname,'api_requests_get'));

for (const filename of request_names_get) {
	const name = path.basename(filename, '.js');

	app.get('/action=' + name, (req, res) => 
		require( path.join(__dirname, path.join('./api_requests_get', filename)))(req, res));
}

//POST REQUESTS
const request_names_post = fs.readdirSync(path.join(__dirname,'api_requests_post'));

for (const filename of request_names_post) {
	const name = path.basename(filename, '.js');

	app.post('/action=' + name, (req, res) => 
		require( path.join(__dirname, path.join('./api_requests_post', filename)))(req, res));
}

app.listen(9002);