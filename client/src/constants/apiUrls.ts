export const API_URLS = {
  /* Estas son las rutas que se necesitan en un principio para obtener todos los datos que pide la plataforma.
     Todas las URL que aparecen puedes modificarlas y poner el nombre que quieras, al final, yo en el código utilizo el nombre
     de las constantes asi que en principio aunque cambie 1000 veces el nombre de las url, debería funcionar igual si devuelve los 
     mismos datos. Las url que están aqui las he puesto sin pensar mucho asi que cambia lo que quieras. */

  //----------BASE URL----------
  BASE_URL: 'http://localhost:5000/api',

  //----------LOGIN----------
  LOGIN: '/auth/login',

  //----------SUBJECTS----------
  /* Get all subjects (Method GET):
    "SELECT * FROM Mundos ORDER BY Posicion ASC"
  */
  GET_SUBJECTS: '/subjects',

  /* Create new subject (Method POST):
    "INSERT INTO Mundos (Nombre, UrlImgMundo, UrlImgDentro, Posicion, Abierto, Visible) VALUES (?, ?, ?, ?, ?, ?)"
  */
  CREATE_SUBJECT: '/subjects',

  /* Update subject (Method PUT):
    "UPDATE Mundos SET Nombre = ?, UrlImgMundo = ?, UrlImgDentro = ? WHERE IDMundo = ?"
  */
  UPDATE_SUBJECT: (subjectId: number) => `/subjects/${subjectId}`,

  /* Delete subject (Method DELETE):
    "DELETE FROM Mundos WHERE IDMundo = ?"
  */
  DELETE_SUBJECT: (subjectId: number) => `/subjects/${subjectId}`,

  /* Toggle subject open/closed state (Method PUT):
    "UPDATE Mundos SET Abierto = ? WHERE IDMundo = ?"
  */
  UPDATE_SUBJECT_OPEN: (subjectId: number) => `/subjects/${subjectId}/open`,

  /* Toggle subject visible/hidden state (Method PUT):
    "UPDATE Mundos SET Visible = ? WHERE IDMundo = ?"
  */
  UPDATE_SUBJECT_VISIBLE: (subjectId: number) =>
    `/subjects/${subjectId}/visible`,

  //----------GAMES----------
  /* Get all games by subject id (Method GET):
    "SELECT * FROM Minijuegos WHERE IDMundo = ? ORDER BY Posicion ASC"
  */
  GET_GAMES: (subjectId: number) => `/games/${subjectId}`,

  /*TODO: Get game by id (Method GET):
   "SELECT * FROM Minijuegos WHERE IDMinijuego = ?"
  */
  GET_GAME: (gameId: number) => `/games/${gameId}`,

  /* Update game state (Method PUT):
    "UPDATE Minijuegos SET Nombre = ?, PuntuacionMaxima = ?, IDMundo = ?, UrlImagen = ? WHERE IDMinijuego = ?"
  */
  UPDATE_GAME: (gameId: number) => `/games/${gameId}`,

  /* Delete game (Method DELETE):
    "DELETE FROM Minijuegos WHERE IDMinijuego = ?"
  */
  DELETE_GAME: (gameId: number) => `/games/${gameId}`,

  /* Update game open/closed state (Method PUT):
    "UPDATE Minijuegos SET Abierto = ? WHERE IDMinijuego = ?"
  */
  UPDATE_GAME_OPEN: (gameId: number) => `/games/${gameId}/open`,

  /* Update game visible/hidden state (Method PUT):
    "UPDATE Minijuegos SET Visible = ? WHERE IDMinijuego = ?"
  */
  UPDATE_GAME_VISIBLE: (gameId: number) => `/games/${gameId}/visible`,

  //----------RANKING----------
  /*
    - P_RANKING: General players ranking
    - G_RANKING: General groups ranking
    - PG-RANKING: Players by game ranking
    - GG_RANKING: Groups by game ranking
  */

  /* Get Players General ranking (Method GET):
    "SELECT u.Nombre, u.Grupo, SUM(un.Completado) AS TotalEstrellas, SUM(un.Puntuacion) AS TotalPuntos FROM usuarios u JOIN usuariominijuego un ON u.IDUsuario = un.IDUsuario WHERE u.TipoUsuario = 'U' GROUP BY u.IDUsuario, u.Nombre, u.Grupo ORDER BY TotalPuntos DESC"
  */
  GET_P_RANKING: '/ranking/p',

  /* Get Groups General ranking (Method GET):
    "SELECT u.Grupo, SUM(un.Completado) AS TotalEstrellas, SUM(un.Puntuacion) AS TotalPuntos FROM usuarios u JOIN usuariominijuego un ON u.IDUsuario = un.IDUsuario WHERE u.TipoUsuario = 'U'GROUP BY u.Grupo ORDER BY TotalPuntos DESC"
  */
  GET_G_RANKING: '/ranking/g',

  /* Get Players by game ranking (Method GET):
    "SELECT u.Nombre, u.Grupo, SUM(un.Completado) AS TotalEstrellas, SUM(un.Puntuacion) AS TotalPuntos FROM usuarios u JOIN usuariominijuego un ON u.IDUsuario = un.IDUsuario WHERE u.TipoUsuario = 'U' and un.IDMinijuego = ? GROUP BY un.IDMinijuego, u.IDUsuario, u.Nombre,u.Grupo ORDER BY TotalPuntos DESC"
  */
  GET_PG_RANKING: (gameId: number) => `/ranking/pg/${gameId}`,

  /* Get Groups by game ranking (Method GET):
    "SELECT u.Grupo, SUM(un.Completado) AS TotalEstrellas, SUM(un.Puntuacion) AS TotalPuntos FROM usuarios u JOIN usuariominijuego un ON u.IDUsuario = un.IDUsuario WHERE u.TipoUsuario = 'U' and un.IDMinijuego = ? GROUP BY u.Grupo ORDER BY TotalPuntos DESC"
  */
  GET_GG_RANKING: (gameId: number) => `/ranking/gg/${gameId}`,

  //----------USERS----------
  /* Get all users (Method GET):
    "SELECT IDUsuario, Nombre, TipoUsuario FROM Usuarios"
  */
  GET_USERS: '/users',

  /* Create new user (Method POST):
    "INSERT INTO Usuarios (Nombre, Contrasena, TipoUsuario, Grupo) VALUES (?, ?, ?, ?)"
  */
  CREATE_USER: '/users',

  /* Update user (Method PUT):
    "UPDATE Usuerios SET Nombre = ?, Contrasena = ?, TipoUsuario = ?, Grupo = ?"
  */
  UPDATE_USER: (userId: number) => `/users/${userId}`,

  /* Delete user (Method DELETE):
   "DELETE FROM Usuarios WHERE IDUsuario = ?"
  */
  DELETE_USER: (userId: number) => `/users/${userId}`,
};
