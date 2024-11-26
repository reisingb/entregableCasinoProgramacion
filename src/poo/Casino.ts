// import { GestionCasino } from "./interfaceGestionCasino.js";
import readlineSync from "readline-sync";
import pc from "picocolors";
import { Analogico } from "./Analogico";
import { Digital } from "./Digital";
import { Dado } from "./Dado";
import { Ruleta } from "./Ruleta";
import { GestionCasino } from "./interfaceGestionCasino";
import { Juego } from "./Juego";

export class Casino implements GestionCasino {
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

    // // OBTENER LA LISTA DE LOS JUEGOS
    // public getJuegos(): Juego[] {
    //     if (!this.verificarLongitudListaJuegos()) {
    //         return `No hay juegos en el casinno`;
    //     }
    //     return this.juegos;
    // }

    // ACTUALIZAR O AÑADIR NUEVO JUEGO */
    public setJuego(juego: Juego): void {
        this.juegos.push(juego);
    }

    // METODO QUE VERIFICA LA LONGITUD DE LA LISTA DE JUEGOS
    public verificarLongitudListaJuegos(): boolean {
        return this.juegos.length > 0;
    }

    // METODO QUE SE ENCARGA DE INSTANCIAR LOS JUEGOS SEGUN EL NOMBRE

    public getJuego(): Juego | null {
        if (!this.juegos) return null;
        return this.juegos;

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

    agregarJuego(juego: Juego){
        this.juegos.push(juego)
    }


    // FUNCION QUE VALIDA LAS ENTRADAS PARA EL JUEGO ELEGIDO
    public verificarEntradaJuego(entrada: number) {
        switch (entrada) {
            case 1: {
                this.juegos[0].iniciarMenuDeOpciones()
                break;
            }
            case 2: {
                this.juegos[1].iniciarMenuDeOpciones()
                break;
            }
            case 3: {
                this.juegos[2].iniciarMenuDeOpciones()
                break
            }
            case 4: {
                this.juegos[3].iniciarMenuDeOpciones()
                break;
            }
            case 5: {
                this.iniciarPrograma();
                break;
            }
            case 6: {
                console.log(pc.bold("Saliste del casino, Gracias por su visita!"));
                this.setSalir(true)
                break;
            }
            default: {
                console.log(pc.magenta(pc.bold("Error Intentelo nuevamente")));
                break;
            }

        }
        return this.getJuego()
    }

    // MUESTRA OPCIONES DE JUEGO
    public elegirJuego() {
        let opcionMenu: number;
        setTimeout(() => {
            do {
                opcionMenu = readlineSync.questionInt(pc.white(pc.bold(`${pc.bgCyanBright("Elija una opcion:")}\n1- Tragamonedas digital.\n2- Tragamonedas Analogico.\n3- Dados.\n4- Ruleta.\n5- Menu Principal \n6- Salir.\n`)));
                this.verificarEntradaJuego(opcionMenu);
            } while (opcionMenu !== 0 && !this.isSalir());
        }, this.getTiempo());
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
                break;
            }
            // POR DEFECTO AUTOINVOCARSE PARA MEDIR DE VUELTA
            default: {
                console.log(pc.magenta(pc.bold("Error Intentelo nuevamente")));
                ;
                break;
            }
        }
    }

    // INICIA EL PROGRAMA
    public iniciarPrograma(): void {
        let opcionMenu: number;
        setTimeout(() => {
            opcionMenu = readlineSync.questionInt(pc.yellow(pc.bold("1- Ver Juegos.\n2- Salir.\n")));
            this.verificarEntradaInicio(opcionMenu, this.iniciarPrograma);
        }, 3000);
    }
}