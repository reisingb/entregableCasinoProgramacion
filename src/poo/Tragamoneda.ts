export class Tragamoneda {
    protected nombre: string;
    protected simbolos: string[];
    protected carretes: number;
    constructor(nombre: string, simbolos: string[], carretes: number) {
        this.nombre = nombre;
        this.simbolos = simbolos;
        this.carretes = carretes;
    }
}