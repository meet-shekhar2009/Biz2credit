const db = require('../Database/dbProvider')();
const response = require('../../Common/responseModel');
const Controller = () => {
    const _getProviders = async (req, res, next) => {
        try {
            let result = await db.GETDATA(req.params.searchtext)
            res.send(new response(result));
        } catch (error) {
            next(error);
        }
    }
    return {
        GET: _getProviders
    }
}
module.exports = Controller;