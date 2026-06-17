export interface GameDTO {
	IDGame: number;
	UrlImage: string;
	Name: string;
	Open: number;
	Visible: number;
	AdminOpen?: number;
	AdminVisible?: number;
	TeacherOpen?: number;
	TeacherVisible?: number;
}

export interface GameCreateDTO {
	Name: string;
	UrlImage: string;
}

export interface GameUpdateDTO {
	Name: string;
	UrlImage: string;
}

export interface GameUpdateOpenDTO {
	Open: number;
}

export interface GameUpdateVisibleDTO {
	Visible: number;
}