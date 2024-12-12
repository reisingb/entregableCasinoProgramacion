import rd from "readline-sync";
import pc from "picocolors";
import { Jugador } from "./Jugador";

//CLASE JUEGO ABSTRACTA
export abstract class Juego {
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
    public async mostrarMenuDespuesDeJuego(jugador: Jugador): Promise<void> {
        let opcion: number;
        do {
            console.log("\n¿Que desea hacer ahora?");
            console.log("1. Seguir jugando/ 2. Ir a menu del juego");
            opcion = rd.questionInt(pc.bold("Ingrese opcion: "));
    
            if (opcion === 1) {
                console.clear();
                console.log(pc.blue("¡A seguir jugando!"));
                await this.jugar(jugador); // ASEGURAR ESPERA
            } else if (opcion === 2) {
                console.clear();
                await this.menuJuego(jugador); // ASEGURAR ESPERA
            } else {
                console.clear();
                console.log(pc.red("Opcion invalida. Intente nuevamente."));
            }
        } while (opcion !== 1 && opcion !== 2);
    }
    
    // METODO DE VALIDACION DE SUBMENU DENTRO DE UN JUEGO
    public async validarOpcionesJuego(opcion: number, jugador: Jugador): Promise<void> {
        switch (opcion) {
            case 1: {
                await this.mostrarInstrucciones();
                await this.menuJuego(jugador);
                break;
            }
            case 2: {
                this.setSalirJuego(false);
                await this.jugar(jugador); // ESPERAR
                return;
            }
            case 3: {
                console.clear();
                this.setSalirJuego(true);
                return;
            }
            default: {
                console.clear();
                console.log(pc.magenta(pc.bold("Error, intentelo nuevamente")));
                await this.menuJuego(jugador); // ESPERAR
                break;
            }
        }
    }
    
    // METODO QUE NOS MOSTRARA EN CONSOLA LAS OPCIONES QUE TENDRAN TODOS LOS JUEGOS.
    public async menuJuego(jugador: Jugador): Promise<void> {
        let opcionMenu: number;
        do {
            opcionMenu = rd.questionInt(pc.yellow(pc.bold(pc.magenta('1. Ver Instruccion/2. Comenzar Juego/3. Salir Juego: '))));
            await this.validarOpcionesJuego(opcionMenu, jugador);
        } while (!this.isSalirJuego());
    }
    

    // IMPLEMENTACION PARA INICIAR JUEGO
    public async iniciarMenuJuego(jugador: Jugador): Promise<void> {
        console.clear();
        console.log(pc.bold(`${pc.yellow(`Has iniciado el Juego 🎰 ==> ${pc.bold(this.getNombre())}`)}\nSaldo Actual: ${pc.yellow(jugador.getMontoCredito())}`));
        await this.menuJuego(jugador);
    }

    // <------------------------METODOS ABSTRACTOS------------------------------------>
    abstract jugar(jugador: Jugador): Promise<void>;
    abstract mostrarInstrucciones(): Promise<void>;
}