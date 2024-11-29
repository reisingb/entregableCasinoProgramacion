import { Juego } from "./Juego";
import pc from "picocolors";
// import rd from "readline-sync";

export class Ruleta extends Juego {
    private numeros: number[];
    private numerosElegidos: number[];
    private color: string
    private bolilla: number;
    private fichas: number[];
    private tiempoEspera: number;

    constructor(nombre: string, apuestaMin: number, apuestaMax: number) {
        super(nombre, apuestaMin, apuestaMax);
        this.numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
        this.numerosElegidos = [];
        this.bolilla = 0;
        this.color = "Verde";
        this.fichas = [30, 50, 100, 300, 500, 1000, 5000, 10000];
        this.tiempoEspera = 5000;
    }


    //<-------------------------GETTERS Y SETTERS---------------------------------------->

    public getColor(): string {
        return this.color;
    }

    public setColor(color: string): void {
        this.color = color;
    }

    public getBolilla(): number {
        return this.bolilla;
    }

    public setBolilla(bolilla: number): void {
        this.bolilla = bolilla;
    }

    public getNumeros(): number[] {
        return this.numeros;
    }

    public setNumeros(numeros: number[]): void {
        this.numeros = numeros;
    }

    public getNumerosElegidos(): number[] {
        return this.numerosElegidos;
    }

    public setNumerosElegidos(numeroElegido: number): void {
        this.numerosElegidos.push(numeroElegido);
    }

    public getTiempoEspera(): number {
        return this.tiempoEspera;
    }

    public setTiempoEspera(tiempoEspera: number): void {
        this.tiempoEspera = tiempoEspera;
    }

    // <-------------------------A PARTIR DE ACA METODOS PROPIOS DEL JUEGO ---------------------------->

    // METODO GENERAL PARA ELEGIR OPCION DE APUESTA EN RULETA.
    public elegir(): void {
        let opcion: boolean = this.obtenerEntradaSegunKey("Desea elegir un color?: ");
        if (opcion) {
            this.elegirColor();
            // SOBRE ESCRIBIR VARIABLE PARA PREGUNTAR SI ELEGE UN NUMERO
            opcion = this.obtenerEntradaSegunKey("Desea elegir un numero? S/N: ");
            // SI QUIERE ELEGIR NUMERO
            if (opcion) {
                this.elegirNumero();
            }
        } else {
            this.elegirNumero();
        }
    }

    // METODO QUE SE ENCARGA DE PEDIR EL COLOR
    public elegirColor(): void {
        let opcionNum: number;
        // MIENTRAS LA OPCION SEA ERRONEA EJECUTAR EL BUCLE WHILE
        do {
            // PEDIR EL COLOR
            opcionNum = this.obtenerEntradaNum("Elige un color:\n1. Rojo\n2. Negro\n");
            let condicion: boolean = opcionNum !== 1 && opcionNum !== 2;
            if (condicion) {
                console.log(pc.red("Opcion invalida, Vuelva a intentarlo..."));
            }
        } while (opcionNum !== 1 && opcionNum !== 2);

        opcionNum === 1 ? this.setColor("Rojo") : this.setColor("Negro"); //USO DE OPERADOR TERNARIO.

        // GUARDAR MINIMA Y MAXIMA DEL JUEGO
        const minimaApuesta: number = this.getApuestaMin();
        const maximaApuesta: number = this.getApuestaMax();

        // FILTRAR LAS FICHAS QUE CUMPLAN LAS CONDICIONES
        const fichasValidas: number[] = this.fichas.filter(ficha => ficha > minimaApuesta && ficha < maximaApuesta);

        // GUARDAR AL PRINCIPIO Y FINAL DE LA LISTA DE FICHAS LOS MINIMOS Y MAXIMOS
        fichasValidas.unshift(minimaApuesta);
        fichasValidas.push(maximaApuesta);

        
        opcionNum = this.obtenerEntradaApuesta(`Elija una ficha para su apuesta al color ${this.getColor()}.\n${fichasValidas.join("-")}`);
        // PEDIR AL USUARIO QUE ELIJA SU FICHA DE APUESTA AL COLOR
        const condicion: boolean = !fichasValidas.includes(opcionNum);
        const mensajeSecundario: string = "La ficha seleccionada es invalida, intente nuevamente...";

        this.apostar(opcionNum);
    }

    // METODO QUE SE ENCARGA DE PEDIR LOS NUMEROS ELEGIDOS
    public elegirNumero(): void {
        let opcionNum: number;

        // MIENTRAS EL NUMERO ELEGIDO NO SEA UNO DE LA LISTA ---> VOLVER A PREGUNTAR
        do {
            // GUARDA EL NUMERO INGRESADO POR EL USUARIO.
            opcionNum = this.obtenerEntradaNum("Elige un numero del 0 al 36: ");

            // CONDICION A VALIDARSE.
            let condicion: boolean = !this.numeros.includes(opcionNum);

            // SI EL VALOR INGRESADO NO  CORRESPONDE A UNA FICHA
            if (condicion) {
                console.log(pc.red(`El numero elegido no es valido en una apuesta de ${this.getNombre()}`));
            }

        } while (!this.numeros.includes(opcionNum));


        // PREGUNTAR SI QUIERE GIRAR RULETA
        const preguntaGirar: boolean = this.obtenerEntradaSegunKey("Girar Ruleta?: ");

        if (preguntaGirar) {
            console.log(pc.cyan(pc.bold("***GIRANDO RULETA! BUENA SUERTE!***")));
            this.girarRuleta();
        } else {
            this.elegirNumero();
        }

        // const minimaApuesta: number = this.getApuestaMin();
        // const maximaApuesta: number = this.getApuestaMax();

        // const fichasValidas: number[] = this.fichas.filter(ficha => ficha > minimaApuesta && ficha < maximaApuesta);

        // fichasValidas.unshift(minimaApuesta);
        // fichasValidas.push(maximaApuesta);

        // this.obtenerEntradaNum(`Elija una ficha para su apuesta al numero ${pc.red(`${opcionNum}:`)}\n${pc.yellow(fichasValidas.join("-"))}`);

        // // AGREGAR NUMERO ELEGIDO A LA LISTA
        // this.setNumerosElegidos(opcionNum);

        // // PREGUNTAR SI QUIERE ELEGIR MAS NUMEROS
        // let elegirOtro: boolean = this.obtenerEntradaSegunKey("Desea elegir otro numero? S/N: ");

        // if (elegirOtro) {
        //     this.elegirNumero();
        // }
    }


    public girarRuleta(): number {
        return 88;
    }

    //<--------------------------A PARTIR DE ACA METODOS A IMPLEMENTAR---------------------------------------->
    public calcularPerdida(): number {
        return 1
    }

    public calcularGanancia(): number {
        return 0
    }

    public iniciarJuego(): void {
        console.log(pc.bgMagenta(`***Bienvenido al juego ${this.getNombre()}***`));
        this.elegir();
    }
    public calcularPagos(): number {
        return 1;
    }

    // <------------------A PARTIR DE ACA METODOS COMUNES------------------------->

}