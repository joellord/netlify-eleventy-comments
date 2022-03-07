exports = async function({ query, headers, body}, response) {
  
  const commentFilter = {};
  
  if(query.hasOwnProperty("url")) {
      commentFilter["url"] = decodeURIComponent(query.url);
  }

  if(query.hasOwnProperty("last_built")) {
      commentFilter["timestamp"] = {
          "$gt": new Date(decodeURIComponent(query.last_built))
      }
  }
  
  const results = await context.services.get("mongodb-atlas").db("netlify").collection("comments").find(commentFilter).toArray();

  response.setHeader("content-type", "application/json");
  response.setBody(JSON.stringify(results));

};
