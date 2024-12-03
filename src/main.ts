import { Casino } from "./poo/Casino";
import { Dado } from "./poo/Dado";
/* import { Digital } from "./poo/Digital"; */
// import { Analogico } from "./poo/Analogico";
// import { Dado } from "./poo/Dado";
import { Ruleta } from "./poo/Ruleta";

// DECLARO VARIABLE PARA GUARDAR INSTANCIA
const casino: Casino = new Casino("Casino 'La suerte'");

// CREACION DE JUEGOS
 /*const digital: Digital = new Digital("digital", 20, 10); */
 /* const analogico: Analogico = new Analogico(); */
 // Crear instancia del juego de dados
const juegoDado = new Dado("Dados", 10, 50, 2, 8); // Apuesta mínima: 10, máxima: 50, 2 dados, meta: 8
const ruleta: Ruleta = new Ruleta();
casino.agregarJuego(ruleta);
 casino.agregarJuego(juegoDado);
casino.menuPrincipal();
