import * as readlineSync from 'readline-sync';
import { Jugador } from "./Jugador";
import { IJuego } from "./IJuegos";
import fs from "node:fs";
import { Juego } from './Juego';
import pc from "picocolors";
import { table } from "table";

export class Bingo extends Juego implements IJuego {
    private esGanador: boolean;
    private maxNumerosCantados: number;
    private rangoNumeros: number;
    private numeros: string[];
    private contador: number;
    private valorCarton: number;
    private expRegNumeros: RegExp;

    // CONSTRUCTOR
    constructor() {
        super("Bingo", 0, 0);
        this.maxNumerosCantados = 30;
        this.rangoNumeros = 75;
        this.numeros = [];
        this.esGanador = false;
        this.contador = 1;
        this.valorCarton = 1000;
        this.expRegNumeros = /^\d{1,2}$/m;
    }

    // ------->GETTERS Y SETTERS<-----------------------------------------------//

    public getExpRegNumeros(): RegExp {
        return this.expRegNumeros;
    }

    public setExpRegNumeros(expRegNumeros: RegExp): void {
        this.expRegNumeros = expRegNumeros;
    }

    public getValorCarton(): number {
        return this.valorCarton;
    }

    public setValorCarton(valorCarton: number): void {
        this.valorCarton = valorCarton;
    }

    public getMaxNumerosCantados(): number {
        return this.maxNumerosCantados;
    }

    public setMaxNumerosCantados(maxNumerosCantados: number): void {
        this.maxNumerosCantados = maxNumerosCantados;
    }

    private isGanador(): boolean {
        return this.esGanador;
    }

    private setGanador(esGanador: boolean): void {
        this.esGanador = esGanador;
    }

    public getRangoNumeros(): number {
        return this.rangoNumeros;
    }

    public setRangoNumeros(rangoNumeros: number): void {
        this.rangoNumeros = rangoNumeros;
    }

    public getContador(): number {
        return this.contador;
    }

    public setContador(contador: number): void {
        this.contador += contador;
    }

    // ----------------------------->METODOS COMUNES PROPIOS DE CLASE--------------------------------->

    private reiniciarContador(): void {
        this.contador = 0;
    }

    // VERIFICA LOS NUMEROS CANTADOS E INGRESADOS POR CONSOLA.
    private verificarGanador(carton: string[][], numerosCantados: string[]): void {
        const todosNumerosDelCarton: string[] = carton.flat(); // APLANAR FILAS
        const todosAcertados: boolean = todosNumerosDelCarton.every(num => numerosCantados.includes(num));
        this.setGanador(todosAcertados);
    }

    // genera los numeros cantados aleatoriamente del 1 al 75
    private generarNumero(numerosCantados: Set<string>): number {
        let numero: number;
        do {
            numero = Math.floor(Math.random() * this.getRangoNumeros()) + 1;
        } while (numerosCantados.has(numero.toString())); //VERIFICAR QUE EL NUMERO NO SE REPITA

        return numero;
    }

    // METODO PARA CREAR CARTON DE NUMEROS ELEGIDOS
    private crearCartonElegido(): string[][] {
        const carton: string[][] = [];
        for (let i: number = 0; i < 2; i++) {
            const fila: string[] = [];
            for (let j: number = 0; j < 5; j++) {
                fila.push(this.numeros[i * 5 + j]);
            }
            carton.push(fila);
        }
        return carton;
    }

    // METODO PARA CREAR TABLA DE TODOS LOS NUMEROS DEL BINGO
    private crearTablaBingo(): string[][] {
        const tabla: string[][] = [];
        let contador: number = 1;
        // RECORRER MATRIZ
        for (let i: number = 0; i < 8; i++) { // TABLA DE 8 FILAS X 10 COLUMNAS
            const fila: string[] = [];
            for (let j: number = 0; j < 10; j++) {
                fila.push(contador.toString());
                contador++;
            }
            tabla.push(fila);
        }

        return tabla;
    }

