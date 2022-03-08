import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
	return (
		<h1>
			Logged In As {userName}. Average Score: {averageScore}. High Score:{" "}
			{highScore}
		</h1>
	);
}
