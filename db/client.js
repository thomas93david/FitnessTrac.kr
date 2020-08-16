//  This is a place to build and export an unconnected client.
//  This will be imported into your individual files below.
const { Client } = require("pg");

const client = new Client(
  process.env.DATABASE_URL || "postgres://localhost:5432/fitness-dev"
);

module.exports = {
  client,
};
