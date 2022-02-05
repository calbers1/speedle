import { getUser } from "../../lib/redis";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		res.status(400).send({ message: "Only GET requests allowed" });
		return;
	}
	console.log("made it here ", req.query);
	const id = await getUser(req.query);
	if (id === "") {
		console.log(oops);
		return 0;
	}
	res.status(200).send(id);
}
