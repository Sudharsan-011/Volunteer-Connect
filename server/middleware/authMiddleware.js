import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract token from Authorization header

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    // Verify the token using JWT secret and extract organization data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the organizationId specifically to req.organization for consistent access
    req.organization = {
      organizationId: decoded.organizationId,
      name: decoded.name,
    }; // Assuming decoded includes organizationId and name

    next(); // Call next middleware or route handler
  } catch (error) {
    console.error("Token verification failed", error);
    return res.status(400).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
