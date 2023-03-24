import { getFirestore } from "firebase-admin/firestore"
import { cert, getApps, initializeApp } from "firebase-admin/app"

if (!getApps()?.length) {
	initializeApp({
		credential: cert(JSON.parse(process.env.FIREBASE_ADMIN_KEY as string)),
	})
}
export const adminDB = getFirestore()
