class Casino {
private nombre:string;
private juegos: Juego[]=[];
private direccion:string;

constructor( nombre:string, direccion:string){
    this.nombre=nombre;
    this.direccion=direccion;
}

getNombre(): string {
    return this.nombre;
}

setNombre(nombre: string): void {
    this.nombre = nombre;
}


getDireccion(): string {
    return this.direccion;
}

setDireccion(direccion: string): void {
    this.direccion = direccion;
}