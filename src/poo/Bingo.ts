import * as readlineSync from 'readline-sync';
import { Jugador } from "./Jugador";
import { IJuego } from "./IJuegos";
import fs from "node:fs";
import { Juego } from './Juego';
import pc from "picocolors";
import { table } from "table";
export class Bingo extends Juego implements IJuego {
    private esGanador: boolean = false;
    private maxNumerosCantados: number;
    private rangoNumeros: number;
    private numeros: number[];

    constructor() {
        super("Bingo", 0, 0)
        this.maxNumerosCantados = 50;
        this.rangoNumeros = 75;
        this.numeros = [];
    }

    public getNumeros(): number[] {
        return this.numeros;
    }

    public setNumeros(numeros: number[]): void {
        this.numeros = numeros;
    }

    private isGanador(): boolean {
        return this.esGanador
    }
    private setGanador(esGanador: boolean): void {
        this.esGanador = esGanador
    }

    // genera los numeros cantados aleatoriamente del 1 al 75
    public generarNumero(numerosCantados: Set<number>): number {
        const rangoNumeros = 75; // Rango máximo de números
        let numero: number;
        do {
            numero = Math.floor(Math.random() * rangoNumeros) + 1;
        } while (numerosCantados.has(numero)); // verifica que el numero no se repita

        return numero;
    }

    public crearCartonDesdeEntrada(): number[][] {
        const carton: number[][] = [];
        for (let i = 0; i < 2; i++) {
            const fila: number[] = [];
            for (let j = 0; j < 5; j++) {
                fila.push(this.numeros[i * 5 + j]);
            }
            carton.push(fila);
        }
        return carton;
    }
    // verifica los numeros cantados y los que ingresados por consola
    public verificarGanador(carton: number[][], numerosCantados: number[]): void {
        const todosNumerosDelCarton = carton.flat(); // Aplanar las filas en un solo arreglo
        const todosAcertados = todosNumerosDelCarton.every(num => numerosCantados.includes(num));
        this.setGanador(todosAcertados);
    }

    public calcularGanancia(): number {
        return this.isGanador() ? 5000 : 0
    }

    // MOSTRAR CARTON E NUMEROS ELEGIDOS
    public mostrarCarton = (): number[][] => {
        // MIENTRAS EL ARREGLO DE NUMEROS SEA MENOR A 10 PEDIR
        while (this.numeros.length < 10) {
            const input: string = readlineSync.question(`${pc.bold(`Numero ${this.numeros.length + 1}:`)} `);
            const numero: number = parseInt(input);

            if (numero >= 1 && numero <= this.rangoNumeros && !this.numeros.includes(numero)) {
                this.numeros.push(numero);
            } else {
                console.log("Numero invalido o ya ingresado. Por favor, ingresa un numero unico entre 1 y 75.");
            }
        }
        const cartonNuevo: number[][] = this.crearCartonDesdeEntrada();
        console.log(table(cartonNuevo)); //CREAR TABLA Y MOSTRAR CON LIBRERIA
        return cartonNuevo;
    }


    // muestra los numeros cantados por consola
    public jugarBingo(carton: number[][]): void {
        const numerosCantados: Set<number> = new Set(); // usa un set para evitar numeros duplicados
        while (numerosCantados.size < this.maxNumerosCantados) {
            const numero: number = this.generarNumero(numerosCantados);
            numerosCantados.add(numero);
            console.log(`Numero cantado: ${numero}`);

            this.verificarGanador(carton, Array.from(numerosCantados));
        }
    }

    public jugar(jugador: Jugador): void {
        // SI EL JUGADOR TIENE SALDO Y SI EL SALDO ES MENOR A 1000(PRECIO DE CARTON)
        if (jugador.getMontoCredito() <= 0 || jugador.getMontoCredito() < 1000) {
            console.log(pc.red("No tiene saldo para comprar carton. Valor de carton $1000"));
            this.setSalirJuego(true);
        }
        if (this.isSalirJuego()) return //SI ES TRUE SALIR

        // SI SALIR ES FALSE
        jugador.restarSaldoActual(1000) //RESTAMOS EL SALDO POR SU COMPRA
        console.log(pc.green(`Tu compra de carton fue un exito, tu saldo actual es de: ${pc.cyan(jugador.getMontoCredito())}`));

        const carton: number[][] = this.mostrarCarton(); //GUARDAR EN VARIABLE LA MATRIZ QUE RETORNA mostrarCarton()
        this.jugarBingo(carton);
        jugador.aumentarSaldo(this.calcularGanancia());  //AUMENTAR GANANCIA SI ACERTO SINO 0

        if (this.isGanador()) {
            console.log(`¡Bingo! Has ganado el pozo de $5000. Saldo actual:${pc.cyan(jugador.getMontoCredito())}`);
        } else {
            console.log(pc.bold(pc.magenta("Se han cantado 50 numeros y no hay ganador.")));
        }

        this.mostrarMenuDespuesDeJuego(jugador);
    }

    // CREAR INSTRUCCIONES DE BINGO
    public crearInstruccion(): void {
        let instrucciones = "-Para jugar este juego debe tener mas de 1000 creditos para la compra del carton\n-Ingresar por consola 10 numeros del 1 al 75\n-Al correr el bolillero le mostrara 50 numeros aleatorios que salen y verificara si estan los numeros que usted ingreso"
        fs.writeFileSync('./src/instrucciones.txt', instrucciones);
    }

    // LEER INSTRUCCIONES
    public mostrarInstrucciones(): void {
        this.crearInstruccion();
        const instrucciones = fs.readFileSync('./src/instrucciones.txt', { encoding: "utf8" });
        console.log(instrucciones);
    }
}