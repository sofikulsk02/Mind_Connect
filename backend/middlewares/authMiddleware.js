const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("🛡️ Entered auth middleware...");
  const authHeader = req.headers.authorization;
  console.log("🧾 Authorization Header:", authHeader);
  // Check if header exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ No valid token format");
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  console.log("🔑 Token extracted:", token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔐 Token decoded:", decoded); // Add this line
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    console.error("❌ Invalid token:", err.message); // Add this too
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
