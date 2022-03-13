import React, { useState } from "react";

export default function Gameboard(props) {
	return (
		<div className="Gameboard">
			{props.cellArray.map((x, Xindex) =>
				x.map((y, Yindex) => (
					<div
						key={`${Xindex}${Yindex}`}
						className={`Gameboard-cell ${props.classArray[Xindex][Yindex]}`}
					>
						{!props.hasWon ? y : ""}
					</div>
				))
			)}
		</div>
	);
}
