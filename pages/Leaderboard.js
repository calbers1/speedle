import { useRouter } from 'next/router'
import {
	Button,
	TextField,
	Grid,
	Box,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TableContainer,
	Paper,
	Container,
} from '@mui/material'
import { useEffect, useState } from 'react'

export default function Leaderboard() {
	const [scores, setScores] = useState([])

	const router = useRouter()

	useEffect(async () => {
		const _scores = await (await fetch('/api/getScores')).json()
		setScores(_scores)
	}, [])

	return (
		<Container>
			<h1>So this is awkward...</h1>
			<h2>
				The servers I was using to host the database that powers blurtle somehow
				managed to delete all the data I had. All the word lists, accounts,
				streaks, etc. are gone permanently.
			</h2>
			<h2>
				Unfortunately, I don&apos;t really have the time or mental capacity to
				recreate everything from scratch at the moment. So, this is going on the
				back burner. I may end up just creating a different game with a more
				original idea in it&apos;s place, or I might come back and fix it some
				day. Or both, who knows.
			</h2>
			<h2>
				For now, feel free to let me know any ideas or suggestions you might
				have (for this game or a new one) at <br />
				<a
					style={{ color: '#99CCFF' }}
					href="mailto:calbers.dev@gmail.com?subject=Suggestion"
				>
					calbers.dev@gmail.com
				</a>
			</h2>
			<h1>Thanks for playing!</h1>
			{/* <LoginForm />
		<CreateUserForm /> */}
		</Container>
		// <div>
		// 	<h1 className="scoreLabel">Today&apos;s Scores</h1>
		// 	<TableContainer
		// 		component={Paper}
		// 		sx={{ minWidth: '80vw', maxWidth: '96vw', maxHeight: '60vh' }}
		// 	>
		// 		<Table sx={{ minWidth: '80vw' }} size="large" stickyHeader>
		// 			<TableHead>
		// 				<TableRow>
		// 					<TableCell className="columnLabel">Username</TableCell>
		// 					<TableCell className="columnLabel" align="center">
		// 						Score
		// 					</TableCell>
		// 					<TableCell className="columnLabel" align="center">
		// 						Streak
		// 					</TableCell>
		// 				</TableRow>
		// 			</TableHead>
		// 			<TableBody>
		// 				{scores !== [] ? (
		// 					scores.map((score, scoreIndex) => (
		// 						<TableRow
		// 							key={scoreIndex}
		// 							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		// 						>
		// 							<TableCell className="scoreCell">
		// 								<b>{scoreIndex + 1}.</b> &nbsp; {score.userName}
		// 							</TableCell>
		// 							<TableCell className="scoreCell" align="center">
		// 								{score.score}
		// 							</TableCell>
		// 							<TableCell className="scoreCell" align="center">
		// 								{score.streak}
		// 							</TableCell>
		// 						</TableRow>
		// 					))
		// 				) : (
		// 					<></>
		// 				)}
		// 			</TableBody>
		// 		</Table>
		// 	</TableContainer>
		// 	<Button
		// 		className="btnNav"
		// 		variant="outlined"
		// 		onClick={() => {
		// 			router.push(`blurtle`)
		// 		}}
		// 	>
		// 		Back To Blurtle
		// 	</Button>
		// </div>
	)
}
