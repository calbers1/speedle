import React, { useState } from "react";

export default function Gameboard(props) {
	const [cells, setCells] = useState(props.cellArray);

	return (
		<div className="Gameboard">
			{cells.map((x) =>
				x.map((y) => <div className="Gameboard-cell">{y}</div>)
			)}
		</div>
	);
}
