const activitiesRouter = require("express").Router();
const { requireUser } = require("./utils");

const { createActivity, getAllActivities } = require("../db/activities");

activitiesRouter.use((req, res, next) => {
  console.log("A request is being made to /activities");
  next();
});

// GET /activities
// Just return a list of all activities in the database

activitiesRouter.get("/", requireUser, async (req, res) => {
  try {
    const allActivities = await getAllActivities();

    res.send({
      allActivities,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST /activities (*)
// Create a new activity

activitiesRouter.post("/", requireUser, async (req, res, next) => {
  const { name, description } = req.body;

  const postData = {};

  try {
    postData.name = name;
    postData.description = description;

    const post = await createActivity(name, description);
    if (post) {
      res.send(post);
    } else {
      next({
        name: "PostCreationError",
        message: "There was an error creating your post. Please try again.",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// PATCH /activities/:activityId (*)
// Anyone can update an activity (yes, this could lead to long term problems a la wikipedia)

activitiesRouter.patch("/:routineId", requireUser, async (req, res, next) => {
  const { routineId } = req.params;
  const { name, description } = req.body;

  const updateFields = {};

  if (activities && activities.length > 0) {
    updateFields.activities = activities.trim().split(/\s+/);
  }

  if (name) {
    updateFields.name = name;
  }

  if (description) {
    updateFields.description = description;
  }

  try {
    const originalRoutine = await getRoutineById(routineId);

    if (originalRoutine.user.id === req.user.id) {
      const updatedRoutine = await updateRoutine(routineId, updateFields);
      res.send({ routine: updatedRoutine });
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot update an activity that is not yours",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /activities/:activityId/routines
// Get a list of all public routines which feature that activity

activitiesRouter.get("/activityId/routines", async (req, res) => {
  try {
    const allActivities = await getAllActivities();

    const activities = allActivities.filter((activity) => {
      if (activity.public) {
        return true;
      }
      return false;
    });
    res.send({
      activities,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = activitiesRouter;
