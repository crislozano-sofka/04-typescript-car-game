export interface Player {
    id: number;
    nickname: string;
    carType: string;
    key: string;
    position: number;
}

export interface GameState{
    players: Player[];
    finishedPlayers: Player[],
    isStarted: boolean;
    countdown: number;
}