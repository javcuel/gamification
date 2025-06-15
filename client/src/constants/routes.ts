/**
 * ROUTES constant
 *
 * Centralised definition of application route paths.
 * This object provides both static route strings and dynamic route-generating functions.
 * Helps to maintain consistent path references throughout the app and avoid hardcoding paths.
 */
export const ROUTES = {
	LOGIN: '/',
	HOME: '/Home',
	RANKING: '/Ranking',
	ADMIN_PANEL: '/AdminPanel',
	DEV_PANEL: '/DevPanel',
	PLAY: (gameId: string | number) => `/Play/${gameId}`,
	GAME_SELECTOR: (subjectId: string | number) => `/GameSelector/${subjectId}`
};