    // MOSTRAR CARTON E NUMEROS ELEGIDOS
    private pedirNumerosCarton = (): void => {
        // MIENTRAS EL ARREGLO DE NUMEROS SEA MENOR A 10 PEDIR
        console.log(pc.cyan("Elige 10 numeros del 1 al 75:"));
        let input: string;
        do {
            input = readlineSync.question(`${pc.bold(`Numero ${this.numeros.length + 1}:`)} `);
            const numero: number = parseInt(input);

            if (input !== "" && this.getExpRegNumeros().test(input) && numero >= 1 && numero <= this.getRangoNumeros() && !this.numeros.includes(numero.toString())) {
                this.numeros.push(input);
            } else if (!this.getExpRegNumeros().test(input)) {
                console.log(pc.yellow(`El numero no puede ser mayor a las 3 cifras y el campo no debe estar vacio.`));
            } else {
                console.log(pc.yellow(`Numero invalido o ya ingresado. Por favor, ingresa un numero unico entre 1 y ${this.getRangoNumeros()}.`));
            }
        } while (this.numeros.length < 10 || input === "")
        // console.clear();
    }

    // METODO ACTUALIZADOR DE TABLA GENERAL DE LOS NUMEROS DEL BINGO
    private actualizarTablaBingo(tabla: string[][], numeroCantado: number): void {
        let contador: number = 0;
        for (let i: number = 0; i < tabla.length; i++) {
            for (let j: number = 0; j < tabla[i].length; j++) {
                // VERIFICAR SI EL NUMERO CANTADO COINCIDE CON 
                if (parseInt(tabla[i][j]) === numeroCantado) {
                    tabla[i][j] = pc.green(pc.bold(tabla[i][j]));  // Pinta de verde el número
                    contador++;
                    if (contador >= this.getMaxNumerosCantados()) {
                        break;
                    }
                }
            }
        }
    }
    //METODO ACTUALIZADOR DE TABLA(CARTON) DE LOS NUMEROS ELEGIDOS
    private actualizarCartonNumerosElegidos(carton: string[][], numeroCantado: number): void {
        for (let i = 0; i < carton.length; i++) {
            for (let j = 0; j < carton[i].length; j++) {
                if (parseInt(carton[i][j]) === numeroCantado) {
                    carton[i][j] = pc.yellow(pc.bold(carton[i][j])); // PINTAR DE VERDE EL NUMERO CANTADO
                }
            }
        }
    }

