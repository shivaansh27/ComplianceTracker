const Task = require("../models/Task");
const Client = require("../models/Client");
const mongoose = require("mongoose");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET /api/tasks/client/:clientId
const getTasksByClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { status, category } = req.query;

    if (!isValidObjectId(clientId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid client id" });
    }

    const filter = { client_id: clientId };
    if (status) filter.status = status;
    if (category) filter.category = category;

    const tasks = await Task.find(filter).sort({ due_date: 1 });
    res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/tasks
const createTask = async (req, res) => {
  try {
    const {
      client_id,
      title,
      description,
      category,
      due_date,
      status,
      priority,
    } = req.body;

    if (!client_id || !title || !category || !due_date) {
      return res.status(400).json({
        success: false,
        message: "client_id, title, category and due_date are required",
      });
    }

    if (!isValidObjectId(client_id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid client id" });
    }

    const clientExists = await Client.findById(client_id);
    if (!clientExists) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }

    const task = await Task.create({
      client_id,
      title,
      description,
      category,
      due_date,
      status,
      priority,
    });

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/tasks/:id/status
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid task id" });
    }

    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: "Status is required" });
    }

    const allowed = ["Pending", "In Progress", "Completed"];
    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${allowed.join(", ")}`,
      });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid task id" });
    }

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid task id" });
    }

    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/tasks/client/:clientId/stats
const getClientStats = async (req, res) => {
  try {
    const { clientId } = req.params;
    const now = new Date();

    if (!isValidObjectId(clientId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid client id" });
    }

    const [total, pending, inProgress, completed, overdue] = await Promise.all([
      Task.countDocuments({ client_id: clientId }),
      Task.countDocuments({ client_id: clientId, status: "Pending" }),
      Task.countDocuments({ client_id: clientId, status: "In Progress" }),
      Task.countDocuments({ client_id: clientId, status: "Completed" }),
      Task.countDocuments({
        client_id: clientId,
        status: { $ne: "Completed" },
        due_date: { $lt: now },
      }),
    ]);

    res.json({
      success: true,
      data: { total, pending, inProgress, completed, overdue },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getTasksByClient,
  createTask,
  updateTaskStatus,
  updateTask,
  deleteTask,
  getClientStats,
};
