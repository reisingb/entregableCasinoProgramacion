import { Tragamoneda } from "./Tragamoneda";
import rd from "readline-sync"
import pc from "picocolors";
import { Jugador } from "./Jugador";
import { IJuego } from "./IJuegos";

// MODULOS DE NODE 
import fs from "node:fs";

export class Analogico extends Tragamoneda implements IJuego {
    constructor() {
        super("Tragamonedas Clasico", 1, 100, 3)
        this.simbolos = [`${pc.red(pc.bold("7"))}`, "🔔", "☘️", "🍋", "🍒"]
    }

    //METODO PARA EMPEZAR A JUGAR
    public jugar(jugador: Jugador): void {

        console.log(`Apuesta minima: ${this.getApuestaMin()}. Apuesta maxima: ${this.getApuestaMax()}.`)
        let apuesta = jugador.apostar(this);

        let opcion: number;
        do {
            if (this.isSalirJuego()) return;
            console.log("1. Girar rodillos");
            opcion = rd.questionInt(pc.bold("Ingrese opcion: "))
        } while (opcion !== 1);

        this.girar(jugador, apuesta)
        this.mostrarMenuDespuesDeJuego(jugador)
    }

    //METODO QUE MUESTRA EL RESULTADO ALEATORIO Y LA GANANCIA
    public girar(jugador: Jugador, apuesta: number): void {
        console.log(`\n${pc.bold("Girando...")}\n`)
        let resultado: string[] = this.generarResultadoAleatorio()
        let mostrarResultado = "|"; //esto puede ser un metodo
        for (let i = 0; i < resultado.length; i++) {
            mostrarResultado += `${resultado[i]} |`;
        }
        console.log(mostrarResultado);
        const ganancia: number | null = this.calcularGanancia(apuesta, resultado)
        if (ganancia !== null && ganancia > 0) {
            console.log(`\nHa ganado: ${pc.yellow(pc.bold(ganancia))}\n${pc.yellow("¡Estas con suerte!")}`)
            jugador.aumentarSaldo(ganancia);
        } else {
            console.log(`${pc.cyan("\nNo has tenido suerte, pero puedes seguir intentando.")}`)
        }
        console.log(`Saldo actual: ${pc.yellow(pc.bold(jugador.getMontoCredito()))}`)
    }

    //METODO QUE CALCULA GANANCIA SEGUN LA APUESTA Y LA COMBINACION GANADORA
    calcularGanancia(apuesta: number, resultado: string[]): number {
        if (resultado) {
            if (resultado[0] === "7" && resultado[1] === "7" && resultado[2] === "7") {
                return apuesta * 100;
            } else if (resultado[0] === "🔔" && resultado[1] === "🔔" && resultado[2] === "🔔") {
                return apuesta * 30;
            } else if (resultado[0] === "☘️" && resultado[1] === "☘️" && resultado[2] === "☘️") {
                return apuesta * 15;
            } else if (resultado[0] === "🍋" && resultado[1] === "🍋" && resultado[2] === "🍋") {
                return apuesta * 5;
            } else if (resultado[0] === "🍒" && resultado[1] === "🍒" && resultado[2] === "🍒") {
                return apuesta * 4;
            } else if (
                (resultado[0] === "🔔" && resultado[1] === "☘️" && resultado[2] === "🍋") ||
                (resultado[0] === "🍋" && resultado[1] === "🔔" && resultado[2] === "☘️") ||
                (resultado[0] === "☘️" && resultado[1] === "🍋" && resultado[2] === "🔔")
            ) {
                return apuesta * 3;
            } else {
                let contadorCerezas = 0;
                for (let i = 0; i < resultado.length; i++) {
                    if (resultado[i] === "🍒") {
                        contadorCerezas++;
                    }
                }
                if (contadorCerezas === 2) {
                    return apuesta * 2;
                } else if (contadorCerezas === 1) {
                    return apuesta * 1;
                }
            }
            
        }
        return 0;
    }

    // ESCRIBIR EN TXT INSTRUCCIONES DEL JUEGO
    crearInstruccion(): void {
        let instrucciones = "Este Tragamonedas tiene 3 rodillos y una única línea de pago. Existen diferentes símbolos, y cada combinación ofrece un premio diferente.\n1. Ingresa la cantidad de dinero que deseas apostar.\n2. Cuando ingreses la opción 'Girar' los rodillos girarán y se detendrán de forma aleatoria.\n3. Si los símbolos se alinean en una combinación ganadora ganas un premio.\n4. Si ganas, puedes recoger el premio o seguir jugando.\nTabla de pago:\nTres SIETES - Apuesta x100\nTres CAMPANAS - Apuesta x30\nTres TRÉBOLES - Apuesta x15\nTres LIMONES - Apuesta x5\nTres CEREZAS - Apuesta x4\nCualquier combinación entre CAMPANA-TRÉBOL-LIMÓN - Apuesta x3\nDos CEREZAS en cualquier posición - Apuesta x2\nUna CEREZA - Apuesta x1"
        fs.writeFileSync('./src/instrucciones.txt', instrucciones);
    }

    // LEER INSTRUCCIONES
    mostrarInstrucciones(): void {
        this.crearInstruccion();
        const instrucciones = fs.readFileSync('./src/instrucciones.txt', { encoding: "utf8" });
        console.log(instrucciones);
    }
}