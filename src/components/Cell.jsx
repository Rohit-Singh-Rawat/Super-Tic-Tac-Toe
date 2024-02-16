import { RxCross2 } from 'react-icons/rx';
import { FaRegCircle } from 'react-icons/fa';
export default function Cell({ handleClick, gridIndex, gridState, cellIndex }) {
	return (
		<div
			className='cell glowing-border'
			onClick={() => handleClick(gridIndex, cellIndex)}
		>
			{gridState[gridIndex][cellIndex] == 'X' ? (
				<RxCross2 className='cell-cross '></RxCross2>
			) : gridState[gridIndex][cellIndex] == 'O' ? (
				<FaRegCircle className='cell-circle'></FaRegCircle>
			) : null}
		</div>
	);
}
