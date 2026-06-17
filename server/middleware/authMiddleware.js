import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  // Get JWT
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied, token not included" });

  /* If the token is valid, the user data is extracted from the verified token.
  * We store the user data in the request.
  * `req.user` contains the stored token data and will have a form similar to this:
  * `req.user.userId`: The user's ID (i.e., IDUser).
  * `req.user.userName`: The user's name (i.e., Name).
  * `req.user.userType`: The user type (i.e., UserType).
  * `req.user.iat`: The timestamp of when the token was issued.
  * `req.user.exp`: The timestamp of when the token expires.
  */

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });

    req.user = user;
    next();
  });
};

export default authenticateToken;
