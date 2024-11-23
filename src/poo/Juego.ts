import readlineSync from "readline-sync";
import pc from "picocolors";
import { GestionCasino } from "./interfaceGestionCasino";
import { Casino } from "./Casino";

// CLASE JUEGO ABSTRACTA
export abstract class Juego implements GestionCasino{
    protected nombre: string;
    protected apuestaMax: number;
    protected apuestaMin: number;
    protected montoCredito: number;
    protected montoApuesta: number
    protected casino:Casino;

    constructor(nombre: string, apuestaMin: number, apuestaMax: number) {
        this.casino= new Casino("");
        this.nombre = nombre;
        this.montoCredito = 0;
        this.montoApuesta = 0;
        this.apuestaMax = apuestaMax;
        this.apuestaMin = apuestaMin;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    // GETTER PARA VER CANTIDAD DE APUESTA
    public getCantidadApuesta(): number {
        return this.montoApuesta;
    }

    // SETTER PARA ACTUALIZAR CANTIDAD QUE SE APUESTA
    public setCantidadApuesta(cantidadApuesta: number): void {
        this.montoApuesta = cantidadApuesta;
    }

    // GETTER DE CREDITOS EN JUEGO
    public getCredito(): number {
        return this.montoCredito;
    }

    // SETTER DE CREDITOS EN JUEGO
    public setCredito(monto: number): void {
        this.montoCredito = monto;
    }

    // GETTER DE APUESTA MAXIMA
    public getApuestaMax(): number {
        return this.apuestaMax;
    }

    // SETTER DE APUESTA MAXIMA
    public setApuestaMax(apuestaMax: number): void {
        this.apuestaMax = apuestaMax;
    }

    // GETTER DE APUESTA MIN
    public getApuestaMin(): number {
        return this.apuestaMin;
    }

    // SETTER DE APUESTA MIN
    public setApuestaMin(apuestaMin: number): void {
        this.apuestaMin = apuestaMin;
    }

    // METODO PARA ACTUALIZAR CREDITO EN JUEGO
    public actualizarMonto(ultimoMonto: number): void {
        this.setCredito(ultimoMonto);
    }

    // VERIFICA EL MONTO DE LA CARGA EVALUANDO EL MINIMO Y MAXIMO EN CADA JUEGO
    public verificarMontoCarga(): boolean {
        return this.getCredito() >= this.getApuestaMin() && this.getCredito() <= this.getApuestaMax();
    }

    // VERIFICA EL MONTO ACTUAL ACREDITADO
    public verificarMontoActual(): boolean {
        // RETORNA TRUE O FALSE
        return this.getCredito() >= this.getApuestaMin() && this.getCredito() <= this.getApuestaMax();
    }

    // CARGAR Y VERIFICAR EL MONTO INGRESADO
    public verificarCargaCredito(entrada:number, cb: () => void): void {
        if (entrada && this) {
            console.log(this.cargarCredito(entrada));
        }
        switch (entrada) {
            case 1: {
                this.mensajeCarga()
                break;
            }
            case 2:{
                console.log(pc.bold("Salió del casino, Gracias por su visita!"));
                return;
            }
            default: {
                console.log(pc.magenta(pc.bold("Error Intentelo nuevamente")));
                setTimeout(() => {
                    console.clear();
                }, 3000);
                cb();
                break;
            }
        }
    }

    public mensajeCarga(): void {
        let opcionMenu: number;
        setTimeout(() => {
            opcionMenu = readlineSync.questionInt(pc.yellow(pc.bold("1- Ingresar monto.\n2- Menu de opciones.\n3- Salir.\n")));
           this.verificarCargaCredito(opcionMenu, this.mensajeCarga);
        }, 3000);
    }
    
    // FUNCION DE VALIDACION DE SUBMENU DE OPCIONES
    public verificarEntradaMenuOpciones(entrada: number, cb: () => void): void {
        switch (entrada) {
            // CARGAR CREDITO
            case 1: {
                this.mensajeCarga();
                break;
            }
            // RETIRAR TICKET 
            case 2: {
                console.log("Presionaste R");
                break;
            }
            // JUGAR
            case 3: {
                console.log("Presionaste J");
                break;
            }
            // IR A MENU PRINCIPAL
            case 4: {
                this.casino.iniciarPrograma();
                break;
            }
            //SALIR DEL JUEGO
            case 5: {
                this.salirJuego();
                break;
            }
            default: {
                console.log(pc.magenta(pc.bold("Error Intentelo nuevamente")));
                cb();
                break;
            }
        }
    }

    public iniciarMenuDeOpciones() {
        let opcionMenu: number;
        setTimeout(() => {
            opcionMenu = readlineSync.questionInt(pc.yellow(pc.bold('1- Cargar credito.\n2- Retirar Tiket.\n3- Ver Instruccion.\n4- Comenzar Juego.\n5- Salir del juego.\n: ')));
            this.verificarEntradaMenuOpciones(opcionMenu, this.iniciarMenuDeOpciones);
        }, 3000);
    }

    public iniciarPrograma(){
        this.casino.iniciarPrograma();
    }

    public iniciarJuego():void{
        //ACA SE PODRIA PONER  LOS METODOS RELACIONADOS AL JUEGO 
    };

    public salirJuego():void{
        // AQUI PORDRIAMOS SIMPLEMENTE SALIR DEL JUEGO Y VOLVER A MOSTRAR LISTA DE JUEGOS
        console.log(pc.bold("Haz salido del juego."));
        this.casino.elegirJuego();
    }
    
    // METODO PARA RETIRAR TICKET
    abstract retirarTicket(): void
    // METODO PARA CARGAR CREDITO AL JUEGO
    abstract cargarCredito(montoCredito: number): string
    abstract calcularPerdida(): number
    abstract calcularGanancia(): number
    abstract apostar(): void
}