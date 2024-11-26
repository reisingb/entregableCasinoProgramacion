import { Casino } from "./poo/Casino";
import pc from "picocolors";
import { Digital } from "./poo/Digital";
import { Analogico } from "./poo/Analogico";
import { Dado } from "./poo/Dado";
import { Ruleta } from "./poo/Ruleta";

// DECLARO VARIABLE PARA GUARDAR INSTANCIA
const casino: Casino = new Casino("Casino 'La suerte'");

    const digital: Digital = new Digital("digital", 20, 10);
    const analogico: Analogico=  new Analogico();
    const dado: Dado =  new Dado("dados", 20, 2000);
    const ruleta: Ruleta =  new Ruleta("ruleta", 20, 2000);

    casino.agregarJuego(digital)
    casino.agregarJuego(analogico)
    casino.agregarJuego(dado)
    casino.agregarJuego(ruleta)

function main() {
    console.log(pc.bgCyan(pc.bold("**Bienvenido al casino!**\n")));
    casino.elegirJuego();
}
main();
