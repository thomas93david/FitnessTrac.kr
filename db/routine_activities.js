const { client } = require("./client");

// addActivityToRoutine
// addActivityToRoutine({ routineId, activityId, count, duration })
// create a new routine_activity, and return it

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
  } catch (error) {
    throw error;
  }
}

// updateRoutineActivity
// updateRoutineActivity({ id, count, duration })
// Find the routine with id equal to the passed in id
// Update the count or duration as necessary

async function updateRoutineActivity() {
  try {
  } catch (error) {
    throw error;
  }
}

// destroyRoutineActivity
// destroyRoutineActivity(id)
// remove routine_activity from database

async function destroyRoutineActivity() {
  try {
  } catch (error) {
    throw error;
  }
}

module.export = {
  client,
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
};
