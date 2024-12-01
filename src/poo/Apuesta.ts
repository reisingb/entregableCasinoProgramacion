import { Jugador } from "./Jugador";
import { Juego } from "./Juego";
import pc from "picocolors";

export class Apuesta {
    private jugador: Jugador;
    private monto: number;
    private tipoApuesta: string;

    constructor(jugador: Jugador, monto: number, tipoApuesta: string) {
        this.jugador = jugador;
        this.monto = monto;
        this.tipoApuesta = tipoApuesta;
    }

    public getMonto(): number {
        return this.monto;
    }

    public getTipoApuesta(): string {
        return this.tipoApuesta;
    }

    public setTipoApuesta(tipoApuesta: string): void {
        this.tipoApuesta = tipoApuesta;
    }

    public validarMontoApuesta(juego: Juego): boolean {
        return this.getMonto() >= juego.getApuestaMin() && this.getMonto() <= juego.getApuestaMax() && this.getMonto() <= this.jugador.getMontoCredito();
    }

    public realizarApuesta(juego: Juego): void {
        if (this.validarMontoApuesta(juego)) {
            this.jugador.restarSaldoActual(this.getMonto());
            console.log(pc.green(`${this.jugador.getNombre()}Aposto ${this.getMonto()} creditos`));
            console.log(pc.bold(`Saldo actual: ${pc.yellow(this.jugador.getMontoCredito())}`));
            
        } else if(this.getMonto() > this.jugador.getMontoCredito()) {
            console.log(pc.yellow(`Saldo insuficiente`));
            console.log(pc.bold(`Su saldo actual es de: ${this.jugador.getMontoCredito()}`));
        }else{
            console.log(pc.red(`El tipo de apuesta para el juego ${juego.getNombre()} no es valido.`));
            
        }
    }
}