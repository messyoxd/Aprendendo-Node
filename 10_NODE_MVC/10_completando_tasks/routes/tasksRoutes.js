const express = require('express')
const router = express.Router()

const TaskController = require('../controllers/TaskController')

router.get('/add', TaskController.createTask)

router.post('/add', TaskController.createTaskSave)

router.post('/delete', TaskController.deleteTask)

router.get('/edit/:id', TaskController.editTask)

router.post('/edit', TaskController.editTaskSave)

router.post('/toggle-status', TaskController.toggleStatus)

router.get('/', TaskController.showTasks)

module.exports = router