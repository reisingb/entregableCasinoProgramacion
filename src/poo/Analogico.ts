import { Tragamoneda } from "./Tragamoneda";


export class Analogico extends Tragamoneda {

    public retirarTicket(): void{

    }

    public apostar(): void{

    }
    public iniciarJuego(): void{

    }
    public finalizarJuego(): void{

    }

    public calcularGanancia(): number {
        return 0;
    }

    public calcularPerdida(): number {
        return 0;
    }

    public cargarCredito(montoCredito: number): string {
        // this.setCredito(montoCredito);
        if(this.verificarMontoCarga()){
            this.montoCredito+=montoCredito;
            return `Su carga de ${montoCredito} fue un exito!`;
         }
         this.setCredito(0);
         return `El monto ingresado no cumple con los limites del ${this.getNombre()}`;
    }
}