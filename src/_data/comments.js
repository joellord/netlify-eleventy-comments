const { AssetCache } = require("@11ty/eleventy-cache-assets");
const axios = require("axios");
const commentPreloader = require("../../functions/get_comment/get_comment").handler;

module.exports = async function () {

    let asset = new AssetCache("comments");

    if (asset.isCacheValid("1d")) {
        return asset.getCachedValue();
    }

    try {
        const response = await commentPreloader({ queryStringParameters: {} }).then(response => JSON.parse(response.body));
        await asset.save(response, "json");
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }

}
