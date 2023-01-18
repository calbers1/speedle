import { createClient } from '@supabase/supabase-js'

import { AESEncryption } from 'aes-password'
const saltRounds = 10

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_KEY
export const supabase = createClient(url, key)

const getLoginDate = () => {
	const days = Math.floor((Date.now() - 21600000) / 86400000)
	return days
}

export async function createUser(userData) {
	const data = JSON.parse(userData)
	const encryptedPass = await AESEncryption.encrypt(
		data.pass,
		process.env.NEXT_PUBLIC_AES_KEY
	)

	const loginDate = getLoginDate()
	var newUser = {}

	newUser.userName = data.userName
	newUser.pass = encryptedPass
	newUser.score = 0
	newUser.streak = 0
	newUser.lastLogin = loginDate
	newUser.date = loginDate
	newUser.lastWin = loginDate - 1
	newUser.cellArray = [
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
	newUser.classArray = [
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
	newUser.x = 0

	const { data: user, error } = await supabase
		.from('users')
		.insert(newUser)
		.single()
	if (error) {
		console.error(error)
		return { error: 'Something went wrong.' }
	}

	const { data: userId, idErr } = await supabase
		.from('users')
		.select('userId')
		.eq('userName', data.userName)
		.single()

	return userId
}

export async function LogIn(userData) {
	const { data: user, error } = await supabase
		.from('users')
		.select('*')
		.eq('userName', userData.userName)
		.single()

	if (!error) {
		const dbPass = await AESEncryption.decrypt(
			user.pass,
			process.env.NEXT_PUBLIC_AES_KEY
		)
		if (userData.pass === dbPass) {
			return user
		} else return { error: 'Incorrect Username Or Password.' }
	} else return { error: 'Incorrect Username Or Password.' }
}

export async function isValidUsername(userData) {
	const { data: user, error } = await supabase
		.from('users')
		.select('*')
		.eq('userName', userData.userName)
		.single()
	const isValid = user === null
	return isValid
}

export async function getScores() {
	const { data: todaysWinners, error } = await supabase
		.from('users')
		.select('userName, score, streak, x')
		.eq('lastWin', getLoginDate())
		.order('score', { ascending: false })
		.eq('date', getLoginDate())

	return todaysWinners
}

export async function BypassLogIn(userID) {
	//get user from supabase
	const { data: user, error } = await supabase
		.from('users')
		.select('*')
		.eq('userId', userID.userID)
		.single()
	if (error) {
		return { error: 'Something went wrong.' }
	}
	return user
}

export async function syncUser(userData) {
	//merge the user's old data with the new data (to save things like board)
	const { data: user, error } = await supabase
		.from('users')
		.select('*')
		.eq('userId', userData.userId)
		.single()
	if (user) {
		const updatedUser = Object.assign(user, userData, {
			date: getLoginDate(),
		})
		const { data: updatedUserData, error } = await supabase
			.from('users')
			.update(updatedUser)
			.eq('userId', userData.userId)
			.single()
		if (error) {
			return error
		}

		//get user from supabase
		const { data: userReturn, err } = await supabase
			.from('users')
			.select('*')
			.eq('userId', userData.userId)
			.single()
		if (err) {
			return { error: 'Something went wrong.' }
		}
		const userProfile = JSON.parse(JSON.stringify(userReturn))
		if (userProfile !== null && userProfile !== undefined) {
			return userProfile
		}
	}
	return error
}

export async function getWordOfTheDay() {
	let word
	//get word of the day from supabase WOTD table
	const { data: WOTD, error } = await supabase.from('WOTD').select('*').single()
	if (error) {
		return { error: 'Something went wrong.' }
	}
	word = WOTD.word
	if (WOTD.currentDate != getLoginDate()) {
		word = await updateWordOfTheDay(WOTD)
	}

	return word
}

export async function updateWordOfTheDay(WOTD_OLD) {
	const { data: newWord, error } = await supabase
		.from('answers')
		.select('word')
		.eq('wordId', WOTD_OLD.nextWord)
		.single()

	const { data: WOTD_NEW, error2 } = await supabase
		.from('WOTD')
		.update({
			word: newWord.word,
			currentDate: getLoginDate(),
			nextWord: WOTD_OLD.nextWord + 1,
		})
		.eq('id', WOTD_OLD.id)
		.single()

	if (error || error2) {
		return { error: 'Something went wrong.' }
	}
	return newWord.word
}

export async function getValidWords() {
	//get all combined words from allWords and answers tables
	const { data: allWords, error } = await supabase
		.from('allWords')
		.select('word')
	const { data: answers, error2 } = await supabase
		.from('answers')
		.select('word')
	if (error || error2) {
		return error
	}
	const validWords = [...allWords, ...answers]

	return validWords
}

export async function isValidWord(word) {
	//check if a word exists in the allWords or answers table
	const { data: validWord, error } = await supabase
		.from('allWords')
		.select('word')
		.eq('word', word)
	const { data: validWord2, error2 } = await supabase
		.from('answers')
		.select('word')
		.eq('word', word)

	if (
		error ||
		error2 ||
		validWord[0] === undefined ||
		validWord2[0] === undefined
	) {
		return false
	}
	return true
}

export async function getAllUsers() {
	//search for all users
	const { data: users, error } = await supabase.from('users').select('*')
	if (error) {
		return error
	}

	return users
}
