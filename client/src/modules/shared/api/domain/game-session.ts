export class GameSession {
    constructor(
        public idGameSession: number,
        public idSession: number,
        public idGame: number,
        public startTime: Date,
        public endTime?: Date
    ) {}
}

export class GameSessionStart {
    constructor(
        public sessionId: number,
        public gameId: number,
        public subjectId: number
    ) {}
}