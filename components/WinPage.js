import { Box, Button, Container, Grid, Paper } from "@mui/material";
import { useState } from "react";

export default function WinPage() {
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
						<h2>
							You&apos;ve won today! Come back tomorrow to try another word!
						</h2>
					</Grid>
					<Grid className="grid" item xs={12}></Grid>
				</Grid>
			</Paper>
		</Box>
	);
}
