import { getAllUsers } from '../../lib/redis'

//export default api to return all users
export default async (req, res) => {
	//get all users
	const users = await getAllUsers()
	//map userName, lastLogin, streak
	const userData = users.map((user) => {
		return {
			userName: user.userName,
			lastLogin: user.lastLogin,
			streak: user.streak,
		}
	})
	//prettify userData
	const prettyUserData = JSON.stringify(userData, null, 2)
	//send userData
	res.status(200).json(prettyUserData)
}
