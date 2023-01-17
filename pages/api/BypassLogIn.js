import { BypassLogIn } from '../../lib/supabaseClient'

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		res.status(400).send({ message: 'Only GET requests allowed' })
		return
	}
	const user = await BypassLogIn(req.query)
	if (user === null) {
		console.error("You've passed a bad user in.")
		res.status(500).send('bad user!')
		return 0
	}
	res.status(200).json({ user })
}
