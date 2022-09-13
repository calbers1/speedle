import { useEffect } from 'react'
import CreateUserForm from './CreateUserForm'
import LoginForm from './LoginForm'
import { useRouter } from 'next/router'
import { Container } from '@mui/material'

export default function Home() {
	const router = useRouter()
	// useEffect(async () => {
	// 	const userString = window.localStorage.getItem("userString");
	// 	if (userString) {
	// 		const paramList = {
	// 			userID: userString,
	// 		};

	// 		const params = new URLSearchParams(paramList);

	// 		try {
	// 			const res = await (await fetch("/api/BypassLogIn?" + params)).json();
	// 			if (!res.error) {
	// 				router.push(`blurtle`);
	// 			}
	// 		} catch (err) {
	// 			console.error("ERROR: ", err);
	// 		}
	// 	}
	// }, []);
	return (
		<div className="Main">
			<Container>
				<h1>So this is awkward...</h1>
				<h3>
					The servers I was using to host the database that powers blurtle
					somehow managed to delete all the data I had. All the word lists,
					accounts, streaks, etc. are gone permanently.{' '}
				</h3>
				<h3>
					Unfortunately, having just had a baby, I don&apos;t really have the
					time or mental capacity to recreate everything from scratch at the
					moment. So, this is going on the back burner. I may end up just
					creating a different game with a more original idea in it's place, or
					I might come back and fix it some day. Or both, who knows.{' '}
				</h3>
				<h3>
					For now, feel free to let me know any ideas or suggestions you might
					have (for this game or a new one) at{' '}
					<a
						style={{ color: '#99CCFF' }}
						href="mailto:calbers.dev@gmail.com?subject=Suggestion"
					>
						calbers.dev@gmail.com
					</a>
				</h3>
				<h2>Thanks for playing!</h2>
				{/* <LoginForm />
				<CreateUserForm /> */}
			</Container>
		</div>
	)
}
