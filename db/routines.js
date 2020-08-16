const { client } = require("./client");

// createRoutine
// createRoutine({ creatorId, public, name, goal })
// create and return the new routine
async function createRoutine({ creatorId, public, name, goal }) {
  try {
    const { rows } = await client.query(
      `
            INSERT INTO routines("creatorId", public, name, goal)
            VALUES ($1, $2, $3, $4);
            `,
      [creatorId, public, name, goal]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

// getAllRoutines
// select and return an array of all routines, include their activities

async function getAllRoutines() {
  try {
    const { rows } = await client.query(
      `
          SELECT *
           FROM routines;
      `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

// getPublicRoutines
// select and return an array of public routines, include their activities
async function getPublicRoutines() {
  try {
    const { routines } = await client.query(
      `
      SELECT *
      FROM routines
      WHERE public = true
      `
    );
    return routines;
  } catch (error) {
    throw error;
  }
}

// getAllRoutinesByUser
// getAllRoutinesByUser({ username })
// select and return an array of all routines made by user, include their activities
async function getAllRoutinesByUser({ username }) {
  try {
    const { routines } = await client.query(`
      SELECT *
      FROM routines
      WHERE id = ${username}
      JOIN routine_activities."routineId" ON routines.id
    `);
    return routines;
  } catch (error) {
    throw error;
  }
}

// getPublicRoutinesByUser
// getPublicRoutinesByUser({ username })
// select and return an array of public routines made by user, include their activities
async function getPublicRoutinesByUser({ username }) {
  try {
    const { routines } = await client.query(
      `
      SELECT name
      FROM routines
      WHERE id = ${username} && public = true
      JOIN routine_activites.id ON routines.public
      `
    );
    return routines;
  } catch (error) {
    throw error;
  }
}

// getPublicRoutinesByActivity
// getPublicRoutinesByActivity({ activityId })
// select and return an array of public routines which have a specific activityId in their routine_activities join, include their activities
async function getPublicRoutinesByActivity({ activityId }) {
  try {
    const { routines } = await client.query(
      `
        SELECT name, goal
        FROM routines
        WHERE id = ${activityId} && public = true
        JOIN routines_activities."activityId" ON routine.id
        `
    );
    return routines;
  } catch (error) {
    throw error;
  }
}

async function updateRoutine({ id, fields }) {
  // Find the routine with id equal to the passed in id
  // Don't update the routine id, but do update the public status, name, or goal, as necessary
  // Return the updated routine:

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: routine_activities } = await client.query(
      `
              UPDATE routine_activities
              SET ${setString}
              WHERE id=${id}
              RETURNING *;
          `,
      Object.values(fields)
    );

    return routine_activities;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createRoutine,
  getAllRoutines,
  getPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  updateRoutine,
};
