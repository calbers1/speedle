import { closeAllClients } from "../../lib/redis";

export default async function handler(req, res) {
	await closeAllClients();
	res.status(200).send("all clients closed");
}
