import './App.css';
import Board from './board/Board';
import Movment from './board/Movment';
import { useState } from "react"
import './1.game.css'
import Feedback from './3.Feedback';
import Modal from './components/modal/Modal';

function Game( { room,  engineId, engineGame } ) {
  const [board, setBoard] = useState("RNBKQBNRPPPPPPPPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxpppppppprnbkqbnr")
  const white = window.sessionStorage.getItem("white")

  const [error, setError] = useState(true)
  const [alertType, setAlertType] = useState("")
  const [message, setMessage] = useState("")
  const [ischeckmate, setIsCheckmate] = useState(false)

  // useEffect(() => {
    // publicRequest.put('/position', {
    //     "_id" : "635a7e13b45f7777529539c4",
    //     "board": "RNBKQBNRPPPPPPPPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxpppppppprnbkqbnr",
    //     "white": "true"
    // }).then((res) => {
    //     getGame(setId, setBoard)
    // })
    // .catch((err) => console.log(err));
  // },[])
  return (
    <div className='screen'>
      <div className='transparency'>
        <div className="game-container">
          <div className='elemnt-3D'>
            <div className={`board-component-container ${white === "false" && "rotate-board"}`}>
              <Board/>
              <Movment board={board} setBoard={setBoard} room={room} engineId={engineId} engineGame={engineGame} setIsCheckmate={setIsCheckmate}/>
            </div>
          </div>
        </div>
        {ischeckmate && 
            <div>
              <Modal>

              </Modal>
            </div>
        }
        <Feedback setError={setError} setMessage={setMessage} setAlertType={setAlertType} />
        {!error && 
        <div className={`alert-container ${alertType}`}>
          <p>{message}</p>
        </div>}
      </div>
    </div>
  );
}

export default Game;