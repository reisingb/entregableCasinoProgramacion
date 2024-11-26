/* xport class Tragamoneda {
    protected nombre: string;
    protected simbolos: string[];
    protected carretes: number;
    constructor(nombre: string, simbolos: string[], carretes: number) {
        this.nombre = nombre;
        this.simbolos = simbolos;
        this.carretes = carretes;
    }
} */
import { Casino } from "./Casino";
import { Juego } from "./Juego";

// SUPER CLASE
export abstract class Tragamoneda extends Juego{    
    constructor(nombre:string, apustaMax:number, apuestaMin:number){
        super(nombre, apustaMax, apuestaMin);
    }
    // ACCIONES EN COMUN PARA TODOS LOS JUEGOS
    abstract retirarTicket(): void
    abstract calcularGanancia(): number;
    abstract calcularPerdida(): number;
    abstract apostar(): void
}