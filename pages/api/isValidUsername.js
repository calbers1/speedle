import { isValidUsername } from "../../lib/redis";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		res.status(400).send({ message: "Only GET requests allowed" });
		return;
	}
	const isValid = await isValidUsername(req.query);
	console.log("is valid: ", isValid);
	if (isValid !== 1) {
		console.log("user is not valid");
	}
	res.status(200).json(isValid);
}
