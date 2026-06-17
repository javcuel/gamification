export interface SubjectDTO {
	IDSubject: number;
	Name: string;
	UrlImgSubject: string;
	UrlImgInside: string;
	Position: number;
	Open: number;
	Visible: number;
}

export interface SubjectUpdateOpenDTO {
	Open: number;
}

export interface SubjectUpdateVisibleDTO {
	Visible: number;
}