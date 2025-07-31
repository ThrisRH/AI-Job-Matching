const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth.routes");
const jobRoutes = require("./routes/job.routes");
app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);

// export app
module.exports = app;
