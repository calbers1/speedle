export default function CreateUserForm() {
	const handleSubmit = async (event) => {
		event.preventDefault();

		const form = new FormData(event.target);

		const formData = Object.fromEntries(form.entries());

		console.log(formData);

		const res = await fetch("/api/createUser", {
			body: JSON.stringify(formData),
			headers: {
				"content-type": "multipart/form-data",
			},
			method: "POST",
		});

		const result = await res;
		console.log("RESULT: ", result);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>Username</label>
			<input name="userName" type="text"></input>
			<label>Password</label>
			<input name="pass" type="text"></input>

			<button type="submit">Register</button>
		</form>
	);
}
