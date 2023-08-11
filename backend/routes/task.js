const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");

router.post("/add-task", taskController.postTask);
router.get("/add-task/", taskController.getDoneTask);
router.get("/add-task/", taskController.getNotDoneTask);
router.get("/single-task/:taskId", taskController.singleTask);
router.patch("/add-task/:taskId", taskController.taskStatus);
router.delete("/delete-task/:taskId", taskController.deleteTask);
router.patch("/edit-task/:taskId", taskController.editTask);

module.exports = router;
