import { Lobby } from "./components/Lobby/Lobby";
import { Podium } from "./components/Podium/Podium";
import { Race } from "./components/Race/Race";
import { Game } from "./core/Game";
import "./styles/index.scss";

class App {

  private container: HTMLDivElement;
  private game: Game;

  constructor(){
    this.container = document.querySelector("#app")!;
    this.game = new Game();
    this.init();
  }

  private init(): void{
    console.log(this.game);
    
    new Lobby(this.container, this.game);

    this.game.on("start", ()=> {
      new Race(this.container, this.game);
    })

    this.game.on("finish", (winners)=> {
      new Podium(this.container, winners)
    } )
  }
}

new App()