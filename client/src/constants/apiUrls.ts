export const API_URLS = {
  // Base URL
  BASE_URL: 'http://localhost:5000/api',

  // Login
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',

  // Subjects
  //TODO: MIRAR LA RUTA DE /DELETE, IGUAL ES MEJOR DEJARLO COMO EN USER DELETE
  GET_SUBJECTS: '/subjects',
  CREATE_SUBJECT: '/subjects/add',
  UPDATE_SUBJECT_OPEN: (subjectId: string | number) =>
    `/subjects/${subjectId}/open`,
  UPDATE_SUBJECT_VISIBLE: (subjectId: string | number) =>
    `/subjects/${subjectId}/visible`,
  DELETE_SUBJECT: (subjectId: string | number) =>
    `/subjects/${subjectId}/delete`,

  // Games
  GET_GAMES: (subjectId: string | number) => `/games/${subjectId}`,
  UPDATE_GAME_OPEN: (gameId: string | number) => `/games/${gameId}/open`,
  UPDATE_GAME_VISIBLE: (gameId: string | number) => `/games/${gameId}/visible`,

  // Ranking
  GET_P_RANKING: '/ranking/jg',
  GET_G_RANKING: '/ranking/gg',
  GET_PG_RANKING: (gameId: string | number) => `/ranking/jj/${gameId}`,
  GET_GG_RANKING: (gameId: string | number) => `/ranking/gj/${gameId}`,

  // Users
  GET_USERS: '/users',
  CREATE_USER: '/users/add',
  UPDATE_USER: (userId: string | number) => `/users/${userId}`,
  DELETE_USER: (userId: string | number) => `/users/${userId}`,

  // Games index??
};
