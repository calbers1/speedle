import { useRouter } from "next/router";
export default function CreateUserForm() {
	const router = useRouter();
	const handleSubmit = async (event) => {
		event.preventDefault();

		const form = new FormData(event.target);

		const formData = Object.fromEntries(form.entries());

		const params = new URLSearchParams(formData);

		const isValid = await (
			await fetch("/api/isValidUsername?" + params)
		).json();
		console.log("IS VALID: ", isValid);

		if (isValid === 0) {
			await fetch("/api/createUser", {
				body: JSON.stringify(formData),
				headers: {
					"content-type": "multipart/form-data",
				},
				method: "POST",
			})
				.then(async function (response) {
					return response.text();
				})
				.then(async function (data) {
					window.localStorage.setItem("userString", data);

					if (data) {
						const q = {
							userID: data,
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
								window.sessionStorage.setItem(
									"averageScore",
									user.averageScore
								);
							}

							alert(
								window.sessionStorage.getItem("userName"),
								window.sessionStorage.getItem("highScore"),
								window.sessionStorage.getItem("averageScore")
							);
						} catch (err) {
							console.log("ERROR: ", err);
						}
						router.push(`speedle`);
					} else alert("Failed to create user.");
				});
		} else {
			alert("That username is already taken. Please try another user name.");
		}
	};

	return (
		<div>
			<h1>Create User</h1>
			<form onSubmit={handleSubmit}>
				<label>Username</label>
				<input name="userName" type="text"></input>
				<label>Password</label>
				<input name="pass" type="password"></input>
				<label>Password Again</label>
				<input name="pass2" type="password"></input>

				<button type="submit">Register</button>
			</form>
		</div>
	);
}
