const { PORT = 3000 } = process.env;
const express = require("express");

require("dotenv").config();

const server = express();
const bodyParser = require("body-parser");
server.use(bodyParser.json());

const morgan = require("morgan");
server.use(morgan("dev"));

const apiRouter = require("./api");
server.use("/api", apiRouter);

server.use((req, res, next) => {
  console.log("<-----Body Logger START----->");
  console.log(req.body);
  console.log("<-----Body Logger END----->");

  next();
});

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
