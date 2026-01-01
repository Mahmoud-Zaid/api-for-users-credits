require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const dataRoutes = require("./routes/data");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api", dataRoutes);

const PORT = process.env.PORT || 3030;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo is connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Welcome to my api"));

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
