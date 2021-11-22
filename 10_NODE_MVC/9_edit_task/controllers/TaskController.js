const Task = require("../models/Task");

module.exports = class TaskController {
  static createTask(req, res) {
    res.render("tasks/create");
  }

  static async showTasks(req, res) {
    const tasks = await Task.findAll({ raw: true });
    res.render("tasks/all", { tasks: tasks });
  }

  static async createTaskSave(req, res) {
    const task = {
      title: req.body.title,
      description: req.body.description,
      done: false,
    };

    await Task.create(task);

    res.redirect("/tasks");
  }

  static async deleteTask(req, res) {
    const id = req.body.id;

    await Task.destroy({ where: { id: id } });

    res.redirect("/tasks");
  }

  static async editTask(req, res) {
    const taskToEdit = await Task.findOne({
      where: { id: req.params.id },
      raw: true,
    });
    res.render("tasks/edit", { task: taskToEdit });
  }

  static async editTaskSave(req, res) {
    const taskToEdit = await Task.findOne({
      raw: true,
      where: { id: req.body.id },
    });

    if (taskToEdit != null) {
      const editedTask = {
        id: req.body.id,
        title: req.body.title == "" ? taskToEdit.title : req.body.title,
        description:
          req.body.description == ""
            ? taskToEdit.description
            : req.body.description,
        done: false,
      };

      await Task.update(editedTask, { where: { id: editedTask.id } });
      res.redirect("/tasks");
    } else {
      console.log("Task não encontrada!");
    }
  }
};
