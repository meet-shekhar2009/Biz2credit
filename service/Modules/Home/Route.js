const routes = (express) => {
    var approuter = express.Router();
    const Controller = require('./Controller')();

    approuter.route('/:searchtext?')
        .get(Controller.GET);
    return approuter;
}
module.exports = routes;