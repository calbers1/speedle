import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Alert, Button, Container } from "@mui/material";
import { Box } from "@mui/system";
import Tutorial from "../components/Tutorial";
import Keyboard from "../components/Keyboard";
import Gameboard from "../components/Gameboard";
import WinPage from "../components/WinPage";
import LosePage from "../components/LosePage";

export default function blurtle() {
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
	const [endPage, setEndPage] = useState(<></>);
	const [gameOver, setGameOver] = useState(false);

	const router = useRouter();
	//initial setup
	useEffect(async () => {
		setUserName(window.localStorage.getItem("userName"));
		sethighScore(window.localStorage.getItem("highScore"));
		setaverageScore(window.localStorage.getItem("averageScore"));
		setTutorial(
			window.sessionStorage.getItem("showTutorial") === "1" ? <Tutorial /> : ""
		);

		//set up word of the day
		const word = await (await fetch("/api/getWOTD")).json();
		setDate(word.date);
		setWOTD(word.word);
	}, []);
	//set the localstorage arrays (for reload consistency)
	useEffect(() => {
		//if the user has entered a guess
		if (x > 0) {
			window.localStorage.setItem("classArray", JSON.stringify(classArray));
			window.localStorage.setItem("cellArray", JSON.stringify(cellArray));
			window.localStorage.setItem("oldX", x);
		}
		window.set;
	}, [x]);
	//check if you've already played today
	useEffect(() => {
		if (window.localStorage.getItem("gameOver") === date) {
			if (window.localStorage.getItem("win") === "true") {
				setEndPage(<WinPage />);
				setGameOver(true);
			} else if (x > 5) {
				setEndPage(<LosePage />);
				let endCellArray = [
					["", "", "", "", ""],
					["", "", "", "", ""],
					["", "", "", "", ""],
					["", "", "", "", ""],
					["", "", "", "", ""],
					["", "", "", "", ""],
				];
				setCellArray(endCellArray);
			}
		}

		//check if the grid has values
		console.log(`${date}`);
		if (window.localStorage.getItem("gameOver") === date) {
			console.log(`here`);

			let oldCells = window.localStorage.getItem("cellArray");
			let oldClasses = window.localStorage.getItem("classArray");
			let oldX = window.localStorage.getItem("oldX");
			window.localStorage.removeItem("oldX");
			if (oldCells !== null && oldClasses !== null) {
				oldCells = JSON.parse(oldCells);
				oldClasses = JSON.parse(oldClasses);
				oldX = JSON.parse(oldX);
				if (oldCells.length > 1 && oldClasses.length > 1) {
					setCellArray(oldCells);
					setClassArray(oldClasses);
					setX(oldX);
				}
			}
		}
	}, [date]);
	//check which letters are correct
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
	//check if the user has won
	const checkWin = () => {
		const guess = cellArray[x].join("");
		if (WOTD === guess) {
			setWinMessage(<span className="Tutorial-text">YOU WIN!</span>);
			setGameOver(true);
			window.localStorage.setItem("gameOver", date);
			window.localStorage.setItem("win", "true");
			let endCellArray = [
				["", "", "", "", ""],
				["", "", "", "", ""],
				["", "", "", "", ""],
				["", "", "", "", ""],
				["", "", "", "", ""],
				["", "", "", "", ""],
			];
			setCellArray(endCellArray);
			setTimeout(() => {
				setEndPage(<WinPage tries={x} />);
			}, 250);
		} else if (x >= 5) {
			setGameOver(true);
			window.localStorage.setItem("win", "false");
			window.localStorage.setItem("gameOver", date);
			setEndPage(<LosePage />);
			let endCellArray = [
				["", "", "", "", ""],
				["", "", "", "", ""],
				["", "", "", "", ""],
				["", "", "", "", ""],
				["", "", "", "", ""],
				["", "", "", "", ""],
			];
			setCellArray(endCellArray);
		} else {
			setWinMessage(<span className="Tutorial-text">TRY AGAIN.</span>);
		}
	};
	//log out
	const logOut = () => {
		window.localStorage.removeItem("userString");
		router.push("/");
	};

	return (
		<Container sx={{ width: "100vw", padding: ".5rem" }}>
			<Box>
				{/* Logged In As {userName}. Average Score: {averageScore}. High Score:{" "}
				{highScore}. Word Of The Day: {WOTD}  */}
				{endPage}
				{tutorial}
			</Box>
			<Container
				sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
			>
				{winMessage}
			</Container>
			<Gameboard
				cellArray={cellArray}
				classArray={classArray}
				gameOver={gameOver}
			></Gameboard>
			{!gameOver ? (
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
			) : (
				<span />
			)}
		</Container>
	);
}