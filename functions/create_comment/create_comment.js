const axios = require("axios");

const handler = async (event) => {
    try {
        let payload = JSON.parse(event.body);
        payload.timestamp = new Date();
        const response = await axios({
            "method": "POST",
            "url": `https://data.mongodb-api.com/app/${process.env.MONGODB_DATA_APP_ID}/endpoint/data/beta/action/insertOne`,
            "headers": {
                "api-key": `${process.env.MONGODB_DATA_API_KEY}`
            },
            "data": {
                "dataSource": "examples",
                "database": "netlify",
                "collection": "comments",
                "document": payload
            }
        });
        return {
            statusCode: 200,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}

module.exports = { handler }
