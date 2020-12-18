import firebase from "../config/fbConfig";
import { findDefinitions } from "./dictionary";

const db = firebase.firestore();

export async function getChemicalCollection(
  data,
  type = "substance",
  clt = "data",
) {
  const wordCheck = await db
    .collection("chemistry")
    .doc(type)
    .collection(clt)
    .doc(data)
    .get();
  if (wordCheck.exists) return wordCheck.data();
  return {};
  // return wordCheck.exists ? wordCheck.data() : false;
}

export const storeChemicalCollection = (
  key,
  data,
  type = "substance",
  clt = "data",
) => {
  return db
    .collection("chemistry")
    .doc(type)
    .collection(clt)
    .doc(key)
    .set(data)
    .then(function (docRef) {
      console.log("Document successfully written!", docRef?.id);
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
};

export async function getDocCollection(word, language, clt = "words") {
  const wordCheck = await db
    .collection("dictionary")
    .doc(language)
    .collection(clt)
    .doc(word)
    .get();
  if (wordCheck.exists) return wordCheck.data();
  return {};
  // return wordCheck.exists ? wordCheck.data() : false;
}

export const storeCollection = (word, language, data, clt = "words") => {
  return db
    .collection("dictionary")
    .doc(language)
    .collection(clt)
    .doc(word)
    .set(data)
    .then(function (docRef) {
      console.log("Document successfully written!", docRef?.id);
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
};

export const getListDifference = async (words) => {
  var obj = [];
  for (let i = 0; i < words.length; i++) {
    const item = words[i];
    const getDocWord = await getDocCollection(item);
    if (getDocWord.data?.length) {
      obj.push({
        id: i,
        title: `word#${i}`,
        cards: [
          {
            wordTxt: item,
            id: i,
            definition: getDocWord.data,
            relatedImages: getDocWord.relatedImages,
          },
        ],
      });
      continue;
    }
    const definition = await findDefinitions(item, "en");
    storeCollection(item, definition);
    obj.push({
      id: i,
      title: `word#${i}`,
      cards: [
        {
          wordTxt: item,
          id: i,
          definition: definition.data,
          relatedImages: getDocWord.relatedImages,
        },
      ],
    });
  }
  return {
    lanes: obj,
  };
};
