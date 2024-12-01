import { Casino } from "./poo/Casino";
import pc from "picocolors"; //LIBRERIA PARA COLOR DE FUENTES
/* import { Digital } from "./poo/Digital"; */
// import { Analogico } from "./poo/Analogico";
// import { Dado } from "./poo/Dado";
import { Ruleta } from "./poo/Ruleta";
import { Jugador } from "./poo/Jugador";

import rd from "readline-sync";

let nombre = rd.question("Ingrese su nombre: ");
let dni= rd.questionInt("Ingrese su dni: ");
const jugador:Jugador = new Jugador(nombre, dni);

// DECLARO VARIABLE PARA GUARDAR INSTANCIA
const casino: Casino = new Casino("Casino 'La suerte'", jugador);

// CREACION DE JUEGOS
/* const digital: Digital = new Digital("digital", 20, 10); */
// const analogico: Analogico = new Analogico();
// const dado: Dado = new Dado("dados", 20, 2000,10);
const ruleta: Ruleta = new Ruleta();
casino.agregarJuego(ruleta);
// casino.agregarJuego(dado);
casino.menuPrincipal(jugador);

