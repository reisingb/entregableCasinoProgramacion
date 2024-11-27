import { Casino } from "./Casino";
import { Juego } from "./Juego";
import readlineSync from "readline-sync";

// SUPER CLASE
export abstract class Tragamoneda extends Juego {
    protected simbolos: string[] = []
    protected carretes: number;
    constructor(nombre: string, apustaMax: number, apuestaMin: number, carretes: number) {
        super(nombre, apustaMax, apuestaMin);
        this.carretes = carretes
    }
    //HACER EL METODO CALCULARGANANCIA() EN LOS DOS JUEGOS (tabla de pagos) 3
    iniciarJuego(): void {
        this.obtenerEntradaApuesta();
        console.log("1. Girar rodillos");
        let opcion:number;
        do{
            console.log("1. Girar rodillos");
            opcion= this.obtenerEntradaNum();
        }while(opcion !== 1);

        if(opcion === 1){
            this.girar()
        }else{
            console.log("Intente Nuevamente");
        }
    }

    public girar(): void {
        console.log("Girando...")
        setTimeout(() => {
            this.generarResultadoAleatorio()
        }, 1000);
        this.calcularGanancia()
    }

    public generarResultadoAleatorio(): string[] {
        const combinacion = [];
        for (let i = 0; i < this.carretes; i++) {
            const indiceAleatorio = Math.floor(Math.random() * this.simbolos.length)
            combinacion.push(this.simbolos[indiceAleatorio])
        }
        return combinacion
    }

}


// Consola:
// *Ingrese cantidad de dinero que desea apostar:

// *1. Girar rodillos
// *Ingrese una opcion:

// [tragamonedas.girar()
// girar tiene que tener un console log que diga girando…
// y luego de un segundo mostrar los simbolos aleatorios
// if gana console log ha ganado apuesta x n
// sino console log No ha salido ninguna combinacion ganadora]

// *1. Seguir apostando
// 2. Retirar ticket 