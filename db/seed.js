const { client } = require("../db/client");
const {
  createUser,
  getUser,
  updateUser,
  getAllUsers,
  getUserByUsername,
} = require("../db/users");

const {
  getAllActivities,
  createActivity,
  updateActivity,
} = require("./activities");

const { createRoutine, getAllRoutines } = require("./routines");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
    DROP TABLE IF EXISTS routine_activities;
    DROP TABLE IF EXISTS routines;
    DROP TABLE IF EXISTS activities;
    DROP TABLE IF EXISTS users; 
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
        CREATE TABLE activities (
          id SERIAL PRIMARY KEY,
          name varchar(255) UNIQUE NOT NULL,
          description TEXT NOT NULL
        );
        CREATE TABLE routines (
          id SERIAL PRIMARY KEY,
          "creatorId" INTEGER REFERENCES users(id),
          public BOOLEAN DEFAULT false,
          name varchar(255) UNIQUE NOT NULL,
          goal TEXT NOT NULL
        );
        CREATE TABLE routine_activities (
          id SERIAL PRIMARY KEY,
          "routineId" INTEGER REFERENCES routines(id),
          "activityId" INTEGER REFERENCES activities(id),
          duration INTEGER,
          count INTEGER,
          UNIQUE ("routineId", "activityId")
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

    await createUser({
      id: "1",
      username: "princeHendrix",
      password: "guitarslayers100",
    });

    await createUser({
      username: "drinkWater24",
      password: "drinkwaterallday",
    });

    await createUser({
      username: "spiderBro929",
      password: "doeswhateveraspidercan",
    });

    await createUser({
      username: "Captain_Planet",
      password: "pollutiodowntwo0",
    });

    await createUser({
      username: "spACEghOST",
      password: "coast2coast",
    });

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialActivities() {
  try {
    console.log("Starting to create activities");

    await createActivity({
      name: "play videogames",
      description:
        "enhances memory, improves brain speeds, improves problem-solving skills",
    });

    await createActivity({
      name: "sit on couch",
      description: "figure out why you do the (sometimes stupid) things you do",
    });

    await createActivity({
      name: "stand up every hour",
      description: "burn calories on your way to the kitchen",
    });

    await createActivity({
      name: "run for just one song",
      description: "only one song, you will live",
    });

    console.log("Finished creating activities!");
  } catch (error) {
    console.log("Error creating actvities");
  }
}

async function createInitalRoutines() {
  try {
    console.log("Starting to create routines");

    const [princeHendrix, drinkWater24, spACEghOST] = await getAllUsers();

    console.log("Testing:", princeHendrix.id);

    await createRoutine({
      creatorId: princeHendrix.id,
      public: "false",
      name: "hi",
      goal: "lose weight",
    });

    await createRoutine({
      creatorId: drinkWater24.id,
      public: "true",
      name: "bye",
      goal: "gain weight",
    });

    await createRoutine({
      creatorId: spACEghOST.id,
      public: "true",
      name: "Flying",
      goal: "FLY AWAY",
    });

    console.log("Finished creating routines");
  } catch (error) {
    console.log(error);
    console.log("Error creating routines");
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialActivities();
    await createInitalRoutines();
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Testing database...");

    const users = await getUser();
    console.log("getUser:", users);

    const exercises = await getAllActivities();
    console.log("getAllActivities:", exercises);

    const routines = await getAllRoutines();
    console.log("getAllRoutines", routines);

    console.log("Calling updateUser on users[0]");
    const updateUserResult = await updateUser(users[0].id, {
      username: "MakingProgress",
    });
    console.log("Result", updateUserResult);

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
