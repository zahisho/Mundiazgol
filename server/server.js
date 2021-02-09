var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');

var allowInsecureHTTP = true;
var appId = 'MundiazGol';
var masterKey = '';
var appName = "MundiazGol";
var serverURL = "http://localhost:1337/parse";

var api = new ParseServer({
    databaseURI: 'mongodb://localhost:27017/mundiazgol',
    cloud: './cloud/cloud.js',
    appId,
    masterKey,
    serverURL,
});

var dashboard = new ParseDashboard({
    "apps": [
        {
            serverURL,
            appId,
            masterKey,
            appName
        }
    ],
    "users": [
        {
            "user": "admin",
            "pass": "admin"
        }
    ]
}, { allowInsecureHTTP });

var app = express();

app.use('/parse', api);

app.use('/dashboard', dashboard);

app.use('/public', express.static('public'));

let path = require('path');

//configuration for production
app.use(express.static(path.join(__dirname, '/build')));

// Parse Server plays nicely with the rest of your web routes
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});

var port = 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
    console.log('parse-server running on port ' + port + '.');
});

ParseServer.createLiveQueryServer(httpServer);
