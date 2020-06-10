const database = require('../Modules/Database/dbProvider')();
class response {
    constructor(_data, _err = null) {
        this.Status = 200;
        this.Data = _data;
        this.error = _err;
        this.APIHitsCount = database.APIHitsCount();
        if (_err) {
            this.error = "due to some technical issues, your request cannot be completed";
            this.Status = 500;
        }
    }
}
module.exports = response;