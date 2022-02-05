import { createUser } from "../../lib/redis";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		res.status(400).send({ message: "Only POST requests allowed" });
		return;
	}
	console.log("REQ_BODY: ", req.body);
	const id = await createUser(req.body);
	res.status(200).json({ id });
}
