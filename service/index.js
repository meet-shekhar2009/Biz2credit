var express = require('express'),
    bodyparser = require('body-parser'),
    connect = require('connect'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    compression = require('compression'),
    cors = require('cors');




const homeRoutes = require("./Modules/Home/Route");
const database = require('./Modules/Database/dbProvider')();
const response = require('./Common/responseModel');
const app = express();

var port = 3300;
app.use(compression());
app.use(logger("combined"));
app.use(cors());
app.use(connect.compress());
app.use(cookieParser());

;

app.use(bodyparser.urlencoded({
    extended: true
}));


app.get(`/`, (req, res, next) => {
    res.send("Welcome to project Biz2Credit");
    next();
});


app.use(`/api/home`,IncrementAPIHits , homeRoutes(express));


app.use((err, req, res, next) => {
    res.send(new response(null, err))
});
app.listen(port, () => {
    console.log('running on port :' + port);
});

function IncrementAPIHits(req, res, next) {
    database.IncrementAPIHits();
    next();
}
database.initializedData();