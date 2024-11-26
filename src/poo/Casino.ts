// import { GestionCasino } from "./interfaceGestionCasino.js";
import readlineSync from "readline-sync";
import pc from "picocolors";
import { Juego } from "./Juego";

//<-----------------PENSADO PARA UN CASINO FISICO PRESENCIAL-------------------->

export class Casino{
    private juegos: Juego[]; //LISTA DE JUEGOS
    private nombre: string; //NOMBRE DE CASINO
    protected salir: boolean; //NOS PERMITE SALIR DEL "do while" CUANDO SEA TRUE.
    protected tiempo = 2000;

    constructor(nombre: string) {
        this.juegos = []; //INICIAR EN ARREGLO VACIO
        this.nombre = nombre;
        this.salir = false; 
    }

    //<--------------------GETTERS Y SETTERS------------------------------->//

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

    // OBTENER EL VALOR BOOLEANO
    public isSalir(): boolean {
        return this.salir;
    }

    // MODIFICAR EL VALOR BOOLEANO
    public setSalir(salir: boolean): void {
        this.salir = salir;
    }

    // OBTENER EL VALOR DEL TIEMPO (setTimeOut)
    public getTiempo(): number {
        return this.tiempo;
    }

    // MODIFICAR EL VALOR DEL TIEMPO (setTimeOut)
    public setTiempo(tiempo: number): void {
        this.tiempo = tiempo;
    }

    //<------------------------A PARTIR DE ACA METODOS COMUNES------------------------------------>
    
    // METODO PARA AGREGAR UN NUEVO JUEGO
    public agregarJuego(juego: Juego) {
        this.setJuego(juego);
    }

    // VERIFICAR ENTRADA DE JUEGOS Y EVITAR LA MISMA SECUENCIA DE INICIO GENERANDO DINAMISMO SEGUN LA LONGITUD
    public verificarEntradaJuego(entrada: number): void {
        if (this.juegos.length > 0) {
            // SI LA ENTRADA ES 1 Y MENOR O IGUAL A LA LONGITUD DE LA LISTA---> LLAMAR AL INICIO DE MENU DE OPCIONES
            if (entrada >= 1 && entrada <= this.juegos.length) {
                this.juegos[entrada - 1].iniciarMenuDeOpciones();
            } else {
                // SINO EVALUAR LOS OTROS CASOS.
                switch (entrada) {
                    case this.juegos.length + 1:
                        this.elegirJuego();
                        break;
                    case this.juegos.length + 2:
                        console.log(pc.bold("Saliste del casino, ¡Gracias por su visita!"));
                        this.setSalir(true);
                        return;
                    default:
                        console.log(pc.magenta(pc.bold("Error, inténtelo nuevamente.")));
                        break;
                }
            }
        }
    }

    // MUESTRA OPCIONES DE JUEGO
    public elegirJuego() {
        let opcionMenu: number;
        setTimeout(() => {
            do {
                opcionMenu = readlineSync.questionInt(pc.white(pc.bold(`${pc.bgCyanBright("Elija una opcion:")}\n1- Tragamonedas Digital.\n2- Tragamonedas Analogico.\n3- Dados.\n4- Ruleta.\n5- Salir del casino.\n`)));
                this.verificarEntradaJuego(opcionMenu);
            } while (opcionMenu !== 0 && !this.isSalir());
        }, this.getTiempo());
    }
}