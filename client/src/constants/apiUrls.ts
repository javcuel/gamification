export const API_URLS = {
  // Base URL
  BASE_URL: 'http://localhost:5000/api',

  // Login
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',

  // Subjects
  GET_SUBJECTS: '/subjects',
  UPDATE_SUBJECT_OPEN: (subjectId: string | number) =>
    `/subjects/${subjectId}/open`,
  UPDATE_SUBJECT_VISIBLE: (subjectId: string | number) =>
    `/subjects/${subjectId}/visible`,

  // Games
  GET_GAMES: (subjectId: string | number) => `/games/${subjectId}`,
  UPDATE_GAME_OPEN: (gameId: string | number) => `/games/${gameId}/open`,
  UPDATE_GAMET_VISIBLE: (gameId: string | number) => `/games/${gameId}/visible`,

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
};
