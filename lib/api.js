import firebase from '../config/fbConfig';

const db = firebase.firestore();

export async function getDocCollection(word, clt = 'words') {
	const wordCheck = await db
		.collection('dictionary')
		.doc('en_en')
		.collection(clt)
		.doc(word)
		.get();
	if (wordCheck.exists) return wordCheck.data();
	return {};
	// return wordCheck.exists ? wordCheck.data() : false;
}

export const storeCollection = (word, data, clt = 'words') => {
	return db
		.collection('dictionary')
		.doc('en_en')
		.collection(clt)
		.doc(word)
		.set(data)
		.then(function (docRef) {
			console.log('Document successfully written!', docRef.id);
		})
		.catch(function (error) {
			console.error('Error writing document: ', error);
		});
};
