import { publicRequest } from "../requestMethods"

export const getGame = (setBoard, room) => {
    publicRequest.get(`/position/${room}`)
    .then(res => {
        res.data && setBoard(res.data.board)
      })
  }

  export const getEngineMove = (setBoard, engineId) => {
    publicRequest.get(`/engine/${engineId}`)
    .then(res => {
        res.data && setBoard(res.data[0].board)
      })
  }  
