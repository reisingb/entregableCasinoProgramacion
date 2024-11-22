import { Casino } from "./poo/Casino";
import pc from "picocolors";

// DECLARO VARIABLE PARA GUARDAR INSTANCIA
const casino: Casino = new Casino("Casino 'La suerte'");

function main() {
    console.log(pc.bgCyan(pc.bold("**Bienvenido al casino!**\n")));
    casino.iniciarPrograma();
}
main();
