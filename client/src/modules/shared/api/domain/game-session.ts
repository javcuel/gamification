export class GameSession {
    constructor(
        public idGameSession: number,
        public idSession: number,
        public idGame: number,
        public startTime: Date,
        public endTime?: Date
    ) {}
}