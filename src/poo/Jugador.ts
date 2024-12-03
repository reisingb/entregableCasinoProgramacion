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

    // OBTENER MONTO CREDITO
    public getMontoCredito(): number {
        return this.montoCredito;
    }

    // MODIFICAR MONTO CREDITO
    public setMontoCredito(monto: number): void {
        this.montoCredito = monto;
    }

    // OBTENER NOMBRE DEL JUGADOR
    public getNombre(): string {
        return this.nombre;
    }

    // ACTUALIZAR MONTO DEL JUGADOR
    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    // OBTENER DNI DEL JUGADOR
    public getDni(): number {
        return this.dni;
    }

    // MODIFICAR DNI DE JUGADOR
    public setDni(dni: number): void {
        this.dni = dni;
    }

    // <------------------------------------METODOS COMUNES----------------------------->

    // RESTAR AL APOSTAR
    public restarSaldoActual(apuesta: number): void {
        this.montoCredito -= apuesta;
    }

    // AUMENTAR AL CARGAR
    private aumentarSaldo(carga: number): void {
        this.montoCredito += carga;
    }

    // PROCESAR CARGA DE CREDITO
    public cargarCredito(carga: number): void {
        this.aumentarSaldo(carga);
        console.log(pc.bold(`${pc.cyan("¡Gracias por su carga!")}\n${pc.green("Credito disponible: ")}${this.getMontoCredito()}`));
    }

    // ACCION DE APOSTAR
    public apostar(juego: Juego, monto:number, tipoApuesta: string): void {
        const apuesta = new Apuesta(this, monto, tipoApuesta);
        apuesta.procesarApuesta(juego, monto); //PROCESAR Y VALIDAR APUESTA
    }

    // // METODO RETIRAR TICKET (implementación futura)
    // public retirarTicket(): void {
    //     // IMPLEMENTAR LOGICA PARA RETIRAR TICKET
    //     if(this.getMontoCredito() > 0){
    //         console.log(``);
    //     }
    // }
}