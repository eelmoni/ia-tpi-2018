import { BoardState } from "./boardState.js";
import { bestFirst } from './bestFirst.js';
import { showAlgorithmName } from './bestFirst.js';
import { printStartMessage } from './print.js';

export function showAlgorithmBeingUsed() {
    return showAlgorithmName();
}

export function start(initial, end) {
    /////////// ${showAlgorithmName()} ///////////\n\n
    let searchResult = '';
    let startingState = new BoardState(initial);
    let endingState = new BoardState(end);

    printStartMessage(startingState, endingState);
    let search = bestFirst(startingState, endingState);
    search.boardStates.forEach(function(state) {
        searchResult += state.print();
        // console.log(state.print());
    });

    searchResult += '\n\n';
    searchResult += "Resuelto en " + (search.boardStates.length - 1) + " pasos.\n";
    searchResult += "\nSolución encontrada (" + search.movements.length() + " movimientos): \n";

    while (!search.movements.isEmpty()) {
        searchResult += search.movements.pop().print();
    }

    return searchResult;
};
