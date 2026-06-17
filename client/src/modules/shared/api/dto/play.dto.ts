export interface PlayProgressDTO {
	level: number;
	score: number;
	time: number;
	completed: number | boolean; // MySQL usually returns 1/0 for booleans, we cover it for safety
}

export interface PlayCreateDTO {
	level: number;
	score: number;
	time: number;
	completed: boolean;
}