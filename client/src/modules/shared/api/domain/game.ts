/**
 * Class representing a Game inside the App.
 *
 * @class
 */
export class Game {
    constructor(
        public id: number,
        public img: string,
        public name: string,
        public isOpen: boolean,
        public isVisible: boolean,
        public adminIsOpen?: boolean,
        public adminIsVisible?: boolean,
        public teacherIsOpen?: boolean,
        public teacherIsVisible?: boolean
    ) {}
}

/**
 * Class representing a Game creation payload inside the App.
 *
 * @class
 */
export class GameCreate {
	/**
	 * Creates a new GameCreate instance.
	 *
	 * @param {string} name - Game name
	 * @param {string} img - Game image URL (can be empty if uploading file)
	 * @param {File | null} gameFile - The .zip file containing the game
	 * @param {File | null} imageFile - The optional physical image file
	 */
	constructor(
		public name: string,
		public img: string,
		public gameFile: File | null = null,
		public imageFile: File | null = null
	) {}
}

/**
 * Class representing a Game update payload inside the App.
 *
 * @class
 */
export class GameUpdate {
	/**
	 * Creates a new GameUpdate instance.
	 *
	 * @param {string} name - Game name
	 * @param {string} img - Game image URL (can be empty if uploading file)
	 * @param {File | null} gameFile - Optional new .zip file
	 * @param {File | null} imageFile - Optional physical image file
	 */
	constructor(
		public name: string,
		public img: string,
		public gameFile: File | null = null,
		public imageFile: File | null = null
	) {}
}
