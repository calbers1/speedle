import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Container } from "@mui/material";
import { Box } from "@mui/system";
import Tutorial from "../components/Tutorial";
import Keyboard from "../components/Keyboard";

export default function Speedle() {
	const [userName, setUserName] = useState("");
	const [highScore, sethighScore] = useState("");
	const [averageScore, setaverageScore] = useState("");
	const [tutorial, setTutorial] = useState("");
	const router = useRouter();
	useEffect(() => {
		setUserName(window.localStorage.getItem("userName"));
		sethighScore(window.localStorage.getItem("highScore"));
		setaverageScore(window.localStorage.getItem("averageScore"));
		setTutorial(
			window.sessionStorage.getItem("showTutorial") === "1" ? <Tutorial /> : ""
		);
	}, []);

	const logOut = () => {
		window.localStorage.removeItem("userString");
		router.push("/");
	};
	return (
		<Container sx={{ width: "100vw", padding: ".5rem" }}>
			{/* <Box>
				Logged In As {userName}. Average Score: {averageScore}. High Score:{" "}
				{highScore}. {tutorial}
			</Box>
			<Button
				variant="contained"
				onClick={logOut}
				sx={{ width: "100%", marginTop: "1em" }}
			>
				Log Out
			</Button> */}
			<Keyboard>ENTER STUFF HERE</Keyboard>
		</Container>
	);
}
