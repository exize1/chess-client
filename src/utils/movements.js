import { isProtectedVassle} from "./helpers"
import { casstle, eatPeice } from "./rules"
    

export const queenMovment = (border, intPosition, pieceType, splitedBoard, whiteTurn, isKingsMoved, isRooksMoved) => {

    const possiblePositions = 
        rookMovment(border, intPosition, pieceType, splitedBoard, whiteTurn) 
        .concat(bishopMovment(border, intPosition, pieceType, splitedBoard, whiteTurn))
        return(possiblePositions);
}

export const pawnMovment = (border, intPosition, pieceType, splitedBoard, whiteTurn, isKingsMoved, isRooksMoved) => {

    const possiblePositions = []
    if (pieceType === "P") {
        intPosition - 1 >= border - 7 && splitedBoard[intPosition + 7]  !== "x" && possiblePositions.push(eatPeice(border, intPosition, pieceType, splitedBoard, 7))   
        intPosition + 1 <= border && splitedBoard[intPosition + 9]  !== "x" && possiblePositions.push(eatPeice(border, intPosition, pieceType, splitedBoard, 9))   

        splitedBoard[intPosition + 8] === "x" && possiblePositions.push(intPosition + 8) &&
        splitedBoard[intPosition + 16] === "x" && intPosition <= 15 && possiblePositions.push(intPosition + 16)
    }
    if (pieceType === "p") {
        intPosition - 1 >= border - 7 && splitedBoard[intPosition - 9]  !== "x" && possiblePositions.push(eatPeice(border, intPosition, pieceType, splitedBoard, -9))
        intPosition + 1 <= border && splitedBoard[intPosition - 7]  !== "x" && possiblePositions.push(eatPeice(border, intPosition, pieceType, splitedBoard, -7))
        
        splitedBoard[intPosition - 8] === "x" && possiblePositions.push(intPosition - 8) &&
        splitedBoard[intPosition - 16] === "x" && intPosition >= 48 && possiblePositions.push(intPosition - 16)
    } 

    const validMoves = isProtectedVassle(splitedBoard, whiteTurn, pieceType, intPosition, possiblePositions)
    return(validMoves);
}

export const knightMovment = (border, intPosition, pieceType, splitedBoard, whiteTurn, isKingsMoved, isRooksMoved) =>{

    const possiblePositions = []
    const movmentsOtionsRight = [-6, -15, 17, 10]
    const movmentsOtionsLeft = [-10, -17, 15, 6]
    
        if (intPosition + 1 <= border){
            movmentsOtionsRight.forEach((direction) => {
                if (intPosition + 2 <= border) {
                    splitedBoard[intPosition + direction] !== "x" ?
                        possiblePositions.push(eatPeice(border, intPosition, pieceType, splitedBoard, direction))
                       :possiblePositions.push(intPosition + direction)
                }else {
                    splitedBoard[intPosition + direction] !== "x" ?
                        direction !== -6 && direction !== 10 && possiblePositions.push(eatPeice(border, intPosition, pieceType, splitedBoard, direction))
                        :direction !== -6 && direction !== 10 && possiblePositions.push(intPosition + direction)
                }
            })
        }
        if (intPosition - 1 >= border - 7){
            movmentsOtionsLeft.forEach((direction) => {
                if (intPosition - 2 >= border - 7) {
                    splitedBoard[intPosition + direction] !== "x" ?
                        possiblePositions.push(eatPeice(border, intPosition, pieceType, splitedBoard, direction))
                        :possiblePositions.push(intPosition + direction)
                }else {
                    splitedBoard[intPosition + direction] !== "x" ?
                        direction !== 6 && direction !== -10 && possiblePositions.push(eatPeice(border, intPosition, pieceType, splitedBoard, direction))
                        :direction !== 6 && direction !== -10 && possiblePositions.push(intPosition + direction)
                }
            })
        }
        const validMoves = isProtectedVassle(splitedBoard, whiteTurn, pieceType, intPosition, possiblePositions)
        return(validMoves);
}

export const rookMovment = (border, intPosition, pieceType, splitedBoard, whiteTurn, isKingsMoved, isRooksMoved) => {

    const possiblePositions = []
    for (let index = 1; index < 8; index++) {
        const direction = intPosition + 8*index
        if (splitedBoard[direction] !== "x" ) {
            const eatingPeice = eatPeice(border, intPosition, pieceType, splitedBoard, direction, index)
            eatingPeice && possiblePositions.push(eatingPeice)
            break
        }else {
            possiblePositions.push(direction);
        }
    }
    for (let index = 1; index < 8; index++) {
        const direction = intPosition - 8*index
        if (splitedBoard[direction] !== "x" ){
            const eatingPeice = eatPeice(border, intPosition, pieceType, splitedBoard, direction, index)
            eatingPeice && possiblePositions.push(eatingPeice)
            break
        }else {
            possiblePositions.push(direction);
        }
    }
    for (let index = 1; index < 8; index++) {
        const direction = intPosition + index
        const forward = true
        if (splitedBoard[intPosition + index] !== "x" && intPosition + index <= 63) {
            const eatingPeice = eatPeice(border, intPosition, pieceType, splitedBoard, direction, index, forward)
            eatingPeice && possiblePositions.push(eatingPeice)
            break
        }else {
            intPosition + index <= border && possiblePositions.push(intPosition + index);
        }
    }
    for (let index = 1; index < 8; index++) {
        const direction = intPosition - index
        const forward = false
        if (splitedBoard[intPosition - index] !== "x" && intPosition - index >= 0) {
            const eatingPeice = eatPeice(border, intPosition, pieceType, splitedBoard, direction, index, forward)
            eatingPeice && possiblePositions.push(eatingPeice)
            break
        }else {
            intPosition - index >= border - 7 && possiblePositions.push(intPosition - index);
        }
    }
    const validMoves = isProtectedVassle(splitedBoard, whiteTurn, pieceType, intPosition, possiblePositions)
    return(validMoves);
}

