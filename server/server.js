require('dotenv').config();

const bearerToken = require('express-bearer-token');

const express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    mongoose = require('mongoose'),
    User = require('./api/models/User'),
    NodeSchema = require('./api/models/Node'),
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
/**
 * TODO: add db connect info to config file and import it from there
 * secrets go in .env file or something #closedsås
 */
mongoose.connect(process.env.DB_URI,
                 {useNewUrlParser: true});

app.use(bearerToken());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./api/routes')(app);
app.listen(port, () => {
    console.log('We are live on ' + port);
});
