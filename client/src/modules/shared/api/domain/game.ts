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

export class GameCreate {
	constructor(
		public name: string,
		public img: string,
		public gameFile: File | null = null, 
		public imageFile: File | null = null
	) {}
}

export class GameUpdate {
	constructor(
		public name: string,
		public img: string,
		public gameFile: File | null = null,
		public imageFile: File | null = null
	) {}
}