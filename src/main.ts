import { Casino } from "./poo/Casino";
/* import { Digital } from "./poo/Digital"; */
import { Analogico } from "./poo/Analogico";
// import { Dado } from "./poo/Dado";
import { Ruleta } from "./poo/Ruleta";

// DECLARO VARIABLE PARA GUARDAR INSTANCIA
const casino: Casino = new Casino("Casino 'La suerte'");

// CREACION DE JUEGOS
/* const digital: Digital = new Digital("digital", 20, 10); */
const analogico: Analogico = new Analogico();
// const dado: Dado = new Dado("dados", 20, 2000,10);
const ruleta: Ruleta = new Ruleta();
casino.agregarJuego(ruleta);
casino.agregarJuego(analogico);
// casino.agregarJuego(dado);
casino.menuPrincipal();

