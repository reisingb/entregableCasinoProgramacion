import { Juego } from "./Juego";
import pc from "picocolors";
import rd from "readline-sync";
import { Jugador } from "./Jugador";
import { IJuego } from "./IJuegos";

// MODULOS DE NODE 
import fs from "node:fs";

// JUEGO RULETA
export class Ruleta extends Juego implements IJuego {
    private colorElegido: number;
    private numeroElegido: number;
    private numerosRojos: number[];
    private numerosNegros: number[];
    private todosLosNumeros: number[]
    private numeroGanador: number;
    private ganancia: number;
    private acumuladorApuesta: number;

    constructor() {
        super("Ruleta", 10, 10000);
        this.colorElegido = 0;
        this.numeroElegido = 37;
        this.numeroGanador = 0;
        this.numerosRojos = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        this.numerosNegros = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
        this.todosLosNumeros = [0, ...this.numerosRojos, ...this.numerosNegros];
        this.ganancia = 0;
        this.acumuladorApuesta = 0;
    }

    // <-------------------------------GETTERS Y SETTERS----------------------------------->
    // OBTENER COLOR ELEGIDO 
    public getColorElegido(): number {
        return this.colorElegido;
    }

    // MODIFICAR COLOR ELEGIDO
    public setColorElegido(colorElegido: number): void {
        this.colorElegido = colorElegido;
    }

    // OBTENER NUMERO ELEGIDO
    public getNumeroElegido(): number {
        return this.numeroElegido;
    }

    // MODIFICAR NUMERO ELEGIDO
    public setNumeroElegido(numeroElegido: number): void {
        this.numeroElegido = numeroElegido;
    }

    // OBTENER NUMERO GANADOR
    public getNumeroGanador(): number {
        return this.numeroGanador;
    }

    // MODIFICAR NUMERO GANADOR
    public setNumeroGanador(numeroGanador: number): void {
        this.numeroGanador = numeroGanador;
    }

    // OBTENER GANANCIA
    public getGanancia(): number {
        return this.ganancia;
    }

    // MODIFICADOR ACUMULATIVO DE GANANCIA
    public setGanancia(ganancia: number): void {
        this.ganancia += ganancia;
    }

    // OBTENER VALOR ACUMULADO
    public getAcumuladorApuesta(): number {
        return this.acumuladorApuesta;
    }

    // MODIFICADOR ACUMULATIVO DE APUESTA
    public setAcumuladorApuesta(apuesta: number): void {
        this.acumuladorApuesta += apuesta;
    }

    // <---------------METODOS COMUNES---------------------------------> 

    // METODO PARA CREAR LA PROMESA
    public crearPromesa(time: number): Promise<number> {
        console.clear();
        console.log(pc.bold("Girando Ruleta..."));
        return new Promise((resolve) => {
            setTimeout(() => {
                console.clear();
                resolve(this.girar());
            }, time);
        });
    }

    // METODO PARA PEDIR COLOR OPCIONAL
    private elegirColor(): number {
        const esApuestaColor: boolean = rd.keyInYNStrict(pc.bold("Deseas apostar a un color?: "));
        if (esApuestaColor) {
            this.setColorElegido(rd.questionInt(pc.bold(`Elige un color ==> 1. ${pc.red("Rojo")} / 2. ${pc.gray("Negro")}: `)))
            if (this.getColorElegido() === 1) {
                return this.getColorElegido();
            } else if (this.getColorElegido() === 2) {
                return this.getColorElegido();
            } else {
                console.log(pc.red("Opcion invalida."));
                return this.elegirColor();
            }
        }
        return 0;
    }

    // METODO PARA PEDIR NUMERO OPCIONAL
    private elegirNumero(): number {
        const esApuestaNumero: boolean = rd.keyInYNStrict(pc.bold("Deseas apostar a un numero?: "));
        if (esApuestaNumero) {
            do {
                this.setNumeroElegido(rd.questionInt(pc.bold("Elige un numero (0-36): ")));

                if (!this.todosLosNumeros.includes(this.getNumeroElegido())) {
                    console.log(pc.red("Numero invalido. Intentalo nuevamente."));
                }
            } while (!this.todosLosNumeros.includes(this.getNumeroElegido()));
            return this.getNumeroElegido();
        }
        return -1;
    }

    // REINICIAR LA GANANCIA
    private reiniciarGanancia(): void {
        this.ganancia = 0;
    }

    // REINICIAR LA ACUMULACION DE APUESTAS
    private reiniciarAcumuladorApuestas(): void {
        this.acumuladorApuesta = 0;
    }

    // RESTAR APUESTA AL ACUMULADOR
    private restarAcumuladorApuesta(apuesta: number) {
        this.acumuladorApuesta - apuesta;
    }

    // METODO PARA SABER SI EL NUMERO ELEGIDO ES EL GANADOR
    private esNumeroGanador(ganador: number): boolean {
        return ganador === this.getNumeroElegido();
    }

