exports = function({ query, headers, body}, response) {
  let payload = EJSON.parse(body.text());
  payload.timestamp = new Date();
  const result = context.services.get("mongodb-atlas").db("netlify").collection("comments").insertOne(payload);
  return result;
};
