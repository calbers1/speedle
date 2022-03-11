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
							The aim of the game is to guess the word. Here's the catch: You
							have 6 tries and 60 seconds, so you'll need to blurt it out fast.
							After each guess, the you can see which letters you got in the{" "}
							<span className="Tutorial-correct"> correct spot</span>, which
							letters are
							<span className="Tutorial-wrong-spot">
								{" "}
								correct but in the wrong spot
							</span>
							, and which letters are
							<span className="Tutorial-wrong"> not in the word at all</span>.
							USE THESE HINTS. Once you finish (or run out of time) your score
							is calculated and thrown on the leaderboard next to your name for
							everyone to see. You get a bonus multiplier for having a streak,
							so check back every day or you'll lose it! <h3>Good luck!</h3>
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
