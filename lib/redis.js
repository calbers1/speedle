import { Client, Entity, Schema, Repository } from 'redis-om'
import { AESEncryption } from 'aes-password'
const saltRounds = 10

class User extends Entity {}
class Score extends Entity {}
let userSchema = new Schema(User, {
	//user info
	entityID: { type: 'string' },
	userName: { type: 'string' },
	pass: { type: 'string' },
	//game info
	cellArray: { type: 'array' },
	classArray: { type: 'array' },
	x: { type: 'number' },
	timer: { type: 'number' },
	//scoring info
	score: { type: 'number' },
	highScore: { type: 'number' },
	streak: { type: 'number' },
	//staleness info
	lastLogin: { type: 'number' },
	date: { type: 'number' },
	lastWin: { type: 'number' },
})

let scoreSchema = new Schema(Score, {
	ID: { type: 'string' },
	userID: { type: 'string' },
	score: { type: 'number' },
	scoreDate: { type: 'number' },
})

const getLoginDate = () => {
	const days = Math.floor((Date.now() - 21600000) / 86400000)
	return days
}

export async function createUser(userData) {
	const client = new Client()
	await client.open(process.env.REDIS_URL)
	const data = JSON.parse(userData)

	const repository = new Repository(userSchema, client)

	const user = repository.createEntity()
	const encryptedPass = await AESEncryption.encrypt(
		data.pass,
		process.env.AES_KEY
	)

	const loginDate = getLoginDate()

	user.entityID = user.entityId
	user.userName = data.userName
	user.pass = encryptedPass
	user.cellArray = [
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
	]
	user.classArray = [
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
	]
	user.x = 0
	user.timer = 60
	user.score = 0
	user.highScore = 0
	user.streak = 0
	user.lastLogin = loginDate
	user.date = loginDate
	user.lastWin = loginDate - 1

	const id = await repository.save(user)
	await client.close()
	return id
}

export async function LogIn(userData) {
	const client = new Client()
	await client.open(process.env.REDIS_URL)

	const repository = new Repository(userSchema, client)
	const user = await repository
		.search()
		.where('userName')
		.eq(userData.userName)
		.return.first()

	await client.close()
	const userProfile = JSON.parse(JSON.stringify(user))
	if (userProfile != null) {
		const dbPass = await AESEncryption.decrypt(
			userProfile.pass,
			process.env.AES_KEY
		)
		if (userData.pass === dbPass) {
			return userProfile
		} else return { error: 'Incorrect Username Or Password.' }
	} else return { error: 'Incorrect Username Or Password.' }
}

export async function isValidUsername(userData) {
	const client = new Client()
	await client.open(process.env.REDIS_URL)
	const repository = new Repository(userSchema, client)
	const isValid = await repository
		.search()
		.where('userName')
		.eq(userData.userName)
		.return.count()
	await client.close()
	return isValid
}

export async function getScores() {
	const client = new Client()
	await client.open(process.env.REDIS_URL)
	const repository = new Repository(userSchema, client)
	const todaysWinners = await repository
		.search()
		.where('lastWin')
		.eq(getLoginDate())
		.return.all()
	await client.close()
	return todaysWinners
}

export async function BypassLogIn({ userID }) {
	const client = new Client()
	await client.open(process.env.REDIS_URL)

	const repository = new Repository(userSchema, client)
	const user = await repository.fetch(userID)

	await client.close()
	const userProfile = JSON.parse(JSON.stringify(user))
	if (userProfile != null) {
		return userProfile
	}
}

export async function syncUser(userData) {
	const client = new Client()
	await client.open(process.env.REDIS_URL)
	const repository = new Repository(userSchema, client)
	const user = await repository.fetch(userData.entityId)
	if (user.entityData.userName !== undefined) {
		user.entityData = Object.assign(user.entityData, userData, {
			date: getLoginDate(),
		})
		repository.save(user)
		await client.close()
		const userProfile = JSON.parse(JSON.stringify(user))
		if (userProfile !== null && userProfile !== undefined) {
			return userProfile
		}
	}
	await client.close()
	return null
}

export async function createIndex() {
	const client = new Client()
	await client.open(process.env.REDIS_URL)
	const repository = new Repository(userSchema, client)
	await repository.createIndex()
	await client.close()
}
export async function dropIndex() {
	const client = new Client()
	await client.open(process.env.REDIS_URL)
	const repository = new Repository(userSchema, client)
	await repository.dropIndex()
	await client.close()
}

export async function getWordOfTheDay() {
	const client = new Client()
	await client.open(process.env.REDIS_URL)
	const WOTD = {
		word: await (
			await client.execute(['HGET', 'wordOfTheDay', 'word'])
		).toUpperCase(),
		date: await client.execute(['HGET', 'wordOfTheDay', 'date']),
	}
	await client.close()
	return WOTD
}

export async function updateWordOfTheDay() {
	const client = new Client()
	await client.open(process.env.REDIS_URL)
	const WOTD = await getWordOfTheDay()
	if (WOTD.date != getLoginDate()) {
		const newWord = await client.execute(['LPOP', 'answers'])
		client.execute([
			'HSET',
			'wordOfTheDay',
			'word',
			newWord,
			'date',
			getLoginDate(),
		])
	}
	await client.close()
}

export async function getValidWords() {
	const client = new Client()
	await client.open(process.env.REDIS_URL)
	const validWords1 = await client.execute(['LRANGE', 'valid-words', '0', '-1'])
	const validWords2 = await client.execute(['LRANGE', 'all-answers', '0', '-1'])
	const validWords = [...validWords1, ...validWords2]
	await client.close()
	return validWords
}
