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
    public validarJuegoElegido(opcionElegida: number, jugador: Jugador): void {
        let longitudJuegos: number = this.juegos.length;
        // SI LA OPCION ELEGIDA ESTA ENTRE EL RANGO 1 A LONGITUD DE LISTA DE JUEGOS...
        if (opcionElegida >= 1 && opcionElegida <= longitudJuegos) {
            //INICIAR EL JUEGO CORRESPONDIENTE RESTANDOLE 1 PARA ACCEDER AL INDICE CORRESPONDIENTE...
            this.juegos[opcionElegida - 1].iniciarMenuJuego(jugador)
        } else {
            if (opcionElegida === longitudJuegos + 1) {
                this.mostrarOpcionesCasino(jugador);
            }
        }
    }

    // VALIDAMOS LAS OPCIONES DEL MENU PRINCIPAL
    public validarOpcionesMenuPrincipal(opcion: number, jugador: Jugador): void {
        switch (opcion) {
            case 1: {
                this.mostrarJuegos(jugador);
                break;
            }
            case 2: {
                this.validarOpcionesCarga(jugador);
                break;
            }
            case 3: {
                this.setSalir(true);
                return;
            }
            default: {
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
            carga = rd.questionInt(pc.bold("Ingrese el monto a cargar: "));
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
    private mostrarOpcionesCasino(jugador: Jugador): void {
        let opcion: number;
        // TERMINARA EL PROGRAMA CUANDO SALIR SEA---->TRUE
        do {
            // PEDIR A USUARIO ELEGIR LA OPCION NUMERICA
            opcion = rd.questionInt(`${pc.cyan("Elige una opcion ==>")} ${pc.bold("1. Ver juegos")}/${pc.bold("2. Cargar: ")}/${pc.bold("3. Salir Casino: ")}`);
            this.validarOpcionesMenuPrincipal(opcion, jugador);//VALIDAR LA OPCION ELEGIDA Y PROCESAR.
        } while (!this.isSalir());
    }

    // MOSTRAR JUEGOS DEL CASINO
    private mostrarJuegos(jugador: Jugador): void {
        // SI LA LISTA DE JUEGOS TIENE CONTENIDO...
        if (this.getJuegos().length > 0) {
            const longitudJuegos: number = this.juegos.length;
            let numeroAtras: number = longitudJuegos + 1;

            // CREAR UN NUEVO ARREGLO SOLO CON LOS NOMBRES DE JUEGOS.
            const listaNombres: string = this.juegos.map((juego, i) => { // [] ju1,
                let inicioOpcion = i + 1; //--->ANTES DE RETORNAR GUARDAR LA SUMA DE (I + 1, SABIENDO QUE I ES EL INDICE) --->PARA COMENZAR CON OPCIONES DESDE 1 EN ADELANTE.
                return `${inicioOpcion}. ${juego.getNombre()}`; //-->RETORNO DE EJEMPLO--> ["1. DADO", "2. RULETA", ETC].
            }).join("/") //-->MEDIANTE EL JOIN  UNIR LOS ELEMENTO SEPARANDOLOS POR UN "/" CREANDO UN SOLO STRING---> EJEMPLO-->"1. DADO/2. RULETA/ETC."

            let opcion: number;
            do {
                // PEDIR A USUARIO ELEGIR LA OPCION NUMERICA
                opcion = rd.questionInt(`${pc.cyan("Elige juego o volver ===>")} ${pc.bold(listaNombres)}/${pc.bold(`${numeroAtras}. Atras:`)} `);
                if (opcion < 1 || opcion > numeroAtras) {
                    console.log(pc.red("Opcion no valida."));
                }
                this.validarJuegoElegido(opcion, jugador);//VALIDAR LA OPCION ELEGIDA Y PROCESAR.
            } while (opcion < 1 || opcion > numeroAtras);
        }
    }

    // INICIO PROGRAMA PRINCIPAL
    public menuPrincipal(): void {
        const nuevoJugador:Jugador = this.crearJugador(); //EL METODO NOS RETORNABA UN JUGADOR ¿RECUERDAN?---> SE GUARDO EN VARIABLE PARA REFERENCIA.
        this.agregarJugador(nuevoJugador); //GUARDO EL NUEVO JUGADOR.
        // DAMOS LA BIENVENIDA EN TERMINAL
        console.log(pc.bold(`Hola ${nuevoJugador.getNombre()}!, Bienvenido al casino!🎰🎰🎰\n`));
        console.log(pc.bold(`Tu saldo actual es: ${pc.yellow(nuevoJugador.getMontoCredito())} creditos.`));
        this.mostrarOpcionesCasino(nuevoJugador); //----> LLAMAR FUNCION PARA VALIDAR QUE HARÁ EL USUARIO DESDE UN PRINCIPIO.
        // DESPEDIDA
        console.log(pc.cyan("Gracias por su visita!, Hasta la proxima! :)"));
    }
}