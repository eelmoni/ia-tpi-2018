import { BoardState } from "./boardState.js";
import { showAlgorithmBeingUsed } from "./index.js";

BoardState.prototype.print = function () {
    return "  -------\n" + " | " + this["position0"] + " " + this["position1"] + " " + this["position2"] + " |\n" +
        " | " + this["position3"] + " " + this["position4"] + " " + this["position5"] + " |\n" +
        " | " + this["position6"] + " " + this["position7"] + " " + this["position8"] + " |\n" + "  -------\n";

};

export function printStartMessage(startingState, endingState) {
    console.log("\nPlanteo a resolver: \n\n" + startingState.print() + "\n     |" +
        "\n     V\n\n" + endingState.print() + "\nIniciando algoritmo de búsqueda '" + showAlgorithmBeingUsed() + "'...\n");
}

