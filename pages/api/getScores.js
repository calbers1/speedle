import { getScores } from '../../lib/supabaseClient'

const cleanResponse = (res) => {
	let responseArray = []
	for (let i = 0; i < res.length; i++) {
		responseArray = [
			...responseArray,
			{ userName: res[i].userName, score: res[i].score, streak: res[i].streak, x: res[i].x, },
		]
	}
	responseArray.sort((a, b) => {
		//sort by x ascending and then by streak descending
		if (a.x === b.x) {
			return b.streak - a.streak
		}
		return a.x - b.x
	})
	return responseArray
}

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		res.status(400).send({ message: 'Only GET requests allowed' })
		return
	}
	const response = await getScores()
	if (response === '' || response === null || response === undefined) {
		console.error(oops)
		return 0
	}

	const todaysWinners = cleanResponse(response)

	res.status(200).json(todaysWinners)
	return
}
