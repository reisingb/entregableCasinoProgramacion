import { Jugador } from "./Jugador";
import { Juego } from "./Juego";
import pc from "picocolors";
import rd from "readline-sync";

export class Apuesta {
    private jugador: Jugador;
    private monto: number;
    private tipoApuesta?: string;

    constructor(jugador: Jugador, tipoApuesta?: string) {
        this.jugador = jugador;
        this.monto = 0;
        if (this.tipoApuesta !== undefined) {
            this.tipoApuesta = tipoApuesta;
        }
    }

    // <-----------------------GETTERS Y SETTERS------------------------------------>


    public getJugador(): Jugador {
        return this.jugador;
    }

    public getMonto(): number {
        return this.monto;
    }

    public setMonto(apuesta: number): void {
        this.monto = apuesta;
    }

    public getTipoApuesta(): string | null {
        if (this.tipoApuesta) {
            return this.tipoApuesta;
        }
        return null
    }

    public setTipoApuesta(tipoApuesta: string): void {
        this.tipoApuesta = tipoApuesta;
    }

    // <----------------------------METODOS COMUNES----------------------------------------------->
    // VALIDAR MONTO APUESTA
    public esApuestaValida(juego: Juego): boolean {
        return this.getMonto() >= juego.getApuestaMin() && this.getMonto() <= juego.getApuestaMax() && this.getMonto() <= this.jugador.getMontoCredito();
    }

    public procesarApuesta(juego: Juego): void {
        const apuesta: number = rd.questionInt(pc.bold("Ingrese el monto para su apuesta: "));
        this.setMonto(apuesta);
        if (this.jugador.getMontoCredito() <= 0) {
            console.log(`${pc.yellow(`Saldo insuficiente.`)}\n${pc.bold(`Su saldo actual es de: ${this.jugador.getMontoCredito()}`)}`);
            // PREGUNTAR SI DESEA CARGAR
            let esCarga: boolean = rd.keyInYNStrict("Salir para cargar?: ");
            if (esCarga) {
                juego.setSalirJuego(true); //ATRIBUTO SALIR DE JUEGO SE ESTABLECE EN TRUE
                return;
            } else {
                // SI NO
                this.procesarApuesta(juego); // REPETIR PROCESO
                return;
            }
        }
        if (!this.esApuestaValida(juego)) {
            console.log(pc.red(`El monto de apuesta debe estar entre: MIN: ${pc.bold(juego.getApuestaMin())}-MAX: ${pc.bold(juego.getApuestaMax())}`));
            this.procesarApuesta(juego); // REPETIR PROCESO
            return;
        }
        // SI SALE DE LAS CONDICIONES, RESTAR SALDO Y PROCESAR LA APUESTA
        this.jugador.restarSaldoActual(this.getMonto());
        console.log(pc.green(`Has apostado ${this.getMonto()} creditos.`));
        console.log(pc.bold(`Saldo actual: ${pc.gray(this.jugador.getMontoCredito())}`));
    }
}