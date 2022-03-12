import React, { useState } from "react";

export default function Gameboard(props) {
	const [cells, setCells] = useState([[]]);
	const [classes, setClasses] = useState([[]]);

	useState(() => {
		setCells(props.cellArray);
		setClasses(props.classArray);
	}, []);

	return (
		<div className="Gameboard">
			{cells.map((x, Xindex) =>
				x.map((y, Yindex) => (
					<div
						key={`${Xindex}${Yindex}`}
						className={`Gameboard-cell ${classes[Xindex][Yindex]}`}
					>
						{!props.hasWon ? y : ""}
					</div>
				))
			)}
		</div>
	);
}
