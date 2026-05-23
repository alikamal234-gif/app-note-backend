import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    // 1. Get token from cookies or Authorization header
    let token = req.cookies?.token;
    
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Non autorisé, aucun token",
      });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Attach user to request
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Non autorisé, token invalide",
    });
  }
};
