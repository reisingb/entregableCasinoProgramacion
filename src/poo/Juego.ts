import readlineSync from "readline-sync";
import pc from "picocolors";
import { GestionCasino } from "./interfaceGestionCasino";

// CLASE JUEGO ABSTRACTA
export abstract class Juego implements GestionCasino {
    protected nombre: string; //NOMBRE DEL JUEGO
    protected apuestaMax: number; //APUESTA MINIMIA DE UN JUEGO
    protected apuestaMin: number; //APUESTA MAXIMA DE UN JUEGO
    protected montoCredito: number; //
    protected montoApuesta: number
    protected tiempo: number;
    private salirJuego: boolean; //NOS PERMITE SALIR DEL "do while" CUANDO SEA TRUE.

    constructor(nombre: string, apuestaMin: number, apuestaMax: number) {
        this.nombre = nombre;
        this.montoCredito = 0;
        this.montoApuesta = 0;
        this.apuestaMax = apuestaMax;
        this.apuestaMin = apuestaMin;
        this.tiempo = 2000;
        this.salirJuego = false;
    }

    // <-------------GETTERS Y SETTERS------------------------------------------>

    // GETTER PARA VER NOMBRE JUEGO
    public getNombre(): string {
        return this.nombre;
    }

    // GETTER PARA MODIFICAR NOMBRE JUEGO
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

    // GETTER PARA VER CREDITOS EN JUEGO
    public getMontoCredito(): number {
        return this.montoCredito;
    }

    // SETTER PARA MODIFICAR CREDITOS EN JUEGO
    public setMontoCredito(monto: number): void {
        this.montoCredito = monto;
    }

    // GETTER PARA VER APUESTA MAXIMA
    public getApuestaMax(): number {
        return this.apuestaMax;
    }

    // SETTER PARA MODIFICAR APUESTA MAXIMA
    public setApuestaMax(apuestaMax: number): void {
        this.apuestaMax = apuestaMax;
    }

    // GETTER PARA VER APUESTA MIN
    public getApuestaMin(): number {
        return this.apuestaMin;
    }

    // SETTER PARA MODIFICAR APUESTA MIN
    public setApuestaMin(apuestaMin: number): void {
        this.apuestaMin = apuestaMin;
    }

    // GETTER PARA VER EL TIMPO DE ESPERA
    public getTiempo(): number {
        return this.tiempo;
    }

    // SETTER PARA MODIFICAR TIEMPO DE ESPERA
    public setTiempo(tiempo: number): void {
        this.tiempo = tiempo;
    }

    // GETTER PARA VER VALOR BOOLEANO(setTimeOut)
    public isSalirJuego(): boolean {
        return this.salirJuego;
    }

    // GETTER PARA MODIFICAR VALOR BOOLEANO (setTimeOut)
    public setSalirJuego(salirJuego: boolean): void {
        this.salirJuego = salirJuego;
    }

    //<------------------------A PARTIR DE ACA METODOS COMUNES------------------------------------>

    // METODO PARA ACTUALIZAR CREDITO EN JUEGO
    public actualizarMontoCredito(apuesta: number): void {
        const credito = this.getMontoCredito() - apuesta
        this.setMontoCredito(credito);
    }

    // METODO PARA VERIFICAR MONTO DE LA APUESTA
    public verificarMontoApuesta(apuesta: number): boolean {
        return apuesta >= this.getApuestaMin() && apuesta <= this.getApuestaMax() && apuesta <= this.getMontoCredito();
    }

    // METODO PARA VERIFICA EL MONTO DE LA CARGA EVALUANDO EL MINIMO DE CADA JUEGO
    public verificarMontoCarga(carga:number): boolean {
        return carga >= this.getApuestaMin();
    }

    // METODO DE VALIDACION DE SUBMENU DE OPCIONES DENTRO DE UN JUEGO
    public verificarEntradaMenuOpciones(entrada: number): void {
        switch (entrada) {
            // CARGAR CREDITO
            case 1: {
                this.obtenerEntradaCarga()
                break;
            }
            // VER INSTRUCCION DEL JUEGO EN ESPECIFICO LEYENDO EL TXT
            case 2: {
                console.log("Leyendo instruccion txt...");
                break;
            }
            // COMENZAR A JUGAR 
            case 3: {
                this.obtenerEntradaApuesta();
                break;
            }
            //SALIR DEL JUEGO --> VOLVER ATRAS
            case 4: {
                this.setSalirJuego(true);
                return;
            }
            // ERRORES DE LA ENTRADA
            default: {
                console.log(pc.magenta(pc.bold("Error Intentelo nuevamente")));;
                break;
            }
        }
    }

    // METODO QUE NOS MOSTRARA EN CONSOLA LAS OPCIONES DENTRO DEL JUEGO
    public iniciarMenuDeOpciones() {
        let opcionMenu: number;
        setTimeout(() => {
            do {
                opcionMenu = readlineSync.questionInt(pc.yellow(pc.bold('1- Cargar credito.\n2- Ver Instruccion.\n3- Comenzar Juego.\n4- Atras.\n: ')));
                this.verificarEntradaMenuOpciones(opcionMenu);
            } while (opcionMenu !== 0 && !this.isSalirJuego())
        }, this.getTiempo());
    }

    // METODO QUE NOS PEDIRA EN CONSOLA INGRESAR EL MONTO DE CARGA DE CREDITO EN UN JUEGO
    public obtenerEntradaCarga(): number {
        let cantidad: number;
        do {
            cantidad = readlineSync.questionInt(pc.bold("Ingrese el monto que desea cargar: "));
        } while (cantidad !== 0 && !this.verificarMontoCarga(cantidad) && !this.isSalirJuego());
        return cantidad;
    }

    // METODO QUE NOS PEDIRA EN CONSOLA LA CANTIDAD DE DINERO QUE SE APOSTARA EN UN JUEGO
    public obtenerEntradaApuesta(): number {
        let cantidad: number;
        do {
            cantidad = readlineSync.questionInt(pc.bold("Ingrese cantidad de dinero a apostar: "));
        } while (cantidad !== 0 && !this.verificarMontoApuesta(cantidad) && !this.isSalirJuego());
        return cantidad;
    }

    // METODO PARA QUE EN CADA JUEGO SE DETERMINE LAS OPCIONES SEGUN LA JUGABILIDAD
    public obtenerEntradaNum(): number {
        return readlineSync.questionInt(pc.bold("Ingrese una opcion:"))
    }

    // METODO PARA RETIRAR TICKET
    public retirarTicket(): void { }

    // // METODO PARA CARGAR CREDITO AL JUEGO
    // public cargarCredito(montoCredito: number): void { }

    //METODO PARA APOSTAR
    public apostar(apuesta: number) {
        if (this.verificarMontoApuesta(apuesta)) {
            this.actualizarMontoCredito(apuesta);
            console.log(pc.green(`Apostaste ${apuesta}.\n Credito disponible: ${this.getMontoCredito()}`))
        } else {
            console.log(pc.magenta("Monto de apuesta no valido"))
        }
    }

    //<------------------------A PARTIR DE ACA METODOS ABSTRACTOS------------------------------------>

    abstract calcularPerdida(): number
    abstract calcularGanancia(): number
    abstract IniciarJuego(): void;
    abstract calcularPagos(): number
}