const { client } = require("./client");

// getAllActivities
// select and return an array of all activities

async function getAllActivities() {
  try {
    const { rows } = await client.query(
      `
            SELECT *
            FROM activities;
            `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

// createActivity
// createActivity({ name, description })
// return the new activity

async function createActivity({ name, description }) {
  try {
    const result = await client.query(
      `
          INSERT INTO activities(name, description)
          VALUES ($1, $2);
          `,
      [name, description]
    );
    return result;
  } catch (error) {
    throw error;
  }
}

// updateActivity
// updateActivity({ id, name, description })
// don't try to update the id
// do update the name and description
// return the updated activity

async function updateActivities(id, name, description, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [activity],
    } = await client.query(
      `
      UPDATE activities
      SET ${setString}
      WHERE id=${id}, name=${name}, description=${description}
      RETURNING *;
    `,
      Object.values(fields)
    );
    console.log("testing", activity);
    return activity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  getAllActivities,
  createActivity,
  updateActivities,
};
