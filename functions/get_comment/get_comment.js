const axios = require("axios");
const ENDPOINT = "https://data.mongodb-api.com/app/data-nkpsw/endpoint/data/beta";
const API_KEY = "B1exsbAP0cJF329eTKZXirCivq7dGArYiHS3iPmxuvnyVeN5H79VqvzvwB6fc0LH";


const handler = async (event) => {
  console.log("HERE");
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
            "url": `${ENDPOINT}/action/find`,
            "headers": {
                "api-key": `${API_KEY}`
            },
            "data": {
                "dataSource": "Cluster0",
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
