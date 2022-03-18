import { syncUser } from '../../lib/redis'

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.status(400).send({ message: 'Only POST requests allowed' })
		return
	}
	if (req.body !== 0) {
		const user = await syncUser(req.body)
		res.status(200).json(user)
	}
}
