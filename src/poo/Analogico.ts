import { Tragamoneda } from "./Tragamoneda";
import rd from "readline-sync"
import pc from "picocolors";
import { Jugador } from "./Jugador";
import { ICalculoGanancia } from "./ICalculoGanancia";


export class Analogico extends Tragamoneda implements ICalculoGanancia{

    constructor() {
        super("Tragamonedas Analogico", 1, 100, 3)
        this.simbolos = ["7", "🔔", "☘️", "🍋", "🍒"]
    }

    public jugar(jugador: Jugador): void {
        
        console.log(`Apuesta minima: ${this.getApuestaMin()}. Apuesta maxima: ${this.getApuestaMax()}.`)
        let apuesta = jugador.apostar(this);

        let opcion: number;
        do {
            if(this.isSalirJuego()) return;
            console.log("1. Girar rodillos");
            opcion = rd.questionInt(pc.bold("Ingrese opcion: "))
        } while (opcion !== 1);

        this.girar(jugador, apuesta)
        this.mostrarMenuDespuesDeJuego(jugador)
    }

    public girar(jugador: Jugador, apuesta: number): void {
        console.log("Girando...")
        let resultado: string[] = this.generarResultadoAleatorio()
        let mostrarResultado = "|"; //esto puede ser un metodo
        for (let i = 0; i < resultado.length; i++) {
            mostrarResultado += `${resultado[i]} |`;
        }
        console.log(mostrarResultado);
        const ganancia: number | null = this.calcularGanancia(apuesta,resultado)
        console.log("Ha ganado: " + ganancia)
        if (ganancia !== null && ganancia > 0) {
            jugador.aumentarSaldo(ganancia);
        }
    }

    calcularGanancia( apuesta: number,resultado: string[]): number | null{
        if(resultado){
        if (resultado[0] === "7" && resultado[1] === "7" && resultado[2] === "7") {
            return apuesta * 100;
        } else if (resultado[0] === "🔔" && resultado[1] === "🔔" && resultado[2] === "🔔") {
            return apuesta * 30;
        } else if (resultado[0] === "☘️" && resultado[1] === "☘️" && resultado[2] === "☘️") {
            return apuesta * 15;
        } else if (resultado[0] === "🍋" && resultado[1] === "🍋" && resultado[2] === "🍋") {
            return apuesta * 5;
        } else if (resultado[0] === "🍒" && resultado[1] === "🍒" && resultado[2] === "🍒") {
            return apuesta * 2;
        } else if (
            (resultado[0] === "🔔" && resultado[1] === "☘️" && resultado[2] === "🍋") ||
            (resultado[0] === "🍋" && resultado[1] === "🔔" && resultado[2] === "☘️") ||
            (resultado[0] === "☘️" && resultado[1] === "🍋" && resultado[2] === "🔔")
        ) {
            return apuesta * 1;
        } else {
            let contadorCerezas = 0;
            for (let i = 0; i < resultado.length; i++) {
                if (resultado[i] === "🍒") {
                    contadorCerezas++;
                }
            }
            if (contadorCerezas === 2) {
                return apuesta * 1;
            } else if (contadorCerezas === 1) {
                return apuesta * 0.5;
            }
        }
        return 0;}
        return null
    }
}