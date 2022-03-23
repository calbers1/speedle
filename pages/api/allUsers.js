import { getAllUsers } from '../../lib/redis'

//api that returns all users
export default async (req, res) => {
	const users = await getAllUsers()

	//return only userNames
	const userNames = users.map((user) => user.userName)
	//return userNames as json
	res.json(userNames)
}
