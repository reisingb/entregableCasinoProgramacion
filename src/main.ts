import { Casino } from "./poo/Casino";
import { Dado } from "./poo/Dado";
import { Digital } from "./poo/Digital";
import { Analogico } from "./poo/Analogico";
// import { Dado } from "./poo/Dado";
import { Ruleta } from "./poo/Ruleta";

// DECLARO VARIABLE PARA GUARDAR INSTANCIA
const casino: Casino = new Casino("Casino 'La suerte'");

// CREACION DE JUEGOS
const giroBonus: Digital = new Digital();
const clasico: Analogico = new Analogico();
//  const dado: Dado = new Dado("dados", 20, 5,2);
const ruleta: Ruleta = new Ruleta();
casino.agregarJuego(ruleta);
casino.agregarJuego(clasico);
casino.agregarJuego(giroBonus);
// casino.agregarJuego(dado);
casino.menuPrincipal();
