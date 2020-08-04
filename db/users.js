const { client } = require("./client");

//  createUser

// createUser({ username, password })
// make sure to hash the password before storing it to the database

async function createUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(`
        INSERT INTO users(username, password)
        VALUES($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `)[(username, password)];
  } catch (error) {
    throw error;
  }
}

// getUser
// getUser({ username, password })
// this should be able to verify the password against the hashed password

async function getUser() {
  const { rows } = await client.query(
    ` SELECT username, password
            FROM users;
        `
  );

  return rows;
}

module.exports = { client, getUser, createUser };
