import { Casino } from "./Casino";
import { Juego } from "./Juego";

export class Dado  extends Juego{
    constructor(nombre:string, apuestaMin:number, apuestaMax:number){
        super(nombre, apuestaMin, apuestaMax);
    }
    public apostar(): void {

    }
    
    public retirarTicket(): void {

    }

    public calcularPerdida(): number {
        return 1
    }

    public calcularGanancia(): number {
        return 0
    }

    public calcular(): number {
        return 0
    }
    
    public cargarCredito(montoCredito: number): string {
        this.actualizarMonto(montoCredito);
        if(this.verificarMontoCarga()){
            this.montoCredito+=montoCredito;
            return `Su carga de ${montoCredito} fue un exito!`;
        }
        this.actualizarMonto(0);
        return `Error:\nPara el juego ${this.getNombre()} el minimo/maximo es:\nmin${this.getApuestaMin()} - maximo ${this.getApuestaMax()}\nIntentelo nuevamente.`;
    }
}