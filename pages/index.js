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
			const paramList = {
				userID: userString,
			};

			const params = new URLSearchParams(paramList);

			try {
				const res = await (await fetch("/api/BypassLogIn?" + params)).json();
				if (!res.error) {
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
