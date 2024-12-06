import { Juego } from "./Juego";
import { Jugador } from "./Jugador";

export abstract class Tragamoneda extends Juego {
    protected simbolos: string[] = []
    protected carretes: number;
    constructor(nombre: string, apustaMax: number, apuestaMin: number, carretes: number) {
        super(nombre, apustaMax, apuestaMin);
        this.carretes = carretes
    }

    //METODO ABSTRACTO
    public abstract girar(jugador: Jugador, apuesta:number): void

    //METODO QUE GENERA RESULTADO ALEATORIO
    public generarResultadoAleatorio(): string[] {
        const combinacion: string[] = [];
        for (let i = 0; i < this.carretes; i++) {
            const indiceAleatorio: number = Math.floor(Math.random() * this.simbolos.length)
            combinacion.push(this.simbolos[indiceAleatorio])
        }
        return combinacion
    }

}
