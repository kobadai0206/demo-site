import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/client";

export const login = () => {
	const provaider = new GoogleAuthProvider();

	return signInWithPopup(auth, provaider)
		.then((result) => {
			alert(`${result.user.displayName}さんこんにちは`);
		})
		.catch((e) => console.log(e));
};

export const logout = () => {
	return signOut(auth).then(() => {
		alert("サインアウト完了");
	});
};