    // METODO PARA EVALUAR SI EL COLOR ELEGIDO ES EL GANADOR
    private esColorGanador(ganador: number): boolean {
        return (this.getColorElegido() === 1 && this.numerosRojos.includes(ganador)) || (this.getColorElegido() === 2 && this.numerosNegros.includes(ganador));
    }

    // METODO QUE VALIDA LA GANANCIA
    private validarGanancia(ganancia: number, jugador: Jugador): void {
        if (this.getGanancia() > 0) {
            if (this.isSalirJuego()) return;
            // console.clear();
            jugador.aumentarSaldo(ganancia);
            console.log(pc.green(pc.bold(`Felicidades! Has ganado ${ganancia} creditos!`)));
            console.log(`Saldo actual: ${pc.cyan(pc.bold(jugador.getMontoCredito()))}`);
        } else {
            if (this.isSalirJuego()) return;
            // console.clear();
            console.log(pc.cyan(pc.bold("No has tenido suerte en esta ronda.")));
            console.log(`Saldo actual: ${pc.cyan(pc.bold(jugador.getMontoCredito()))}`);
        }
    }

    // METODO GIRAR RULETA
    private girar(): number {
        const numeroGanador = Math.floor(Math.random() * 37); // 0-36
        const colorGanador = this.numerosRojos.includes(numeroGanador) ? pc.red("Rojo") : this.numerosNegros.includes(numeroGanador) ? pc.gray("Negro") : pc.green("Verde");
        console.log(pc.bold(`Numero ganador: ${pc.yellow(numeroGanador.toString())}\nColor ganador: ${colorGanador}`));
        return numeroGanador;
    }

    // METODO PARA GESTIONAR EL PROCESO DEL RESULTADO AL FINAL DE RONDA DEL JUEGO
    private async gestionarResultado(ganador: number, apuesta: number, jugador: Jugador, tipo: string): Promise<void> {
        if (this.isSalirJuego()) return;
        this.setNumeroGanador(ganador); //AGREGAR NUMERO GANADOR
        this.setGanancia(this.calcularGanancia(apuesta, [tipo])); //SUMAR GANANCIAS
        this.validarGanancia(this.getGanancia(), jugador);  //VALIDAR SI HUBO GANANCIAS
        this.reiniciarGanancia(); //REINICIAR GANANCIA A CERO
        await this.mostrarMenuDespuesDeJuego(jugador); //PREGUNTAR SI SALIR O CONTINUAR.
    }

    // VALIDAR PARA ASEGURAR QUE EL USUARIO EN SUS OPCIONES NO SE PASE DEL LIMITE
    private async validarAcumulacionDeApuestas(apuesta: number, jugador: Jugador): Promise<void> {
        // SI LAS APUESTAS ACUMULADAS SUPERAN EL MAXIMO DE APUESTA DEL JUEGO
        if (this.getAcumuladorApuesta() > this.getApuestaMax()) {
            console.clear();
            console.log(pc.yellow("La acumulacion de sus apuestas han exedido el limite de apuestas del juego."));
            const esCambiarMonto: boolean = rd.keyInYNStrict("Cambiar monto?: ");
            if (esCambiarMonto) {
                console.clear();
                this.restarAcumuladorApuesta(apuesta); // RESTAR LA ULTIMA APUESTA EN ACUMULADOR DE APUESTA
                jugador.aumentarSaldo(apuesta); // REEMBOLSAR LA APUESTA AL CREDITO DEL JUGADOR
                apuesta = jugador.apostar(this); // AGREGAR NUEVO VALOR DE APUESTA AL PARAMETRO
                if (this.isSalirJuego()) return  //VERIFICAR SI JUGADOR SALIO DEL JUEGO
                this.validarAcumulacionDeApuestas(apuesta, jugador);
                console.log(pc.green("Su apuesta ha sido modificada"));
                this.setAcumuladorApuesta(apuesta);  // VOLVER A ACUMULAR LA NUEVA APUESTA
            } else {
                console.clear();
                const esGirarRuleta: boolean = rd.keyInYNStrict("Girar Ruleta?: ");
                if (!esGirarRuleta) {
                    console.clear();
                    console.log(pc.cyan("No ha participado en esta ronda"));
                    await this.crearPromesa(5000)
                    jugador.aumentarSaldo(this.getAcumuladorApuesta()); //REEMBOLSAR TODAS LAS APUESTAS AL CREDITO
                    this.reiniciarAcumuladorApuestas();
                    await this.mostrarMenuDespuesDeJuego(jugador); //PREGUNTAR SI SEGUIR JUGANDO O NO
                    return;
                }
                this.restarAcumuladorApuesta(apuesta); // RESTAR LA ULTIMA APUESTA EN ACUMULADOR DE APUESTA
                jugador.aumentarSaldo(apuesta);
                this.reiniciarAcumuladorApuestas();
            }
        }
    }

