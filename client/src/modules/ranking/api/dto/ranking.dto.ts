export interface PlayerRankingDTO {
	Name: string;
	TotalScore: number | string; 
	TotalTime: number | string;
	IDUser?: number;
}

export interface GroupRankingDTO {
	Group: string; 
	TotalScore: number | string;
	TotalTime: number | string;
	IDGroup?: number;
}