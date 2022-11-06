import './App.css';
import './1.game.css'
import { publicRequest } from './requestMethods';
import { socket } from './App';
import './home.css'

function Home({ setNewGame,  setRoom, setEengineId, setEengineGame }) {

    const creatRoom = () =>{
        publicRequest.post('/position')
            .then((res) => {
                console.log(`created room ${res.data.room}`);
                // socket.emit("creat_room", res.data.room)
                window.sessionStorage.setItem("white",  res.data.white)
                setRoom(res.data.room)
            })
        .catch((err) => console.log(err));
    } 

  const joinEngine = () =>{
    publicRequest.post('/engine')
        .then((res) => {
            setEengineId(res.data._id)
            window.sessionStorage.setItem("white",  res.data.white)
        })
    .catch((err) => console.log(err));
  } 
    
  const createNewGameRoom = () => {
      creatRoom()
      setNewGame(true)
  }

  const StartWithEngine = () => {
    joinEngine()
    setNewGame(true)
    setEengineGame(true)
  }

  return (
    <div className='screen'>
        <div className='transparency'>
            <div className='home'>
                <button className='computer' onClick={StartWithEngine}>Play VS computer</button>
                <button className='new-game' onClick={createNewGameRoom}>1 VS 1</button>
            </div>
        </div>
    </div>
  );
}

export default Home;