import { BypassLogIn } from '../../lib/supabaseClient'

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		res.status(400).send({ message: 'Only GET requests allowed' })
		return
	}
	const user = await BypassLogIn(req.query)
	if (user.error) {
		res.status(500).json({ error: 'bad user!' })
		return { error: 'bad user!' }
	}
	res.status(200).json({ user })
}
