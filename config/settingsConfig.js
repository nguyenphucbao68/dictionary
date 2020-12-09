const settings = {
  url: "https://www.athoni.com",
  defaultLanguageData: "en_en",
  homeDictionary: {
    name: "Dictionary",
    keywordList: (word) => `Athoni Dictionary, ${word}`,
    titleTemplate: "Look up definition | Athoni Dictionary",
    desc: "Look up Everthing... definition, pronounce.",
  },
  pronounce: {
    name: "English - English",
    prefix: "en_en",
    titleTemplate:
      "How to pronounce '%s' in English - Youtube | Athoni Dictionary",
    siteMapPageList: 50,
    titleTemplateFunc: (word) =>
      `How to pronounce '${word}' at Youtube | Athoni Dictionary`,
    keywordList: (word) =>
      `${word}, How to pronounce ${word} in English, Youtube, Athoni`,
    description: (word) =>
      `${word} - Pronounce - Take advantage of videos on youtube to make English learning materials at athoni.com`,
  },
  languageData: [
    {
      name: "English - English",
      prefix: "en_en",
      siteMapPageList: 10,
      titleTemplate: "%s | meaning in the Athoni English Dictionary",
      titleTemplateFunc: (word) =>
        `${word} | meaning in the Athoni English Dictionary`,
      keywordList: (word) =>
        `${word} definition, dictionary, english, british, american, business, british english, thesaurus, define test, test meaning, what is ${word}, spelling, conjugation, audio pronunciation, free, online, english.`,
    },
    {
      name: "English - Vietnamese",
      prefix: "en_vn",
      siteMapPageList: 50,
      titleTemplate: "Nghĩa của từ %s là gì? | Từ điển Athoni Anh - Việt",
      titleTemplateFunc: (word) =>
        `Nghĩa của từ ${word} là gì? | Từ điển Athoni Anh - Việt`,
      keywordList: (word) =>
        `${word} là gì, Nghĩa của từ ${word} là gì, ${word}, Từ điển Anh - Việt, English - Vietnamese`,
    },
  ],
};
export default settings;
