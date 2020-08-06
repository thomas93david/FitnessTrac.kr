// getAllRoutines
// select and return an array of all routines, include their activities

async function getAllRoutines() {
  try {
  } catch (error) {
    throw error;
  }
}

// getPublicRoutines
// select and return an array of public routines, include their activities
async function getPublicRoutines() {
  try {
  } catch (error) {
    throw error;
  }
}

// getAllRoutinesByUser
// getAllRoutinesByUser({ username })
// select and return an array of all routines made by user, include their activities
async function getAllRoutinesByUser({ username }) {
  try {
  } catch (error) {
    throw error;
  }
}

// getPublicRoutinesByUser
// getPublicRoutinesByUser({ username })
// select and return an array of public routines made by user, include their activities
async function getPublicRoutinesByUser({ username }) {
  try {
  } catch (error) {
    throw error;
  }
}

// getPublicRoutinesByActivity
// getPublicRoutinesByActivity({ activityId })
// select and return an array of public routines which have a specific activityId in their routine_activities join, include their activities
async function getPublicRoutinesByActivity({ activityId }) {
  try {
  } catch (error) {
    throw error;
  }
}

// createRoutine
// createRoutine({ creatorId, public, name, goal })
// create and return the new routine
async function createRoutine({ creatorId, public, name, goal }) {
  try {
  } catch (error) {
    throw error;
  }
}

// updateRoutine
// updateRoutine({ id, public, name, goal })
// Find the routine with id equal to the passed in id
// Don't update the routine id, but do update the public status, name, or goal, as necessary
// Return the updated routine
async function updateRoutine({ id, public, name, goal }) {
  try {
  } catch (error) {
    throw error;
  }
}

// destroyRoutine
// destroyRoutine(id)
// remove routine from database
// Make sure to delete all the routine_activities whose routine is the one being deleted.
async function destroyRoutine(id) {
  try {
  } catch (error) {
    throw error;
  }
}
