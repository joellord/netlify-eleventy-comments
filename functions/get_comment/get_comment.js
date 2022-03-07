const axios = require("axios");

const handler = async (event) => {
    try {
        
        const commentFilter = {};

        if (event.queryStringParameters.hasOwnProperty("url")) {
            commentFilter["url"] = decodeURIComponent(event.queryStringParameters.url);
        }

        if (event.queryStringParameters.hasOwnProperty("last_built")) {
            commentFilter["timestamp"] = {
                "$gt": new Date(decodeURIComponent(event.queryStringParameters.last_built))
            }
        }

        const response = await axios({
            "method": "POST",
            "url": `https://data.mongodb-api.com/app/${process.env.MONGODB_DATA_APP_ID}/endpoint/data/beta/action/find`,
            "headers": {
                "api-key": `${process.env.MONGODB_DATA_API_KEY}`
            },
            "data": {
                "dataSource": "examples",
                "database": "netlify",
                "collection": "comments",
                "filter": commentFilter
            }
        });
        return {
            statusCode: 200,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(response.data.documents)
        };
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}

module.exports = { handler }
