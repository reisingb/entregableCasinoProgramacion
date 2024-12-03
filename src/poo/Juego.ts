import rd from "readline-sync";
import pc from "picocolors";
import { Apuesta } from "./Apuesta";
import { Jugador } from "./Jugador";

//CLASE JUEGO ABSTRACTA
export abstract class Juego {
    protected nombre: string; // NOMBRE DEL JUEGO
    protected apuestaMax: number; // APUESTA MINIMA
    protected apuestaMin: number; // APUESTA MAXIMA
    private salirJuego: boolean; // NOS PERMITE SALIR DEL "do while" CUANDO SEA TRUE.
    private apuestas: Apuesta[];

    constructor(nombre: string, apuestaMin: number, apuestaMax: number) {
        this.nombre = nombre;
        this.apuestaMax = apuestaMax;
        this.apuestaMin = apuestaMin;
        this.salirJuego = false;
        this.apuestas = [];
    }

    // <-------------------------GETTERS Y SETTERS----------------------------------------->

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getApuestaMax(): number {
        return this.apuestaMax;
    }

    public setApuestaMax(apuestaMax: number): void {
        this.apuestaMax = apuestaMax;
    }

    public getApuestaMin(): number {
        return this.apuestaMin;
    }

    public setApuestaMin(apuestaMin: number): void {
        this.apuestaMin = apuestaMin;
    }

    public isSalirJuego(): boolean {
        return this.salirJuego;
    }

    public setSalirJuego(salirJuego: boolean): void {
        this.salirJuego = salirJuego;
    }

    public getApuestas(): Apuesta[] {
        return this.apuestas;
    }


    public setApuestas(apuesta: Apuesta): void {
        this.apuestas.push(apuesta);
    }

    // <------------------------METODOS COMUNES------------------------------------>

    // METODO DE VALIDACION DE SUBMENU DENTRO DE UN JUEGO
    public validarOpcionesJuego(opcion: number, jugador: Jugador): void {
        switch (opcion) {
            case 1: {
                console.log("Leyendo instruccion txt...");
                break;
            }
            case 2: {
                this.opcionesApuestaJuego(jugador); //ABSTRACTO
                break;
            }
            case 3: {
                this.setSalirJuego(true);
                return;
            }
            default: {
                console.log(pc.magenta(pc.bold("Error, intentelo nuevamente")));
                this.menuJuego(jugador);
                break;
            }
        }
    }

    // METODO QUE NOS MOSTRARA EN CONSOLA LAS OPCIONES QUE TENDRAN TODOS LOS JUEGOS.
    public menuJuego(jugador: Jugador): void {
        let opcionMenu: number;
        do {
            opcionMenu = rd.questionInt(pc.yellow(pc.bold(pc.yellow('1- Ver Instruccion/2- Comenzar Juego/3- Atras: '))));
            this.validarOpcionesJuego(opcionMenu, jugador);
        } while (!this.isSalirJuego());
    }

    // <------------------------METODOS ABSTRACTOS------------------------------------>
    abstract iniciarJuego(jugador: Jugador): void;
    abstract opcionesApuestaJuego(jugador: Jugador): void;
    abstract calcularGanancia(): number;
}