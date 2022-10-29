import { eatPeice } from "./rules"

export const queenSimulation = (border, intPosition, pieceType, splitedBoard) => {
    const possiblePositions = 
        rookSimulation(border, intPosition, pieceType, splitedBoard)
        .concat(bishopSimulation(border, intPosition, pieceType, splitedBoard))
    return(possiblePositions);
}

export const pawnSimulation = (border, intPosition, pieceType, splitedBoard) => {
    const possiblePositions = []

    if (pieceType === "P") {
        intPosition - 1 >= border - 7 && possiblePositions.push(intPosition + 7)
        intPosition + 1 <= border && possiblePositions.push(intPosition + 9)   
    }
    if (pieceType === "p") {
        intPosition - 1 >= border - 7 && possiblePositions.push(intPosition - 9)
        intPosition + 1 <= border && possiblePositions.push(intPosition - 7)
    } 
        
    return(possiblePositions);
}

export const knightSimulation = (border, intPosition, pieceType, splitedBoard) =>{
    const possiblePositions = []
    const movmentsOtionsRight = [-6, -15, 17, 10]
    const movmentsOtionsLeft = [-10, -17, 15, 6]
    
        if (intPosition + 1 <= border){
            movmentsOtionsRight.forEach((direction) => {
                if (intPosition + 2 <= border) {
                    possiblePositions.push(intPosition + direction)
                }else {
                    direction !== -6 && direction !== 10 && possiblePositions.push(intPosition + direction)
                }
            })
        }
        if (intPosition - 1 >= border - 7){
            movmentsOtionsLeft.forEach((direction) => {
                if (intPosition - 2 >= border - 7) {
                     possiblePositions.push(intPosition + direction)
                }else {
                     direction !== 6 && direction !== -10 && possiblePositions.push(intPosition + direction)
                }
            })
        }
    return(possiblePositions);

}

export const rookSimulation = (border, intPosition, pieceType, splitedBoard) => {
const possiblePositions = []
for (let index = 1; index < 8; index++) {
    const direction = intPosition + 8*index
    if (splitedBoard[direction] !== "x" ) {
        const eatingPeice = eatPeice(border, intPosition, pieceType.toLowerCase(), splitedBoard, direction, index)
        const eatingOwnPeice = eatPeice(border, intPosition, pieceType.toUpperCase(), splitedBoard, direction, index)
        eatingPeice && possiblePositions.push(eatingPeice)
        eatingOwnPeice && possiblePositions.push(eatingOwnPeice)
        break
    }else {
        possiblePositions.push(direction);
    }
}
for (let index = 1; index < 8; index++) {
    const direction = intPosition - 8*index
    if (splitedBoard[direction] !== "x" ){
        const eatingPeice = eatPeice(border, intPosition, pieceType.toLowerCase(), splitedBoard, direction, index)
        const eatingOwnPeice = eatPeice(border, intPosition, pieceType.toUpperCase(), splitedBoard, direction, index)
        eatingPeice && possiblePositions.push(eatingPeice)
        eatingOwnPeice && possiblePositions.push(eatingOwnPeice)
        break
    }else {
        possiblePositions.push(direction);
    }
}
for (let index = 1; index < 8; index++) {
    const direction = intPosition + index
    const forward = true
    if (splitedBoard[intPosition + index] !== "x" && intPosition + index <= 63) {
        const eatingPeice = eatPeice(border, intPosition, pieceType.toLowerCase(), splitedBoard, direction, index, forward)
        const eatingOwnPeice = eatPeice(border, intPosition, pieceType.toUpperCase(), splitedBoard, direction, index, forward)
        eatingPeice && possiblePositions.push(eatingPeice)
        eatingOwnPeice && possiblePositions.push(eatingOwnPeice)
        break
    }else {
        intPosition + index <= border && possiblePositions.push(intPosition + index);
    }
}
for (let index = 1; index < 8; index++) {
    const direction = intPosition - index
    const forward = false
    if (splitedBoard[intPosition - index] !== "x" && intPosition - index >= 0) {
        const eatingPeice = eatPeice(border, intPosition, pieceType.toLowerCase(), splitedBoard, direction, index, forward)
        const eatingOwnPeice = eatPeice(border, intPosition, pieceType.toUpperCase(), splitedBoard, direction, index, forward)
        eatingPeice && possiblePositions.push(eatingPeice)
        eatingOwnPeice && possiblePositions.push(eatingOwnPeice)
        break
    }else {
        intPosition - index >= border - 7 && possiblePositions.push(intPosition - index);
    }
}
return(possiblePositions);
}

