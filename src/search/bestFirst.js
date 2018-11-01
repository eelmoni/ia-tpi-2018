// Nombre de archivo: bestFirst.js
import {BoardState} from './boardState.js';
import Heap from 'heap';
import {Search} from './search';

Array.prototype.clone = function () {
    return this.map(e => Array.isArray(e) ? e.clone() : e);
};

export function showAlgorithmName() {
    return "Primero el mejor";
}

export function bestFirst(startingState, endingState) {
    let heap = new Heap(function (a, b) {
        return a.distance(endingState) - b.distance(endingState);
    });
    let search = new Search();
    BoardState.prototype.distance = function (boardState) {
        let incorrectPositionCount = 0;
        for (let i = 0; i < boardState.positionsCount; i++) {
            if (this["position" + i] !== boardState["position" + i]) {
                incorrectPositionCount++;
            }
        }
        return incorrectPositionCount;
    };
    heap.push(startingState);
    while (heap.peek().distance(endingState) !== 0) {
        let state = heap.pop();
        // Find out coordinates of '-'.
        let i = 0, j = 0;
        outer:
            for (const row of state.itemsPositions) {
                j = 0;
                for (const item of row) {
                    if (item === "-") {
                        break outer;
                    }
                    j++;
                }
                i++;
            }
        // Generate every possible next board state.
        state.itemsPositions.forEach(function (row, m) {
            row.forEach(function (item, n) {
                let newPositions = state.itemsPositions.clone();
                if (item !== "-") {
                    newPositions[m][n] = '-';
                    newPositions[i][j] = item;
                    let newState = new BoardState(newPositions, state);
                    // Check if new state has already been processed.
                    let processed = false;
                    search.boardStates.concat(heap.toArray()).forEach(function (boardState) {
                        if (boardState.distance(newState) === 0) {
                            processed = true;
                        }
                    });
                    if (!processed) {
                        heap.push(newState);
                    }
                }
            });
        });
        search.boardStates.push(state);
    }
    search.boardStates.push(heap.pop());
    // Generate movements.
    search.movements.push(search.boardStates[search.boardStates.length - 1]);
    while (search.movements.peek().distance(startingState) !== 0) {
        search.movements.push(search.movements.peek().parent);
    }
    return search;
}

