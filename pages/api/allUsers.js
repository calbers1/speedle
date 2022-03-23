import { getAllUsers } from '../../lib/redis'

//api that returns all users
export default async (req, res) => {
	const users = await getAllUsers()

	//return only userNames
	const userNames = users.map((user) => user.userName)
	//pretty print userNames
	const prettyUserNames = JSON.stringify(userNames, null, 2)
	//send response
	res.statusCode = 200
	res.setHeader('Content-Type', 'application/json')
	res.end(prettyUserNames)
}
