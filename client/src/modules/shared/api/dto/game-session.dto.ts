export interface GameSessionDTO {
    IDGameSession: number;
    IDSession: number;
    IDGame: number;
    GameStartTime: string;
    GameEndTime: string | null;
}

export interface GameSessionCreateResponseDTO {
    message: string;
    IDGameSession: number;
}