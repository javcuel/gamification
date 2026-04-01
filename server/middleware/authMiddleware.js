import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  // Get JWT
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Acceso denegado, token no proporcionado" });

  /* Si el token es válido se extraen los datos de usuario del token verificado
   * Guardamos los datos del usuario en la request

   * req.user tiene los datos almacenados del token, tendrá una forma aprecida a esto:
   * req.user.userId: El ID del usuario (es decir, IDUser).
   * req.user.userName: El nombre del usuario (es decir, Nombre).
   * req.user.userType: El tipo de usuario (es decir, TipoUsuario).
   * req.user.iat: El timestamp de cuándo se emitió el token.
   * req.user.exp: El timestamp de cuándo expira el token.
   */

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token no válido" });

    req.user = user;
    next();
  });
};

export default authenticateToken;
