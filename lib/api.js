import firebase from '../config/fbConfig';

const db = firebase.firestore();

export async function getDocCollection(word) {
	const wordCheck = await db
		.collection('dictionary')
		.doc('en_en')
		.collection('words')
		.doc(word)
		.get();
	if (wordCheck.exists) return wordCheck.data();
	return {};
	// return wordCheck.exists ? wordCheck.data() : false;
}

export const storeCollection = (word, data) => {
	return db
		.collection('dictionary')
		.doc('en_en')
		.collection('words')
		.doc(word)
		.set(data)
		.then(function (docRef) {
			console.log('Document successfully written!', docRef.id);
		})
		.catch(function (error) {
			console.error('Error writing document: ', error);
		});
};
