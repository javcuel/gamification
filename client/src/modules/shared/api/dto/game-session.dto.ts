export interface GameSessionDTO {
    IDGameSession: number;
    IDSession: number;
    IDGame: number;
    GameStartTime: string;
    GameEndTime: string | null;
}

export interface GameSessionStartDTO {
    IDSession: number;
    IDGame: number;
    IDSubject: number;
}

export interface GameSessionCreateResponseDTO {
    message?: string;
    IDGameSession: number;
}