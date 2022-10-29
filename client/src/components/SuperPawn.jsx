import "./super-pawn.css"
import {
    FaChessQueen,
    FaChessKnight,
    FaChessBishop,
    FaChessRook
} from "react-icons/fa"

const SuperPawm = ({superPawn, setSuperPawn, changePawn, superPawnData}) => {
    return(
        <div className="super-pawn-container">
            <div className="choose-vassle-container">
                <div className="choose-vassle">
                    <button className="choose-vassle-btn"  onClick={() => {
                        setSuperPawn( [false, false] )
                        changePawn( superPawnData, 'r')
                        }}>
                        <FaChessRook className={superPawn[0] ? "black-vassle" : "white-vassle"} onClick={() => {
                            setSuperPawn( [false, false] )
                            changePawn( superPawnData, 'r')
                        }}/>
                    </button>
                    <button className="choose-vassle-btn" onClick={() => {
                            setSuperPawn( [false, false] )
                            changePawn( superPawnData, 'n')
                        }}>
                        <FaChessKnight className={superPawn[0] ? "black-vassle" : "white-vassle"} onClick={() => {
                            setSuperPawn( [false, false] )
                            changePawn( superPawnData, 'n')
                        }}/>
                    </button>
                    <button className="choose-vassle-btn" onClick={() => {
                            setSuperPawn( [false, false] )
                            changePawn( superPawnData, 'b')
                        }}>
                        <FaChessBishop className={superPawn[0] ? "black-vassle" : "white-vassle"} onClick={() => {
                            setSuperPawn( [false, false] )
                            changePawn( superPawnData, 'b')
                        }}/>
                    </button>
                    <button className="choose-vassle-btn" onClick={() => {
                            setSuperPawn( [false, false] )
                            changePawn( superPawnData, 'q')
                        }}>
                        <FaChessQueen className={superPawn[0] ? "black-vassle" : "white-vassle"} onClick={() => {
                            setSuperPawn( [false, false] )
                            changePawn( superPawnData, 'q')
                        }}/>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default SuperPawm