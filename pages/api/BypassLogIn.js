import { BypassLogIn } from "../../lib/redis";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		res.status(400).send({ message: "Only GET requests allowed" });
		return;
	}
	const user = await BypassLogIn(req.query);
	if (user === "") {
		console.log(oops);
		return 0;
	}
	res.status(200).json({ user });
}