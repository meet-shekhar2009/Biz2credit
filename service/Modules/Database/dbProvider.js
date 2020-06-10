const fs = require('fs');
let ispList = null;
let ApiHits = 0;

function database() {
    const getAll = async (searchTxt) => {
        let response = null;
        response = await fetchData();
        if (searchTxt) {
            searchTxt = searchTxt.toLowerCase();
            response = response.filter(k => {
                return k.name.toLowerCase().includes(searchTxt) ||
                    k.lowest_price.toString().toLowerCase().includes(searchTxt) ||
                    k.rating.toString().toLowerCase().includes(searchTxt)
            });
        }

        return response;
    };

    const _getDBObject = () => {
        return new Promise((resolve, reject) => {
            fs.readFile(__dirname + "/database.json", (err, data) => {
                if (err) return reject(err);
                console.log("database initialized successfully");
                return resolve(data);
            });
        });
    }
    const fetchData = async () => {
        try {
            if (!ispList)
                ispList = JSON.parse(await _getDBObject());
            return ispList;
        } catch (error) {
            console.log("getting error while initializing database");

        }

    }
    const getApiHitscount = k => ApiHits;
    const incrementApiHits = k => ApiHits++;
    return {
        GETDATA: getAll,
        initializedData: fetchData,
        APIHitsCount: getApiHitscount,
        IncrementAPIHits: incrementApiHits
    }
}
module.exports = database;