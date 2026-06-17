const SERVER = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

export const API_URLS = {


	SERVER_URL: SERVER,
	BASE_URL: `${SERVER}/api`,
	
	// --- RUTAS DE ARCHIVOS ESTÁTICOS ---
	GAME_FILES: '/game-files',

	CLOSE_SESSION_BEACON: (sessionId: string | number) => `/game-sessions/${sessionId}/close-beacon`,

	// SUBJECT ROUTES
	GET_SUBJECTS: '/subjects',
	CREATE_SUBJECT: '/subjects',
	UPDATE_SUBJECT: (subjectId: number) => `/subjects/${subjectId}`,
	UPDATE_SUBJECT_OPEN: (subjectId: number) => `/subjects/${subjectId}/open`,
	UPDATE_SUBJECT_VISIBLE: (subjectId: number) =>
		`/subjects/${subjectId}/visible`,
	DELETE_SUBJECT: (subjectId: number) => `/subjects/${subjectId}`,
	IMPORT_SUBJECT_USERS: (subjectId: number) => `/subjects/${subjectId}/users/import`, 

	
	// GROUP ROUTES
	GET_SUBJECT_GROUPS: (subjectId: number) => `/subjects/${subjectId}/groups`,
	CREATE_GROUP: '/groups',
	DELETE_GROUP: (groupId: number) => `/groups/${groupId}`,

	// ASSIGNEMENTS ROUTES
	GET_GROUP_USERS: (groupId: number) => `/groups/${groupId}/users`,
	ASSIGN_USER_TO_GROUP: (groupId: number) => `/groups/${groupId}/users`,
	UNASSIGN_USER_FROM_GROUP: (groupId: number, userId: number) => `/groups/${groupId}/users/${userId}`,

	// USER-BASED ROUTES
	GET_USER_SUBJECTS: (userId: number) => `/users/${userId}/subjects`, 
	GET_TEACHER_SUBJECTS: (userId: number) => `/users/${userId}/subjects/teaching`, 

	// GAME ROUTES
	GET_LINKED_GAMES_BY_ID: (subjectId: number) => `/subjects/${subjectId}/games/linked`,
	GET_UNLINKED_GAMES_BY_ID: (subjectId: number) => `/subjects/${subjectId}/games/unlinked`,
	GET_GAMES: '/games',
	GET_GAME: (gameId: number) => `/games/${gameId}`,
	CREATE_GAME: '/games',
	UPDATE_GAME: (gameId: number) => `/games/${gameId}`,
	UPDATE_GAME_OPEN: (gameId: number) => `/games/${gameId}/open`,
	UPDATE_GAME_VISIBLE: (gameId: number) => `/games/${gameId}/visible`,
	DELETE_GAME: (gameId: number) => `/games/${gameId}`,

	//  RANKING ROUTES
	GET_SUBJECT_PLAYERS_RANKING: (subjectId: number) => `/subjects/${subjectId}/rankings/players`,
	GET_SUBJECT_GROUPS_RANKING: (subjectId: number) => `/subjects/${subjectId}/rankings/groups`,
	GET_GAME_PLAYERS_RANKING: (subjectId: number, gameId: number) => `/subjects/${subjectId}/games/${gameId}/rankings/players`,
	GET_GAME_GROUPS_RANKING: (subjectId: number, gameId: number) => `/subjects/${subjectId}/games/${gameId}/rankings/groups`,

	// USER ROUTES
	GET_USERS: '/users',
	LOGIN: '/users/login',
	GET_USER_SCORE: (userId: number) => `/users/${userId}`,
	CREATE_USER: '/users',
	UPDATE_USER: (userId: number) => `/users/${userId}`,
	DELETE_USER: (userId: number) => `/users/${userId}`,

	// THEME ROUTES
	GET_THEME: '/theme',
	CREATE_THEME: '/theme',

	// CONTENT ROUTES
	LINK_GAME_TO_SUBJECT: (subjectId: number, gameId: number) => `/subjects/${subjectId}/games/${gameId}`,
	UNLINK_GAME_FROM_SUBJECT: (subjectId: number, gameId: number) => `/subjects/${subjectId}/games/${gameId}`,
	UPDATE_RELATION_OPEN: (subjectId: number, gameId: number) => `/subjects/${subjectId}/games/${gameId}/open`,
	UPDATE_RELATION_VISIBLE: (subjectId: number, gameId: number) => `/subjects/${subjectId}/games/${gameId}/visible`,

	// SESSION ROUTES
    CREATE_SESSION: '/sessions',
    CLOSE_SESSION: (sessionId: number) => `/sessions/${sessionId}`,
    GET_SESSIONS: '/sessions',

	CREATE_GAME_SESSION: '/game-sessions',
    CLOSE_GAME_SESSION: (id: number) => `/game-sessions/${id}`,

	// GAME PROGRESS RELATED ROUTES
	GET_GAME_PROGRESS: (gameId: number) => `/games/${gameId}/plays/progress`,
	SAVE_PLAY: (gameSessionId: number) => `/game-sessions/${gameSessionId}/plays`,
};
