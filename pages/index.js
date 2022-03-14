import { useEffect } from "react";
import CreateUserForm from "./CreateUserForm";
import LoginForm from "./LoginForm";
import { useRouter } from "next/router";
import { Container } from "@mui/material";

export default function Home() {
	const router = useRouter();
	useEffect(async () => {
		const userString = window.localStorage.getItem("userString");
		if (userString) {
			const q = {
				userID: userString,
			};

			const params = new URLSearchParams(q);

			try {
				const res = await (await fetch("/api/BypassLogIn?" + params)).json();
				const user = res.user;
				if (!res.error) {
					window.localStorage.setItem("userName", user.userName);
					window.localStorage.setItem("highScore", user.highScore);
					window.localStorage.setItem("averageScore", user.averageScore);
					window.localStorage.setItem("streak", res.streak);
					window.localStorage.setItem("lastLogin", res.lastLogin);
					router.push(`blurtle`);
				}
			} catch (err) {
				console.error("ERROR: ", err);
			}
		}
	}, []);
	return (
		<div className="Main">
			<Container>
				<LoginForm />
				<CreateUserForm />
			</Container>
		</div>
	);
}
