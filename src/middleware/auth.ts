import type {
  Request,
  Response,
  NextFunction,
} from "express";

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  next();
};