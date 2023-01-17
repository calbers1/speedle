import { isValidUsername } from '../../lib/supabaseClient'

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		res.status(400).send({ message: 'Only GET requests allowed' })
		return
	}
	const isValid = await isValidUsername(req.query)
	if (isValid === 1) {
		console.error('user is not valid')
	}
	res.status(200).json(isValid)
}
