import { useEffect } from 'react'
import CreateUserForm from './CreateUserForm'
import LoginForm from './LoginForm'
import { useRouter } from 'next/router'
import { Container } from '@mui/material'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
	const router = useRouter()
	useEffect(async () => {
		const userString = window.localStorage.getItem('userString')
		//get and output users from supabase
		const { data: users, error } = await supabase.from('users').select('*')
		if (userString) {
			const paramList = {
				userID: userString,
			}

			const params = new URLSearchParams(paramList)

			try {
				const res = await (await fetch('/api/BypassLogIn?' + params)).json()
				if (!res.error) {
					router.push(`blurtle`)
				} else {
					window.localStorage.removeItem('userString')
				}
			} catch (error) {
				window.localStorage.removeItem('userString')
			}
		}
	}, [])
	return (
		<div className="Main">
			<Container>
				<LoginForm />
				<CreateUserForm />
			</Container>
		</div>
	)
}
