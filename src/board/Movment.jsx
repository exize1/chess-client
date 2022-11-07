import "./movment.scss"
import {
    FaChessPawn,
    FaChessKing,
    FaChessQueen,
    FaChessKnight,
    FaChessBishop,
    FaChessRook
} from "react-icons/fa"
import { useEffect, useState } from "react"
import { bishopMovment, kingMovment, knightMovment, pawnMovment, queenMovment, rookMovment } from "../utils/movements"
import { publicRequest } from "../requestMethods"
import { isPawnInTheEnd, kingMoved, RookMoved } from "../utils/helpers"
import { check, checkmate } from "../utils/rules"
import SuperPawm from "../components/superPawn/SuperPawn"
import { getEngineMove, getGame } from "../utils/req"
// import sound from '../assets/check.mp3'
// import checkmateSound from '../assets/checkmate.mp3'
import { socket } from "../App"

const Movment = ({ board, setBoard, room, engineGame, engineId, setIsCheckmate }) => {
    const splitedBoard = board.split("")

    // for glowing the cubes
    const [possiblePositions, setPossiblePositions] = useState([])
    const [selected, setSelected] = useState(false)
    const [selectedPiece, setSelectedPiece] = useState([])
    const [whiteTurn, setWhiteTurn] = useState(true)
    const [isKingsMoved, setIsKingsMoved] = useState([false, false])
    const [superPawn, setSuperPawn] = useState([false, false])
    const [superPawnData, setSuperPawnData] = useState([])
    const [isCheck, setIsCheck] = useState(false)

    const [isRooksMoved, setIsRooksMoved] = useState({
                                                        blackLeft: false,
                                                        blackRight: false,
                                                        whiteLeft: false,
                                                        whiteRight: false
                                                    })   
                                                    
    const playerWhite = window.sessionStorage.getItem("white")
    
    const columns = [1, 2, 3, 4, 5, 6, 7 ,8]
    const rows = [1, 2, 3, 4, 5, 6, 7 ,8]
    const movePieceReq = (body) =>{

        const engineBody = { 
            board: splitedBoard.join(""),
            white: !whiteTurn,
            id: engineId
        }
        engineGame ? 
            publicRequest.put('/engine', engineBody)
            .then((res) => {
               getEngineMove(setBoard, engineId)
               setWhiteTurn(true)
            })
            .catch((err) => console.log(err))
        :
        publicRequest.put('/position', body)
            .then((res) => {
                getGame(setBoard, room)
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
        splitedBoard[pieceLocation] = "x"
        setSelected(false)
        setPossiblePositions([])

        isPawnInTheEnd(pieceType, position, setSuperPawn, superPawn, setSuperPawnData)

        const body = { 
            board: splitedBoard.join(""),
            white: !whiteTurn,
            room: room
        }
        RookMoved(pieceType, setIsRooksMoved, isRooksMoved, pieceLocation)
        kingMoved(pieceType, setIsKingsMoved, isKingsMoved, body)
        
        movePieceReq(body)
        setBoard(splitedBoard.join(""))

        check(splitedBoard, !whiteTurn) && setIsCheck(!isCheck)
        aMove(splitedBoard.join(""), whiteTurn)

        checkmate(splitedBoard, !whiteTurn, setIsCheckmate)
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

    // const playCheck = () =>{
        
    //     ischeckmate ? new Audio(checkmateSound).play() : new Audio(sound).play()
    // }

    useEffect(() => {
        socket.on("cach_the_move", data => {
            setBoard(data.updatedboard)
            setWhiteTurn(!data.whiteTurn)
          })
    }, [setBoard])


    const aMove = (updatedboard, whiteTurn) => {
        setWhiteTurn(!whiteTurn)
        socket.emit('make_the_move', { updatedboard, whiteTurn })
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
                                <div className="possible-move-container" onClick={() => {
                                    movePiece(i + 8*index, splitedBoard)
                                    }}>
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
                                playerWhite === "true" && whiteTurn && possibleMovments(e.target.value, splitedBoard)}>
                                    {vassle === "r" && <FaChessRook className={`vassle white ${playerWhite === "false" && "rotate-board"}`}/>}
                                    {vassle === "n" && <FaChessKnight className={`vassle white ${playerWhite === "false" && "rotate-board"}`}/>}
                                    {vassle === "b" && <FaChessBishop className={`vassle white ${playerWhite === "false" && "rotate-board"}`}/>}
                                    {vassle === "k" && <FaChessKing className={`vassle white ${playerWhite === "false" && "rotate-board"}`}/>}
                                    {vassle === "q" && <FaChessQueen className={`vassle white ${playerWhite === "false" && "rotate-board"}`}/>}
                                    {vassle === "p" && <FaChessPawn className={`vassle white ${playerWhite === "false" && "rotate-board"}`}/>}
                            </button>
                        )  
                    }
                    else if ( black.includes(vassle) ){
                        return(
                            <button className="center" value={[i, vassle]} onClick={(e) => 
                                playerWhite === "false" && !whiteTurn && possibleMovments(e.target.value, splitedBoard)}>
                                {vassle === "R" && <FaChessRook className={`vassle black ${playerWhite === "false" && "rotate-board"}`}/>}
                                {vassle === "N" && <FaChessKnight className={`vassle black ${playerWhite === "false" && "rotate-board"}`}/>}
                                {vassle === "B" && <FaChessBishop className={`vassle black ${playerWhite === "false" && "rotate-board"}`}/>}
                                {vassle === "K" && <FaChessKing className={`vassle black ${playerWhite === "false" && "rotate-board"}`}/>}
                                {vassle === "Q" && <FaChessQueen className={`vassle black ${playerWhite === "false" && "rotate-board"}`}/>}
                                {vassle === "P" && <FaChessPawn className={`vassle black ${playerWhite === "false" && "rotate-board"}`}/>}
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