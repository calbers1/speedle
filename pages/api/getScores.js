import { getScores } from "../../lib/redis";

const cleanResponse = (res)=>{
	let responseArray = [];
	for (let i = 0; i < res.length; i++){
		responseArray = [...responseArray, {userName: res[i].userName, score: res[i].score, streak: res[i].streak}]
	}
	responseArray.sort((a, b)=>{
		return b.score - a.score;
	})
	return responseArray
}

export default async function handler(req, res) {
	if (req.method !== "GET") {
		res.status(400).send({ message: "Only GET requests allowed" });
		return;
	}
	const response = await getScores();
	if (response === "" || response === null || response === undefined) {
		console.error(oops);
		return 0;
	}
	
	const todaysWinners = cleanResponse(response)

	res.status(200).json(todaysWinners);
	return 
}
