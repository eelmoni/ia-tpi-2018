// Nombre de archivo: boardState.js
export class BoardState {
    constructor(itemsPositions, parent) {
        let i = 0;
        itemsPositions.forEach((row) => {
            row.forEach((item) => {
                this["position" + i] = item;
                i++;
            })
        });
        this.itemsPositions = itemsPositions;
        this.positionsCount = i + 1;
        this.parent = parent;
    }
}
