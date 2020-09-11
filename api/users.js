const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");

const { getUserByUsername, createUser, getAllUsers } = require("../db/users");

const { getAllRoutinesByUser } = require("../db/routines");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  next();
});

usersRouter.get("/", async (req, res) => {
  const users = await getAllUsers();
  res.send({
    users,
  });
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        name: "UsernameError",
        message: "Username already exists",
      });
    }

    const user = await createUser({
      username,
      password,
    });

    if (user.password.length < 5) {
      next({
        name: "UserPasswordError",
        message: "Password characters must be greater than 5",
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
      message: "Thank you for signing up!",
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

  // request must have both
  if (!username || !password) {
    next({
      name: "CredentialError",
      message: "Need both username and password",
    });
  }
  // return a JWT
  try {
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET
      );
      res.send({ message: "you're logged in!", token });
    } else {
      next({
        name: "CredentialsError",
        message: "Your username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
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
