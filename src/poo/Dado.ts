import { Casino } from "./Casino";
import { Juego } from "./Juego";


    export class Dado extends Juego {
        calcularPagos(): number {
            return this.calcularGanancia();
        };
        
        private montoApuesta:number;
        iniciarJuego(): void {
            console.log(`bienvenido al juego de Dados ${this.tirarDado}`)
        }
       

        
        constructor(nombre: string, apuestaMin: number, apuestaMax: number,montoApuesta:number) {
            super(nombre, apuestaMin, apuestaMax);
            this.montoApuesta= 10;
        }
    
        public apostar(): void {
            if (this.montoApuesta < this.apuestaMin || this.montoApuesta > this.apuestaMax) {
                console.log(`Error: La apuesta debe estar entre ${this.apuestaMin} y ${this.apuestaMax}.`);
                return;
            }
            if (this.montoApuesta > this.montoCredito) {
                console.log(`Error: No tienes suficiente crédito para esta apuesta.`);
                return;
            }
    
            console.log(`Tirando los dados con un monto de ${this.montoApuesta}...`);
            const dado1 = this.tirarDado();
            const dado2 = this.tirarDado();
            const suma = dado1 + dado2;
    
            console.log(`Resultados: dado1 = ${dado1}, dado2 = ${dado2}, suma = ${suma}`);
    
            if (suma === 7 || suma === 11) {
                const ganancia = this.calcularGanancia();
                this.montoCredito += ganancia;
                console.log(`¡Ganaste! Ganaste ${ganancia} créditos. Tu nuevo saldo es: ${this.montoCredito}`);
            } else {
                const perdida = this.calcularPerdida();
                this.montoCredito -= perdida;
                console.log(`Perdiste ${perdida} créditos. Tu nuevo saldo es: ${this.montoCredito}`);
            }
    
            if (this.montoCredito <= 0) {
                console.log("Te quedaste sin crédito. Gracias por jugar.");
            }
        }
    
        private tirarDado(): number {
            return Math.floor(Math.random() * 6) + 1;
        }
    
        public calcularPerdida(): number {
            return this.montoApuesta; // El jugador pierde lo que apostó.
        }
    
        public calcularGanancia(): number {
            return this.montoApuesta * 2; // El jugador duplica su apuesta si gana.
        }
    
        public retirarTicket(): void {
            console.log(`Retiraste un ticket con ${this.montoCredito} créditos. ¡Gracias por jugar!`);
            this.montoCredito = 0; // Resetea el crédito después de retirar el ticket.
        }
    
        public cargarCredito(montoCredito: number): string {
            this.actualizarMontoAct(montoCredito);
            if (this.verificarMontoCarga(0)) {
                this.montoCredito += montoCredito;
                return `Su carga de ${montoCredito} créditos fue un éxito. Saldo actual: ${this.montoCredito}`;
            }
            this.actualizarMontoAct(0);
            return `Error:\nPara el juego ${this.getNombre()} el mínimo/máximo es:\nMínimo ${this.getApuestaMin()} - Máximo ${this.getApuestaMax()}\nInténtelo nuevamente.`;
        }
    }
    

