import { Tragamoneda } from "./Tragamoneda";
import { Jugador } from "./Jugador";
import rd from "readline-sync";
import pc from "picocolors";
import { IJuego } from "./IJuegos";
import fs from "node:fs";
import { resolve } from "node:path";
export class Digital extends Tragamoneda implements IJuego {
    private girosGratisDisponibles: boolean; // Propiedad para controlar si las tiradas bono están disponibles

    constructor() {
        super("Tragamonedas Digital", 1, 500, 6);
        this.simbolos = ["⭐", "🔴", "💎", "🍒", "🌙", "👑", "⭐", "💎", "🌙"]; // Nuevos símbolos
        this.girosGratisDisponibles = false; // Inicializamos en false
    }

    public iniciarJuego(jugador: Jugador): void {
        console.log(pc.bold(`${pc.yellow(`Has iniciado el juego ${pc.magenta(this.getNombre())}`)}\nCredito: ${pc.yellow(jugador.getMontoCredito())}`));
        this.menuJuego(jugador);
    }

    public jugar(jugador: Jugador): void {
        console.log(`Apuesta mínima: ${this.getApuestaMin()}. Apuesta máxima: ${this.getApuestaMax()}.`);
        let apuesta = jugador.apostar(this);

        // Probabilidad de 40% para las tiradas bono
        this.girosGratisDisponibles = Math.random() <= 0.40;

        let opcion: number;
        do {
            if (this.isSalirJuego()) return;
            console.log("1. Girar rodillos");
            if (this.girosGratisDisponibles) {
                console.log("2. Giros gratis");
            }
            opcion = rd.questionInt(pc.bold("Ingrese opción: "));
        } while (opcion !== 1 && opcion !== 2);

        if (opcion === 1) {
            this.girar(jugador, apuesta);
        } else if (opcion === 2) {
            if (this.girosGratisDisponibles) {
                this.girosGratis(jugador);
            } else {
                console.log("¡Los giros gratuitos no están disponibles!");
            }
        }

        this.mostrarMenuDespuesDeJuego(jugador);
    }

    public girar(jugador: Jugador, apuesta: number): void {
        console.log(`\n${pc.bold("Girando...")}\n`)
        let resultado: string[] = this.generarResultadoAleatorio()
        let mostrarResultado = "|";
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

    calcularGanancia(apuesta: number, resultado: string[]): number | null {
        if (resultado) {
            if (resultado[0] === "👑" && resultado[1] === "👑" && resultado[2] === "👑" && resultado[3] === "👑" && resultado[4] === "👑" && resultado[5] === "👑") {
                return apuesta * 100;
            } else if (resultado[0] === "🔴" && resultado[1] === "🔴" && resultado[2] === "🔴" && resultado[3] === "🔴" && resultado[4] === "🔴" && resultado[5] === "🔴") {
                return apuesta * 30;
            } else if (resultado[0] === "💎" && resultado[1] === "💎" && resultado[2] === "💎" && resultado[3] === "💎" && resultado[4] === "💎" && resultado[5] === "💎") {
                return apuesta * 50;
            } else if (resultado[0] === "🌙" && resultado[1] === "🌙" && resultado[2] === "🌙" && resultado[3] === "🌙" && resultado[4] === "🌙" && resultado[5] === "🌙") {
                return apuesta * 10;
            } else if (resultado[0] === "🍒" && resultado[1] === "🍒" && resultado[2] === "🍒" && resultado[3] === "🍒" && resultado[4] === "🍒" && resultado[5] === "🍒") {
                return apuesta * 5;
            } else if (resultado[0] === "⭐" && resultado[1] === "⭐" && resultado[2] === "⭐" && resultado[3] === "⭐" && resultado[4] === "⭐" && resultado[5] === "⭐") {
                return apuesta * 20;
            } else if (resultado[0] === "💎" && resultado[1] === "👑" && resultado[2] === "💎" && resultado[3] === "👑" && resultado[4] === "💎" && resultado[5] === "👑") {
                return apuesta * 75;
            } else if (resultado[0] === "🌙" && resultado[1] === "👑" && resultado[2] === "🌙" && resultado[3] === "👑" && resultado[4] === "🌙" && resultado[5] === "👑") {
                return apuesta * 35;
            } else if (resultado[0] === "🍒" && resultado[1] === "👑" && resultado[2] === "🍒" && resultado[3] === "👑" && resultado[4] === "🍒" && resultado[5] === "👑") {
                return apuesta * 25;
            }
        }
        return null;
    }


    public girosGratis(jugador: Jugador): void {
        console.log("Activando giros gratuitos...");
        const girosGratis = Math.floor(Math.random() * 20) + 1; // Bono entre 1 y 20 giros extra
        console.log(`¡Tienes ${girosGratis} giros gratis!`);

        let gananciaTotal = 0;
        for (let i = 0; i < girosGratis; i++) {
            console.log(`Giros gratis ${i + 1}:`);
            let resultado = this.generarResultadoAleatorio();
            console.log(`| ${resultado.join(" | ")} |`);

            const ganancia = this.calcularGanancia(1, resultado); // Usamos 1 como apuesta fija para las tiradas bono
            if (ganancia !== null && ganancia > 0) {
                gananciaTotal += ganancia;
                console.log(`Has ganado ${ganancia} créditos en esta jugada.`);
            } else {
                console.log("No has ganado en esta jugada.");
            }
        }

        if (gananciaTotal > 0) {
            jugador.aumentarSaldo(gananciaTotal); // Aumentar el saldo del jugador con las ganancias totales
            console.log(`Ganaste un total de ${gananciaTotal} créditos con los giros gratuitos.`);
        } else {
            console.log("No hubo ganancia en los giros gratuitos.");
        }
    }

    // CREAR EN TXT INSTRUCCIONES DEL JUEGO
    public crearInstruccion(): void {
        let instrucciones = "1. Elija un monto de apuesta.\n2. Seleccione girar los rodillos o tiradas bonus (si están disponibles, las mismas son aleatorias y gratuitas) \n3. El tragamonedas digital cuenta con 6 rodillos y para ganar deberán coincidir 3 simbolos iguales\n4. Tabla de pagos: Estrellas - Apuesta x20\nCirculos - Apuesta x30\nDiamantes - Apuesta x50\nCerezas - Apuesta x5\nMediaslunas- Apuesta x10\nCoronas- Apuesta x100 \n 5. Si ganas, puedes retirar tu premio o seguir jugando. ¡Suerte!"
        fs.writeFileSync(resolve('src', 'instrucciones.txt'), instrucciones);
    }

    // LEER INSTRUCCIONES
    public mostrarInstrucciones(): void {
        this.crearInstruccion();
        const instrucciones = fs.readFileSync(resolve('src', 'instrucciones.txt'), { encoding: "utf8" });
        console.log(instrucciones);
    }
};
