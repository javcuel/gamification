export class Ranking {
	constructor(
		public userName: string,
		public userGroup: string,
		public userTotalTime: number, // Cambiado
		public userTotalScore: number
	) {}
}