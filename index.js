const PORT = 3000;
const express = require("express");

const server = express();

const apiRouter = require("./api");
server.use("/api", apiRouter);

const bodyParser = require("body-parser");
server.use(bodyParser.json());

const morgan = require("morgan");
server.use(morgan("dev"));

server.use((req, res, next) => {
  console.log("<-----Body Logger START----->");
  console.log(req.body);
  console.log("<-----Body Logger END----->");

  next();
});

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
