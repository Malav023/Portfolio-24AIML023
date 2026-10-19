const express = require("express");
const Task = require("../models/Task");
const { cache, KEYS } = require("../config/cache");

const router = express.Router();

// Any write operation calls this so stale data is never served.
const invalidateCache = () => {
  cache.del(KEYS.ALL_TASKS);
};

// GET /tasks  -> cached
router.get("/", async (req, res) => {
  try {
    const cached = cache.get(KEYS.ALL_TASKS);
    if (cached) {
      res.set("X-Cache", "HIT");
      return res.json(cached);
    }
    const tasks = await Task.find().sort({ createdAt: -1 }).lean();
    cache.set(KEYS.ALL_TASKS, tasks); // uses default TTL (CACHE_TTL)
    res.set("X-Cache", "MISS");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /tasks/:id  -> not cached
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).lean();
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: "Invalid task id" });
  }
});

// POST /tasks
router.post("/", async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
    });
    invalidateCache();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /tasks/:id
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    invalidateCache();
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /tasks/:id
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    invalidateCache();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ message: "Invalid task id" });
  }
});

module.exports = router;
