import "./board.scss"


const Board = () => {
    const columns = ["h", "g", "f", "e", "d", "c", "b" ,"a"]
    const rows = [
        [1, "one"], 
        [2, "two"], 
        [3, "three"], 
        [4, "four"], 
        [5, "five"], 
        [6, "six"], 
        [7, "seven"], 
        [8, "eight"]]
        
    return(
        <div className={`board-container `}>
            {rows.map((row, index) =>{
                return(
                    <>
                        {columns.map((column, i) => {
                            if( index % 2 === 0 && i % 2 !== 0){
                                return(
                                    <div className={`${row[1]}${column}`}/>
                                )
                            }else if( index % 2 !== 0 && i % 2 === 0){
                                return(
                                    <div className={`${row[1]}${column}`}/>
                                )
                            }
                            else{
                                return(
                                    <div className={`${row[0]}${column}`}/>
                                )
                            }
                        })}
                        </>
                )
            })}
        </div>
    )
}

export default Board