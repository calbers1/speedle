import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Alert, Button, Container } from "@mui/material";
import { Box } from "@mui/system";
import Tutorial from "../components/Tutorial";
import Keyboard from "../components/Keyboard";
import Gameboard from "../components/Gameboard";
import WinPage from "../components/WinPage";

export default function Speedle() {
	const [userName, setUserName] = useState("");
	const [highScore, sethighScore] = useState("");
	const [averageScore, setaverageScore] = useState("");
	const [tutorial, setTutorial] = useState("");
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const [cellArray, setCellArray] = useState([
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
	]);
	const [classArray, setClassArray] = useState([
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
	]);
	const [date, setDate] = useState();
	const [WOTD, setWOTD] = useState("");
	const [winMessage, setWinMessage] = useState(
		<span className="Tutorial-text">BLURTLE</span>
	);
	const [winPage, setWinPage] = useState(<></>);
	const router = useRouter();
	useEffect(async () => {
		setUserName(window.localStorage.getItem("userName"));
		sethighScore(window.localStorage.getItem("highScore"));
		setaverageScore(window.localStorage.getItem("averageScore"));
		setTutorial(
			//Set this back before go live
			//window.sessionStorage.getItem("showTutorial") === "1" ? <Tutorial /> : ""
			<Tutorial />
		);

		//set up word of the day
		const res = await (await fetch("/api/getWOTD")).json();
		setDate(res.date);
		setWOTD(res.word);
	}, []);
	//checks if you've won already today
	useEffect(() => {
		if (window.localStorage.getItem("hasWon") === date) {
			console.log("hasWon: ", window.localStorage.getItem("hasWon"));
			console.log("Date: ", date);
			setWinPage(<WinPage />);
		}
	}, [date]);

	const checkLetters = () => {
		const guess = cellArray[x];
		let answer = WOTD.split("");
		const newClassArray = classArray;

		//loop to find right letters. If it's right, it's replaced in the array by " ".
		for (let i = 0; i < 5; i++) {
			if (answer[i] === guess[i]) {
				newClassArray[x][i] += " right";
				answer[i] = " "; //this is so that the index stays on track.
			}
		}

		//loop through array without right answers.
		for (let i = 0; i < 5; i++) {
			const index = answer.indexOf(guess[i]);
			if (index > -1) {
				newClassArray[x][i] += " wrong-location";
				answer.splice(index, 1);
			} else {
				newClassArray[x][i] += " wrong";
			}
		}

		setClassArray(newClassArray);
	};

	const checkWin = () => {
		const guess = cellArray[x].join("");
		if (WOTD === guess) {
			setWinMessage(<span className="Tutorial-text">YOU WIN!</span>);
			setX(10);
			setY(10);
			window.localStorage.setItem("hasWon", date);
			setWinPage(<WinPage />);
		} else {
			setWinMessage(<span className="Tutorial-text">TRY AGAIN.</span>);
		}
	};

	const logOut = () => {
		window.localStorage.removeItem("userString");
		router.push("/");
	};

	return (
		<Container sx={{ width: "100vw", padding: ".5rem" }}>
			<Box>
				{/* Logged In As {userName}. Average Score: {averageScore}. High Score:{" "}
				{highScore}. Word Of The Day: {WOTD}  */}
				{winPage}
				{tutorial}
			</Box>
			<Container
				sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
			>
				{winMessage}
			</Container>
			<Gameboard cellArray={cellArray} classArray={classArray}></Gameboard>
			<Keyboard
				cellArray={cellArray}
				setCellArray={setCellArray}
				classArray={classArray}
				setClassArray={setClassArray}
				x={x}
				setX={setX}
				y={y}
				setY={setY}
				checkWin={checkWin}
				checkLetters={checkLetters}
				WOTD={WOTD}
			></Keyboard>
			<Button
				variant="contained"
				onClick={logOut}
				sx={{
					width: "100%",
					height: "5vmax",
					marginTop: "1em",
				}}
			>
				Log Out
			</Button>
		</Container>
	);
}
