const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getUserByUsername, getUser, createUser } = require("../db/users");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  res.send({ message: "hello from /users!" });
  next();
});

// POST /users/register
// Create a new user. Require username and password, and hash password before saving user to DB. Require all passwords to be at least 8 characters long.
// Throw errors for duplicate username, or password-too-short.

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  const SALT_COUNT = 10;

  bcrypt.hash(password, SALT_COUNT, function (err, hashedPassword) {
    createUser({
      username,
      password: hashedPassword, // not the plaintext
    });
  });

  try {
    const _user = await getUser(username);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    }

    const user = await createUser({
      username,
      password,
    });

    if (user.password.length < 8) {
      next({
        name: "UserPasswordError",
        message: "Password characters must be greater than 8",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "Thank you for signing up",
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST /users/login
// Log in the user. Require username and password, and verify that plaintext login password matches the saved hashed password before returning a JSON Web Token.
// Keep the id and username in the token.
usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await getUserByUserName(username);
  const hashedPassword = user.password;

  bcrypt.compare(password, hashedPassword, async function (
    err,
    passwordsMatch
  ) {
    // request must have both
    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password",
      });
    }
    // return a JWT
    try {
      const user = await getUserByUsername(username);

      if (passwordsMatch) {
        const token = jwt.sign(
          {
            id: user.id,
            username,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1w",
          }
        );

        res.send({
          message: "you're logged in!",
          token,
        });
      } else {
        next({
          name: "IncorrectCredentialsError",
          message: "Username or password is incorrect",
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
});

// GET /users/:username/routines

// Get a list of public routines for a particular user.

usersRouter.get("/routines", async (req, res, next) => {
  const { username } = req.body;

  try {
    const routines = await getAllRoutinesByUser(username);

    res.send({
      routines,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = usersRouter;
