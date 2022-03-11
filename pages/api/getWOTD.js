import { getWordOfTheDay, updateWordOfTheDay } from "../../lib/redis";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		res.status(400).send({ message: "Only GET requests allowed" });
		return;
	}
	await updateWordOfTheDay();
	const word = await getWordOfTheDay();
	if (word === "") {
		console.log(oops);
		return 0;
	}
	res.status(200).json(word);
}
