export interface ICalculoGanancia{
    calcularGanancia(apuesta:number,resultado?: string[]): number | null;
}