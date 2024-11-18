export class Juego {
    private nombre: string;

    constructor(nombre: string) {
        this.nombre = nombre;
    }

    retirarTicket(): void {
        console.log(`${this.nombre}: Retirando el ticket.`);
    }

    cargarFicha(): void {
        console.log(`${this.nombre}: Cargando las fichas.`);
    }

    apostar(): void {
        console.log(`${this.nombre}: Realizando apuesta`);
    }

    apuestaMinima(): number {
        console.log(`${this.nombre}: Apuesta mínima.`);
        return 10; // Ejemplo de apuesta mínima
    }

    apuestaMaxima(): number {
        console.log(`${this.nombre}: Apuesta máxima.`);
        return 1000; // Ejemplo de apuesta máxima
    }

    iniciarJuego(): void {
        console.log(`${this.nombre}: Inicio del juego.`);
    }

    finalizarJuego(): void {
        console.log(`${this.nombre}: Final del juego.`);
    }

    getNombre(): string {
        return this.nombre;
    }
};
