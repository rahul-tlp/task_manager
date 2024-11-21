const express = require('express');
const taskController = require('../controllers/taskController.js')
var router = express.Router();

router.post('/',taskController.addTask);

router.get('/',taskController.getTasks);

router.put('/:id',taskController.updateTask);

router.delete('/:id',taskController.deleteTask);

module.exports = router