import { dropIndex } from "../../lib/redis";

export default async function handler(req, res) {
	await dropIndex();
	res.status(200).send("ok");
}
