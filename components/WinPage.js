import { Box, Button, Container, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function WinPage(props) {
	const [tries, setTries] = useState(null);
	const [winMessage, setWinMessage] = useState(
		<h2>You&apos;ve won today! Come back tomorrow to try another word!</h2>
	);
		const router = useRouter();
	useEffect(() => {
		if (props.tries > 0) {
			setTries(props.tries);
		}
	}, []);

	useEffect(() => {
		if (tries > 0) {
			setWinMessage(
				<>
					<h2>You&apos;ve done it in {tries !== 1 ? `${tries} guesses!` : `1 guess!`}</h2>
					<h2>Come back tomorrow to try another word!</h2>
				</>
			);
		}
	}, [tries]);
	return (
		<Box className="Tutorial">
			<Paper className="Tutorial-container Win" elevation={3}>
				<Grid
					container
					spacing={4}
					sx={{ margin: "auto", textAlign: "center" }}
				>
					<Grid className="grid" item xs={12}>
						<h1>Congratulations!</h1>
					</Grid>
					<Grid className="grid" item xs={12}>
						{winMessage}
					</Grid>
					<Grid className="grid" item xs={12}>
				<Button className="btnNav-win" variant="outlined" onClick={()=>{router.push(`Leaderboard`)}}>Leaderboard</Button>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
}
