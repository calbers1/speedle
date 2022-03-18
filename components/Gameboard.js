import React, { useState } from 'react'

export default function Gameboard(props) {
	return (
		<div className="Gameboard">
			{props.classArray ? (
				props.cellArray.map((x, Xindex) => (
					<div
						key={`${Xindex}`}
						className={`Gameboard-cell ${props.classArray[Xindex]}`}
					>
						{props.gameOver ? '' : x}
					</div>
				))
			) : (
				<span></span>
			)}
		</div>
	)
}
