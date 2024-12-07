import * as readlineSync from 'readline-sync';
import { Jugador } from "./Jugador";
import { IJuego } from "./IJuegos";
import fs from "node:fs";
import { Juego } from './Juego';

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

    isGanador(): boolean {
        return this.esGanador
    }
    setGanador(esGanador: boolean): void {
        this.esGanador = esGanador
    }

    // genera los numeros cantados aleatoriamente del 1 al 75
    public generarNumero(numerosCantados: Set<number>): number {

        const maxNumerosCantados = 50; // Límite de números cantados
        const rangoNumeros = 75; // Rango máximo de números
        let numero: number;
        do {
            numero = Math.floor(Math.random() * rangoNumeros) + 1;
        } while (numerosCantados.has(numero)); // verifica que el numero no se repita

        return numero;
    }

    public crearCartonDesdeEntrada(numeros: number[]): number[][] {
        const carton: number[][] = [];
        for (let i = 0; i < 5; i++) {
            const fila: number[] = [];
            for (let j = 0; j < 5; j++) {
                fila.push(numeros[i * 5 + j]);
            }
            carton.push(fila);
        }
        return carton;
    }
    // verifica los numeros cantados y los que ingresados por consola
    public verificarGanador(carton: number[][], numerosCantados: number[]): void {

        for (const fila of carton) {
            if (fila.every(num => numerosCantados.includes(num))) {
                this.setGanador(true);
            }
        }

        for (let col = 0; col < 5; col++) {
            if (carton.every(fila => numerosCantados.includes(fila[col]))) {
                this.setGanador(true);
            }
        }

    }



    // muestra los numeros cantados por consola
    public jugarBingo(carton: number[][]) {
        const numerosCantados: Set<number> = new Set(); // usa un set para evitar numeros duplicados
        let ganador: boolean = false;


        while (!ganador && numerosCantados.size < this.maxNumerosCantados) {


            const numero = this.generarNumero(numerosCantados);
            numerosCantados.add(numero);
            console.log(`Numero cantado: ${numero}`);

            this.verificarGanador(carton, Array.from(numerosCantados));

        }


        if (this.isGanador()) {
            console.log("¡Bingo! Has ganado el pozo de 5000$.");
        } else {
            console.log("Se han cantado 50 nunmeros y no hay ganador.");
        }


        // solicita al usuario ingresar numero por consola
        const numeros: number[] = [];

        console.log("Por favor, ingresa 10 numeros (del 1 al 75) para tu carton de bingo, uno por uno:");

        while (numeros.length < 10) {
            const input = readlineSync.question(`Numero ${numeros.length + 1}: `);
            const numero = parseInt(input);

            if (numero >= 1 && numero <= this.rangoNumeros && !numeros.includes(numero)) {
                numeros.push(numero);
            } else {
                console.log("Numero invalido o ya ingresado. Por favor, ingresa un numero unico entre 1 y 75.");
            }
        }
    }

    calcularGanancia(): number {
        if (this.isGanador()) {
            return 5000;
        }
        return 0;



    }

    public mostrarCarton = (): void => {

        const carton: number[][] = this.crearCartonDesdeEntrada(this.numeros);




        let cartonNuevo: number[][] = carton.filter((_, i) => i < 2)
        console.table(cartonNuevo)

        this.jugarBingo(carton)
    }

    public jugar(jugador: Jugador): void {
        this.mostrarCarton()
        jugador.aumentarSaldo(this.calcularGanancia())
    }

    public mostrarMenuDespuesDeJuego(jugador: Jugador): void {

    }

    crearInstruccion(): void {
        let instrucciones = "para jugar este juego debe ingresar por consola 10 numeros del 1 al 75, al correr el bolillero le mostrara 50 numeros aleatorios que salen y verificara si estan los numeros que usted ingreso"
        fs.writeFileSync('./src/instrucciones.txt', instrucciones);
    }

    // LEER INSTRUCCIONES
    mostrarInstrucciones(): void {
        this.crearInstruccion();
        const instrucciones = fs.readFileSync('./src/instrucciones.txt', { encoding: "utf8" });
        console.log(instrucciones);
    }



}