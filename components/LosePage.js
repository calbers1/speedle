import { Box, Button, Container, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";

export default function LosePage(props) {
	const [tries, setTries] = useState(null);
	const [loseMessage, setLoseMessage] = useState(
		<h2>Come back tomorrow to try another word!</h2>
	);

	return (
		<Box className="Tutorial">
			<Paper
				sx={{ opacity: "95%" }}
				className="Tutorial-container"
				elevation={3}
			>
				<Grid
					container
					spacing={4}
					sx={{ margin: "auto", textAlign: "center" }}
				>
					<Grid className="grid" item xs={12}>
						<h1>Unlucky.</h1>
					</Grid>
					<Grid className="grid" item xs={12}>
						{loseMessage}
					</Grid>
					<Grid className="grid" item xs={12}></Grid>
				</Grid>
			</Paper>
		</Box>
	);
}
