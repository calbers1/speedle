import { Box, Button, Container, Grid, Paper } from "@mui/material";
import { useState } from "react";

export default function Tutorial() {
	const [tutorialClass, setTutorialClass] = useState("Tutorial");
	const closeTutorial = (e) => {
		setTutorialClass("hidden");
		window.sessionStorage.clear("showTutorial");
	};

	return (
		<Box className={tutorialClass}>
			<Paper className="Tutorial-container" elevation={3}>
				<Grid
					container
					spacing={4}
					sx={{ margin: "auto", textAlign: "center" }}
				>
					<Grid className="grid" item xs={12}>
						<h1>First time?</h1>
					</Grid>
					<Grid className="grid" item xs={12}>
						<p className="Tutorial-text">The goal is to guess the word.</p>

						<p className="Tutorial-text">
							After each guess, the letters will change colors.
						</p>
						<br />
						<h1 className="Tutorial-correct">
							Green letters are in the correct spot.
						</h1>
						<h1 className="Tutorial-wrong-spot">
							Orange letters are in an incorrect spot.
						</h1>
						<h1 className="Tutorial-wrong">
							Red letters are not in the word at all.
						</h1>
						<h1>Good luck!</h1>
					</Grid>
					<Grid className="grid" item xs={12}>
						<Button variant="contained" onClick={closeTutorial}>
							Ready!
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
}
