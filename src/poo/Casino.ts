// import { GestionCasino } from "./interfaceGestionCasino.js";
import readlineSync from "readline-sync";
import pc from "picocolors";
import { Juego } from "./Juego";

// NUESTRO CASINO
export class Casino{
    private juegos: Juego[]; //LISTA DE JUEGOS
    private nombre: string; //NOMBRE DE CASINO
    protected salir: boolean;
    protected tiempo = 2000;

    constructor(nombre: string) {
        this.juegos = []; //INICIAR EN ARREGLO VACIO
        this.nombre = nombre;
        this.salir = false;
    }

    // OBTENER EL NOMBRE DEL CASINO
    public getNombre(): string {
        return this.nombre;
    }

    // MODIFICAR EL NOMBRE DEL CASINO
    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    // ACTUALIZAR O AÑADIR NUEVO JUEGO */
    public setJuego(juego: Juego): void {
        this.juegos.push(juego);
    }

    public isSalir(): boolean {
        return this.salir;
    }

    public setSalir(salir: boolean): void {
        this.salir = salir;
    }

    public getTiempo(): number {
        return this.tiempo;
    }

    public setTiempo(tiempo: number): void {
        this.tiempo = tiempo;
    }

    public agregarJuego(juego: Juego) {
        this.juegos.push(juego)
    }

    // VERIFICAR ENTRADA DE JUEGOS Y EVITAR LA MISMA SECUENCIA DE INICIO GENERANDO DINAMISMO SEGUN LA LONGITUD
    public verificarEntradaJuego(entrada: number): void {
        if (this.juegos.length > 0) {
            if (entrada >= 1 && entrada <= this.juegos.length) {
                this.juegos[entrada - 1].iniciarMenuDeOpciones();
            } else {
                switch (entrada) {
                    case this.juegos.length + 1:
                        this.iniciarPrograma();
                        break;
                    case this.juegos.length + 2:
                        console.log(pc.bold("Saliste del casino, ¡Gracias por su visita!"));
                        this.setSalir(true);
                        break;
                    default:
                        console.log(pc.magenta(pc.bold("Error, inténtelo nuevamente.")));
                        break;
                }
            }
        }
    }

    // FUNCION DE VALIDACION DEL MENU PRINCIPAL
    private verificarEntradaInicio(entrada: number): void {
        switch (entrada) {
            // MENU OPCIONES
            case 1: {
                this.elegirJuego();
                break;
            }
            // SALIR
            case 2: {
                console.log(pc.bold("Salió del casino, Gracias por su visita!"));
                return;
            }
            // POR DEFECTO AUTOINVOCARSE PARA MEDIR DE VUELTA
            default: {
                console.log(pc.magenta(pc.bold("Error Intentelo nuevamente")));
                break;
            }
        }
    }

    // MUESTRA OPCIONES DE JUEGO
    public elegirJuego() {
        let opcionMenu: number;
        setTimeout(() => {
            do {
                opcionMenu = readlineSync.questionInt(pc.white(pc.bold(`${pc.bgCyanBright("Elija una opcion:")}\n1- Tragamonedas Digital.\n2- Tragamonedas Analogico.\n3- Dados.\n4- Ruleta.\n5- Menu Principal \n6- Salir.\n`)));
                this.verificarEntradaJuego(opcionMenu);
            } while (opcionMenu !== 0 && !this.isSalir());
        }, this.getTiempo());
    }

    // INICIA EL PROGRAMA
    public iniciarPrograma(): void {
        let opcionMenu: number;
        setTimeout(() => {
            do {
                opcionMenu = readlineSync.questionInt(pc.yellow(pc.bold("1- Ver Juegos.\n2- Salir.\n")));
                this.verificarEntradaInicio(opcionMenu);
            } while (opcionMenu !== 0 && !this.isSalir())
        }, this.getTiempo());
    }
}