/**
 * Class representing a Session inside the App.
 */
export class Session {
    constructor(
        public idSession: number,
        public idUser: number,   
        public loginTime: Date,
        public logoutTime?: Date
    ) {}
}

