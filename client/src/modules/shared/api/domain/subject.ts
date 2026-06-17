/**
 * Class representing a Subject inside the App.
 */
export class Subject {
	constructor(
		public id: number,
		public name: string,
		public img: string,
		public imgBackground: string,
		public position: number,
		public isOpen: boolean,
		public isVisible: boolean
	) {}
}

export class SubjectCreate {
	constructor(
		public name: string,
		public img: string,
		public imgBackground: string,
		public imageFile: File | null = null,
		public bgImageFile: File | null = null
	) {}
}

export class SubjectUpdate {
	constructor(
		public name: string,
		public img: string,
		public imgBackground: string,
		public imageFile: File | null = null,
		public bgImageFile: File | null = null
	) {}
}