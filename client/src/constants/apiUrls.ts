export const API_URLS = {
	BASE_URL: 'http://localhost:5000/api',

	GET_SUBJECTS: '/subjects',
	CREATE_SUBJECT: '/subjects',
	UPDATE_SUBJECT: (subjectId: number) => `/subjects/${subjectId}`,
	UPDATE_SUBJECT_OPEN: (subjectId: number) => `/subjects/${subjectId}/open`,
	UPDATE_SUBJECT_VISIBLE: (subjectId: number) =>
		`/subjects/${subjectId}/visible`,
	DELETE_SUBJECT: (subjectId: number) => `/subjects/${subjectId}`,

	GET_LINKED_GAMES_BY_ID: (subjectId: number) => `/games/linked/${subjectId}`,
	GET_UNLINKED_GAMES_BY_ID: (subjectId: number) => `/games/unlinked/${subjectId}`,
	GET_GAMES: '/games',
	GET_GAME: (gameId: number) => `/games/${gameId}`,
	CREATE_GAME: '/games',
	UPDATE_GAME: (gameId: number) => `/games/${gameId}`,
	UPDATE_GAME_OPEN: (gameId: number) => `/games/${gameId}/open`,
	UPDATE_GAME_VISIBLE: (gameId: number) => `/games/${gameId}/visible`,
	DELETE_GAME: (gameId: number) => `/games/${gameId}`,

	GET_P_RANKING: '/ranking/p',
	GET_G_RANKING: '/ranking/g',
	GET_PG_RANKING: (gameId: number) => `/ranking/pg/${gameId}`,
	GET_GG_RANKING: (gameId: number) => `/ranking/gg/${gameId}`,

	GET_USERS: '/users',
	LOGIN: '/users/login',
	GET_USER_SCORE: (userId: number) => `/users/${userId}`,
	CREATE_USER: '/users',
	UPDATE_USER: (userId: number) => `/users/${userId}`,
	DELETE_USER: (userId: number) => `/users/${userId}`,

	GET_THEME: '/theme',
	CREATE_THEME: '/theme',


	LINK_GAME_TO_SUBJECT: '/content', 
    UNLINK_GAME_FROM_SUBJECT: (subjectId: number, gameId: number) => `/content/${subjectId}/${gameId}`,

	// SESSION ROUTES
    CREATE_SESSION: '/sessions',
    CLOSE_SESSION: (sessionId: number) => `/sessions/${sessionId}`,
    GET_SESSIONS: '/sessions',

	CREATE_GAME_SESSION: '/game-sessions',
    CLOSE_GAME_SESSION: (id: number) => `/game-sessions/${id}`,
};
