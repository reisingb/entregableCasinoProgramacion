import { Jugador } from "./Jugador";
import { Juego } from "./Juego";
import pc from "picocolors";
import rd from "readline-sync";

export class Apuesta {
    private jugador: Jugador;
    private monto: number;
    private tipoApuesta: string;

    constructor(jugador: Jugador, monto:number, tipoApuesta: string) {
        this.jugador = jugador;
        this.monto = monto;
        this.tipoApuesta = tipoApuesta;
    }

    // <-----------------------GETTERS Y SETTERS------------------------------------>

    
    public getJugador(): Jugador {
        return this.jugador;
    }

    public getMonto(): number {
        return this.monto;
    }

    public setMonto(apuesta:number): void {
        this.monto = apuesta;
    }

    public getTipoApuesta(): string {
        return this.tipoApuesta;
    }

    public setTipoApuesta(tipoApuesta: string): void {
        this.tipoApuesta = tipoApuesta;
    }


    // <----------------------------METODOS COMUNES----------------------------------------------->
    // VALIDAR MONTO APUESTA
    public validarMontoApuesta(juego: Juego): boolean {
        return this.getMonto() >= juego.getApuestaMin() && this.getMonto() <= juego.getApuestaMax() && this.getMonto() <= this.jugador.getMontoCredito();
    }

    public procesarApuesta(juego:Juego, monto:number): void {
        // MIENTRAS APUESTA NO CUMPLA CON LOS REQUISITOS DE APUESTA
        do{
            this.setMonto(monto);
            if (this.getMonto() > this.jugador.getMontoCredito() && this.getMonto() < juego.getApuestaMax()) {
                console.log(`${pc.yellow(`Saldo insuficiente`)}\n${pc.bold(`Su saldo actual es de: ${this.jugador.getMontoCredito()}`)}`);
                
                // PREGUNTAR SI DESEA CARGAR
                let carga:boolean =rd.keyInYNStrict("Salir para cargar?: ");
                if(carga){
                    juego.setSalirJuego(true);
                    return;
                }
            }else{
                console.log(pc.red(`La apuesta echa para el juego ${juego.getNombre()} no cumple con los requisitos del minimo y maximo\n${pc.yellow(`MIN:${juego.getApuestaMin()}-MAX:${juego.getApuestaMax()}`)}`));
            }
        }while(!this.validarMontoApuesta(juego));

        // SI SALE DEL BUCLE --->RESTAR SALDO A JUGADOR, ETC...
        this.jugador.restarSaldoActual(this.getMonto());
        console.log(pc.green(`${this.jugador.getNombre()} aposto ${this.getMonto()} creditos`));
        console.log(pc.bold(`Saldo actual: ${pc.yellow(this.jugador.getMontoCredito())}`));
    }

}