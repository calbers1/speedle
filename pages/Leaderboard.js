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
		<div>
			<h1 className="scoreLabel">Today&apos;s Scores</h1>
			<TableContainer
				component={Paper}
				sx={{ minWidth: '80vw', maxHeight: '60vh' }}
			>
				<Table sx={{ minWidth: '80vw' }} size="large" stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell className="columnLabel">Username</TableCell>
							<TableCell className="columnLabel" align="center">
								Score
							</TableCell>
							<TableCell className="columnLabel" align="center">
								Streak
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{scores !== [] ? (
							scores.map((score, scoreIndex) => (
								<TableRow
									key={scoreIndex}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell className="scoreCell">
										<b>{scoreIndex + 1}.</b> &nbsp; {score.userName}
									</TableCell>
									<TableCell className="scoreCell" align="center">
										{score.score}
									</TableCell>
									<TableCell className="scoreCell" align="center">
										{score.streak}
									</TableCell>
								</TableRow>
							))
						) : (
							<></>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<Button
				className="btnNav"
				variant="outlined"
				onClick={() => {
					router.push(`blurtle`)
				}}
			>
				Back To Blurtle
			</Button>
		</div>
	)
}
