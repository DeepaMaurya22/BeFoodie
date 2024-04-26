const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authorizationHeader.split(" ")[1]; // Extract the token

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Validate the token
    req.decoded = decoded; // Store decoded info on the request object
    next(); // Continue to the next middleware
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid or expired token" }); // Handle invalid token
  }
};

module.exports = verifyToken;
