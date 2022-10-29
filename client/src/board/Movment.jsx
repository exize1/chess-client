import "./movment.scss"
import {
    FaChessPawn,
    FaChessKing,
    FaChessQueen,
    FaChessKnight,
    FaChessBishop,
    FaChessRook
} from "react-icons/fa"
import { useState } from "react"
import { bishopMovment, kingMovment, knightMovment, pawnMovment, queenMovment, rookMovment } from "../utils/movements"
import { publicRequest } from "../requestMethods"
import { isPawnInTheEnd, kingMoved, RookMoved } from "../utils/helpers"
import { check, checkmate } from "../utils/rules"
import SuperPawm from "../components/SuperPawn"
import { getGame } from "../utils/req"


const Movment = ({ board, setBoard, id, setId}) => {
    const splitedBoard = board.split("")

    // for glowing the cubes
    const [possiblePositions, setPossiblePositions] = useState([])
    const [selected, setSelected] = useState(false)
    const [selectedPiece, setSelectedPiece] = useState([])
    const [whiteTurn, setWhiteTurn] = useState(true)
    const [isKingsMoved, setIsKingsMoved] = useState([false, false])
    const [superPawn, setSuperPawn] = useState([false, false])
    const [superPawnData, setSuperPawnData] = useState([])

    const [isRooksMoved, setIsRooksMoved] = useState({
                                                        blackLeft: false,
                                                        blackRight: false,
                                                        whiteLeft: false,
                                                        whiteRight: false
                                                    })


    window.sessionStorage.setItem("white", whiteTurn)

    const columns = [1, 2, 3, 4, 5, 6, 7 ,8]
    const rows = [1, 2, 3, 4, 5, 6, 7 ,8]
    const movePieceReq = (body) =>{
        publicRequest.put('/position', body)
            .then((res) => {
                getGame(setId, setBoard)
            })
            .catch((err) => console.log(err));
    } 
    
    const possibleMovments = (position, arrBoard) => {
        const splitedPosition = position.split(",")
        const intPosition = Number(splitedPosition[0])
        const vassleType = splitedPosition[1]
        const borders = [[56, 63], [48, 55], [40, 47], [32, 39], [24, 31], [16, 23], [8, 15], [0, 7]]
        
        setSelected(true)
        setSelectedPiece(splitedPosition)

        borders.forEach((item) => {
            if (intPosition <= item[1] && intPosition >= item[0]) {
                movment(item[1], intPosition, vassleType, arrBoard)
            }
        })
    }

    const movment = (border, position, pieceType, arrBoard) =>{
        const pieces = [
            { type : "p", vassleMoves: pawnMovment },{ type : "n", vassleMoves: knightMovment },{ type : "r", vassleMoves: rookMovment },{ type : "b", vassleMoves: bishopMovment },{ type : "q", vassleMoves: queenMovment },{ type : "k", vassleMoves: kingMovment }] 

        pieces.forEach ((piece) =>{
                pieceType.toLowerCase() === piece.type && setPossiblePositions(piece.vassleMoves(border, position, pieceType, arrBoard, whiteTurn, isKingsMoved, isRooksMoved ))
            })
    }

    const movePiece = (position, splitedBoard) => {
        const pieceLocation = Number(selectedPiece[0])
        const pieceType = selectedPiece[1]
        
        //castling
        if(pieceType === "k" && position === pieceLocation - 2 && !isKingsMoved[1] && !isRooksMoved.whiteLeft){
            splitedBoard[position - 1] = "x"
            splitedBoard[position + 1] = "r"
        }
        if(pieceType === "K" && position === pieceLocation - 2 && !isKingsMoved[0] && !isRooksMoved.blackLeft){
            splitedBoard[position - 1] = "x"
            splitedBoard[position + 1] = "R"
        }

        if(pieceType === "k" && position === pieceLocation + 2 && !isKingsMoved[1] && !isRooksMoved.whiteRight){
            splitedBoard[position + 2] = "x"
            splitedBoard[position - 1] = "r"
        }
        if(pieceType === "K" && position === pieceLocation + 2 && !isKingsMoved[0] && !isRooksMoved.blackRight){
            splitedBoard[position + 2] = "x"
            splitedBoard[position - 1] = "R"
        }
        splitedBoard[position] = pieceType

        isPawnInTheEnd(pieceType, position, setSuperPawn, superPawn, setSuperPawnData)

        splitedBoard[pieceLocation] = "x"
        setSelected(false)
        setPossiblePositions([])
        const body = {
            _id: id, 
            board: splitedBoard.join(""),
            white: !whiteTurn 
        }
        RookMoved(pieceType, setIsRooksMoved, isRooksMoved, pieceLocation)
        kingMoved(pieceType, setIsKingsMoved, isKingsMoved, body)
        
        movePieceReq(body)
        setBoard(splitedBoard.join(""))
        setWhiteTurn(!whiteTurn)

        check(splitedBoard, !whiteTurn)
        checkmate(splitedBoard, !whiteTurn)
    }

    const changePawn = (superPawnData, pickedVassle) => {
        if(superPawnData[0] === "P" && superPawnData[1] >= 56){
            splitedBoard[superPawnData[1]] = pickedVassle.toUpperCase()
        }
        if(superPawnData[0] === "p" && superPawnData[1] <= 7 ){
            splitedBoard[superPawnData[1]] = pickedVassle
        }
        setBoard(splitedBoard.join(""))
    }

    return(
        <>           
        <div className={selected ? "selected" :"positions-container"}>
        {rows.map((row, index) =>{
            return(
                <>
                    {columns.map((column, i) => {
                        if(possiblePositions.includes(i + 8*index)){
                            return(
                                <div className="possible-move-container" onClick={() => movePiece(i + 8*index, splitedBoard)}>
                                    <button className={`possible-move-btn`}>
                                        {/* <span className="numbered">{((i)+ 8*index)}</span> */}
                                    </button>
                                </div>
                            )
                        }else{
                            return(
                                <div className="possible-move-container" onClick={() => {
                                    setSelected(false)
                                    setPossiblePositions([])
                                }}>
                                    <button className={` center `} >
                                        {/* <span className="numbered">{((i)+ 8*index)}</span> */}
                                    </button>
                                </div>
                            )
                        }
                    })}
                </>
            )
        })}
    </div>
        <div className="vassels-container">

            {splitedBoard.map((vassle, i) => {
                const black = ['R', 'N', 'B', 'K', 'Q', 'B', 'N', 'R', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P']
                const white = ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'r', 'n', 'b', 'k', 'q', 'b', 'n', 'r']
                if ( vassle !== "x" ){
                    if ( white.includes(vassle) ){
                        return(
                            <button className="center" value={[i, vassle]} onClick={(e) =>
                             whiteTurn && 
                             possibleMovments(e.target.value, splitedBoard)}>
                                {vassle === "r" && <FaChessRook className="vassle white"/>}
                                {vassle === "n" && <FaChessKnight className="vassle white"/>}
                                {vassle === "b" && <FaChessBishop className="vassle white"/>}
                                {vassle === "k" && <FaChessKing className="vassle white"/>}
                                {vassle === "q" && <FaChessQueen className="vassle white"/>}
                                {vassle === "p" && <FaChessPawn className="vassle white"/>}
                            </button>
                        )  
                    }
                    else if ( black.includes(vassle) ){
                        return(
                            <button className="center" value={[i, vassle]} onClick={(e) => 
                                !whiteTurn && 
                            possibleMovments(e.target.value, splitedBoard)}>
                                {vassle === "R" && <FaChessRook className="vassle black"/>}
                                {vassle === "N" && <FaChessKnight className="vassle black"/>}
                                {vassle === "B" && <FaChessBishop className="vassle black"/>}
                                {vassle === "K" && <FaChessKing className="vassle black"/>}
                                {vassle === "Q" && <FaChessQueen className="vassle black"/>}
                                {vassle === "P" && <FaChessPawn className="vassle black"/>}
                            </button>
                        )  
                    }else return(<></>)
                }else {
                    return(
                        <button className="center" value={i}/>
                    )
                }
            })}
        </div>
        {superPawn[0]  && <SuperPawm superPawn={superPawn} setSuperPawn={setSuperPawn} changePawn={changePawn} superPawnData={superPawnData}/>
        }
        {superPawn[1]  && <SuperPawm superPawn={superPawn} setSuperPawn={setSuperPawn} changePawn={changePawn} superPawnData={superPawnData}/>
        }
        </>
    )
}
export default Movment