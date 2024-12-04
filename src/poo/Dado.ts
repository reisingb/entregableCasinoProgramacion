import { Casino } from "./Casino";
import { Juego } from "./Juego";
import { Jugador } from "./Jugador";
import { Apuesta } from "./Apuesta";
import pc from "picocolors";


    export class Dado extends Juego {
        private cantidadDados: number; // Número de dados que se lanzan
        private resultadoDeseado: number; // Resultado objetivo para ganar
    
        constructor(nombre: string, apuestaMin: number, apuestaMax: number, cantidadDados: number, resultadoDeseado: number) {
            super(nombre, apuestaMin, apuestaMax);
            this.cantidadDados = cantidadDados;
            this.resultadoDeseado = resultadoDeseado;
        }
    
        // Iniciar el juego (se llama desde el menú del casino)
        public iniciarJuego(jugador: Jugador): void {
            console.log(pc.cyan(`¡Bienvenido a ${this.getNombre()}!`));
            console.log(pc.green(`El objetivo es obtener un resultado total mayor o igual a ${this.resultadoDeseado}.`));
            this.menuJuego(jugador); // Muestra el menú del juego
        }
    
        // Opciones específicas del juego
        public opcionesApuestaJuego(jugador: Jugador): void {
            const apuesta = new Apuesta(jugador, "Dado");
            apuesta.procesarApuesta(this); // Procesar la apuesta ingresada por el jugador
    
            // Simular tirada de dados
            console.log(pc.bold(`Tirando ${this.cantidadDados} dado(s)...`));
            let resultadoTotal = 0;
            for (let i = 0; i < this.cantidadDados; i++) {
                const resultado = Math.floor(Math.random() * 6) + 1; // Número entre 1 y 6
                console.log(pc.yellow(`Dado ${i + 1}: ${resultado}`));
                resultadoTotal += resultado;
            }
    
            console.log(pc.bold(`Resultado total: ${resultadoTotal}`));
    
            // Verificar si el jugador gana
            if (resultadoTotal >= this.resultadoDeseado) {
                const ganancia = apuesta.getMonto() * 2; // Gana el doble de su apuesta
                console.log(pc.green(`¡Felicidades! Ganaste ${ganancia} créditos.`));
                jugador.cargarCredito(ganancia);
            } else {
                console.log(pc.red("Lo siento, perdiste esta ronda."));
            }
    
            console.log(pc.bold(`Tu saldo actual es: ${pc.yellow(jugador.getMontoCredito())} créditos.`));
        }
        public calcularGanancia(): number {
            return 0;
        }
    }
     

