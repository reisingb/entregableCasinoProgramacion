export interface IJuego{
    crearInstruccion(): Promise<void>
    calcularGanancia(apuesta:number,resultado?: string[]): number;
}