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
  type = "substance",
) {
  const wordCheck = await db
    .collection("chemistry")
    .doc(language)
    .collection(type)
    .doc(substance)
    .get();
  if (wordCheck.exists) return wordCheck.data();
  return {};
}

export async function setSubstanceCollection(
  substance,
  data,
  language = "en",
  type = "substance",
) {
  return db
    .collection("chemistry")
    .doc(language)
    .collection(type)
    .doc(substance)
    .set(data)
    .then(function (docRef) {
      console.log("Document successfully written!", docRef?.id);
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
}

export async function getReactionCollection(
  reaction,
  language = "en",
  type = "reaction",
) {
  const wordCheck = await db
    .collection("chemistry")
    .doc(language)
    .collection(type)
    .doc(reaction)
    .get();
  if (wordCheck.exists) return wordCheck.data();
  return {};
}

export async function setReactionCollection(
  reaction,
  data,
  language = "en",
  type = "reaction",
) {
  return db
    .collection("chemistry")
    .doc(language)
    .collection(type)
    .doc(reaction)
    .set(data)
    .then(function (docRef) {
      console.log("Document successfully written!", docRef?.id);
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
}

export const getSubstanceDb = async (substance) => {
  const source = await fetch(
    `${process.env.ORIGIN_URL}/api/index.php/substance/${substance}`,
  );
  if (source.status >= 400) {
    console.error(source.error);
    return {};
  }
  const data = source.json();
  return data;
};

export const getSearchResults = async (type, substance) => {
  const source = await fetch(
    `${process.env.ORIGIN_URL}/api/index.php/reaction/search/${type}/${substance}`,
  );
  if (source.status >= 400) {
    console.error(source.error);
    return {};
  }
  const data = source.json();
  return data;
};

export const getChemicalReaction = async (r, p, language = "en") => {
  const source = await fetch(
    `${process.env.ORIGIN_URL}/api/index.php/reaction/${r}/${p}`,
  );
  if (source.status >= 400) {
    console.error(source.error);
    return {};
  }
  var data = await source.json();
  for (let i = 0; i < data.length; i++) {
    const substance = data[i];

    if (data[i].type == "t") continue;
    const getSubstanceDetail = await getSubstanceCollection(
      substance.name,
      language,
    );

    if (Object.keys(getSubstanceDetail).length !== 0) {
      data[i].detail = getSubstanceDetail;
    } else {
      data[i].detail = await getSubstance(substance.name);
      data[i].detail.data.other = await getSubstanceDb(substance.name);
      setSubstanceCollection(substance.name, data[i].detail);
    }
  }
  return data;
};

export const getChemicalEquationsByCat = async (cat, limit) => {
  const source = await fetch(
    `${process.env.ORIGIN_URL}/api/index.php/reaction/cat/${cat}/${limit}`,
  );
  if (source.status >= 400) {
    console.error(source.error);
    return {};
  }
  const data = source.json();
  return data;
};