export const bishopSimulation = (border, intPosition, pieceType, splitedBoard) => {
    const possiblePositions = []
    for (let index = 1; index < 8; index++) {
        const direction = intPosition + index*1 + index*8
        if (splitedBoard[direction] !== "x" && direction <= 63) {
            const forward = true
            const eatingPeice = eatPeice(border, intPosition, pieceType.toLowerCase(), splitedBoard, direction, index, forward)
            const eatingOwnPeice = eatPeice(border, intPosition, pieceType.toUpperCase(), splitedBoard, direction, index, forward)

            eatingPeice && possiblePositions.push(eatingPeice)
            eatingOwnPeice && possiblePositions.push(eatingOwnPeice)
            break
        }else {
            intPosition + index*1 <= border && possiblePositions.push(direction);
        }
    }

    for (let index = 1; index < 8; index++) {
        const direction = intPosition + index*1 - index*8
        
        if (splitedBoard[direction] !== "x" && direction <= 63) {
            const forward = true
            const eatingPeice = eatPeice(border, intPosition, pieceType.toLowerCase(), splitedBoard, direction, index, forward)
            const eatingOwnPeice = eatPeice(border, intPosition, pieceType.toUpperCase(), splitedBoard, direction, index, forward)
            eatingPeice && possiblePositions.push(eatingPeice)
            eatingOwnPeice && possiblePositions.push(eatingOwnPeice)
            break
        }else {
            intPosition + index*1 <= border && possiblePositions.push(direction);
        }
    }

    for (let index = 1; index < 8; index++) {
        const direction = intPosition - index*1 + index*8
        if (splitedBoard[direction] !== "x" && direction <= 63) {
            const forward = false
            const eatingPeice = eatPeice(border, intPosition, pieceType.toLowerCase(), splitedBoard, direction, index, forward)
            const eatingOwnPeice = eatPeice(border, intPosition, pieceType.toUpperCase(), splitedBoard, direction, index, forward)
            eatingPeice && possiblePositions.push(eatingPeice)
            eatingOwnPeice && possiblePositions.push(eatingOwnPeice)
            break
        }else {
            intPosition - index*1 >= border - 7 && possiblePositions.push(direction);
        }
    }
    
    for (let index = 1; index < 8; index++) {
        const direction = intPosition - index*1 - index*8
        if (splitedBoard[direction] !== "x" && direction <= 63) {
            const forward = false
            const eatingPeice = eatPeice(border, intPosition, pieceType.toLowerCase(), splitedBoard, direction, index, forward)
            const eatingOwnPeice = eatPeice(border, intPosition, pieceType.toUpperCase(), splitedBoard, direction, index, forward)
            eatingPeice && possiblePositions.push(eatingPeice)
            eatingOwnPeice && possiblePositions.push(eatingOwnPeice)
            break
        }else {
            intPosition - index*1 >= border - 7 && possiblePositions.push(direction);
        }
    }
    return(possiblePositions);

}

export const kingSimulation = (border, intPosition, pieceType, splitedBoard, isKingsMoved, whiteTurn) => {
    const possiblePositions = []
    const RightBorder = intPosition + 1 <= border
    const LeftBorder = intPosition - 1 >= border - 7
    
    const directions = [ [9, 1], [-7, 1], [7, -1], [-9, -1], [8, 0], [-8, 0], [1, 1], [-1, -1]]
        directions.forEach( (direction) => {
            if (splitedBoard[intPosition + direction[0]] !== "x") {
                const eatingPeice = eatPeice(border, intPosition, pieceType.toLowerCase(), splitedBoard, intPosition + direction[0])
                const eatingOwnPeice = eatPeice(border, intPosition, pieceType.toUpperCase(), splitedBoard, intPosition + direction[0])
                eatingPeice && possiblePositions.push(eatingPeice)
                eatingOwnPeice && possiblePositions.push(eatingOwnPeice)
            }else {
                if  (RightBorder) direction[0] !== -9 &&  direction[0] !== -1 &&  direction[0] !== 7 &&  possiblePositions.push(intPosition + direction[0])
                if  (LeftBorder) direction[0] !== 9 &&  direction[0] !== 1 &&  direction[0] !== -7 && possiblePositions.push(intPosition + direction[0])
            }
        })
        return(possiblePositions);
}



