export class PlayProgress {
	constructor(
		public level: number,
		public score: number,
		public time: number,
		public completed: boolean
	) {}
}

export class PlayCreate {
	constructor(
		public level: number,
		public score: number,
		public time: number,
		public completed: boolean
	) {}
}