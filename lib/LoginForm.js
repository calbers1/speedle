export default function LoginForm() {
	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log("HERE HERE HERE : ", event.target.value);
		const q = {
			userName: event.target.userName.value,
			pass: event.target.pass.value,
		};
		console.log(q);
		const params = new URLSearchParams(q);

		const res = await fetch("/api/login?" + params);

		console.log("RESULT: ", res);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>Username</label>
			<input name="userName" type="text"></input>
			<label>Password</label>
			<input name="pass" type="text"></input>

			<button type="submit">Login</button>
		</form>
	);
}
