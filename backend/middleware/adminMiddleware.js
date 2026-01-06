const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || user.isAdmin !== false) {
      return res.status(403).json({
        message: "Admin access denied",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Admin check failed",
    });
  }
};

module.exports = adminMiddleware;



