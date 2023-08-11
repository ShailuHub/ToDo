const Task = require("../models/task");

exports.postTask = (req, res, next) => {
  const { name, description } = req.body;
  Task.create({ name, description })
    .then(() => {
      res.status(201).send({ message: "Sucessfully saved to database" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getTask = (req, res, next) => {
  Task.findAll()
    .then((task) => {
      res.send(task);
    })
    .catch((err) => console.log(err));
};

exports.getDoneTask = (req, res, next) => {
  const status = req.query.status === "true";
  Task.findAll({ where: { isDone: status } })
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getNotDoneTask = (req, res, next) => {
  const status = req.query.status === "false";
  Task.findAll({ where: { isDone: status } })
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.taskStatus = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findOne({ where: { id: taskId } })
    .then((task) => {
      if (!task) {
        return res.status(404).send("Task not found");
      }

      task.isDone = !task.isDone;

      return task.save();
    })
    .then((updatedTask) => {
      res.send(updatedTask);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred while editing the task.");
    });
};

exports.deleteTask = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findOne({ where: { id: taskId } })
    .then((task) => {
      if (!task) {
        return res.status(404).send("Task not found");
      }
      return task.destroy();
    })
    .then(() => {
      res.status(201).send("Successfully delete");
    })
    .catch((err) => {
      res.status(500).send("An error occurred while deleting the task.");
    })
    .catch((err) => {
      res.status(500).send("An error occurred while deleting the task.");
    });
};

exports.editTask = (req, res, next) => {
  const taskId = req.params.taskId;
  console.log(taskId);
  Task.findOne({ where: { id: taskId } })
    .then((task) => {
      if (!task) {
        return res.status(404).send("Task not found");
      }
      task.name = req.body.name;
      task.description = req.body.description;
      return task.save();
    })
    .then(() => {
      res.status(201).send("Successfully saved");
    })
    .catch((err) => {
      res.status(500).send("An error occurred while editng the task.");
    })
    .catch((err) => {
      res.status(500).send("An error occurred while editing the task.");
    });
};

exports.singleTask = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findOne({ where: { id: taskId } })
    .then((task) => {
      if (!task) {
        return res.status(404).send("Task not found");
      }
      res.send(task);
    })
    .catch((err) => {
      res.status(500).send("An error occurred while getting single task.");
    });
};
