import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Alert, Button, Container } from '@mui/material'
import { Box } from '@mui/system'
import Tutorial from '../components/Tutorial'
import Keyboard from '../components/Keyboard'
import Gameboard from '../components/Gameboard'
import WinPage from '../components/WinPage'
import LosePage from '../components/LosePage'

export default function Blurtle() {
	//set up state variables
	const EMPTY_CELLS = [
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
	]
	//main state variables, sync with DB after every game update (besides entering a letter)
	const [clientState, setClientState] = useState(undefined)
	const [serverState, setServerState] = useState(undefined)

	//only set after creating new user
	const [tutorial, setTutorial] = useState('')

	//game state that the board is rendered from. Stored into gameState for DB saving after guess is entered.
	const [cellArray, setCellArray] = useState(EMPTY_CELLS)

	//y index
	const [y, setY] = useState(0)

	//answer of the day
	const [WOTD, setWOTD] = useState('')

	const router = useRouter()

	//sync with DB
	async function syncGameState(userData) {
		try {
			const res = await fetch('/api/syncUser', {
				method: 'POST',
				body: JSON.stringify(userData),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			})

			if (res) {
				const userState = await res.json()
				return userState
			}
		} catch (err) {
			console.log('ERROR: ', err)
		}
		return 0
	}

	//initial setup
	useEffect(async () => {
		//get userString to pass to DB to get player's gameState
		const userString = {
			entityId: await window.localStorage.getItem('userString'),
		}

		if (userString.entityId === null || userString.entityId === undefined) {
			router.push('/')
		}

		const userData = await syncGameState(userString)

		setServerState(userData)

		//set up word of the day
		const word = await (await fetch('/api/getWOTD')).json()
		setWOTD(word.word)

		//set tutorial - only after the first login ever
		setTutorial(
			window.sessionStorage.getItem('showTutorial') === '1' ? <Tutorial /> : ''
		)
	}, [])

	//once serverState is loaded...
	useEffect(async () => {
		if (serverState !== null && serverState !== undefined) {
			//newState to set up clientState
			let newState = serverState
			//set up the state
			if (serverState.lastLogin !== serverState.date) {
				newState.lastLogin = serverState.date
				newState.cellArray = cellArray
				newState.classArray = EMPTY_CELLS
				newState.x = 0
				newState.timer = 60
			} else {
				setCellArray(serverState.cellArray)
			}
			newState = Object.assign(serverState, newState)
			setClientState(await syncGameState(newState))
		}
	}, [serverState])

	//check which letters are correct
	const checkLetters = async () => {
		const guess = cellArray.slice(clientState.x * 5, clientState.x * 5 + y)
		let answer = WOTD.split('')
		const newClassArray = clientState.classArray
		const x = clientState.x * 5
		const newState = {
			entityId: clientState.entityId,
			x: clientState.x + 1,
		}
		//loop to find right letters. If it's right, it's replaced in the array by " ".
		for (let i = 0; i < 5; i++) {
			if (answer[i] === guess[i]) {
				newClassArray[x + i] += ' right'
				answer[i] = ' ' //this is so that the index stays on track, but will "use up" letters to avoid duplicate coloring.
				guess[i] = ''
			}
		}
		console.log(answer)
		console.log(guess)
		console.log('After Correct: ', newClassArray)

		//loop through array without right answers.
		for (let i = 0; i < 5; i++) {
			const index = answer.indexOf(guess[i])
			if (index > -1) {
				newClassArray[x + i] += ' wrong-location'
				answer.splice(index, 1)
			} else {
				newClassArray[x + i] += ' wrong'
			}
		}
		console.log('After wrong: ', newClassArray)

		newState.classArray = newClassArray
		return newState
	}

	//check if the user has won
	const checkWin = async () => {
		const x = clientState.x * 5
		const guessArray = cellArray.slice(x, x + y)
		const guess = guessArray.join('')
		let newState = await checkLetters()
		if (WOTD === guess) {
			newState.lastWin = clientState.date
			if (clientState.lastWin === clientState.date - 1) {
				newState.streak = clientState.streak + 1
			} else {
				newState.streak = 0
			}
			const multiplier = parseInt(newState.streak) * 0.0075
			newState.score =
				(multiplier + 1) * (multiplier + (100 - clientState.x * 10))
			newState.score = newState.score.toFixed(0)
			if (newState.score > clientState.highScore) {
				newState.highScore = newState.score
			}
			let endCellArray = EMPTY_CELLS
			newState.cellArray = endCellArray
			setCellArray(endCellArray)
		} else if (clientState.x >= 5) {
			let endCellArray = EMPTY_CELLS
			newState.cellArray = endCellArray
			newState.streak = 0
			newState.score = 0
			setCellArray(endCellArray)
		} else {
			newState.cellArray = cellArray
		}
		setClientState(await syncGameState(newState))
		setY(0)
	}
	//log out
	const logOut = () => {
		window.localStorage.removeItem('userString')
		router.push('/')
	}

	return (
		<Container sx={{ width: '100vw', padding: '.5rem' }}>
			{clientState ? (
				<div>
					<Box>
						{clientState.lastWin === clientState.date ? (
							<WinPage tries={clientState.x} />
						) : clientState.x > 5 ? (
							<LosePage />
						) : (
							<></>
						)}
						{tutorial}
					</Box>
					<Container
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					></Container>
					<Gameboard
						cellArray={cellArray}
						classArray={clientState.classArray}
						gameOver={clientState.lastWin === clientState.date ? true : false}
					></Gameboard>
					{clientState.lastWin !== clientState.date && clientState.x <= 5 ? (
						<Keyboard
							cellArray={cellArray}
							setCellArray={setCellArray}
							x={clientState.x}
							y={y}
							setY={setY}
							// clientState={clientState}
							// setClientState={setClientState}
							checkWin={checkWin}
							checkLetters={checkLetters}
							WOTD={WOTD}
						></Keyboard>
					) : (
						<span />
					)}
				</div>
			) : (
				<span></span>
			)}
		</Container>
	)
}
