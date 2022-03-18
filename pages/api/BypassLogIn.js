import { BypassLogIn } from "../../lib/redis";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		res.status(400).send({ message: "Only GET requests allowed" });
		return;
	}
	const user = await BypassLogIn(req.query);
	if (user.userName === null) {
		console.error(err);
		res.status(500).json({ err });
		return 0;
	}
	res.status(200).json({ user });
}
