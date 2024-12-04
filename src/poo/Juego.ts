import rd from "readline-sync";
import pc from "picocolors";
import { Jugador } from "./Jugador";

//CLASE JUEGO ABSTRACTA
export abstract class Juego{
    protected nombre: string; // NOMBRE DEL JUEGO
    protected apuestaMax: number; // APUESTA MINIMA
    protected apuestaMin: number; // APUESTA MAXIMA
    private salirJuego: boolean; // NOS PERMITE SALIR DEL "do while" CUANDO SEA TRUE.

    constructor(nombre: string, apuestaMin: number, apuestaMax: number) {
        this.nombre = nombre;
        this.apuestaMax = apuestaMax;
        this.apuestaMin = apuestaMin;
        this.salirJuego = false;
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

    // <------------------------METODOS COMUNES------------------------------------>
    
    // METODO PARA MOSTRAR UN MENU CUANDO TERMINA EL JUEGO
    public mostrarMenuDespuesDeJuego(jugador: Jugador): void {
        let opcion: number;
        do {
            console.log("\n¿Que desea hacer ahora?");
            console.log("1. Seguir jugando/ 2. Ir a menu del juego");
            opcion = rd.questionInt(pc.bold("Ingrese opcion: "));

            if (opcion === 1) {
                console.log(pc.blue("¡A seguir jugando!"));
                this.jugar(jugador);
            } else if (opcion === 2) {
                this.menuJuego(jugador)
            } else {
                console.log(pc.red("Opcion invalida. Intente nuevamente."));
            }
        } while (opcion !== 1 && opcion !== 2);
    }

    // METODO DE VALIDACION DE SUBMENU DENTRO DE UN JUEGO
    public validarOpcionesJuego(opcion: number, jugador: Jugador): void {
        switch (opcion) {
            case 1: {
                console.log("Leyendo instruccion txt...");
                break;
            }
            case 2: {
                this.setSalirJuego(false);
                this.jugar(jugador); //ABSTRACTO
                return;
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
            opcionMenu = rd.questionInt(pc.yellow(pc.bold(pc.magenta('1. Ver Instruccion/2. Comenzar Juego/3. Salir Juego: '))));
            this.validarOpcionesJuego(opcionMenu, jugador);
        } while (!this.isSalirJuego());
    }

    // IMPLEMENTACION PARA INICIAR JUEGO
    public iniciarMenuJuego(jugador: Jugador): void {
        console.log(pc.bold(`${pc.yellow(`Has iniciado el Juego 🎰 ==> ${pc.bold(this.getNombre())}`)}\nSaldo Actual: ${pc.yellow(jugador.getMontoCredito())}`));
        this.menuJuego(jugador);
    }

    // <------------------------METODOS ABSTRACTOS------------------------------------>
    abstract jugar(jugador: Jugador): void;
}
