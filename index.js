const http = require('http');
const express = require('express');
const compression = require('compression')
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const bodyParser = require('body-parser');
const routes = require('./src/routes');

var scribe = require('scribe-js')()
const app = express();
app.use('/logs', scribe.webPanel());
app.use(compression())
// console.log(process.env.KEY)
app.use(require('express-status-monitor')())
const PORT = process.env.PORT || 3000;
//Setting Up Dynamic port allocation

//Creating express object
app.server = http.createServer(app);
//Create HTTP server

var accessLogStream = fs.createWriteStream(__dirname + '/logs/access.log', {flags: 'a'})

//Configure Morgan's Logging Formats
// app.use(morgan('common', {stream: accessLogStream}))    //To enable logs to be written to file
app.use(morgan('common')); //to enable logs to be shown in middleware console
app.use(scribe.express.logger());

// app.use(morgan('dev'));
//To Get Apache Log Format in Console for Handling Requests
app.use(cors({
    exposedHeaders: "*"
}));
//To Allow Cross Origin Accessability

app.use(bodyParser.json({
    limit: '50mb'
}));
//Setting Attachement Size limit

app.use(bodyParser.urlencoded({ extended: true }));
// support encoded bodies

app.use('/api/v1/', routes);
//DB Connector
// Configuring the database

// Turn on that server!
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});