import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Container } from "@mui/material";
import { Box } from "@mui/system";

export default function Speedle() {
	const [userName, setUserName] = useState("");
	const [highScore, sethighScore] = useState("");
	const [averageScore, setaverageScore] = useState("");
	const router = useRouter();
	useEffect(() => {
		setUserName(window.sessionStorage.getItem("userName"));
		sethighScore(window.sessionStorage.getItem("highScore"));
		setaverageScore(window.sessionStorage.getItem("averageScore"));
	}, []);

	const logOut = () => {
		window.localStorage.removeItem("userString");
		window.sessionStorage.removeItem("userName");
		window.sessionStorage.removeItem("highScore");
		window.sessionStorage.removeItem("averageScore");
		router.push("/");
	};
	return (
		<Container>
			<Box>
				Logged In As {userName}. Average Score: {averageScore}. High Score:
				{highScore}.
			</Box>
			<Button
				variant="contained"
				onClick={logOut}
				sx={{ width: "100%", marginTop: "1em" }}
			>
				Log Out
			</Button>
		</Container>
	);
}
