const { json } = require("express");
const User = require("../models/User");

const apiKeyAuth = async (req, res, next) => {
  const apiKey = req.header("X-api-key");
  if (!apiKey) return res.status(401).json({ message: "No api key provided" });

  const user = await User.findOne({ apiKey });
  if (!user) return res.status(403).json({ message: "Invalid api key" });

  if (user.credits <= 0) {
    return (
      res.status(403), json({ message: "Not enouph credits, get more now" })
    );
  }

  user.credits -= 10;
  await user.save();

  req.user = user;
  next();
};

module.exports = apiKeyAuth;
