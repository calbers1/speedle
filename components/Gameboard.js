import React, { useState } from "react";

export default function Gameboard(props) {
	const [cells, setCells] = useState(props.cellArray);

	return (
		<div className="Gameboard">
			{cells.map((x, Xindex) =>
				x.map((y, Yindex) => (
					<div key={`${Xindex}${Yindex}`} className="Gameboard-cell">
						{y}
					</div>
				))
			)}
		</div>
	);
}
