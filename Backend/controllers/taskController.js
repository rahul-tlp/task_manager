const Task = require('../config/schema'); 

exports.addTask = async function (req, res) {
    try {
        const { title, description, status } = req.body;

        if (!title || !description || !status) {
            return res.status(400).json({
                message: "Invalid input: 'title', 'description', and 'status' are required.",
                status: "error",
            });
        }
        const task = await Task.create({ title, description, status });
        
        return res.status(201).json({
            message: "Task added successfully",
            status: "success",
            data: task
        });
    } catch (err) {

        const errorResponse = {
            message: "An error occurred while adding the task.",
            status: "error",
        };
        return res.status(500).json(errorResponse);
    }
};



exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        console.log('Retrieved Tasks:', tasks);

        res.status(200).json(tasks);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ message: "An error occurred while fetching tasks." });
    }
};

   
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params; 
        const { title,description,status } = req.body; 

        if (!id || !title) {
            return res.status(400).json({
                message: "Task ID and task data are required.",
                status: "error",
            });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            id,           
            { title,description,status },     
            { new: true } 
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found.",
                status: "error",
            });
        }

        return res.status(200).json({
            message: "Task updated successfully.",
            status: "success",
            data: updatedTask,
        });

    } catch (err) {
        console.error("Error updating task:", err);
        res.status(500).json({
            message: "An error occurred while updating the task.",
            status: "error",
        });
    }
};



exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Task ID is required.",
                status: "error",
            });
        }

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found.",
                status: "error",
            });
        }

        return res.status(200).json({
            message: "Task deleted successfully.",
            status: "success",
            data: deletedTask
        });
    } catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).json({
            message: "An error occurred while deleting the task.",
            status: "error",
        });
    }
};

exports.getTaskByStaus = async (req, res) => {
    try {
          const { status } = req.params;
          
          console.log(status);
          
      
          const query = status ? { status } : {};
          const tasks = await Task.find(query);
      
          res.status(200).json(tasks);
          
        } catch (error) {
          console.error("Error fetching tasks:", error);
          res.status(500).json({ message: "An error occurred while fetching tasks." });
        }
};

