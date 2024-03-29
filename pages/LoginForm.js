import { useRouter } from 'next/router'
import { Button, TextField, Grid, Box } from '@mui/material'
import { supabase, LogIn } from '../lib/supabaseClient'

export default function LoginForm() {
	const router = useRouter()
	const handleSubmit = async (event) => {
		event.preventDefault()
		const q = {
			userName: event.target.userName.value,
			pass: event.target.pass.value,
		}
		const params = new URLSearchParams(q)
		if (q.userName.trim() === '' || q.pass.trim() === '') {
			alert('Enter a username and password.')
			return
		}
		const res = await (await fetch('/api/login?' + params)).json()
		if (!res.error) {
			window.localStorage.setItem('userString', res.userId)
			router.push('blurtle')
		} else {
			alert('Incorrect username or password.')
			console.error(res.error)
		}
	}

	return (
		<div>
			<h1>Log In</h1>
			<Box
				component="form"
				noValidate
				autoComplete="off"
				onSubmit={handleSubmit}
			>
				<div>
					<Grid container spacing={4}>
						<Grid item xs={12} md={6}>
							<TextField
								className="lightTextField"
								variant="outlined"
								name="userName"
								label="Username"
								size="small"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								className="lightTextField"
								variant="outlined"
								name="pass"
								label="Password"
								type="password"
								size="small"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} md={12}>
							<Button variant="contained" type="submit" sx={{ width: '100%' }}>
								Log In
							</Button>
						</Grid>
					</Grid>
				</div>
			</Box>
		</div>
	)
}
