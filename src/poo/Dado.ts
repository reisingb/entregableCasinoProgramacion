import { Apuesta } from "./Apuesta";
import { Casino } from "./Casino";
import { IJuego } from "./IJuegos";
import { Juego } from "./Juego";
import { Jugador } from "./Jugador";
import pc from "picocolors";
import fs from "node:fs";
import rd from "readline-sync";


export class Dado extends Juego implements IJuego {
    private acumulador: number;
    private numeroDeseado: number;
    constructor() {
        super("Dados", 10, 50);
        this.acumulador = 0;
        this.numeroDeseado = 0;
    }
    getAcumulador():number{
        return this.acumulador;
    }
  /*   setAcumulador(resultado:number){
        this.acumulador+= resultado;
    } */
    getNumeroDeseado(): number {
        return this.numeroDeseado;
    }
    setNumeroDeseado(numeroDeseado: number): void {
        this.numeroDeseado = numeroDeseado;
    }

    validarNumeroDeseado(numeroGanador: number): boolean {
        return numeroGanador === this.getNumeroDeseado();
    }


    calcularGanancia(apuesta: number, resultado?: string[]): number {
        const resultadoDados = this.lanzarDado();
        if (this.validarNumeroDeseado(resultadoDados)) {
            const ganancia: number = apuesta * 2; // Gana el doble de su apuesta
            console.log(pc.bold(` el resultado de su tirada de dados es : ${resultadoDados}`));
            console.log(pc.green(`¡Felicidades! Ganaste ${ganancia} créditos.`));
            return ganancia;
        }
        return 0;
    }

    public crearInstruccion(): void {
        let instrucciones = "***¿COMO JUGAR DADOS?***\n1.  elegir un numero.\n2. Por cada opcion, debes elegir tu apuesta.\n3. Despues de elegir tu apuesta, especifica el monto.\n\n***PREMIOS DE APUESTAS***\n-Color ganador: APUESTA X 2\n-Numero ganador: APUESTA X 35\n-Numero y Color Ganador: APUESTA X 2 + APUESTA X 35."

        fs.writeFileSync('./src/instrucciones.txt', instrucciones);
    }
    lanzarDado(): number {
        let resultado: number = 0;
        console.log("lanzando dados!...")
        for(let i : number = 0; i < 2; i++){
        const random = Math.floor(Math.random() * 6) + 1; // Número entre 1 y 6
        console.log(pc.yellow(`Dado  ${random}`)); 
        resultado += random;
    
        }
        return resultado;

        
    }

    // LEER INSTRUCCIONES
    public mostrarInstrucciones(): void {
        this.crearInstruccion();
        const instrucciones = fs.readFileSync('./src/instrucciones.txt', { encoding: "utf8" });
        console.log(instrucciones);
    }

    // Opciones específicas del juego
    public jugar(jugador: Jugador): void {

        do {

            this.setNumeroDeseado(rd.questionInt("ingrese el numero deseado: "))
            if (this.getNumeroDeseado() < 1 || this.getNumeroDeseado() > 12) {
                console.log(pc.red("el numero que ingreso es invalido"))
            }
        } while (this.getNumeroDeseado() < 1 || this.getNumeroDeseado() > 12)

        const apuesta: number = jugador.apostar(this)
        if(this.isSalirJuego())return
        const ganancia: number = this.calcularGanancia(apuesta)
        if (ganancia > 0) {
            jugador.aumentarSaldo(ganancia);
        }

        


        console.log(pc.bold(`Tu saldo actual es: ${pc.yellow(jugador.getMontoCredito())} créditos.`));
        this.mostrarMenuDespuesDeJuego(jugador);
    }

}