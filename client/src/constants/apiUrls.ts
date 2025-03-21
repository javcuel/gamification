export const API_URLS = {
  /**
   * En principio estos son los endpoints que se necesitan, si se me olvida alguno me lo comentas.
   * Los nombres de las URL que he puesto pueden cambiar y puedes poner los que quieras, al final como se usan los nombres de las
   * constantes en el código pues funcionará igual.
   * He añadido también en los comentarios información sobre cómo son las interfaces o los tipos que se esperan y que se envían,
   * esto también puede cambiar pero habría que definirlo bien.
   * Por ejemplo en el GET_SUBJECTS, cuando se hace un get subjects se piden todas las asignaturas de la BD, luego en el código se
   * listan y se mapean al tipo ISubject, entonces la base de datos debería devolver los campos que hay definidos en la interfaz
   *
   * Los nombres de los campos dentro de la BD pueden cambiar y no ser exactamente los mismos que los nombres de los campos de la interfaz,
   * por que como luego se mapea no hay problema.
   *
   * Cualquier cosa me comentas, hay muchas interfaces, sobre todo las que definen el tipo de los payloads a enviar, que posiblemente
   * me haya comido cosas.
   */

  //----------BASE URL----------
  BASE_URL: 'http://localhost:5000/api',

  //----------LOGIN----------
  /**
   * NOTA--
   * Aqui hay que mirar cosas, por que en el ejemplo que yo hice, esto no devuelve el usuario, lo que hace elbackend
   * en mi ejemplo es buscar el usuario con nombre y contraseña para comprobar que existe y luego devuelve un JWT token.
   *
   * Get user via username and passwd (Method GET)
   * "SELECT * FROM usuarios WHERE Nombre = ? AND Contrasena = ?",
   */
  LOGIN: '/auth/login',

  //----------SUBJECTS----------
  /**
   * Get all subjects (Method GET):
   * "SELECT * FROM Mundos ORDER BY Posicion ASC"
   *
   * Asks for:
   *
   * interface ISubject {
   * id: number;
   * name: string;
   * img: string;
   * imgBackground: string;
   * position: number;
   * isOpen: boolean;
   * isVisible: boolean;
   * }
   */
  GET_SUBJECTS: '/subjects',

  /**
   *  Create new subject (Method POST):
   * "INSERT INTO Mundos (Nombre, UrlImgMundo, UrlImgDentro, Posicion, Abierto, Visible) VALUES (?, ?, ?, ?, ?, ?)"
   *
   * Sends:
   *
   * interface SubjectApiPayload {
   * name: string;
   * img: string;
   * imgBackground: string;
   * }
   */
  CREATE_SUBJECT: '/subjects',

  /**
   * Update subject (Method PUT):
   * "UPDATE Mundos SET Nombre = ?, UrlImgMundo = ?, UrlImgDentro = ? WHERE IDMundo = ?"
   *
   * Sends:
   *
   * interface SubjectApiPayload {
   * id: number;
   * name: string;
   * img: string;
   * imgBackground: string;
   * }
   */
  UPDATE_SUBJECT: (subjectId: number) => `/subjects/${subjectId}`,

  /**
   * Toggle subject open/closed state (Method PUT):
   * "UPDATE Mundos SET Abierto = ? WHERE IDMundo = ?"
   *
   * Sends:
   *
   * interface SubjectApiOpenStatePayload {
   * subjectId: number;
   * isOpen: boolean;
   * }
   */
  UPDATE_SUBJECT_OPEN: (subjectId: number) => `/subjects/${subjectId}/open`,

  /**
   * Toggle subject visible/hidden state (Method PUT):
   * "UPDATE Mundos SET Visible = ? WHERE IDMundo = ?"
   *
   * Sends:
   *
   * interface SubjectApiVisibleStatePayload {
   * subjectId: number;
   * isVisible: boolean;
   * }
   */
  UPDATE_SUBJECT_VISIBLE: (subjectId: number) =>
    `/subjects/${subjectId}/visible`,

  /**
   *  Delete subject (Method DELETE):
   * "DELETE FROM Mundos WHERE IDMundo = ?"
   */
  DELETE_SUBJECT: (subjectId: number) => `/subjects/${subjectId}`,

  //----------GAMES----------
  /**
   * Get all games by subject id (Method GET):
   * "SELECT * FROM Minijuegos WHERE IDMundo = ? ORDER BY Posicion ASC"
   *
   * Asks for:
   *
   * interface IGame {
   * id: number;
   * idSubject: number;
   * img: string;
   * name: string;
   * maxScore: number;
   * isOpen: boolean;
   * isVisible: boolean;
   * position: number;
   * idUser: number;
   * isNew: boolean;
   * uploaded: boolean;
   * }
   */
  GET_GAMES: (subjectId: number) => `/games/${subjectId}`,

  /**
   * Get game by id (Method GET):
   * "SELECT * FROM Minijuegos WHERE IDMinijuego = ?"
   *
   * Asks for:
   *
   * interface IGame {
   * id: number;
   * idSubject: number;
   * img: string;
   * name: string;
   * maxScore: number;
   * isOpen: boolean;
   * isVisible: boolean;
   * position: number;
   * idUser: number;
   * isNew: boolean;
   * uploaded: boolean;
   * }
   */
  GET_GAME: (gameId: number) => `/games/${gameId}`,

  /**
   * Create new game (Method POST):
   * "INSERT INTO minijuegos (IDMundo, UrlImagen, Nombre, PuntuacionMaxima, Abierto, Visible, Posicion, IDUsuario, Nuevo, Subido) VALUES (?, ?, ?, ?, ?, ?)"
   *
   * Sends:
   *
   * interface GameApiPayload {
   * idSubject: number;
   * name: string;
   * img: string;
   * maxScore: number;
   * }
   */
  CREATE_GAME: '/games',

  /**
   * Update game state (Method PUT):
   * "UPDATE Minijuegos SET Nombre = ?, PuntuacionMaxima = ?, IDMundo = ?, UrlImagen = ? WHERE IDMinijuego = ?"
   *
   * Sends:
   *
   * interface GameApiPayload {
   * idSubject: number;
   * name: string;
   * img: string;
   * maxScore: number;
   * }
   */
  UPDATE_GAME: (gameId: number) => `/games/${gameId}`,

  /**
   * Update game open/closed state (Method PUT):
   * "UPDATE Minijuegos SET Abierto = ? WHERE IDMinijuego = ?"
   *
   * Sends:
   *
   * interface GameApiOpenStatePayload {
   * gameId: number;
   * isOpen: boolean;
   * }
   */
  UPDATE_GAME_OPEN: (gameId: number) => `/games/${gameId}/open`,

  /**
   * Update game visible/hidden state (Method PUT):
   * "UPDATE Minijuegos SET Visible = ? WHERE IDMinijuego = ?"
   *
   * Sends:
   *
   * interface GameApiVisibleStatePayload {
   * gameId: number;
   * isVisible: boolean;
   * }
   */
  UPDATE_GAME_VISIBLE: (gameId: number) => `/games/${gameId}/visible`,

  /**
   * Delete game (Method DELETE):
   * "DELETE FROM Minijuegos WHERE IDMinijuego = ?"
   */
  DELETE_GAME: (gameId: number) => `/games/${gameId}`,

  //----------RANKING----------
  /**
   * - P_RANKING: General players ranking
   * - G_RANKING: General groups ranking
   * - PG-RANKING: Players by game ranking
   * - GG_RANKING: Groups by game ranking
   */

  /**
   * Get Players General ranking (Method GET):
   * "SELECT u.Nombre, u.Grupo, SUM(un.Completado) AS TotalEstrellas, SUM(un.Puntuacion) AS TotalPuntos FROM usuarios u JOIN usuariominijuego un ON u.IDUsuario = un.IDUsuario WHERE u.TipoUsuario = 'U' GROUP BY u.IDUsuario, u.Nombre, u.Grupo ORDER BY TotalPuntos DESC"
   *
   * Asks for (Applies to all four Ranking calls):
   *
   * interface IRanking {
   * userName: string;
   * userGroup: string;
   * userCompletedSubjects: number;
   * userTotalScore: number;
   * }
   */
  GET_P_RANKING: '/ranking/p',

  /**
   * Get Groups General ranking (Method GET):
   * "SELECT u.Grupo, SUM(un.Completado) AS TotalEstrellas, SUM(un.Puntuacion) AS TotalPuntos FROM usuarios u JOIN usuariominijuego un ON u.IDUsuario = un.IDUsuario WHERE u.TipoUsuario = 'U'GROUP BY u.Grupo ORDER BY TotalPuntos DESC"
   */
  GET_G_RANKING: '/ranking/g',

  /**
   * Get Players by game ranking (Method GET):
   * "SELECT u.Nombre, u.Grupo, SUM(un.Completado) AS TotalEstrellas, SUM(un.Puntuacion) AS TotalPuntos FROM usuarios u JOIN usuariominijuego un ON u.IDUsuario = un.IDUsuario WHERE u.TipoUsuario = 'U' and un.IDMinijuego = ? GROUP BY un.IDMinijuego, u.IDUsuario, u.Nombre,u.Grupo ORDER BY TotalPuntos DESC"
   */
  GET_PG_RANKING: (gameId: number) => `/ranking/pg/${gameId}`,

  /**
   * Get Groups by game ranking (Method GET):
   * "SELECT u.Grupo, SUM(un.Completado) AS TotalEstrellas, SUM(un.Puntuacion) AS TotalPuntos FROM usuarios u JOIN usuariominijuego un ON u.IDUsuario = un.IDUsuario WHERE u.TipoUsuario = 'U' and un.IDMinijuego = ? GROUP BY u.Grupo ORDER BY TotalPuntos DESC"
   */
  GET_GG_RANKING: (gameId: number) => `/ranking/gg/${gameId}`,

  //----------USERS----------
  /**
   * const ROLES = {
   * PLAYER: 'U',
   * TEACHER: 'T',
   * GUEST: 'G',
   * DEV: 'D',
   * ADMIN: 'A',
   * };
   */

  /**
   * Get all users (Method GET):
   * "SELECT IDUsuario, Nombre, TipoUsuario FROM Usuarios"
   *
   * Asks for:
   *
   *
   * interface IUser {
   * id: number;
   * name: string;
   * type: (typeof ROLES)[keyof typeof ROLES];
   * totalScore: number;
   * completedSubjects: number;
   * }
   */
  GET_USERS: '/users',

  /**
   * Create new user (Method POST):
   * "INSERT INTO Usuarios (Nombre, Contrasena, TipoUsuario, Grupo) VALUES (?, ?, ?, ?)"
   *
   * Sends:
   *
   * interface UserApiPayload {
   * name: string;
   * passwd: string;
   * type: (typeof ROLES)[keyof typeof ROLES];
   * group: string;
   * }
   */
  CREATE_USER: '/users',

  /**
   * Update user (Method PUT):
   * "UPDATE Usuerios SET Nombre = ?, Contrasena = ?, TipoUsuario = ?, Grupo = ?"
   *
   * Sends:
   *
   * interface UserApiPayload {
   * name: string;
   * passwd: string;
   * type: (typeof ROLES)[keyof typeof ROLES];
   * group: string;
   */
  UPDATE_USER: (userId: number) => `/users/${userId}`,

  /**
   * Delete user (Method DELETE):
   * "DELETE FROM Usuarios WHERE IDUsuario = ?"
   */
  DELETE_USER: (userId: number) => `/users/${userId}`,

  //----------THEMES----------
  /**
   * Get theme (Method GET):
   * SELECT FROM...
   *
   * Asks for:
   *
   * interface ITheme {
   * id: number;
   * primary: string;
   * secondary: string;
   * text: string;
   * pointsIcon: string;
   * completedSubjectsIcon: string;
   * }
   */
  GET_THEME: '/theme',

  /**
   * Create theme (Method POST):
   * INSERT INTO...
   *
   * Sends:
   *
   * interface ThemeApiPayload {
   * primary: string;
   * secondary: string;
   * text: string;
   * pointsIcon: string;
   * completedSubjectsIcon: string;
   * }
   */
  CREATE_THEME: '/theme',
};
