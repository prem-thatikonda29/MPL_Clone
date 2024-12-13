import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../constants.js";

export default function verifyToken(req, res, next) {
  // extracting the headers from the headers
  const auth = req.headers.authorization;

  //   checking if the token is provided
  if (!auth || auth === undefined) {
    return res.status(403).send("No token provided");
  }

  //   checking if the token starts with Bearer
  if (auth.split(" ")[0] !== "Bearer") {
    console.log(token);
    return res.status(401).send("Invalid token format");
  }

  //   exracting the token from the headers
  const token = auth.split(" ")[1];
  // console.log(token);

  //   verifying if the token is valid
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    // if the token is valid, control is sent back to the endpoint
    if (!err) {
      next();
    } else {
      res.status(403).send("Invalid or expired token");
    }
  });
}
