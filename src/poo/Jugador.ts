import pc from "picocolors";
import { Apuesta } from "./Apuesta";
import { Juego } from "./Juego";

export class Jugador {
    private montoCredito: number;
    private nombre: string;
    private dni: number;

    constructor(nombre: string, dni: number) {
        this.montoCredito = 0;
        this.nombre = nombre;
        this.dni = dni;
    }

    // <-------------------GETTERS Y SETTERS----------------------------->

    public getMontoCredito(): number {
        return this.montoCredito;
    }

    public setMontoCredito(monto: number): void {
        this.montoCredito = monto;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getDni(): number {
        return this.dni;
    }

    public setDni(dni: number): void {
        this.dni = dni;
    }

    // <-------------------METODOS COMUNES----------------------------->

    public restarSaldoActual(apuesta: number): void {
        this.montoCredito -= apuesta;
    }

    private aumentarSaldo(carga: number): void {
        this.montoCredito += carga;
    }

    public cargarCredito(carga: number): void {
        this.aumentarSaldo(carga);
        console.log(pc.bold(`${pc.cyan("¡Gracias por su carga!")}\n${pc.green("Credito: ")}${this.getMontoCredito()}`));
    }

    public apostar(monto: number, juego: Juego, tipoApuesta: string): void {
        const apuesta = new Apuesta(this, monto, tipoApuesta);
        apuesta.realizarApuesta(juego);
    }

    // // METODO RETIRAR TICKET (implementación futura)
    // public retirarTicket(): void {
    //     // IMPLEMENTAR LOGICA PARA RETIRAR TICKET
    //     if(this.getMontoCredito() > 0){
    //         console.log(``);
    //     }
    // }
}