export const bishopMovment = (border, intPosition, pieceType, splitedBoard, whiteTurn, isKingsMoved, isRooksMoved) => {

    const possiblePositions = []
    for (let index = 1; index < 8; index++) {
        const direction = intPosition + index*1 + index*8
        if (splitedBoard[direction] !== "x" && direction <= 63) {
            const forward = true
            const eatingPeice = eatPeice(border, intPosition, pieceType, splitedBoard, direction, index, forward)
            eatingPeice && possiblePositions.push(eatingPeice)
            break
        }else {
            intPosition + index*1 <= border && possiblePositions.push(direction);
        }
    }

    for (let index = 1; index < 8; index++) {
        const direction = intPosition + index*1 - index*8
        
        if (splitedBoard[direction] !== "x" && direction <= 63) {
            const forward = true
            const eatingPeice = eatPeice(border, intPosition, pieceType, splitedBoard, direction, index, forward)
            eatingPeice && possiblePositions.push(eatingPeice)
            break
        }else {
            intPosition + index*1 <= border && possiblePositions.push(direction);
        }
    }

    for (let index = 1; index < 8; index++) {
        const direction = intPosition - index*1 + index*8
        if (splitedBoard[direction] !== "x" && direction <= 63) {
            const forward = false
            const eatingPeice = eatPeice(border, intPosition, pieceType, splitedBoard, direction, index, forward)
            eatingPeice && possiblePositions.push(eatingPeice)
            break
        }else {
            intPosition - index*1 >= border - 7 && possiblePositions.push(direction);
        }
    }
    
    for (let index = 1; index < 8; index++) {
        const direction = intPosition - index*1 - index*8
        if (splitedBoard[direction] !== "x" && direction <= 63) {
            const forward = false
            const eatingPeice = eatPeice(border, intPosition, pieceType, splitedBoard, direction, index, forward)
            eatingPeice && possiblePositions.push(eatingPeice)
            break
        }else {
            intPosition - index*1 >= border - 7 && possiblePositions.push(direction);
        }
    }
    const validMoves = isProtectedVassle(splitedBoard, whiteTurn, pieceType, intPosition, possiblePositions)
    return(validMoves);

}

export const kingMovment = (border, intPosition, pieceType, splitedBoard, whiteTurn, isKingsMoved, isRooksMoved) => {
    const possiblePositions = []
    const RightBorder = intPosition + 1 <= border
    const LeftBorder = intPosition - 1 >= border - 7
    
    const directions = [ [9, 1], [-7, 1], [7, -1], [-9, -1], [8, 0], [-8, 0], [1, 1], [-1, -1]]
    directions.forEach( (direction) => {
        if (splitedBoard[intPosition + direction[0]] !== "x") {
            const eatingPeice = eatPeice(border, intPosition, pieceType, splitedBoard, intPosition + direction[0])
            eatingPeice && possiblePositions.push(eatingPeice)
        }else {
            if (RightBorder) direction[0] !== -9 &&  direction[0] !== -1 &&  direction[0] !== 7 &&  possiblePositions.push(intPosition + direction[0])
            if (LeftBorder) direction[0] !== 9 &&  direction[0] !== 1 &&  direction[0] !== -7 && possiblePositions.push(intPosition + direction[0])
        }
    })
    //castling
    const Casstel = (casstle(intPosition, pieceType, splitedBoard, whiteTurn)) 
    if(!isKingsMoved[0] && pieceType === "K") {
        !isRooksMoved.blackLeft && Casstel[0] && possiblePositions.push(Casstel[0][1])
        !isRooksMoved.blackRight && Casstel[1] && possiblePositions.push(Casstel[1][1])
    }
    if(!isKingsMoved[1] && pieceType === "k") {
        !isRooksMoved.whiteLeft && Casstel[0] && possiblePositions.push(Casstel[0][1])
        !isRooksMoved.whiteRight && Casstel[1] && possiblePositions.push(Casstel[1][1])
    }

    const ValidMovesIncheck = isProtectedVassle(splitedBoard, whiteTurn, pieceType, intPosition, possiblePositions)
    return(ValidMovesIncheck);
        
}



