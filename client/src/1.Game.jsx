import './App.css';
import Board from './board/Board';
import Movment from './board/Movment';
import { useEffect, useState } from "react"
import './1.game.css'
import { getGame } from './utils/req';
import { publicRequest } from './requestMethods';

function Game() {
  const [board, setBoard] = useState("RNBKQBNRPPPPPPPPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxpppppppprnbkqbnr")
  const [id, setId] = useState("")
  useEffect(() => {
    publicRequest.put('/position', {
        "_id" : "635a7e13b45f7777529539c4",
        "board": "RNBKQBNRPPPPPPPPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxpppppppprnbkqbnr",
        "white": "true"
    }).then((res) => {
        getGame(setId, setBoard)
    })
    .catch((err) => console.log(err));
  },[])
  return (
    <div className='screen'>
      <div className='transparency'>
        <div className="game-container">
          <div className='elemnt-3D'>
            <div className='board-component-container'>
              <Board/>
              <Movment board={board} setBoard={setBoard} id={id} setId={setId}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;