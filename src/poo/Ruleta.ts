import { Juego } from "./Juego";
import pc from "picocolors";
import rd from "readline-sync";
import { Jugador } from "./Jugador";

// JUEGO RULETA
export class Ruleta extends Juego {
    private colorElegido: string | null;
    private numeroElegido: number | null;
    private numerosRojos: number[];
    private numerosNegros: number[];
    private numeroGanador: number | null;

    constructor() {
        super("Ruleta", 10, 10000);
        this.colorElegido = null;
        this.numeroElegido = null;
        this.numeroGanador = null;
        this.numerosRojos = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        this.numerosNegros = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33];

    }

    // <-------------------------------GETTERS Y SETTERS----------------------------------->

    public getColorElegido(): string | null {
        return this.colorElegido;
    }

    public setColorElegido(colorElegido: string): void {
        this.colorElegido = colorElegido;
    }

    public getNumeroElegido(): number | null {
        return this.numeroElegido;
    }

    public setNumeroElegido(numeroElegido: number): void {
        this.numeroElegido = numeroElegido;
    }

    public getNumeroGanador(): number | null {
        return this.numeroGanador;
    }

    public setNumeroGanador(numeroGanador: number): void {
        this.numeroGanador = numeroGanador;
    }

    // <---------------METODOS COMUNES---------------------------------> 

    // METODO PARA PEDIR COLOR OPCIONAL
    private elegirColor(): string | null {
        const esApuestaColor: boolean = rd.keyInYNStrict(pc.bold("Deseas apostar a un color?: "));
        if (esApuestaColor) {
            const opcionNumero: number = rd.questionInt(pc.bold(`Elige un color ==> 1. ${pc.red("Rojo")} / 2. ${pc.gray("Negro")}: `));
            if (opcionNumero === 1) {
                this.setColorElegido("Rojo");
                return this.getColorElegido();
            } else if (opcionNumero === 2) {
                this.setColorElegido("Negro");
                return this.getColorElegido();
            } else {
                console.log(pc.red("Opcion invalida."));
                return this.elegirColor();
            }
        }
        return null;
    }

    // METODO PARA PEDIR NUMERO OPCIONAL
    private elegirNumero(): number | null {
        const esApuestaNumero: boolean = rd.keyInYNStrict(pc.bold("Deseas apostar a un numero?: "));
        if (esApuestaNumero) {
            let numero: number;
            do {
                numero = rd.questionInt(pc.bold("Elige un numero (0-36): "));
                if (numero < 0 && numero > 36) {
                    console.log(pc.red("Numero invalido. Intentalo nuevamente."));
                }
            } while (numero < 0 && numero > 36);
            this.setNumeroElegido(numero);
            return numero;
        }
        return null;
    }

    // METODO PARA SABER SI EL NUMERO ELEGIDO ES EL GANADOR
    private esNumeroGanador(ganador: number): boolean {
        return ganador === this.getNumeroElegido();
    }

    // METODO PARA EVALUAR SI EL COLOR ELEGIDO ES EL GANADOR
    private esColorGanador(ganador: number): boolean {
        return (this.getColorElegido() === "Rojo" && this.numerosRojos.includes(ganador)) || (this.getColorElegido() === "Negro" && this.numerosNegros.includes(ganador));
    }

    // METODO QUE VALIDA LA GANANCIA
    private validarGanancia(ganancia: number, jugador: Jugador): void {
        if (ganancia > 0) {
            jugador.aumentarSaldo(ganancia);
            console.log(pc.green(pc.bold(`Felicidades! Has ganado ${ganancia} creditos!`)));
            console.log(`Saldo actual: ${pc.cyan(pc.bold(jugador.getMontoCredito()))}`);
            if (this.isSalirJuego()) return;
        } else {
            console.log(pc.cyan(pc.bold("No has tenido suerte en esta ronda.")));
            console.log(`Saldo actual: ${pc.cyan(pc.bold(jugador.getMontoCredito()))}`);
            if (this.isSalirJuego()) return;
        }
    }

    // METODO GIRAR RULETA
    private girarRuleta(): number {
        const numeroGanador = Math.floor(Math.random() * 37); // 0-36
        const colorGanador = this.numerosRojos.includes(numeroGanador) ? pc.red("Rojo") : this.numerosNegros.includes(numeroGanador) ? pc.gray("Negro") : pc.green("Verde");
        console.log(pc.bold(`Numero ganador: ${pc.yellow(numeroGanador.toString())}\nColor ganador: ${colorGanador}`));
        return numeroGanador;
    }

    // <------------------------------------METODOS A IMPLEMENTAR---------------------------------->

    // METODO A IMPLEMENTAR DE OPCIONES DE APUESTAS
    public opcionesApuestaJuego(jugador: Jugador): void {
        if (this.isSalirJuego()) return;

        const tipoApuestaColor: string | null = this.elegirColor();
        if (this.isSalirJuego()) return;

        let apuestaColor: number = 0;
        let ganancia = 0;

        if (tipoApuestaColor) {
            apuestaColor = jugador.apostar(this, tipoApuestaColor);
            if (this.isSalirJuego()) return;

            const tipoApuestaNumero: number | null = this.elegirNumero();
            let apuestaNumero: number = 0;

            if (tipoApuestaNumero !== null) {
                apuestaNumero = jugador.apostar(this, tipoApuestaNumero.toString());
                if (this.isSalirJuego()) return;

                console.log(pc.bold("La ruleta esta girando..."));
                const ganador = this.girarRuleta();
                this.setNumeroGanador(ganador);
                ganancia += this.calcularGanancia(apuestaColor, ["color"]);
                if (this.esNumeroGanador(ganador)) {
                    ganancia += this.calcularGanancia(apuestaNumero, ["numero"]);
                }

                this.validarGanancia(ganancia, jugador);
            } else {
                console.log(pc.bold("La ruleta esta girando..."));
                const ganador = this.girarRuleta();
                this.setNumeroGanador(ganador);
                ganancia += this.calcularGanancia(apuestaColor, ["color"]);
                this.validarGanancia(ganancia, jugador);
            }
        } else {
            const tipoApuestaNumero: number | null = this.elegirNumero();
            if (this.isSalirJuego()) return;

            let apuestaNumero: number = 0;

            if (tipoApuestaNumero !== null) {
                apuestaNumero = jugador.apostar(this, tipoApuestaNumero.toString());
                if (this.isSalirJuego()) return;

                console.log(pc.bold("La ruleta esta girando..."));
                const ganador = this.girarRuleta();
                this.setNumeroGanador(ganador);
                ganancia += this.calcularGanancia(apuestaNumero, ["numero"]);
                this.validarGanancia(ganancia, jugador);
            }
        }
        this.mostrarMenuDespuesDeJuego(jugador);
    }

    // IMPLEMENTACION PARA INICIAR JUEGO
    public iniciarJuego(jugador: Jugador): void {
        console.log(pc.bold(`${pc.yellow(`Has iniciado el Juego 🎰 ==> ${pc.bold(this.getNombre())}`)}\nSaldo Actual: ${pc.yellow(jugador.getMontoCredito())}`));
        this.menuJuego(jugador);
    }

    // METODO DE CALCULO DE GANANCIA
    public calcularGanancia(apuesta: number, resultado?: string[]): number {
        let ganancia: number = 0;
        let ganador: number | null = this.getNumeroGanador();
        if (ganador) {
            if (resultado && resultado.includes("numero") && this.esNumeroGanador(ganador)) {
                ganancia += apuesta * 35;
            }
            if (resultado && resultado.includes("color") && this.esColorGanador(ganador)) {
                ganancia += apuesta * 2;
            }
        }
        return ganancia;
    }
}