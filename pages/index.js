import { useEffect } from "react";
import CreateUserForm from "./CreateUserForm";
import LoginForm from "./LoginForm";
import { useRouter } from "next/router";

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
				}
			} catch (err) {
				console.log("ERROR: ", err);
			}
			router.push(`speedle`);
		} else alert("Fail.");
	}, []);
	return (
		<div className="Main">
			<LoginForm />
			<CreateUserForm />
		</div>
	);
}
