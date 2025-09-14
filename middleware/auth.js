const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  try {
    // extract token
    const authHeader = req.header("Authorization");
    const token = req.cookies.token ||
                  req.body.token ||
                  (authHeader && authHeader.startsWith("Bearer ")
                    ? authHeader.replace("Bearer ", "")
                    : null);

    // if token not present
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // verify token
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid: " + error.message,
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating token",
    });
  }
};
