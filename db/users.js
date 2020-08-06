const { client } = require("./client");

//  createUser
//  createUser({ username, password })
//  make sure to hash the password before storing it to the database
async function createUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password) 
      VALUES($1, $2) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `,
      [username, password]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

// getUser
// getUser({ username, password })
// this should be able to verify the password against the hashed password
async function getUser() {
  const { rows } = await client.query(
    ` SELECT id, username, password
            FROM users;
        `
  );

  return rows;
}

async function updateUser(id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `
      UPDATE users
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields)
    );

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = { client, getUser, createUser, updateUser };
