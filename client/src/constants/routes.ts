export const ROUTES = {
  HOME: '/Home',
  LOGIN: '/Login',
  RANKING: '/Ranking',
  ADMIN_PANEL: '/AdminPanel',
  DEV_PANEL: '/DevPanel',
  PLAY: (gameId: string | number) => `/Play/${gameId}`,
  GAME_SELECTOR: (subjectId: string | number) => `/GameSelector/${subjectId}`,
};
