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

export const Board = () =>{
    return (
        <div class="flex-board">
            {initialBoard.map(row => {
                return (
                    row.map((piece, index) =>  (
                            <Square 
                                key={index}
                                piece={piece} 
                            />)
                    )
            )})}
        </div>
    )
}