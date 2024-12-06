export interface IJuego{
    crearInstruccion(): void
    calcularGanancia(apuesta:number,resultado?: string[]): number | null;
}