const express = require("express");
const usersRouter = express.Router();

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  res.send({ message: "hello from /users!" });
});

// POST /users/register
// Create a new user. Require username and password, and hash password before saving user to DB. Require all passwords to be at least 8 characters long.
// Throw errors for duplicate username, or password-too-short.

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, name, location } = req.body;

  try {
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST /users/login
// Log in the user. Require username and password, and verify that plaintext login password matches the saved hashed password before returning a JSON Web Token.

// Keep the id and username in the token.

// GET /users/:username/routines

// Get a list of public routines for a particular user.

module.exports = usersRouter;
