import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getFunctions } from "firebase/functions"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyApkvmfXHzsUWJ9vERy1dDTlm_Z3Z8vbtE",
	authDomain: "fir-dev-aa2c8.firebaseapp.com",
	projectId: "fir-dev-aa2c8",
	storageBucket: "fir-dev-aa2c8.appspot.com",
	messagingSenderId: "423766677050",
	appId: "1:423766677050:web:1a666554b4d5bb8f364703",
	measurementId: "G-SE1Q6R7NQH",
}

if (!getApps()?.length) {
	const app = initializeApp(firebaseConfig)
}
export const storage = getStorage()
export const auth = getAuth()
export const functions = getFunctions()
export const db = getFirestore()
