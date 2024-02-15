import { useState } from 'react';
import Grid from './Grid';

export default function GameBoard() {
	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [board, SetBoard] = useState(Array(9).fill(null));
	const [gridState, setGridState] = useState(
		Array(9).fill(Array(9).fill(null))
	);
	const [activeGrids, SetActiveGrids] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
	function GridWinnerChecker(gi, state) {
		if (state[gi].every((val) => val !== null)) {
			const boardCopy = [...board];
			boardCopy[gi] = 'D';
			SetBoard(boardCopy);
			return;
		}
		const winnerLogic = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		const isWinner = winnerLogic.some((winCond) => {
			let [a, b, c] = winCond;
			return (
				state[gi][a] !== null &&
				state[gi][a] === state[gi][b] &&
				state[gi][a] === state[gi][c]
			);
		});
		if (isWinner) {
			const boardCopy = [...board];
			boardCopy[gi] = currentPlayer;
			SetBoard(boardCopy);
			return;
		}
	}
	function handleClick(gi, ci) {
		if (gridState[gi][ci] !== null) {
			return;
		}

		let gridCopy = JSON.parse(JSON.stringify(gridState));
		gridCopy[gi][ci] = currentPlayer;
		setGridState([...gridCopy]);
		GridWinnerChecker(gi, gridCopy);
		SetBoard((prevB) => {
			const newActiveGrids = prevB
				.map((v, i) => (v === null ? i : null))
				.filter((v) => v !== null);
			SetActiveGrids(prevB[ci] !== null ? newActiveGrids : [ci]);
			return prevB;
		});

		setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
	}
	return (
		<div className='game-board'>
			{[0, 1, 2].map((row) => {
				return (
					<div key={row}>
						{[0, 1, 2].map((col) => {
							return board[row * 3 + col] === null ? (
								<Grid
									gridState={gridState}
									key={row * 3 + col}
									handleClick={handleClick}
									gridIndex={row * 3 + col}
									id={row * 3 + col}
									className={
										activeGrids.includes(row * 3 + col)
											? 'active-grid'
											: 'inactive-grid'
									}
								></Grid>
							) : (
								<span key={row * 3 + col}>{board[row * 3 + col]}</span>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}
