import { Client, Entity, Schema, Repository } from "redis-om";
import { AESEncryption } from "aes-password";
const saltRounds = 10;

class User extends Entity {}
class Score extends Entity {}
let schema = new Schema(User, {
	ID: { type: "string" },
	userName: { type: "string" },
	pass: { type: "string" },
	averageScore: { type: "number" },
	highScore: { type: "number" },
});

export async function createUser(userData) {
	console.log("HERE");
	const client = new Client();
	await client.open(process.env.REDIS_URL);
	const data = JSON.parse(userData);

	const repository = new Repository(schema, client);

	const user = repository.createEntity();
	const encryptedPass = await AESEncryption.encrypt(
		data.pass,
		process.env.AES_KEY
	);

	user.ID = user.entityId;
	user.userName = data.userName;
	user.pass = encryptedPass;
	user.averageScore = 0;
	user.highScore = 0;

	const id = await repository.save(user);
	await client.close();
	return id;
}

export async function LogIn(userData) {
	const client = new Client();
	await client.open(process.env.REDIS_URL);
	// const data = JSON.parse(JSON.stringify(userData));
	const data = userData;

	const repository = new Repository(schema, client);
	const user = await repository
		.search()
		.where("userName")
		.eq(data.userName)
		.return.first();

	await client.close();
	const userProfile = JSON.parse(JSON.stringify(user));
	if (userProfile != null) {
		const dbPass = await AESEncryption.decrypt(
			userProfile.pass,
			process.env.AES_KEY
		);
		if (data.pass === dbPass) {
			return userProfile;
		} else return { error: "Incorrect Username Or Password." };
	} else return { error: "Incorrect Username Or Password." };
}

export async function BypassLogIn(userData) {
	const client = new Client();
	await client.open(process.env.REDIS_URL);
	const data = userData;

	const repository = new Repository(schema, client);
	const user = await repository
		.search()
		.where("ID")
		.eq(data.userID)
		.return.first();

	await client.close();
	const userProfile = JSON.parse(JSON.stringify(user));
	if (userProfile != null) {
		return userProfile;
	}
}

export async function createIndex() {
	const client = new Client();
	await client.open(process.env.REDIS_URL);
	const repository = new Repository(schema, client);
	await repository.createIndex();
	await client.close();
}
export async function dropIndex() {
	const client = new Client();
	await client.open(process.env.REDIS_URL);
	const repository = new Repository(schema, client);
	await repository.dropIndex();
	await client.close();
}

export async function closeAllClients() {
	const client = new Client();
	await client.open(process.env.REDIS_URL);
	for (let i = 0; i < 10; i++) {
		await client.close();
	}
}
