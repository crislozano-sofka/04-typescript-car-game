import { AVAILABLE_CARS, AVAILABLE_KEYS, MAX_PLAYERS, MIN_PLAYERS } from "../constants"
import { GameState, Player } from "../types";
import { EventEmitter } from "./Events";

export class Game extends EventEmitter {

    private state: GameState = {
        players: [],
        finishedPlayers: [],
        isStarted: false,
        countdown: 10
    }

    private availableCars = [...AVAILABLE_CARS];
    private availableKeys = [...AVAILABLE_KEYS];

    getState(): GameState {
        return this.state;
    }

    addPlayer(nickname: string, carType: string): Player | undefined {
        if (this.isMaximumPlayers()) {
            alert("Ya no se pueden agregar más jugadores");
            return;
        }
        if (!this.availableCars.includes(carType)) {
            alert("Este carro ya ha sido seleccionado");
            return;
        }
        const indexRandom = Math.floor(Math.random() * this.availableKeys.length);
        const key = this.availableKeys[indexRandom];

        const newPlayer: Player = {
            id: this.state.players.length + 1,
            nickname,
            key,
            carType,
            position: 0
        }
        this.availableCars = this.availableCars.filter((car) => car != carType)
        this.availableKeys = this.availableKeys.filter(e => e != key)
        this.state.players.push(newPlayer);
        this.emit("playerAdd", newPlayer);
        return newPlayer;
    }

    canStartGame(): boolean {
        return this.state?.players.length >= MIN_PLAYERS;
    }

    isMaximumPlayers(): boolean {
        return this.state.players.length >= MAX_PLAYERS
    }


    startGame(): void {
        if (!this.canStartGame()) return;

        this.state.isStarted = true;
        this.emit("start");
        this.startCountDown();
    }

    private startCountDown(): void {
        const countInterval = setInterval(() => {
            this.state.countdown--;
            this.emit("countdown", this.state.countdown);
            if (this.state.countdown === 0) {
                clearInterval(countInterval);

            }
        }, 1000)
    }

    movePlayer(key: string): void {
        if (!this.state.isStarted || this.state.countdown > 0) return;

        const player = this.state.players.find(player => player.key === key);

        if (player && player.position < (100 - 10)) {
            player.position += 5;
            this.emit("move", player);
            this.checkWinners(player);
        }
    }

    private checkWinners(player: Player): void {
        const isFinishPlayer =  player.position >= (100 - 10);
        if(isFinishPlayer) this.state.finishedPlayers.push(player);


        const countPlayers = this.state.players.length;

        // Determinar cuántos jugadores deben terminar para declarar un ganador
        let requiredFinishers = 2;
        if (countPlayers === 2) {
            requiredFinishers = 2; // Para 2 jugadores, se necesita 1
        } else if (countPlayers >= 3) {
            requiredFinishers = 3; // Para 3 jugadores, se necesitan 2
        }

        if (this.state.finishedPlayers.length >= requiredFinishers) {
            this.emit("finish", this.state.finishedPlayers);
        }
    }
    getAvailableCars(): string[] {
        return [...this.availableCars];
    }


}