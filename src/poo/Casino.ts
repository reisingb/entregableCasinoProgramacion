// import pc from "picocolors";
import { Juego } from "./Juego";
import { Jugador } from "./Jugador";
import rd from "readline-sync";
import pc from "picocolors";

//<-----------------PENSADO PARA UN CASINO FISICO PRESENCIAL-------------------->

export class Casino{
    private juegos: Juego[]; //LISTA DE JUEGOS
    private nombre: string; //NOMBRE DE CASINO
    private salir: boolean; //NOS PERMITE SALIR DEL "do while" CUANDO SEA TRUE.
    private jugador:Jugador;

    constructor(nombre: string, jugador:Jugador) {
        this.juegos = []; //INICIAR EN ARREGLO VACIO
        this.nombre = nombre;
        this.salir = false;
        this.jugador=jugador;
    }

    //<--------------------GETTERS Y SETTERS------------------------------->//

    public getJugador(): Jugador {
        return this.jugador;
    }

    public setJugador(jugadores: Jugador): void {
        this.jugador = jugadores;
    }

    // OBTENER EL NOMBRE DEL CASINO
    public getNombre(): string {
        return this.nombre;
    }

    public getJuegos():Juego[]{
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

    // METODO PARA AGREGAR UN NUEVO JUEGO
    public agregarJuego(juego: Juego):void {
        this.juegos.push(juego);
    }

    // VERIFICAR EL JUEGO ELEGIDO Y RETORNAR
    public validarJuegoElegido(opcionElegida:number, jugador:Jugador):number{
        if(opcionElegida >= 1 && opcionElegida <= this.juegos.length){
            this.juegos[opcionElegida - 1].iniciarJuego(jugador)
        }
        return opcionElegida;
    }

    // VERIFICAR OPCION ELEGIDA AL CARGAR CREDITO
    private validarOpcionesCarga(jugador:Jugador):void {
        let opcionMenuPrincipal:number | boolean | string= rd.keyInYNStrict(pc.bold("Deseas cargar credito?: "));
        if(opcionMenuPrincipal){
            opcionMenuPrincipal = rd.questionInt(pc.bold("Cuanto deseas Cargar?: "));
            jugador.cargarCredito(opcionMenuPrincipal);
            this.mostrarJuegos(jugador);
        }else{
            this.mostrarJuegos(jugador);
        }
    }

    // INICIO PROGRAMA PRINCIPAL
    public menuPrincipal(jugador:Jugador):void{
        console.log(pc.bgCyan(pc.bold(`Hola ${jugador.getNombre()}!! Bienvenido al casino!\n`)));
        console.log(pc.bold(`Tu credito actual es de: ${pc.yellow(jugador.getMontoCredito())}`));
        this.validarOpcionesCarga(jugador);
    }

    // MOSTRAR JUEGOS DEL CASINO
    private mostrarJuegos(jugador:Jugador):void{
        if(this.getJuegos().length > 0){
            const listaNombres = this.juegos.map((juego, i) => {
                let inicioOpcion= i + 1;
                const convertirPrimerLetraMayus = juego.getNombre().charAt(0).toUpperCase() + juego.getNombre().slice(1);
                return `${inicioOpcion}. ${convertirPrimerLetraMayus}`;
            }).join("/")
           
            const opcion :number = rd.questionInt(`Elige una opcion de juego ===> ${listaNombres}: `);
            this.validarJuegoElegido(opcion, jugador);
        }
    }
}