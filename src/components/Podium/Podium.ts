import { Player } from "../../types";
import "./styles/podium.scss";

export class Podium {
    private container: HTMLDivElement;
    private winners: Player[]

    constructor(container: HTMLDivElement,winners: Player[]){
        this.container = container;
        this.winners = winners;
        this.render();
    }

    private render ():void {
        this.container.innerHTML = `
            <div class="podium">
                <h2 class="podium__title">Winners!!!</h2>
                ${this.winners.slice(0, 3).map((player, index) =>`
                    <article class="podium__card podium__card--${index}">
                        <figure class="podium__figure">
                              <img src="/src/assets/images/${player.carType}.png" alt="Avatar de carro del jugador ${player.nickname}" />
                        </figure>
                        <h3 class="podium__player">${player.nickname}</h3>
                    </article>

                    `).join("")}
                     <img src="/src/assets/images/podium.png" alt="imagen de un podio dorado, con las tres primeras posiciones" class="podium__image" />
                
            </div>
        `
    }
}