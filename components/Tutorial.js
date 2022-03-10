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
						<p className="Tutorial-text">
							The aim of the game is to guess the word. You have 6 tries and 60
							seconds. After each guess, the you can see which letters you got
							in the correct spot (green), which letters are correct but in the
							wrong spot (yellow), and which letters are not in the word at all
							(black). USE THESE HINTS. Once you finish (or run out of time)
							your score is then calculated: <br />
							(guesses remaining * seconds remaining) * (1 + (current streak /
							10)), and thrown on the leaderboard next to your name.{" "}
							<h3>Good luck!</h3>
						</p>
					</Grid>
					<Grid className="grid" item xs={12}>
						<Button variant="contained" onClick={closeTutorial}>
							Esketit!
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
}
