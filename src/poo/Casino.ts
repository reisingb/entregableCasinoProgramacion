// import pc from "picocolors";
import { Juego } from "./Juego";
import { Jugador } from "./Jugador";
import rd from "readline-sync";
import pc from "picocolors";

//<-----------------PENSADO PARA UN CASINO ONLINE-------------------->

export class Casino {
    private juegos: Juego[]; //LISTA DE JUEGOS
    private nombre: string; //NOMBRE DE CASINO
    private salir: boolean; //NOS PERMITE SALIR DEL "do while" CUANDO SEA TRUE.
    private jugadores: Jugador[]; //LISTA DE JUGADORES.

    constructor(nombre: string) {
        this.juegos = []; //INICIAR EN ARREGLO VACIO
        this.nombre = nombre;
        this.salir = false;
        this.jugadores = [];
    }

    //<--------------------GETTERS Y SETTERS------------------------------->//

    public getJugadores(): Jugador[] {
        return this.jugadores;
    }

    // OBTENER EL NOMBRE DEL CASINO
    public getNombre(): string {
        return this.nombre;
    }

    public getJuegos(): Juego[] {
        return this.juegos;
    }

    // MODIFICAR EL NOMBRE DEL CASINO
    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    // OBTENER EL VALOR BOOLEANO
    public isSalir(): boolean {
        return this.salir;
    }

    // MODIFICAR EL VALOR BOOLEANO
    public setSalir(salir: boolean): void {
        this.salir = salir;
    }

    //<------------------------A PARTIR DE ACA METODOS COMUNES------------------------------------>

    // METODO PARA AGREGAR UN NUEVO JUEGO A LA LISTA
    public agregarJuego(juego: Juego): void {
        this.juegos.push(juego);
    }

    // METODO AGREGAR JUGADOR A LA LISTA.
    public agregarJugador(jugador: Jugador): void {
        this.jugadores.push(jugador);
    }

    // VERIFICAR EL JUEGO ELEGIDO Y RETORNAR
    public async validarJuegoElegido(opcionElegida: number, jugador: Jugador): Promise<void> {
        let longitudJuegos: number = this.juegos.length;
    
        if (opcionElegida >= 1 && opcionElegida <= longitudJuegos) {
            // INICIA EL JUEGO Y ESPERA
            console.clear();
            await this.juegos[opcionElegida - 1].iniciarMenuJuego(jugador);
        } else if (opcionElegida === longitudJuegos + 1) {
            console.clear();
            await this.mostrarOpcionesCasino(jugador); 
        } else {
            console.clear();
            console.log(pc.red("Opción inválida."));
        }
    }
    

    // VALIDAMOS LAS OPCIONES DEL MENU PRINCIPAL
    public async validarOpcionesMenuPrincipal(opcion: number, jugador: Jugador): Promise<void> {
        switch (opcion) {
            case 1: {
                console.clear();
                await this.mostrarJuegos(jugador);
                break;
            }
            case 2: {
                console.clear();
                this.validarOpcionesCarga(jugador); 
                break;
            }
            case 3: {
                console.clear();
                this.setSalir(true);
                break;
            }
            default: {
                console.clear();
                console.log(pc.red("Opcion invalida."));
                break;
            }
        }
    }
    

    // VERIFICAR OPCION ELEGIDA AL CARGAR CREDITO
    public validarOpcionesCarga(jugador: Jugador): void {
        let carga: number;
        // MIENTRAS LA CARGA ES MENOR O IGUAL A CERO
        do {
            carga = rd.questionInt(pc.bold("Ingrese el monto para su carga: "));
            // SI LA CARGA INTENTA SER MENOR O IGUAL A CERO--->MENSAJE ERROR
            if (carga <= 0) {
                console.log(pc.red("No puedes cargar un valor menor o igual a cero."));
            }

        } while (carga <= 0);
        // AL SALIR DEL WHILE CARGAR...
        jugador.cargarCredito(carga);
    }

    // CREAR JUGADOR
    public crearJugador(): Jugador {
        let nombre: string;

        // MIENTRAS EL VALOR INGRESADO EN LA ENTRADA DE NOMBRE SEA UN UN NUMERO--->1234567890---->VOLVER  APEDIRLO
        do {
            nombre = rd.question("Ingrese su nombre: ");
            // DEJAR MENSAJE AL USUARIO EN CASO DE INGRESAR UN NUMERO EN VEZ DE LETRAS
            if (!isNaN(parseInt(nombre))) {
                console.log(pc.red("Su nombre no puede ser un numero.Volver a intentar"));
            } 

            //-->isNaN(evalua un numero)-->ESPERA COMO ARGUMENTO UN NUMERO POR ESO SE PARSEO A INT PARA VALIDAR LUEGO DE QUE NO SEA UN NUMERO NEGANDO !isNaN(valor).
        } while (!isNaN(parseInt(nombre)));

        // LUEGO AL SALIR DEL BUCLE
        let dni: number = rd.questionInt("Ingrese su dni: ");
        const jugador: Jugador = new Jugador(nombre, dni);
        return jugador; //RETORNAMOS EL JUGADOR.
    }

    // MOSTRAR OPCIONES DEL CASINO
    private async mostrarOpcionesCasino(jugador: Jugador): Promise<void> {
        let opcion: number;
        do {
            opcion = rd.questionInt(
                `${pc.cyan("Elige una opcion ==>")} ${pc.bold("1. Ver juegos")}/${pc.bold("2. Cargar")}/${pc.bold("3. Salir Casino")}: `
            );
            // Validamos las opciones y esperamos si es necesario.
            await this.validarOpcionesMenuPrincipal(opcion, jugador);
        } while (!this.isSalir());
    }
    

    // MOSTRAR JUEGOS DEL CASINO
    private async mostrarJuegos(jugador: Jugador): Promise<void> {
        if (this.getJuegos().length > 0) {
            const longitudJuegos: number = this.juegos.length;
            const numeroAtras: number = longitudJuegos + 1;
    
            const listaNombres: string = this.juegos
                .map((juego, i) => `${i + 1}. ${juego.getNombre()}`)
                .join("/");
    
            let opcion: number;
            do {
                opcion = rd.questionInt(
                    `${pc.cyan("Elige juego o volver ===>")} ${pc.bold(listaNombres)}/${pc.bold(`${numeroAtras}. Atras`)}: `
                );
                // VALIDAMOS EL JUEGO DE FORMA ASINCRONA.
                await this.validarJuegoElegido(opcion, jugador);
            } while (opcion < 1 || opcion > numeroAtras);
        }
    }
    

    // INICIO PROGRAMA PRINCIPAL
    public async menuPrincipal(): Promise<void> {
        const nuevoJugador: Jugador = this.crearJugador();
        this.agregarJugador(nuevoJugador);
        console.log(pc.bold(`Hola ${nuevoJugador.getNombre()}!, Bienvenido al casino! 🎰🎰🎰\n`));
        console.log(pc.bold(`Tu saldo actual es: ${pc.yellow(nuevoJugador.getMontoCredito())} creditos.`));
        // MOSTRAR LAS OPCIONES DEL CASINO DE FORMA ASINCRONA
        await this.mostrarOpcionesCasino(nuevoJugador);
        console.log(pc.cyan("Gracias por su visita!, Hasta la próxima! :)"));
    }
    
}