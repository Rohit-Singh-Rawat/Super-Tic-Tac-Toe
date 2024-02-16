import Cell from './Cell';

export default function Grid({
	handleClick,
	gridIndex,
	gridState,
	className,
	board,
}) {
	return (
		<div
			className={`grid ${className}`}
			style={{ opacity: board[gridIndex] !== null ? 0.3 : 1 }}
		>
			{[0, 1, 2].map((row) => {
				return (
					<div key={row}>
						{[0, 1, 2].map((col) => {
							return (
								<Cell
									key={row * 3 + col}
									handleClick={handleClick}
									gridState={gridState}
									gridIndex={gridIndex}
									cellIndex={row * 3 + col}
								></Cell>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}
