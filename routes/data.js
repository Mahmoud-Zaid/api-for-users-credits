const express = require("express");
const router = express.Router();
const apiKeyAuth = require("../middleware/auth");

router.get("/data", apiKeyAuth, (req, res) => {
  res.json({ message: "Welcome to the protected API", user: req.user.name });
});

router.get("/usage", apiKeyAuth, (req, res) => {
  res.json({ message: "API usage details", user: req.user.credits });
});

module.exports = router;
