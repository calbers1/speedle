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
							Do you want to play a casual, laid back word-finding game, and
							post little squares on social media? <h2>TOO BAD.</h2>
						</p>
						<p className="Tutorial-text">
							This is a game about being smarter and faster than everyone else.
							The gameplay is similar to a popular (read: sellout) word game,
							but your score is calculated by how many tries and how much time
							you take to get it right. Then, your score goes on a global
							leaderboard, for everyone to see. This ain&#39;t your granny&#39;s
							word game. <h3>Welcome to Speedle.</h3>
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
