import pc from "picocolors";
import { Apuesta } from "./Apuesta";
import { Juego } from "./Juego";

export class Jugador {
    private montoCredito: number;
    private montoApuesta: number;

    private nombre: string;
    private dni: number;

    constructor(nombre: string, dni: number) {
        this.montoCredito = 0;
        this.montoApuesta=0;
        this.nombre = nombre;
        this.dni = dni;
    }

    // <-------------------GETTERS Y SETTERS----------------------------->

    // OBTENER MONTO APUESTA
    public getMontoApuesta(): number {
        return this.montoApuesta;
    }
    // MODIFICAR MONTO APUESTA
    public setMontoApuesta(montoApuesta: number): void {
        this.montoApuesta = montoApuesta;
    }

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
    public apostar(juego: Juego, tipoApuesta: string, mensajeEntrada: string): void {
        const apuesta = new Apuesta(this, tipoApuesta);
        apuesta.procesarApuesta(juego, mensajeEntrada); //PROCESAR Y VALIDAR APUESTA
    }

    // // METODO RETIRAR TICKET (implementación futura)
    // public retirarTicket(): void {
    //     // IMPLEMENTAR LOGICA PARA RETIRAR TICKET
    //     if(this.getMontoCredito() > 0){
    //         console.log(``);
    //     }
    // }
}