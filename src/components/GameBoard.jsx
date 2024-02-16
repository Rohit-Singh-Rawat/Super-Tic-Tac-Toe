import { useState } from 'react';
import Grid from './Grid';
import { RxCross2 } from 'react-icons/rx';
import { FaRegCircle } from 'react-icons/fa';
import { BsDash } from 'react-icons/bs';

export default function GameBoard() {
	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [board, SetBoard] = useState(Array(9).fill(null));
	const [gridState, setGridState] = useState(
		Array(9).fill(Array(9).fill(null))
	);
	const [activeGrids, SetActiveGrids] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
	function resetGame() {
		setCurrentPlayer('X');
		SetBoard(Array(9).fill(null));
		setGridState(Array(9).fill(Array(9).fill(null)));
		SetActiveGrids([0, 1, 2, 3, 4, 5, 6, 7, 8]);
	}
	function checkWinner() {
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

		return winnerLogic.some((winCond) => {
			let [a, b, c] = winCond;
			return (
				board[a] !== null && board[a] === board[b] && board[a] === board[c]
			);
		});
	}
	function checkDraw() {
		return board.every((val) => val !== null);
	}

	function GridWinnerChecker(gi, state) {
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
		if (state[gi].every((val) => val !== null)) {
			const boardCopy = [...board];
			boardCopy[gi] = 'D';
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
		<div>
			<div className='gameName'>
				<h1>SUPER TIC TAC TOE</h1>
			</div>
			<div className='game'>
				<div
					className='game-board'
					style={{ pointerEvents: checkWinner() ? 'none' : 'auto' }}
				>
					{[0, 1, 2].map((row) => {
						return (
							<div key={row}>
								{[0, 1, 2].map((col) => {
									return (
										<div key={row * 3 + col}>
											<Grid
												gridState={gridState}
												board={board}
												handleClick={handleClick}
												gridIndex={row * 3 + col}
												id={row * 3 + col}
												className={
													activeGrids.includes(row * 3 + col)
														? 'active-grid'
														: 'inactive-grid'
												}
											></Grid>
											<div className='gridValue '>
												{board[row * 3 + col] == 'X' ? (
													<RxCross2 className='cross glowing-cross'></RxCross2>
												) : board[row * 3 + col] == 'O' ? (
													<FaRegCircle className='circle glowing-circle'></FaRegCircle>
												) : board[row * 3 + col] == 'D' ? (
													<BsDash className='dash glowing-dash' />
												) : null}
											</div>
										</div>
									);
								})}
							</div>
						);
					})}
				</div>
				<div>
					<div id='status'>
						<h2>
							{checkWinner() ? (
								<span>
									Player
									<span>
										{currentPlayer == 'X' ? (
											<FaRegCircle className='s-circle'></FaRegCircle>
										) : (
											<RxCross2 className='s-cross'></RxCross2>
										)}
									</span>
									wins!
								</span>
							) : checkDraw() ? (
								<span>It's a draw!</span>
							) : (
								<span>
									Next player:
									<span>
										{currentPlayer == 'X' ? (
											<RxCross2 className='s-cross'></RxCross2>
										) : (
											<FaRegCircle className='s-circle'></FaRegCircle>
										)}
									</span>
								</span>
							)}
						</h2>
					</div>
					<div>
						<button
							id='resetBtn'
							onClick={resetGame}
						>
							RESET
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
