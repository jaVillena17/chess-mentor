import { Square } from "./square";

const initialBoard = [
    ["t","h","b","q","k","b","h","t"],
    ["p","p","p","p","p","p","p","p"],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    ["p","p","p","p","p","p","p","p"],
    ["t","h","b","q","k","b","h","t"]
];

const coordinates = ["h","g","f","e","d","c","b","a"];

function calcCoordinatesbyIndex(index, indice){
    const x = indice;
    const xCoord = coordinates[x]
    const y = index%8 + 1 

    return xCoord + "" + y
}

export const Board = () =>{
    return (
        <div className="flex-board">
            {initialBoard.map((row, rowIndex) => {
                return (
                    row.map((piece, colIndex) =>  (
                            <Square 
                                key={`${rowIndex}, ${colIndex}`}
                                index={calcCoordinatesbyIndex(colIndex, rowIndex)}
                                piece={piece}
                                row={rowIndex%2}
                            />)
                    )
            )})}
        </div>
    )
}