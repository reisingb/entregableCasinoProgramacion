import { Tragamoneda } from "./Tragamoneda";
import rd from "readline-sync"
import pc from "picocolors";


export class Analogico extends Tragamoneda {

    calcularPagos(): number {
        throw new Error("Method not implemented.");
    }

    constructor() {
        super("Tragamonedas Clasico", 1, 100, 3)
        this.simbolos = ["7", "🔔", "☘️", "🍋", "🍒"]
    }

    iniciarJuego(): void {
        const apuesta = this.obtenerEntradaApuesta(`Apuesta minima: ${this.getApuestaMin()}. Apuesta maxima: ${this.getApuestaMax()}.\n Credito disponible: ${this.getMontoCredito()}\nIngrese cantidad de dinero que desea apostar: `);
        this.apostar(apuesta)
        let opcion: number;
        do {
            console.log("1. Girar rodillos");
            opcion = rd.questionInt(pc.bold("Ingrese opcion: "))
        } while (opcion !== 1);
        this.girar(apuesta)
        this.mostrarMenuDespuesDeJuego()
    }

    public girar(apuesta: number): void {
        console.log("Girando...")
            let resultado: string[] = this.generarResultadoAleatorio()
            let mostrarResultado = "|"; //esto puede ser un metodo
            for (let i = 0; i < resultado.length; i++) {
                mostrarResultado += `${resultado[i]} |`;
            }
            console.log(mostrarResultado);
            console.log("Ha ganado: " + this.calcularGanancia(resultado, apuesta))
    }

    calcularGanancia(resultado: string[], apuesta: number): number {
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
        return 0;
    }

    mostrarMenuDespuesDeJuego():void {
        let opcion: number;
    do {
        console.log("\n¿Que desea hacer ahora?");
        console.log("1. Seguir jugando");
        console.log("2. Retirar credito");
        opcion = rd.questionInt(pc.bold("Ingrese opcion: "));

        if (opcion === 1) {
            console.log(pc.blue("¡A seguir jugando!"));
            this.iniciarJuego();
        } else if (opcion === 2) {
            this.retirarTicket()
        } else {
            console.log(pc.red("Opcion invalida. Intente nuevamente."));
        }
    } while (opcion !== 1 && opcion !== 2);
    }

public retirarTicket(): void {
    this.setMontoCredito(0);
    console.log(pc.yellow("Retirando credito... ¡Gracias por jugar!"));
}

    }



// const analogico = new Analogico
// analogico.IniciarJuego()

// Consola:
// *Ingrese cantidad de dinero que desea apostar:

// *1. Girar rodillos
// *Ingrese una opcion:

// [tragamonedas.girar()
// girar tiene que tener un console log que diga girando…
// y luego de un segundo mostrar los simbolos aleatorios
// if gana console log ha ganado apuesta x n
// sino console log No ha salido ninguna combinacion ganadora]

//*1. Seguir jugando
// 2. Retirar ticket

// TABLA DE PAGO:
// Tres sietes (7-7-7) - Apuesta x100
// Tres CAMPANAS - Apuesta x30
// Tres TRÉBOLES - Apuesta x15
// Tres LIMONES - Apuesta x5
// Tres CEREZAS - Apuesta x2
// Cualquier combinación entre CAMPANA-TRÉBOL-LIMÓN - Apuesta x1
// Dos CEREZAS en cualquier posición - Apuesta x1
// Una CEREZA - Apuesta x0,5
