import { Game } from "../../core/Game";
import { Player } from "../../types";
import "./styles/race.scss";

export class Race {
    private container: HTMLDivElement;
    private game: Game;

    constructor(container: HTMLDivElement, game: Game) {
        this.container = container;
        this.game = game;
        this.init();
    }

    private init(): void {
        this.game.on("move", (player) => this.updatePosition(player));
        this.game.on("countdown", (count: number) => this.updateCountDown(count))
        this.render();
        this.setUpControls();
    }

    private render(): void {
        this.container.innerHTML = `
            <div class="race">
                <div class="race__countdown">
                    ${this.game.getState().countdown}
                </div>
                <div class="race__track">
                    ${this.renderRaceLanes()}
                </div>
            </div>
        `
    }

    private renderRaceLanes(): string {
        return this.game.getState().players.map(player => `
            <div class="race__lane" data-player="${player.id}">
                <figure class="race__car" style:"${player.position}%">
                    <img src="/src/assets/images/${player.carType}.png" alt="Avatar de carro del jugador ${player.nickname}" />
                </figure>
            </div>
            `).join("")
    }

    private updatePosition(player: Player): void {
        console.log("player ");
        console.log(player);
        const carElement = this.container.querySelector(`.race__lane[data-player="${player.id}"] .race__car`) as HTMLElement;
        if (carElement) {
            carElement.style.left = `${player.position}%`
        }

    }
    private updateCountDown(count: number): void {
        console.log(count);
        
        const countdownElement = this.container.querySelector(".race__countdown");

        if (countdownElement) {
            countdownElement.textContent = count.toString();
        }
        if(count === 0) {
            console.log("Es cero");
            console.log(countdownElement);
            
            countdownElement!.classList.add("race__countdown--hide")
        }
    }

    private setUpControls(): void {
        document.addEventListener("keyup", (e) => {
            this.game.movePlayer(e.key);
        })
    }
} 