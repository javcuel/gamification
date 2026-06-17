export class PlayerRankingEntry {
	constructor(
		public name: string,
		public totalScore: number,
		public totalTime: number,
		public userId?: number,
		public position?: number
	) {}
}

export class GroupRankingEntry {
	constructor(
		public name: string,
		public totalScore: number,
		public totalTime: number,
		public groupId?: number,
		public position?: number
	) {}
}