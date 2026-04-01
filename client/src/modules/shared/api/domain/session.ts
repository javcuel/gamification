/**
 * Class representing a Session inside the App.
 */
export class Session {
    /**
     * @param {number} idSession - Unique identifier for the session
     * @param {Date} loginTime - Date and time of login
     * @param {Date} [logoutTime] - Date and time of logout (optional)
     */
    constructor(
        public idSession: number,
        public loginTime: Date,
        public logoutTime?: Date
    ) {}
}

