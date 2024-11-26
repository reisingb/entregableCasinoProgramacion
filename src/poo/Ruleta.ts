import { Juego } from "./Juego";
import rd from "readline-sync";

export class Ruleta extends Juego {
    private numerosRojos:number[]
    private numerosNegros:number[];

    constructor(nombre: string, apuestaMin: number, apuestaMax: number) {
        super(nombre,apuestaMin, apuestaMax);
        this.numerosRojos=[1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        this.numerosNegros=[2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
    }

    public getNumerosRojos(): number[] {
        return this.numerosRojos;
    }

    public getNumerosNegors(): number[] {
        return this.numerosNegros;
    }

    public calcularPerdida(): number {
        return 1
    }

    public calcularGanancia(): number {
        return 0
    }

    public IniciarJuego(): void {
        this.apostar()
    }
    public calcularPagos(): number{
        return 1;
    }
}