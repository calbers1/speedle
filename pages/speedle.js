import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Speedle() {
	const [userName, setUserName] = useState("");
	const router = useRouter();
	useEffect(() => {
		setUserName(window.sessionStorage.getItem("userName"));
	}, []);
	return <h1>Logged In As {userName}</h1>;
}
