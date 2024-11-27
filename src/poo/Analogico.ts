import { Tragamoneda } from "./Tragamoneda";


export class Analogico extends Tragamoneda {
    calcularPerdida(): number {
        throw new Error("Method not implemented.");
    }
    calcularGanancia(): number {
        throw new Error("Method not implemented.");
    }

    constructor(){
        super("Tragamonedas Clasico", 1, 100, 3)
        this.simbolos = ["7","🔔","☘️","🍋","🍒" ]
    }

    calcularPagos(): number {
        throw new Error("Method not implemented.");
    }
}

// const analogico = new Analogico
// analogico.IniciarJuego()