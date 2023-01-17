import { getWordOfTheDay, updateWordOfTheDay } from '../../lib/supabaseClient'

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		res.status(400).send({ message: 'Only GET requests allowed' })
		return
	}
	const word = await getWordOfTheDay()
	if (word === '') {
		console.error(oops)
		return 0
	}
	res.status(200).json({ word: word })
}