    // <------------------------------------METODOS A IMPLEMENTAR---------------------------------->

    // METODO A IMPLEMENTAR DE OPCIONES DE APUESTAS
    public async jugar(jugador: Jugador): Promise<void> {
        console.clear();
        if (this.elegirColor() !== 0) {
            console.clear();
            const apuestaColor: number = jugador.apostar(this);
            if (this.isSalirJuego()) return; //EVALUAR SI SALIO DEL JUEGO
            this.setAcumuladorApuesta(apuestaColor); //GUARDAR ACUMULACION DE VALOR DE APUESTA

            // EVALUAR SI EL JUGADOR AUN TIENE CREDITO ANTES DE CONTINUAR...
            if (jugador.getMontoCredito() <= 0) {
                console.clear();
                const esCancelar: boolean = rd.keyInYNStrict("Se ha quedado sin saldo, cancelar apuesta?: ");
                if (esCancelar) {
                    console.clear();
                    jugador.setMontoCredito(apuestaColor);
                    console.log(pc.bold(`${pc.green("Su apuesta se ha cancelado con exito.")}\n${pc.white("saldo actual:")}${pc.cyan(jugador.getMontoCredito())}`));
                    this.reiniciarAcumuladorApuestas();
                    this.menuJuego(jugador);
                    return;
                } else {
                    console.clear();
                    const ganador: number = await this.crearPromesa(5000);
                    await this.gestionarResultado(ganador, apuestaColor, jugador, "color");
                    this.reiniciarAcumuladorApuestas();
                    return;
                }
            }
            // SI ELIGIO NUMERO 
            if (this.elegirNumero() >= 0) {
                console.clear();
                let apuestaNumero: number = jugador.apostar(this);
                this.setAcumuladorApuesta(apuestaNumero); //GUARDAR ACUMULACION DE VALOR DE APUESTA
                this.validarAcumulacionDeApuestas(apuestaNumero, jugador); //VERIFICAR ACUMULACION

                if (this.isSalirJuego()) return; //EVALUAR SI SALIO DEL JUEGO
                const ganador: number = await this.crearPromesa(5000);
                await this.gestionarResultado(ganador, apuestaColor, jugador, "color");

                // SI EL NUMERO SALIO GANADOR
                if (this.esNumeroGanador(ganador)) {
                     await this.gestionarResultado(ganador, apuestaNumero, jugador, "numero");
                }
                this.reiniciarAcumuladorApuestas();
            } else {
                console.clear();
                const ganador:number = await this.crearPromesa(5000);
                await this.gestionarResultado(ganador, apuestaColor, jugador, "color");
                this.reiniciarAcumuladorApuestas();
            }
        } else if (this.elegirNumero() >= 0) {  //SI SOLO ELIGIO NUMERO
            console.clear();
            let apuestaNumero: number = jugador.apostar(this);
            if (this.isSalirJuego()) return; //EVALUAR SI SALIO DEL JUEGO
            const ganador:number= await this.crearPromesa(5000);
            await this.gestionarResultado(ganador, apuestaNumero, jugador, "numero");
            this.reiniciarAcumuladorApuestas();
        } else {
            console.clear();
            console.log(pc.cyan("No has elegido ninguna apuesta en esta ronda"));
            await this.crearPromesa(5000);
            await this.mostrarMenuDespuesDeJuego(jugador);
        }
    }

    // METODO DE CALCULO DE GANANCIA
    public calcularGanancia(apuesta: number, resultado: string[]): number {
        let ganador: number = this.getNumeroGanador();
        let ganancia: number = 0;
        // SI EL NUMERO ES GANADOR
        if (ganador) {
            if (resultado.includes("numero") && this.esNumeroGanador(ganador)) {
                ganancia = apuesta * 35;
            }
            if (resultado.includes("color") && this.esColorGanador(ganador)) {
                ganancia = apuesta * 2;
            }
        }
        return ganancia; //RETORNO DE GANANCIA
    }

    // CREAR EN TXT INSTRUCCIONES DEL JUEGO
    public async crearInstruccion(): Promise<void> {
        let instrucciones = "***¿COMO JUGAR RULETA?***\n1. De forma opcional, elige un color, un numero o ambos.\n2. Por cada opcion, debes elegir tu apuesta.\n3. Despues de elegir tu apuesta, especifica el monto.\n\n***PREMIOS DE APUESTAS***\n-Color ganador: APUESTA X 2\n-Numero ganador: APUESTA X 35\n-Numero y Color Ganador: APUESTA X 2 + APUESTA X 35.";
        fs.writeFileSync('./src/instrucciones.txt', instrucciones);
    }

    // LEER INSTRUCCIONES
    public async mostrarInstrucciones(): Promise<void> {
        console.clear();
        await this.crearInstruccion();
        const instrucciones = fs.readFileSync('./src/instrucciones.txt', { encoding: "utf8" });
        console.log(instrucciones);
    }
}
