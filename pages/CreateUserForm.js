import { useRouter } from "next/router";
import { Button, TextField, Grid, Box, Container } from "@mui/material";
export default function CreateUserForm() {
	const router = useRouter();
	const handleSubmit = async (event) => {
		event.preventDefault();

		const form = new FormData(event.target);

		const formData = Object.fromEntries(form.entries());

		const params = new URLSearchParams(formData);

		if (formData.userName.trim() === "" || formData.pass.trim() === "") {
			alert("Enter a username and password.");
			return;
		}
		const isValid = await (
			await fetch("/api/isValidUsername?" + params)
		).json();
		console.log("IS VALID: ", isValid);

		console.log("BODY: ", formData);
		if (isValid === 0 && formData.pass === formData.pass2) {
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
								window.localStorage.setItem("userName", user.userName);
								window.localStorage.setItem("highScore", user.highScore);
								window.localStorage.setItem("averageScore", user.averageScore);
								window.sessionStorage.setItem("showTutorial", 1);
							}
						} catch (err) {
							console.log("ERROR: ", err);
						}
						router.push(`speedle`);
					} else alert("Failed to create user.");
				});
		} else {
			if (formData.pass !== formData.pass2) {
				alert(
					"Passwords do not match, and I'm too lazy to let you see them (for now)."
				);
			} else {
				alert("That username is already taken. Please try another user name.");
			}
		}
	};

	return (
		<div>
			<h1>Create User</h1>
			<Box
				component="form"
				noValidate
				autoComplete="off"
				onSubmit={handleSubmit}
			>
				<div>
					<Grid container spacing={4}>
						<Grid item xs={12} md={12}>
							<TextField
								className="lightTextField"
								fullWidth
								variant="outlined"
								name="userName"
								label="Username"
								size="small"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								className="lightTextField"
								variant="outlined"
								name="pass"
								label="Password"
								type="password"
								size="small"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								className="lightTextField"
								variant="outlined"
								name="pass2"
								label="Re-enter Password"
								type="password"
								size="small"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} md={12}>
							<Button variant="contained" type="submit" sx={{ width: "100%" }}>
								Register
							</Button>
						</Grid>
					</Grid>
				</div>
			</Box>
		</div>
	);
}
