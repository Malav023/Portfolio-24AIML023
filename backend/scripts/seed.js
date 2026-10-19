// Inserts N dummy tasks so the DB query is heavy enough to show a cache benefit.
// Usage: npm run seed            (5000 tasks)
//        node scripts/seed.js 20000
//        node scripts/seed.js clear   (removes all tasks)
require("dotenv").config();
const mongoose = require("mongoose");
const Task = require("../models/Task");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const arg = process.argv[2];
  if (arg === "clear") {
    const r = await Task.deleteMany({});
    console.log(`Deleted ${r.deletedCount} tasks`);
  } else {
    const n = parseInt(arg, 10) || 5000;
    const docs = Array.from({ length: n }, (_, i) => ({
      title: `Sample task ${i + 1}`,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(3),
      completed: i % 3 === 0,
    }));
    await Task.insertMany(docs);
    console.log(`Inserted ${n} tasks`);
  }
  await mongoose.disconnect();
})();
