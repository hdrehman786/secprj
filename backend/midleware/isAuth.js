import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token; // Ensure cookies exist
    if (!token) {
      return res.status(400).json({
        message: "Unauthorized",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(400).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.id = decoded.id;
    next();
  } catch (err) {
    console.error("Authentication Error:", err); // Log the error for debugging
    return res.status(401).json({
      message: "Unauthorized person trying to add something",
      success: false,
    });
  }
};

export default isAuth;
