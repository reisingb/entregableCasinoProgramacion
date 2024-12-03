import { Casino } from "./Casino";
// import { Tragamoneda } from "./Tragamoneda";

export class Digital extends Tragamoneda {
    constructor(nombre: string, apuestaMin: number, apuestaMax: number) {
        super(nombre,apuestaMin, apuestaMax);
    }

    public retirarTicket(): string{
        return `Su ticket a sido retirado con el valor de $${this.getCredito()}`;
    }

    public apostar(): void{

    }

    public calcularGanancia(): number {
        return 0;
    }

    public calcularPerdida(): number {
        return 0;
    }

    public cargarCredito(montoCredito: number): string {
        if(this.verificarMontoCarga()){
            this.montoCredito+=montoCredito;
            return `Su carga de ${montoCredito} fue un exito!`;
         }
         return `El monto ingresado no cumple con el rango del juego ${this.getNombre()}`;
    }
} 