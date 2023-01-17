import { createUser } from '../../lib/supabaseClient'

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.status(400).send({ message: 'Only POST requests allowed' })
		return
	}
	const user = await createUser(req.body)
	res.status(200).json(user)
}
