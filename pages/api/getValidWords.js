import { getValidWords } from '../../lib/supabaseClient'

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		res.status(400).send({ message: 'Only GET requests allowed' })
		return
	}
	const words = await getValidWords()
	if (words === []) {
		console.error(oops)
		return 0
	}
	res.status(200).json(words)
}
