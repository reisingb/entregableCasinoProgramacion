import { Juego } from "./Juego";
// import rd from "readline-sync";

export class Ruleta extends Juego {
    private numerosRojos: number[];
    private numerosNegros: number[];
    private todosLosNumeros:number[];

    constructor(nombre: string, apuestaMin: number, apuestaMax: number) {
        super(nombre, apuestaMin, apuestaMax);
        this.numerosRojos = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        this.numerosNegros = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
        this.todosLosNumeros =[...this.numerosRojos, ...this.numerosNegros]
    }


    //<-------------------------GETTERS Y SETTERS---------------------------------------->
    public getNumerosRojos(): number[] {
        return this.numerosRojos;
    }

    public setNumerosRojos(numerosRojo: number): void {
        this.numerosRojos.push(numerosRojo);
    }

    public getNumerosNegros(): number[] {
        return this.numerosNegros;
    }

    public setNumerosNegros(numerosNegro: number): void {
        this.numerosNegros.push(numerosNegro);
    }

    public calcularPerdida(): number {
        return 1
    }

    public calcularGanancia(): number {
        return 0
    }

    public iniciarJuego(): void {
        this.obtenerEntradaApuesta();

        let opcion: string | number;
        
        do {
            console.log("1. Elegir color? S/N");
            opcion = this.obtenerEntradaCadena();
        } while (opcion.toLowerCase() !== "s" && opcion.toLowerCase() !== "n");

        do {
            console.log("Elige un color:\n1. Rojo\n2. Negro");
            opcion= this.obtenerEntradaNum();
        } while (opcion !== 1 && opcion !== 2);

        do {
            console.log("2. Elegir numero? S/N");
            opcion = this.obtenerEntradaCadena();
        } while (opcion.toLowerCase() !== "s" && opcion.toLowerCase() !== "s");

        do {
            console.log("Elige un numero del 0 al 36: ");
            opcion = this.obtenerEntradaNum();
        } while (!this.todosLosNumeros.includes(opcion));

    }
    public calcularPagos(): number {
        return 1;
    }

    // <------------------A PARTIR DE ACA METODOS COMUNES------------------------->

}