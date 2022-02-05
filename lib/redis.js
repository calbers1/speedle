import { Client, Entity, Schema, Repository } from "redis-om";

const client = new Client();

async function connect() {
	if (!client.isOpen()) {
		await client.open(process.env.REDIS_URL);
	}
}

class User extends Entity {}
class Score extends Entity {}
let schema = new Schema(User, {
	userName: { type: "string" },
	pass: { type: "string" },
	averageScore: { type: "number" },
	highScore: { type: "number" },
});

export async function createUser(userData) {
	console.log("USER DATA: ", userData);
	const data = JSON.parse(userData);
	await connect();

	const repository = new Repository(schema, client);

	const user = repository.createEntity();
	user.userName = data.userName;
	user.pass = data.pass;
	user.averageScore = 0;
	user.highScore = 0;

	const id = await repository.save(user);

	await client.close();

	return id;
}

export async function getUser(userData) {
	console.log("MADE IT HERE", userData);
	const data = JSON.parse(JSON.stringify(userData));
	await connect();

	const repository = new Repository(schema, client);
	const user = await repository
		.search()
		.where("userName")
		.eq(data.userName)
		.and("pass")
		.eq(data.pass)
		.return.all();

	const userProfile = JSON.parse(JSON.stringify(user));
	if (userProfile.length >= 1) {
		console.log("USER: ", userProfile[0]);
	}
	return userProfile;
}

export async function createIndex() {
	await connect();

	const repository = new Repository(schema, client);
	await repository.createIndex();
}
