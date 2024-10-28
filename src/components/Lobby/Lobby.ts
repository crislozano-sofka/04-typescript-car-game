import { Game } from "../../core/Game";
import "./styles/lobby.scss";

export class Lobby {
    private container: HTMLDivElement;
    private game: Game;

    constructor(container: HTMLDivElement, game: Game) {
        this.container = container;
        this.game = game;
        this.init();
    }

    private init(): void {
        this.game.on("playerAdd", () => this.render());
        this.render();
    }

    private render(): void {
        this.container.innerHTML = `
            <div class="lobby">
                <h1 class="lobby__title">Car Racing V.1</h1>
                <ul class="lobby__list">
                    ${this.renderPlayers()}
                </ul>
               ${this.renderButtons()}
            </div>
        `;
        this.attachListerners();
    }
    private renderPlayers(): string {
        const { players } = this.game.getState();
        return players.map(player => `
                <div class="lobby__player">
                    <div class="lobby__flex">
                        <figure class="lobby__figure">
                            <img src="/src/assets/images/${player.carType}.png" alt="Avatar de carro del jugador ${player.nickname}" />
                        </figure>
                        <h3>${player.nickname}</h3>
                    </div>
                    <p>Tecla de movimiento: ${player.key}</p>
                </div>
            `).join("");
    }

    private renderButtons(): string {
        return `
            <div class="lobby__buttons">
                <button id="btn-start" class="primary_button" ${!this.game.canStartGame() ? "disabled" : ""}>Start</button>
                <button id="btn-add" class="secondary_button" ${this.game.isMaximumPlayers() ? "disabled" : ""}>Add player</button>
                
            </div>
        `
    }

    private attachListerners(): void {
        const startBtn = document.querySelector("#btn-start");
        const addPlayerBtn = document.querySelector("#btn-add");

        startBtn?.addEventListener("click", () => this.game.startGame())
        addPlayerBtn?.addEventListener("click", () => this.addNewPlayer())
    }

    private async addNewPlayer(): Promise<void> {
        const nickname = await this.promptNickname();
        if (!nickname) return;

        const carType = await this.promptCarSelection();
        console.log(carType);

        if (!carType) return;

        this.game.addPlayer(nickname, carType);
    }

    private promptNickname(): Promise<string> {
        return new Promise(resolve => {
            const nickname = prompt("Enter your nickname");
            resolve(nickname || "");
        })
    }

    private promptCarSelection(): Promise<string> {
        const availableCars = this.game.getAvailableCars();
        return new Promise((resolve) => {
            const carSelection = prompt(`Select a name of car (${availableCars.join(", ")})`)
            if (carSelection && availableCars.includes(carSelection)) {
                resolve(carSelection)
            } else {
                resolve("")
            }
        })
    }


}