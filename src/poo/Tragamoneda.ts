import { Juego } from "./Juego";
import { Jugador } from "./Jugador";

// SUPER CLASE
export abstract class Tragamoneda extends Juego {
    protected simbolos: string[] = []
    protected carretes: number;
    constructor(nombre: string, apustaMax: number, apuestaMin: number, carretes: number) {
        super(nombre, apustaMax, apuestaMin);
        this.carretes = carretes
    }
    //HACER EL METODO CALCULARGANANCIA() EN LOS DOS JUEGOS (tabla de pagos) 3

    public abstract girar(jugador: Jugador, apuesta:number): void

    public generarResultadoAleatorio(): string[] {
        const combinacion: string[] = [];
        for (let i = 0; i < this.carretes; i++) {
            const indiceAleatorio: number = Math.floor(Math.random() * this.simbolos.length)
            combinacion.push(this.simbolos[indiceAleatorio])
        }
        return combinacion
    }

}