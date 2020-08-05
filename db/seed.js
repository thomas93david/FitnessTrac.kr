const { client } = require("./client");
const { createUser, getUser } = require("./users");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS activities;
        DROP TABLE IF EXISTS routines;
        DROP TABLE IF EXISTS routine_activities;
      `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL
        );
      `);

    await client.query(`
      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name varchar(255) UNIQUE NOT NULL,
        description TEXT NOT NULL
      );
    `);

    await client.query(`
    CREATE TABLE routines (
      id SERIAL PRIMARY KEY,
      "creatorId" INTEGER REFERENCES users(id),
      public BOOLEAN DEFAULT false,
      name varchar(255) UNIQUE NOT NULL,
      goal TEXT NOT NULL
    );
  `);

    await client.query(`
  CREATE TABLE routine_activities (
    id SERIAL PRIMARY KEY,
    "routineId" INTEGER REFERENCES routines(id),
    "activityId" INTEGER REFERENCES activities(id),
    duration INTEGER,
    count INTEGER

  );
`);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    const prince = await createUser({
      username: "princeHendrix",
      password: "guitarslayers100",
    });

    console.log(prince);

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    const users = await getAllUsers();
    console.log("getAllUsers:", users);

    console.log("Finished database tests!");
  } catch (error) {
    console.error("Error testing database!");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
