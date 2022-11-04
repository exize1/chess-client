import { bishopMovment, kingMovment, knightMovment, pawnMovment, queenMovment, rookMovment } from "./movements"
import { check } from "./rules"
import { bishopSimulation, kingSimulation, knightSimulation, pawnSimulation, queenSimulation, rookSimulation } from "./simulation"

export const allOponentMoves = (board, whiteTurn) => {
    const borders = [[56, 63], [48, 55], [40, 47], [32, 39], [24, 31], [16, 23], [8, 15], [0, 7]]
    const pieces = [
        { type : "p", vassleMoves: pawnSimulation },{ type : "n", vassleMoves: knightSimulation },{ type : "r", vassleMoves: rookSimulation },{ type : "b", vassleMoves: bishopSimulation },{ type : "q", vassleMoves: queenSimulation }, { type : "k", vassleMoves: kingSimulation }] 
    
    const oponentMoves = []
    if (whiteTurn){
        board.forEach((pieceType, position) => {
            borders.forEach((border) => {
                if (position <= border[1] && position >= border[0]) {
                    pieces.forEach ((piece) =>{
                        pieceType === piece.type.toUpperCase() && piece.vassleMoves(border[1], position, pieceType, board).forEach((element) => {
                            element !== undefined && element >= 0 && element <= 63 && oponentMoves.push(element)
                    })
                        // pieceType === piece.type.toLowerCase() &&  oponentMoves.push(piece.vassleMoves(border[1], position, pieceType, board))
                    })
                }
            })
        })
    }else{
        board.forEach((pieceType, position) => {
            borders.forEach((border) => {
                if (position <= border[1] && position >= border[0]) {
                    pieces.forEach ((piece) =>{
                        pieceType === piece.type && piece.vassleMoves(border[1], position, pieceType, board).forEach((element) => {
                            element !== undefined && element >= 0 && element <= 63 && oponentMoves.push(element)
                        })
                    })
                }
            })
        })
    }
    return oponentMoves
}

export const MyMoves = (board, whiteTurn) => {
    const borders = [[56, 63], [48, 55], [40, 47], [32, 39], [24, 31], [16, 23], [8, 15], [0, 7]]
    const pieces = [
        { type : "p", vassleMoves: pawnMovment },{ type : "n", vassleMoves: knightMovment },{ type : "r", vassleMoves: rookMovment },{ type : "b", vassleMoves: bishopMovment },{ type : "q", vassleMoves: queenMovment }, { type : "k", vassleMoves: kingMovment }] 
    const isRooksMoved = {
        blackLeft: false,
        blackRight: false,
        whiteLeft: false,
        whiteRight: false
    }
    const isKingsMoved = [true, true]
    const oponentMoves = []
    if (whiteTurn){
        board.forEach((pieceType, position) => {
            borders.forEach((border) => {
                if (position <= border[1] && position >= border[0]) {
                    pieces.forEach ((piece) =>{
                    //     pieceType === piece.type.toUpperCase() && piece.vassleMoves(border[1], position, pieceType, board).forEach((element) => {
                    //         element !== undefined && element >= 0 && element <= 63 && oponentMoves.push(element)
                    // })
                        pieceType === piece.type && piece.vassleMoves(border[1], position, pieceType, board, whiteTurn, isKingsMoved, isRooksMoved).forEach((element) => {
                            element !== undefined && element >= 0 && element <= 63 && oponentMoves.push(element)
                        })
                    })
                }
            })
        })
    }else{
        board.forEach((pieceType, position) => {
            borders.forEach((border) => {
                if (position <= border[1] && position >= border[0]) {
                    pieces.forEach ((piece) =>{
                        // pieceType === piece.type && piece.vassleMoves(border[1], position, pieceType, board).forEach((element) => {
                        //     element !== undefined && element >= 0 && element <= 63 && oponentMoves.push(element)
                        // })
                        pieceType === piece.type.toUpperCase() && piece.vassleMoves(border[1], position, pieceType, board, whiteTurn, isKingsMoved, isRooksMoved).forEach((element) => {
                            element !== undefined && element >= 0 && element <= 63 && oponentMoves.push(element)
                        })
                    })
                }
            })
        })
    }
    return oponentMoves
}

//check helpers
export const findTheKing = (board, whiteTurn) => {
    let kingPosition = undefined
        board.forEach((pieceType, position) => {
            if(whiteTurn){
               if (pieceType === "k") {
                kingPosition = position
            }
            }else{
                if (pieceType === "K") {
                    kingPosition = position
                }
            }
        })
    return kingPosition
}

export const isProtectedVassle = (board, whiteTurn, pieceType, piecePosition, piecePossibleMoves) => {
    const validMoves = []
    piecePossibleMoves.forEach(move => {
            const demoBoard = [...board]
            demoBoard[move] = pieceType
            demoBoard[piecePosition] = "x"
            !check(demoBoard, whiteTurn) && validMoves.push(move)
        })
    return validMoves
}

// castling helpers
export const kingMoved = (pieceType, setIsKingsMoved, isKingsMoved, body) => {
    if (pieceType === "K"){
        setIsKingsMoved([true, isKingsMoved[1]])
        return body.isBlackKingMoved = true
    }else if (pieceType === "k"){
        setIsKingsMoved([isKingsMoved[0], true])
        return body.isWhiteKingMoved = true
    }
}

export const RookMoved = (pieceType, setIsRooksMoved, isRooksMoved, rookPosition) =>{
        if (pieceType === "R" && rookPosition === 0){
            setIsRooksMoved({
                blackLeft: true,
                blackRight: isRooksMoved.blackRight,
                whiteLeft: isRooksMoved.whiteLeft,
                whiteRight: isRooksMoved.whiteRight
            })
        }else if (pieceType === "R" && rookPosition === 7){
            setIsRooksMoved({
                blackLeft: isRooksMoved.blackLeft,
                blackRight: true,
                whiteLeft: isRooksMoved.whiteLeft,
                whiteRight: isRooksMoved.whiteRight
            })
        }else if (pieceType === "r" && rookPosition === 56){
            setIsRooksMoved({
                blackLeft: isRooksMoved.blackLeft,
                blackRight: isRooksMoved.blackRight,
                whiteLeft: true,
                whiteRight: isRooksMoved.whiteRight
            })
        }else if (pieceType === "r" && rookPosition === 63){
            setIsRooksMoved({
                blackLeft: isRooksMoved.blackLeft,
                blackRight: isRooksMoved.blackRight,
                whiteLeft: isRooksMoved.whiteLeft,
                whiteRight: true
            })
        }
}

export const isPawnInTheEnd = (pieceType, piecePosition, setSuperPawn, superPawn, setSuperPawnData) => {
    if(pieceType === "P" && piecePosition >= 56 ){
        setSuperPawn([true, superPawn[1]])
        setSuperPawnData([pieceType, piecePosition])
    }
    if(pieceType === "p"  && piecePosition <= 7 ){
        setSuperPawn([superPawn[0], true])
        setSuperPawnData([pieceType, piecePosition])
    }
}
