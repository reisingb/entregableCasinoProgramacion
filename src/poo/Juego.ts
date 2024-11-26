import readlineSync from "readline-sync";
import pc from "picocolors";
import { GestionCasino } from "./interfaceGestionCasino";

// CLASE JUEGO ABSTRACTA
export abstract class Juego implements GestionCasino {
    protected nombre: string;
    protected apuestaMax: number;
    protected apuestaMin: number;
    protected montoCredito: number;
    protected montoApuesta: number
    protected tiempo: number;
    private salirJuego: boolean;

    constructor(nombre: string, apuestaMin: number, apuestaMax: number) {
        this.nombre = nombre;
        this.montoCredito = 0;
        this.montoApuesta = 0;
        this.apuestaMax = apuestaMax;
        this.apuestaMin = apuestaMin;
        this.tiempo = 2000;
        this.salirJuego = false;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    // GETTER PARA VER CANTIDAD DE APUESTA
    public getMontoApuesta(): number {
        return this.montoApuesta;
    }

    // SETTER PARA ACTUALIZAR CANTIDAD QUE SE APUESTA
    public setMontoApuesta(cantidadApuesta: number): void {
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

    public getTiempo(): number {
        return this.tiempo;
    }

    public setTiempo(tiempo: number): void {
        this.tiempo = tiempo;
    }

    public isSalirJuego(): boolean {
        return this.salirJuego;
    }

    public setSalirJuego(salirJuego: boolean): void {
        this.salirJuego = salirJuego;
    }

    // METODO PARA ACTUALIZAR CREDITO EN JUEGO
    public actualizarMontoCredito(apuesta: number): void {
        const credito = this.getCredito() - apuesta
        this.setCredito(credito);
    }

    public verificarMontoApuesta(apuesta: number): boolean {
        return apuesta >= this.getApuestaMin() && apuesta <= this.getApuestaMax() && apuesta <= this.getCredito();
    }

    // VERIFICA EL MONTO DE LA CARGA EVALUANDO EL MINIMO DE CADA JUEGO
    public verificarMontoCarga(): boolean {
        return this.getCredito() >= this.getApuestaMin();
    }

    // CARGAR Y VERIFICAR EL MONTO INGRESADO
    public verificarCargaCredito(entrada: number): void {
        if (entrada && this) {
            console.log(this.cargarCredito(entrada));
        }
        switch (entrada) {
            case 1: {
                this.mensajeCarga()
                break;
            }
            case 2: {
                console.log(pc.bold("Salió del casino, Gracias por su visita!"));
                return;
            }
            default: {
                console.log(pc.magenta(pc.bold("Error Intentelo nuevamente")));
                setTimeout(() => {
                    console.clear();
                }, this.getTiempo());
                ;
                break;
            }
        }
    }

    public mensajeCarga(): void {
        let opcionMenu: number;
        setTimeout(() => {
            do {
                opcionMenu = readlineSync.questionInt(pc.yellow(pc.bold("1- Ingresar monto.\n2- Menu de opciones.\n3- Salir.\n")));
                this.verificarCargaCredito(opcionMenu);
            } while (opcionMenu !== 0 && !this.isSalirJuego())
        }, this.getTiempo());
    }

    // FUNCION DE VALIDACION DE SUBMENU DE OPCIONES
    public verificarEntradaMenuOpciones(entrada: number): void {
        switch (entrada) {
            // CARGAR CREDITO
            case 1: {
                this.mensajeCarga();
                break;
            }
            // JUGAR
            case 2: {
                console.log("Presionaste J");
                break;
            }
            //SALIR DEL JUEGO
            case 3: {
                this.setSalirJuego(true);
                return;
            }
            default: {
                console.log(pc.magenta(pc.bold("Error Intentelo nuevamente")));;
                break;
            }
        }
    }

    public iniciarMenuDeOpciones() {
        let opcionMenu: number;
        setTimeout(() => {
            do {
                opcionMenu = readlineSync.questionInt(pc.yellow(pc.bold('1- Cargar credito.\n2- Ver Instruccion.\n3- Comenzar Juego.\n4- Atras.\n: ')));
                this.verificarEntradaMenuOpciones(opcionMenu);
            } while (opcionMenu !== 0 && !this.isSalirJuego())
        }, this.getTiempo());
    }

    // public salirJuego(): void {
    //     // AQUI PORDRIAMOS SIMPLEMENTE SALIR DEL JUEGO Y VOLVER A MOSTRAR LISTA DE JUEGOS
    //     console.log(pc.bold("Haz salido del juego."));
    //     this.iniciarMenuDeOpciones();
    // }

    public obtenerEntradaApuesta(): number {
        let cantidad:number;
        do{
            cantidad = readlineSync.questionInt("Ingrese cantidad de dinero a apostar: ");
        }while(cantidad !== 0 && !this.verificarMontoApuesta(cantidad));
        return cantidad;
    }

    public obtenerEntradaNum(): number {
        return readlineSync.questionInt("Ingrese una opcion:")
    }

    // METODO PARA RETIRAR TICKET
    public retirarTicket(): void {}

    // METODO PARA CARGAR CREDITO AL JUEGO
    public cargarCredito(montoCredito: number): void { }

    //METODO PARA APOSTAR
    public apostar(apuesta: number) {
        if (this.verificarMontoApuesta(apuesta)) {
            this.actualizarMontoCredito(apuesta);
            console.log(pc.green(`Apostaste ${apuesta}.\n Credito disponible: ${this.getCredito()}`))
        } else {
            console.log(pc.magenta("Monto de apuesta no valido"))
        }
    }

    abstract calcularPerdida(): number
    abstract calcularGanancia(): number 
    abstract IniciarJuego(): void;
    abstract calcularPagos(): number
}