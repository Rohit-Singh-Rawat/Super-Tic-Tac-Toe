export default function Cell({ handleClick, gridIndex,gridState,cellIndex }){
    
    return(
        <div className="cell" onClick={()=>handleClick(gridIndex, cellIndex)}>
            {gridState[gridIndex][cellIndex]}
        </div>
    )
}