export interface RankingDTO {
	Name?: string;
	Grupo?: string;
	TotalTime: number;  // Debe coincidir con el SQL
	TotalScore: number; // Debe coincidir con el SQL
}