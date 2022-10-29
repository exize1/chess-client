import { publicRequest } from "../requestMethods"

export const getGame = (setId, setBoard) => {
    publicRequest.get('/position')
    .then(res => {
        res.data && setId(res.data[0]._id) 
        res.data && setBoard(res.data[0].board)
      })
  }