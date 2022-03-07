import { useRouter } from "next/router";
export default function LoginForm() {
	const router = useRouter();
	const handleSubmit = async (event) => {
		event.preventDefault();
		const q = {
			userName: event.target.userName.value,
			pass: event.target.pass.value,
		};
		const params = new URLSearchParams(q);

		const res = await (await fetch("/api/login?" + params)).json();
		if (!res.error) {
			window.localStorage.setItem("userString", res.entityId);
			window.sessionStorage.setItem("userName", res.userName);
			window.sessionStorage.setItem("highScore", res.highScore);
			window.sessionStorage.setItem("averageScore", res.averageScore);
		}
		router.push("speedle");
	};

	return (
		<div>
			<h1>Log In</h1>
			<form onSubmit={handleSubmit}>
				<label>Username</label>
				<input name="userName" type="text"></input>
				<label>Password</label>
				<input name="pass" type="text"></input>

				<button type="submit">Login</button>
			</form>
		</div>
	);
}
