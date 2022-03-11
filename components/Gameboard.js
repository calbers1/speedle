import React, { useState } from "react";

export default function Gameboard(props) {
	const [cells, setCells] = useState(props.cellArray);
	const [classes, setClasses] = useState(props.classArray);

	return (
		<div className="Gameboard">
			{cells.map((x, Xindex) =>
				x.map((y, Yindex) => (
					<div
						key={`${Xindex}${Yindex}`}
						className={`Gameboard-cell ${classes[Xindex][Yindex]}`}
					>
						{y}
					</div>
				))
			)}
		</div>
	);
}
