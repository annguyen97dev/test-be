import jwt from "jsonwebtoken";

const verifyTokenAdmin = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access token not found" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log("Decode: ", decoded);
    if (decoded.role !== 1 && decoded.role !== 2) {
      return res.status(401).json({ success: false, message: "No permission" });
    }

    req.telegramId = decoded.telegramId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

const verifyToken = (token) => {
  if (!token) {
    throw new Error("A token is required for authentication");
  }
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const decoded = verifyToken(token);
    req.user = decoded;
  } catch (error) {
    return res.status(403).json({ success: false, message: "Invalid token" });
  }

  return next();
};

export { verifyTokenAdmin, authenticate };