    // METODO PARA CREAR LA PROMESA
    public crearPromesa(time: number, jugador: Jugador): Promise<void> {
        const numerosCantados: Set<string> = new Set();
        this.pedirNumerosCarton();
        console.log(pc.bold("Iniciando Bingo..."));
        const cartonNuevo: string[][] = this.crearCartonElegido();
        const tabla: string[][] = this.crearTablaBingo(); //CREAR TABLA GENERAL
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                this.validarInterval(jugador, tabla, cartonNuevo, numerosCantados, interval, resolve)
            }, time);
        });
    }

    //ESPERAR DE MANERA ASINCRONA Y CANTAR NUMEROS
    private async cantarNumeros(time: number, jugador: Jugador): Promise<void> {
        await this.crearPromesa(time, jugador);
    }

    // METODO QUE VERIFICA EL CONTADOR PARA SEGIR O NO CON EL INTERVALO DE EJECUCIONES
    private validarInterval(jugador: Jugador, tabla: string[][], carton: string[][], numerosCantados: Set<string>, interval: NodeJS.Timeout, resolve: () => void): void {
        if (this.getContador() < this.getMaxNumerosCantados()) {
            const numero: number = this.generarNumero(numerosCantados);
            numerosCantados.add(numero.toString()); //AGEREGAR NUEVO NUMERO CANTADO AL AZAR AL new Set()

            // ACTUALIZA LA TABLA DE NUMEROS ELEGIDOS
            this.actualizarCartonNumerosElegidos(carton, numero);

            // ACTUALIZA LA TABLA CON EL NUMERO QUE SE CANTA
            this.actualizarTablaBingo(tabla, numero);

            console.clear(); //LIMPIAR CONSOLA
            console.log(pc.cyan("Tu Carton de Bingo:"));
            console.log(table(carton));  // MOSTRAR CARTON DE NUMEROS ELEGIDOS ACTUALIZADO
            console.log(pc.cyan("Tabla de Bingo:"));
            console.log(table(tabla)); // MOSTRAR TABLA DE BINGO ACTUALIZADO
            this.setContador(1);
        } else {
            this.verificarGanador(carton, Array.from(numerosCantados));
            if (this.isGanador()) {
                console.log(pc.green(`¡Bingo! Has ganado el pozo de $5000. Saldo actual: ${pc.cyan(jugador.getMontoCredito())}`));
            } else {
                console.log(pc.bold(pc.magenta(`Se han cantado ${this.getMaxNumerosCantados()} números y no hay ganador.`)));
            }

            clearInterval(interval);
            resolve();
        }
    }

    //<----------------METODOS A IMPLEMENTAR----------------------------------->

    // CALCULAR GANANCIA
    public calcularGanancia(): number {
        return this.isGanador() ? 5000 : 0;
    }

    // COMENZAR JUEGO
    public async jugar(jugador: Jugador): Promise<void> {
        console.log(`Valor de carton: $${this.getValorCarton()}.`);
        let esComprar: boolean = readlineSync.keyInYNStrict(`Comprar Carton?: `);
        if (esComprar) {
            // SI NO TIENE SALDO O SI SU SALDO ES MENOR AL VALOR DEL CARTON DE BINGO
            if (jugador.getMontoCredito() <= 0 || jugador.getMontoCredito() < 1000) {
                console.clear();
                console.log(pc.red("No tiene saldo para comprar cartón. Valor de cartón $1000."));
                this.setSalirJuego(true); //SALIR DEL JUEGO A VERDAD
            }
            if (this.isSalirJuego()) return; //SI SALIO DEL JUEGO
            console.clear();

            jugador.restarSaldoActual(1000); //RESTAR DEL SALDO EL VALOR DEL CARTON

            console.log(pc.green(`Tu compra de cartón fue un éxito, tu saldo actual es de: ${pc.cyan(jugador.getMontoCredito())}`));

            await this.cantarNumeros(3000, jugador); // CANTA UN NUMERO CADA 3 SEG
            jugador.aumentarSaldo(this.calcularGanancia()); // AUMENTAR SALDO SEGUN EL RETORNO DEL CALCULO DE GANANCIA

            this.numeros = []; //VACIAR NUMEROS ELEGIDOS
            this.reiniciarContador();
            await this.mostrarMenuDespuesDeJuego(jugador);
        } else {
            console.clear();
            await this.mostrarMenuDespuesDeJuego(jugador);
        }
    }

    // CREAR INSTRUCCIONES DE BINGO
    public async crearInstruccion(): Promise<void> {
        console.clear();
        console.log("***INSTRUCCIONES***");
        let instrucciones = "-Para jugar este juego debe tener mas de 1000 creditos para la compra del carton\n-Ingresar por consola 10 numeros del 1 al 75\n-Al correr el bolillero le mostrara 50 numeros aleatorios que salen y verificara si estan los numeros que usted ingreso";
        fs.writeFileSync('./src/instrucciones.txt', instrucciones);
    }

    // LEER INSTRUCCIONES
    public async mostrarInstrucciones(): Promise<void> {
        await this.crearInstruccion();
        const instrucciones = fs.readFileSync('./src/instrucciones.txt', { encoding: "utf8" });
        console.log(instrucciones);
    }
}
