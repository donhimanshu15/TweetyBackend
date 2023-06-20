import jwt from "jsonwebtoken";
import { handleError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(req, "hello");
  console.log(token, "1");
  if (!token) {
    console.log(token, "2");
    return next(handleError(401, "You are not authenticated"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      console.log("3");
      return next(createError(403, "Token is invalid"));
    }
    req.user = user;
    console.log("4");
    next();
  });
};
