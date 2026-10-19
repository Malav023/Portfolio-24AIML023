require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors({ exposedHeaders: ["X-Cache", "X-Response-Time"] }));
app.use(express.json());

// Adds an X-Response-Time header (ms) so timings are visible in Postman / Thunder Client.
app.use((req, res, next) => {
  const start = process.hrtime.bigint();
  const originalWriteHead = res.writeHead;
  res.writeHead = function (...args) {
    const ms = Number(process.hrtime.bigint() - start) / 1e6;
    res.setHeader("X-Response-Time", ms.toFixed(2) + "ms");
    return originalWriteHead.apply(this, args);
  };
  next();
});

app.use("/tasks", require("./routes/tasks"));

app.get("/", (req, res) => res.json({ status: "Task Manager API running" }));

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
