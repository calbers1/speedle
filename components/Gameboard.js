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
						{x}
					</div>
				))
			) : (
				<span></span>
			)}
		</div>
	)
}
