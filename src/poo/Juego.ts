import readlineSync from "readline-sync";
import pc from "picocolors";


// CLASE JUEGO ABSTRACTA
export abstract class Juego {
    protected nombre: string; //NOMBRE DEL JUEGO
    protected apuestaMax: number; //APUESTA MINIMIA DE UN JUEGO
    protected apuestaMin: number; //APUESTA MAXIMA DE UN JUEGO
    protected montoCredito: number;
    private salirJuego: boolean; //NOS PERMITE SALIR DEL "do while" CUANDO SEA TRUE.

    constructor(nombre: string, apuestaMin: number, apuestaMax: number) {
        this.nombre = nombre;
        this.montoCredito = 0;
        this.apuestaMax = apuestaMax;
        this.apuestaMin = apuestaMin;
        this.salirJuego = false;
    }

    // <-------------------------GETTERS Y SETTERS------------------------------------------>

    // GETTER PARA VER NOMBRE JUEGO
    public getNombre(): string {
        return this.nombre;
    }

    // GETTER PARA MODIFICAR NOMBRE JUEGO
    public setNombre(nombre: string): void {
        this.nombre = nombre;
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

    // GETTER PARA VER VALOR BOOLEANO(setTimeOut)
    public isSalirJuego(): boolean {
        return this.salirJuego;
    }

    // GETTER PARA MODIFICAR VALOR BOOLEANO (setTimeOut)
    public setSalirJuego(salirJuego: boolean): void {
        this.salirJuego = salirJuego;
    }

    //<------------------------A PARTIR DE ACA METODOS COMUNES------------------------------------>

    // METODO PARA ACTUALIZAR CREDITO AL APOSTAR
    public actualizarMontoCredito(apuesta: number): void {
        const credito = this.getMontoCredito() - apuesta
        this.setMontoCredito(credito);
    }

    // METODO PARA ACTUALIZAR CREDITO AL CARGAR
    public actualizarMontoAct(carga: number): void {
        const credito = this.getMontoCredito() + carga;
        this.setMontoCredito(credito);
    }


    // METODO PARA VERIFICAR MONTO DE LA APUESTA
    public verificarMontoApuesta(apuesta: number): boolean {
        return apuesta >= this.getApuestaMin() && apuesta <= this.getApuestaMax() && apuesta <= this.getMontoCredito();
    }

    // METODO PARA VERIFICA EL MONTO DE LA CARGA EVALUANDO EL MINIMO DE CADA JUEGO
    public verificarMontoCarga(carga: number): boolean {
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
                this.iniciarJuego();
                break;
            }
            //SALIR DEL JUEGO --> VOLVER ATRAS
            case 4: {
                this.setSalirJuego(true);
                break;
            }
            // ERRORES DE LA ENTRADA
            default: {
                console.log(pc.magenta(pc.bold("Error, Intentelo nuevamente")));
                this.iniciarMenuDeOpciones();
                break;
            }
        }
    }

    // METODO QUE NOS MOSTRARA EN CONSOLA LAS OPCIONES DENTRO DEL JUEGO
    public iniciarMenuDeOpciones(): void {
        let opcionMenu: number;
        do {
            opcionMenu = readlineSync.questionInt(
                pc.yellow(pc.bold('1- Cargar credito.\n2- Ver Instruccion.\n3- Comenzar Juego.\n4- Atras.\n: '))
            );
            this.verificarEntradaMenuOpciones(opcionMenu);
        } while (opcionMenu !== 0 && !this.isSalirJuego());
    }

    // METODO PRIVADO PARA MANEJAR ERRORES DE ENTRADA NUMERICA
    private mensajeErrorEntrada(condicion: boolean, mensaje: string): void {
        // MENSAJE AL USUARIO EN CASO DE NO TENER CREDITO.
        if (condicion) {
            console.log(pc.red(mensaje));
            const salir: boolean = readlineSync.keyInYNStrict(pc.bold("Deseas regresar a opciones de juego?: "));
            if (salir) {
                this.iniciarMenuDeOpciones();
            }
        }
    }

    // METODO QUE NOS PEDIRA EN CONSOLA INGRESAR EL MONTO DE CARGA DE CREDITO EN UN JUEGO
    public obtenerEntradaCarga(): void {
        let cantidad: number;
        do {
            // PEDIR MONTO CARGA
            cantidad = readlineSync.questionInt(pc.bold("Ingrese el monto que desea cargar: "));

            // ESTABLEZCO CONDICION
            let condicion: boolean = !this.verificarMontoCarga(cantidad);

            // EJECUTO EL MENSAJE DE ERROR CON SU CONDICION Y MENSAJE ADECUADO
            this.mensajeErrorEntrada(condicion, `El valor ingresado es menor a minimo de apuesta de el juego ${this.getNombre()}`);
        } while (!this.verificarMontoCarga(cantidad));
        this.cargarCredito(cantidad);
    }

    // METODO QUE NOS PEDIRA EN CONSOLA LA CANTIDAD DE DINERO QUE SE APOSTARA EN UN JUEGO
    public obtenerEntradaApuesta(): void {
        let entradaApuesta: number;
        do {
            // PEDIR MONTO APUESTA
            entradaApuesta = readlineSync.questionInt(pc.bold("Ingrese cantidad de dinero a apostar "));

            // GUARDAR CONDICION CONDICION
            let condicion: boolean = entradaApuesta > this.getMontoCredito();

            // EJECUTO EL MENSAJE DE ERROR CON SU CONDICION Y MENSAJE ADECUADO
            this.mensajeErrorEntrada(condicion, "No tienes suficiente credito para realizar esta apuesta.");
        } while (!this.verificarMontoApuesta(entradaApuesta));

        this.apostar(entradaApuesta)
    }

    // METODO PARA QUE EN CADA JUEGO SE DETERMINE LAS OPCIONES SEGUN LA JUGABILIDAD TIPO NUMERO
    public obtenerEntradaNum(): number {
        return readlineSync.questionInt(pc.bold("Ingrese una opcion:"))
    }
    // METODO PARA QUE EN CADA JUEGO SE DETERMINE LAS OPCIONES SEGUN LA JUGABILIDAD TIPO CADENA
    public obtenerEntradaCadena(): string {
        return readlineSync.question(pc.bold("Ingrese una opcion:"))
    }

    // METODO PARA RETIRAR TICKET
    public retirarTicket(): void { }

    // METODO PARA CARGAR CREDITO AL JUEGO
    public cargarCredito(montoCredito: number): void {
        this.actualizarMontoAct(montoCredito);
        console.log(pc.green(`Cargaste $${montoCredito}.\n${pc.bold("Credito disponible: ")} ${this.getMontoCredito()}`))
        this.iniciarMenuDeOpciones();
    }

    //METODO PARA APOSTAR
    public apostar(apuesta: number): void {
        this.actualizarMontoCredito(apuesta);
        console.log(pc.green(`Apostaste ${apuesta}.\n\n${pc.bold("Credito disponible: ")} ${this.getMontoCredito()}`))
    }

    //<------------------------A PARTIR DE ACA METODOS ABSTRACTOS------------------------------------>

    abstract calcularPerdida(): number;
    abstract calcularGanancia(): number;
    abstract iniciarJuego(): void;
    abstract calcularPagos(): number;
}