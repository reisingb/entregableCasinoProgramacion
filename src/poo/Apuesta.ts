// import { Juego } from "./Juego";

// export class Apuesta {
//     private juego:Juego;
    
//     constructor(juego:Juego){
//         this.juego = juego;
//     }
    
//     public verificarTipoApuesta():void{
//         switch(this.juego.getNombre().toLowerCase()){
//             case "ruleta":{
//                 console.log(`Bienvenido al juego ${this.juego.getNombre()}!`);
//                 const minimaApuesta:number = this.juego.getApuestaMin();
//                 const maximaApuesta:number= this.juego.getApuestaMax();
//                 const fichas:number[]=[30, 50, 100, 300, 500, 1000, 5000, 10000];

//                 const fichasValidas:number[]= fichas.filter(ficha => ficha >= minimaApuesta && ficha <= maximaApuesta);
//                 this.juego.obtenerEntradaNum(`Elija una ficha para su apuesta.\n${fichasValidas.join("-")}`)
//             }
//             case "tragamoneda":{

//             }
//         }
//     }
// }