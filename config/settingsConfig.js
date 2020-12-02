const settings = {
  url: "https://www.athoni.com",
  defaultLanguageData: "en_en",
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
