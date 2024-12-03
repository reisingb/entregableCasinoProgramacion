import { Juego } from "./Juego";
import pc from "picocolors";
import rd from "readline-sync";
import { Jugador } from "./Jugador";

export class Ruleta extends Juego {
    private numerosRojos: number[];
    private numerosNegros: number[];
    private colorElegido: string;
    private numeroElegido: number | null;
    private numeros: number[];

    constructor() {
        super("Ruleta", 10, 10000);
        this.numerosRojos = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        this.numerosNegros = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
        this.numeros = [...this.numerosRojos, ...this.numerosNegros];
        this.colorElegido = "";
        this.numeroElegido = null;
    }
    // <------------------GETTERS Y SETTERS------------------------->

    public getColorElegido(): string {
        return this.colorElegido;
    }

    public setColorElegido(colorElegido: string): void {
        this.colorElegido = colorElegido;
    }

    private elegirColor(): string | null {
        const opcionBoolean:boolean = rd.keyInYNStrict(pc.bold("Deseas apostar a un color? "));
        if (opcionBoolean) {
            const opcionNumero = rd.questionInt(pc.bold("Elige un color ==>: 1- Rojo / 2- Negro: "));
            if (opcionNumero === 1) {
                this.setColorElegido(pc.red("Rojo"));
                return this.getColorElegido();
            } else if (opcionNumero === 2) {
                this.setColorElegido(pc.gray("Negro"));
                return this.getColorElegido();
            } else {
                console.log(pc.red("Opción inválida."));
                return this.elegirColor();
            }
        }
        return null;
    }

    private elegirNumero(): number | null {
        const opcionBoolean = rd.keyInYNStrict(pc.bold("Deseas apostar a un número? "));
        if (opcionBoolean) {
            let numero: number;
            do {
                numero = rd.questionInt(pc.bold("Elige un número (0-36): "));
                if (!this.numeros.includes(numero)) {
                    console.log(pc.red("Número inválido. Inténtalo nuevamente."));
                }
            } while (!this.numeros.includes(numero));
            return numero;
        }
        return null;
    }

    public opcionesApuestaJuego(jugador: Jugador): void {
        const color:string | null = this.elegirColor();
        if (color) {
            let monto :number= rd.questionInt(`Ingrese el monto para su apuesta al color ${color}: `);
            jugador.apostar(this, monto, color);

            const numero:number | null = this.elegirNumero();
            if (numero !== null) {
                let monto:number = rd.questionInt(`Ingrese el monto para su apuesta al numero ${pc.red(numero)}: `)
                jugador.apostar(this, monto, numero.toString());
            }
            this.girarRuleta();
        } else {
            const numero = this.elegirNumero();
            if (numero !== null) {
                const monto:number =rd.questionInt(`Ingrese el monto para su apuesta al numero ${pc.red(numero)}: `)
                jugador.apostar(this, monto, numero.toString());
                this.girarRuleta();
            } else {
                console.log(pc.cyan("Hasta la próxima tirada!"));
            }
        }
    }

    private girarRuleta(): void {
        console.log(pc.bold("La ruleta está girando..."));
        const numeroGanador = Math.floor(Math.random() * 37); // 0-36
        const colorGanador = this.numerosRojos.includes(numeroGanador) ? pc.red("Rojo") : this.numerosNegros.includes(numeroGanador) ? pc.gray("Negro") : "Verde";
        console.log(pc.bold(`Numero ganador: ${pc.yellow(numeroGanador.toString())}, Color ganador: ${colorGanador}`));
    }

    public iniciarJuego(jugador: Jugador): void {
        console.log(pc.bold(`${pc.yellow(`Has iniciado el juego ${this.getNombre()}`)}\nSaldo: ${pc.yellow(jugador.getMontoCredito())}`));
        this.menuJuego(jugador);
    }

    public calcularGanancia(): number {
        return 0;
    }
}

