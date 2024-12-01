import { Juego } from "./Juego";
import pc from "picocolors";
import rd from "readline-sync";
import { Jugador } from "./Jugador";

export class Ruleta extends Juego {
    private numerosRojos: number[];
    private numerosNegros: number[];
    private colorElegido:string;
    private numeros: number[];

    constructor() {
        super("Ruleta", 10, 1000); 
        this.numerosRojos = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        this.numerosNegros = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
        this.numeros = [...this.numerosRojos, ...this.numerosNegros];
        this.colorElegido="";
    }

    public getColorElegido(): string {
        return this.colorElegido;
    }

    public setColorElegido(colorElegido: string): void {
        this.colorElegido = colorElegido;
    }

    private elegirColor(): string {
        const opcionNumero = rd.questionInt(pc.bold("Elige un color: 1- Rojo, 2- Negro: "));
        if (opcionNumero === 1) {
            this.setColorElegido(pc.red("Rojo"));
            return this.getColorElegido();
        } else if (opcionNumero === 2) {
            this.setColorElegido(pc.gray("Negro"));
            return this.getColorElegido();
        } else {
            console.log(pc.red("Opcion invalida."));
            return this.elegirColor();
        }
    }

    private elegirNumero(): number | void {
        let opcionBoolean:boolean = rd.keyInYNStrict(pc.bold("Deseas apostar a un numero? "));
        if(opcionBoolean){
            let numero = rd.questionInt(pc.bold("Elige un numero (0-36): "));
            while (numero < 0 || numero > 36) {
                console.log(pc.red("Numero invalido. Intentalo nuevamente."));
                numero = rd.questionInt(pc.bold("Elige un número (0-36): "));
            }
            return numero;
        }else{
           console.log(pc.cyan("Hasta la proxima tirada!"));
        }
    }

    public opcionesApuestaJuego(jugador: Jugador): void {
        let opcionBoolean:boolean = rd.keyInYNStrict(pc.bold("Deseas apostar a un color? "));
        let tipoApuesta:string = "";
        let montoApuesta:number;
        if (opcionBoolean) {
            tipoApuesta = this.elegirColor();
            montoApuesta = rd.questionInt(pc.bold(`Ingrese el monto para su apuesta al color ${tipoApuesta}: `));
            jugador.apostar(montoApuesta, this, tipoApuesta);
        } else {
            tipoApuesta = `${this.elegirNumero()}`;
            montoApuesta = rd.questionInt(pc.bold(`Ingrese el monto para su apuesta al Numero: ${pc.red(tipoApuesta)}: `));
        }

    }

    public iniciarJuego(jugador: Jugador): void {
        console.log(pc.bold(`${pc.yellow(`Has iniciado el juego ${pc.magenta(this.getNombre())}`)}\nCredito: ${pc.yellow(jugador.getMontoCredito())}`));
        this.menuJuego(jugador);
    }

    public calcularGanancia(): number {
        return 0;
    }
}
