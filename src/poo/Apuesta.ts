import { Juego } from "./Juego";

export class Apuesta {
    private juego:Juego
    
    constructor(juego:Juego){
        this.juego = juego;
    }

    public getJuego(): Juego {
        return this.juego;
    }

    public setJuego(juego: Juego): void {
        this.juego = juego;
    }
    
    validarApuesta():boolean{
        return true
    }
}