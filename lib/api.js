import firebase from "../config/fbConfig";
import { findDefinitions, getSubstance } from "./dictionary";
import firebaseKeyEncode from "firebase-key-encode";
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
  word = firebaseKeyEncode.encode(word);
  const wordCheck = await db
    .collection("dictionary")
    .doc(language)
    .collection(clt)
    .doc(word)
    .get();
  if (wordCheck.exists) return wordCheck.data();
  return {};
}

export const storeCollection = (word, language, data, clt = "words") => {
  word = firebaseKeyEncode.encode(word);
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

export async function getSubstanceCollection(
  substance,
  language = "en",
  type = "reaction",
) {
  word = firebaseKeyEncode.encode(word);
  const wordCheck = await db
    .collection("chemistry")
    .doc(language)
    .collection(type)
    .doc(substance)
    .get();
  if (wordCheck.exists) return wordCheck.data();
  return {};
}

export const getChemicalReaction = async (r, p, language = "en") => {
  var source = await fetch(
    `${process.env.ORIGIN_URL}/api/index.php/reaction/${r}/${p}`,
  );
  if (source.status >= 400) {
    console.error(source.error);
    return {};
  }
  var data = source.json();
  for (let i = 0; i < data.length; i++) {
    const substance = data[i];
    if (data[i].type == "t") continue;
    const getSubstanceDetail = await getSubstanceCollection(
      substance.name,
      language,
    );

    if (getSubstanceDetail) {
      data[i].detail = getSubstanceDetail;
    } else {
      data[i].detail = await getSubstance(substance.name);
      console.log(data[i].detail);
    }
  }
  return data;
};
