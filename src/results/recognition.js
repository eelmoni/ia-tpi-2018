// Nombre del archivo: recognition.js
import _orderBy from 'lodash.orderby';

const getTextAnnotations = (res) => {
    const responses = res && res.responses;
    const responseZero = responses && responses[0];

    return (responseZero && responseZero.textAnnotations);
};

const getDescriptionAsNumberOrHyphen = (textA) => {
    const description = textA && textA.description;
    const number = parseInt(description, 10);
    let value = '';

    if (number) { value = number; }
    if (description === '-') { value = description; }

    return value;
};

// Returns { x, y, number }
const getElementCorner = (textA) => {
    const descriptionValue = getDescriptionAsNumberOrHyphen(textA);

    if (!descriptionValue) { return null; }

    const boundingPoly = textA && textA.boundingPoly;
    const vertices = boundingPoly && boundingPoly.vertices;
    const orderedVerticesX = _orderBy(vertices, ['x']);
    const orderedVerticesY = _orderBy(
        [orderedVerticesX[0], orderedVerticesX[1]],
        ['y']
    );
    const firstCorner = orderedVerticesY[0];
    const number = {
        ...firstCorner,
        value: descriptionValue
    };

    return number;
};

const getAllCorners = (textAnnotations) => {
    const elements = [];

    textAnnotations.forEach((el) => {
        let element = getElementCorner(el);

        if (element) {
            elements.push(element);
        }
    });

    return elements;
};

const getMatrix = (response) => {
    const textAnnotations = getTextAnnotations(response);
    const allElements = getAllCorners(textAnnotations);
    const orderedAllElements = _orderBy(allElements, ['y']);
    const firstRow = _orderBy([
        orderedAllElements[0],
        orderedAllElements[1],
        orderedAllElements[2]
    ], ['x']);
    const secondRow = _orderBy([
        orderedAllElements[3],
        orderedAllElements[4],
        orderedAllElements[5]
    ], ['x']);
    const thirdRow = _orderBy([
        orderedAllElements[6],
        orderedAllElements[7],
        orderedAllElements[8]
    ], ['x']);
    const matrix = [
        [
            firstRow[0].number,
            firstRow[1].number,
            firstRow[2].number
        ],
        [
            secondRow[0].number,
            secondRow[1].number,
            secondRow[2].number
        ],
        [
            thirdRow[0].number,
            thirdRow[1].number,
            thirdRow[2].number
        ]
    ];

    return matrix;
};

export default getMatrix;
