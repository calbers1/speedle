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
				const res = await (
					await fetch(
						"/api/BypassLogIn?" + params
						// {
						// 	headers: {
						// 		"Content-Type": "application/json",
						// 		Accept: "application/json",
						// 	},
						// }
					)
				).json();
				const user = res.user;
				if (!res.error) {
					window.sessionStorage.setItem("userName", user.userName);
					window.sessionStorage.setItem("highScore", user.highScore);
					window.sessionStorage.setItem("averageScore", user.averageScore);
					router.push(`speedle`);
				}
			} catch (err) {
				console.log("ERROR: ", err);
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
