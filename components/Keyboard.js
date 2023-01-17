import {
	Button,
	Container,
	IconButton,
	Snackbar,
	CloseIcon,
	SnackbarContent,
	Slide,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { isValidWord } from '../lib/supabaseClient'

export default function Keyboard(props) {
	const [elementArray, setElementArray] = useState([])
	const [open, setOpen] = useState(false)
	const [transition, setTransition] = useState(undefined)

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}

	const transitionDown = (props) => {
		return <Slide {...props} direction="down" />
	}

	function checkKeyboardLetters() {
		const answer = props.WOTD.split('')
		for (let i = 0; i < 5; i++) {
			const element = elementArray[i]
			const letter = element.value
			if (answer.includes(letter)) {
				if (answer[i] === letter) {
					element.className += ' right'
				} else {
					element.className += ' wrong-location'
				}
			} else {
				element.className += ' wrong'
			}
		}
	}

	function click(e) {
		if (props.y < 5) {
			let newCellArray = [...props.cellArray]
			newCellArray[props.x * 5 + props.y] = e.target.value
			props.setCellArray(newCellArray)
			props.setY(props.y + 1)
			setElementArray([...elementArray, e.target])
		}
	}

	function del() {
		if (props.y > 0 && props.y < 6) {
			let newCellArray = props.cellArray
			newCellArray[props.x * 5 + props.y - 1] = ''
			props.setCellArray(newCellArray)
			if (props.y > 0) {
				let newElementArray = elementArray
				newElementArray.pop()
				setElementArray([...newElementArray])
				props.setY(props.y - 1)
			}
		}
	}

	async function enter() {
		if (props.x <= 5 && props.y === 5) {
			const guessArray = props.cellArray.slice(
				props.x * 5,
				props.x * 5 + props.y
			)
			const guess = guessArray.join('')

			const isValid = await isValidWord(guess.toLowerCase())

			if (isValid) {
				checkKeyboardLetters()
				setElementArray([])
				props.checkWin()
			} else {
				setTransition(() => transitionDown)
				setOpen(true)
			}
		}
	}

	return (
		<div>
			<div className="keyboard">
				<button className="key" value={'Q'} onClick={click}>
					Q
				</button>
				<button className="key" value={'W'} onClick={click}>
					W
				</button>
				<button className="key" value={'E'} onClick={click}>
					E
				</button>
				<button className="key" value={'R'} onClick={click}>
					R
				</button>
				<button className="key" value={'T'} onClick={click}>
					T
				</button>
				<button className="key" value={'Y'} onClick={click}>
					Y
				</button>
				<button className="key" value={'U'} onClick={click}>
					U
				</button>
				<button className="key" value={'I'} onClick={click}>
					I
				</button>
				<button className="key" value={'O'} onClick={click}>
					O
				</button>
				<button className="key" value={'P'} onClick={click}>
					P
				</button>
				<div className="space"></div>
				<button className="key" value={'A'} onClick={click}>
					A
				</button>
				<button className="key" value={'S'} onClick={click}>
					S
				</button>
				<button className="key" value={'D'} onClick={click}>
					D
				</button>
				<button className="key" value={'F'} onClick={click}>
					F
				</button>
				<button className="key" value={'G'} onClick={click}>
					G
				</button>
				<button className="key" value={'H'} onClick={click}>
					H
				</button>
				<button className="key" value={'J'} onClick={click}>
					J
				</button>
				<button className="key" value={'K'} onClick={click}>
					K
				</button>
				<button className="key" value={'L'} onClick={click}>
					L
				</button>
				<div className="space"></div>
				<button className="key big-key" value={'enter'} onClick={enter}>
					ENTER
				</button>
				<button className="key" value={'Z'} onClick={click}>
					Z
				</button>
				<button className="key" value={'X'} onClick={click}>
					X
				</button>
				<button className="key" value={'C'} onClick={click}>
					C
				</button>
				<button className="key" value={'V'} onClick={click}>
					V
				</button>
				<button className="key" value={'B'} onClick={click}>
					B
				</button>
				<button className="key" value={'N'} onClick={click}>
					N
				</button>
				<button className="key" value={'M'} onClick={click}>
					M
				</button>
				<button className="key big-key" onClick={del}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24"
						viewBox="0 0 24 24"
						width="24"
					>
						<path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
					</svg>
				</button>
			</div>
			<Snackbar
				open={open}
				autoHideDuration={1500}
				onClose={handleClose}
				message="Invalid Word!"
				severity="error"
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				TransitionComponent={transition}
				transitionDuration={{ enter: 300, exit: 300 }}
				key={transition ? transition.name : ''}
			>
				<SnackbarContent
					className="snackbar"
					style={{
						backgroundColor: 'hsl(5, 80%, 63%)',
						textAlign: 'center',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: 'black',
						fontWeight: 'bold',
					}}
					message={<span id="client-snackbar">Invalid Word!</span>}
				/>
			</Snackbar>
		</div>
	)
}
