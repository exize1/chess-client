import { allOponentMoves, findTheKing, isProtectedVassle, MyMoves } from "./helpers"

export const casstle = ( intPosition, pieceType, splitedBoard, whiteTurn) => {
    const casstleLeft = [intPosition - 1, intPosition - 2, intPosition - 3]
    const casstleRight = [intPosition + 1, intPosition + 2, intPosition + 3, intPosition + 4]
    const cassels = []
    let validMoves = []
    if (splitedBoard[casstleLeft[0]] === "x" && splitedBoard[casstleLeft[1]] === "x") {
        if(splitedBoard[casstleLeft[2]] === "R" || splitedBoard[casstleLeft[2]] === "r") cassels.push(casstleLeft)
    }
    if (splitedBoard[casstleRight[0]] === "x" && splitedBoard[casstleRight[1]] === "x" && splitedBoard[casstleRight[2]] === "x") {
        if(splitedBoard[casstleRight[3]] === "R" || splitedBoard[casstleRight[3]] === "r")cassels.push(casstleRight)
    }
    cassels.forEach(move => {
        validMoves.push(isProtectedVassle(splitedBoard, whiteTurn, pieceType, intPosition, move))
    })
    if(validMoves !== undefined && cassels[0] !== undefined && validMoves[0].length === cassels[0].length ){
        if(validMoves !== undefined && cassels[1] !== undefined && validMoves[1].length === cassels[1].length ){
            return cassels
        }else {
            return [cassels[0]]
        }
    }else if (validMoves !== undefined && cassels[1] !== undefined && validMoves[1].length === cassels[1].length ){
        return [cassels[1]]
    }else return []
}

export const eatPeice = (border, intPosition, pieceType, splitedBoard, direction, index, forward) => {
    const black = ['K', 'R', 'N', 'B', 'Q', 'B', 'N', 'R', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P']
    const white = ['k', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'r', 'n', 'b', 'q', 'b', 'n', 'r']
    
    if (pieceType === "b" && black.includes(splitedBoard[direction])){
            if (forward ? intPosition + index*1 <= border : intPosition - index*1 >= border - 7) return direction;

    }else if (pieceType === "B" && white.includes(splitedBoard[direction])){
        if (forward ? intPosition + index*1 <= border : intPosition - index*1 >= border - 7) return direction;
    }    

    if (pieceType === "n" &&  black.includes(splitedBoard[intPosition + direction])) return (intPosition + direction);
    else if (pieceType === "N" && white.includes(splitedBoard[intPosition + direction])) return (intPosition + direction);
    

    if (pieceType === "r" && black.includes(splitedBoard[direction])){
        if (forward === undefined) return direction
        else if (forward ? intPosition + index*1 <= border : intPosition - index*1 >= border - 7) return direction
        
    }else if (pieceType === "R" && white.includes(splitedBoard[direction])){
        if (forward === undefined) return direction
        else if (forward ? intPosition + index*1 <= border : intPosition - index*1 >= border - 7) return direction    
    } 

    if (pieceType === "q" && black.includes(splitedBoard[direction])){
        if (forward === undefined) return direction
        else if (forward ? intPosition + index*1 <= border : intPosition - index*1 >= border - 7) return direction

    }else if (pieceType === "Q" && white.includes(splitedBoard[direction])){
        if (forward === undefined) return direction
        else if (forward ? intPosition + index*1 <= border : intPosition - index*1 >= border - 7) return direction
    } 

    if (pieceType === "k" && black.includes(splitedBoard[direction])){
        if (forward === undefined) return direction
        else if (forward ? intPosition + index*1 <= border : intPosition - index*1 >= border - 7) return direction

    }else if (pieceType === "K" && white.includes(splitedBoard[direction])){
        if (forward === undefined) return direction
        else if (forward ? intPosition + index*1 <= border : intPosition - index*1 >= border - 7) return direction
    } 

    if (pieceType === "p" && black.includes(splitedBoard[intPosition + direction])){
        if (forward === undefined) return intPosition + direction
        else if (forward ? intPosition + index*1 <= border : intPosition - index*1 >= border - 7) return intPosition + direction

    }else if (pieceType === "P" && white.includes(splitedBoard[intPosition + direction])){
        if (forward === undefined) return intPosition + direction
        else if (forward ? intPosition + index*1 <= border : intPosition - index*1 >= border - 7) return intPosition + direction
    } 
}

export const check = (board, whiteTurn) => {
    const oponentMoves = allOponentMoves(board, whiteTurn)
    const kingPosition = findTheKing(board, whiteTurn)
    let isCheck = oponentMoves.includes(kingPosition)
    return isCheck
}

export const checkmate = (board, whiteTurn, setIsCheckmate) => {
    const myMoves = MyMoves(board, whiteTurn)
    myMoves.length === 0 && check(board, whiteTurn) && setIsCheckmate(true)
    myMoves.length === 0 && !check(board, whiteTurn) && console.log("Draw")
}