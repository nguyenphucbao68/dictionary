// const request = require('request'),
// 	cheerio = require('cheerio'),
// 	jsdom = require('jsdom'),
// 	parseStringPromise = require('xml2js').parseStringPromise;
// import request from 'request';
import cheerio from 'cheerio';
import jsdom from 'jsdom';
import { parseStringPromise } from 'xml2js';
function transformDictionary(dictionary, callback) {
  /* global API_VERSION */
  if (API_VERSION !== 1) {
    return dictionary;
  }

  return dictionary.map((entry) => {
    let { meanings, ...otherProps } = entry;

    meanings = meanings.reduce((meanings, meaning) => {
      let partOfSpeech, rest;

      ({ partOfSpeech, ...rest } = meaning);
      meanings[partOfSpeech] = rest;

      return meanings;
    }, {});

    return {
      ...otherProps,
      meaning: meanings,
    };
  });
}

const LIMIT_EXAMPLE = 3;
function findEnglishDefinitionLexico(word, language, callback) {
  // console.time('test');
  if (encodeURIComponent(word).includes('%20%20')) {
    return callback({
      statusCode: 404,
      title: 'Word not found',
      message:
        "Sorry pal, we couldn't find definitions for the word you were looking for.",
      resolution: 'You can try the search again or head to the web instead.',
    });
  }

  const URI = `https://www.lexico.com/${language}/definition/${word}`;

  return giveBody(URI, async (err, body) => {
    if (err) {
      return callback(err);
    }

    const $ = cheerio.load(body);

    if (!$('.hwg .hw').first()[0]) {
      return callback({
        statusCode: 404,
        title: 'Word not found',
        message:
          "Sorry pal, we couldn't find definitions for the word you were looking for.",
        resolution: 'You can try the search again or head to the web instead.',
      });
    }

    var dictionary = [],
      numberOfentryGroup,
      arrayOfEntryGroup = [],
      grambs = $('section.gramb'),
      entryHead = $('.entryHead.primary_homograph'),
      etymology = $('section.etymology');

    let i,
      j = 0;

    for (i = 0; i < entryHead.length; i++) {
      arrayOfEntryGroup[i] =
        $('#' + entryHead[0].attribs.id + ' ~ .gramb').length -
        $('#' + entryHead[i].attribs.id + ' ~ .gramb').length;
    }
    arrayOfEntryGroup[i] = $(
      '#' + entryHead[0].attribs.id + ' ~ .gramb'
    ).length;
    // console.log(entryHead.length);
    numberOfentryGroup = arrayOfEntryGroup.length - 1;
    console.log(arrayOfEntryGroup);
    for (i = 0; i < numberOfentryGroup; i++) {
      var entry = {},
        word = $('.hwg .hw')[i].childNodes[0].nodeValue,
        phonetic = $('.entryGroup .pronunciations .phoneticspelling')[i],
        pronunciation = $('.entryGroup .pronunciations .speaker')[i],
        origin = $('.pronSection.etym')
          .eq(i)
          .prev()
          .find('.senseInnerWrapper p')
          .text();

      entry.word = word;

      if (phonetic) {
        entry.phonetic = phonetic.childNodes[0] && phonetic.childNodes[0].data;
      }
      if (pronunciation) {
        entry.pronunciation = $(pronunciation).find('a audio').attr('src');
      }

      origin && (entry.origin = origin);

      entry.meaning = [];

      let start = arrayOfEntryGroup[i],
        end = arrayOfEntryGroup[i + 1];

      for (j = start; j < end; j++) {
        var partofspeech = $(grambs[j]).find('.ps.pos .pos').text();

        $(grambs[j])
          .find('.semb')
          .each(function (j, element) {
            var meaningArray = [];

            $(element)
              .find('> li')
              .each(function (j, element) {
                var newDefinition = {},
                  item = $(element).find('> .trg'),
                  definition = $(item).find(' > p > .ind').text(),
                  example = $(item).find(' > .exg  > .ex > em').first().text(),
                  synonymsText = $(item)
                    .find(' > .synonyms > .exg  > div')
                    .first()
                    .text(),
                  synonyms = synonymsText
                    .split(/,|;/)
                    .filter((synonym) => synonym != ' ' && synonym)
                    .map(function (item) {
                      return item.trim();
                    }),
                  examples = [],
                  subSenses = [];

                $(item)
                  .find('.subSenses .subSense')
                  .each((j, element) => {
                    var subSenseObj = {},
                      item = $(element),
                      definition = $(item).find('.ind').text(),
                      example = $(item).find(' > .exg > .ex').text(),
                      subSynonymsText = $(item)
                        .find(' > .synonyms > .exg > div')
                        .text(),
                      synonyms = subSynonymsText
                        .split(/,|;/)
                        .filter((synonym) => synonym != ' ' && synonym)
                        .map(function (item) {
                          return item.trim();
                        }),
                      examples = [];

                    $(item)
                      .find(' > .examples .english-ex .ex')
                      .each((j, element) => {
                        if (j >= LIMIT_EXAMPLE) return;
                        examples.push($(element).text());
                      });

                    if (definition.length > 0)
                      subSenseObj.definition = definition;

                    if (example.length > 0)
                      // Remove line break and extra space
                      subSenseObj.example = example
                        .substring(1, example.length - 1)
                        .replace(/(\r\n|\n|\r)/gm, ' ')
                        .trim();

                    if (synonyms.length > 0) subSenseObj.synonyms = synonyms;

                    if (examples.length > 0) subSenseObj.examples = examples;

                    subSenses.push(subSenseObj);
                  });

                $(item)
                  .find(' > .examples .english-ex .ex')
                  .each((j, element) => {
                    if (j >= LIMIT_EXAMPLE) return;
                    examples.push($(element).text());
                  });

                if (definition.length === 0) {
                  definition = $(item).find('.crossReference').first().text();
                }

                if (definition.length > 0)
                  newDefinition.definition = definition;

                if (example.length > 0)
                  // Remove line break and extra space
                  newDefinition.example = example
                    .substring(1, example.length - 1)
                    .replace(/(\r\n|\n|\r)/gm, ' ')
                    .trim();

                if (synonyms.length > 0) newDefinition.synonyms = synonyms;

                if (examples.length > 0) newDefinition.examples = examples;

                if (subSenses.length > 0) newDefinition.subSenses = subSenses;

                meaningArray.push(newDefinition);
              });

            if (partofspeech.length === 0) partofspeech = 'crossReference';
            let data = meaningArray.slice();
            entry.meaning.push({ name: partofspeech, data });
          });

        $(grambs[j])
          .find('.empty_sense')
          .each(function (j, element) {
            var meaningArray = [],
              objEmptySense = {},
              item = $(element),
              derivativeWord = $(item).find('.derivative_of a').text(),
              example = $(item).find(' > .exg  > .ex > em').first().text(),
              synonymsText = $(item)
                .find(' > .synonyms > .exg  > div')
                .first()
                .text(),
              examples = [];

            $(item)
              .find(' > .examples .english-ex .ex')
              .each(function (k, element) {
                if (k >= LIMIT_EXAMPLE) return;
                examples.push($(element).text());
              });
            if (derivativeWord.length > 0)
              objEmptySense.derivativeWord = derivativeWord;
            if (example.length > 0) objEmptySense.example = example;
            if (synonymsText.length > 0) objEmptySense.example = synonymsText;
            if (examples.length > 0) objEmptySense.examples = examples;
            meaningArray.push(objEmptySense);
            entry.meaning.push({
              name: partofspeech,
              data: meaningArray,
            });
          });
      }

      for (j = start; j < end; j++) {
        var etymologyName = $(etymology[j]).find('h3').text();
        var etymologyArray = [];
        if (!$(etymology[j]).find('.phrase').first()[0]) {
          var contentOriginal = $(etymology[j])
            .find('.senseInnerWrapper')
            .text();
          contentOriginal = contentOriginal.replace(
            /(\s|)Compare with (.*?)\./g,
            ''
          );
          entry.meaning.push({
            name: etymologyName,
            data: contentOriginal,
          });
        } else {
          $(etymology[j])
            .find('.phrase')
            .each((l, element) => {
              var phraseObj = {},
                phrase = $(element),
                phraseName = $(phrase).text(),
                ctEx = $(phrase).siblings('.semb').eq(l).find('.trg'),
                definition = $(ctEx).find('.ind').text(),
                example = $(ctEx).find('> .exg .ex').text(),
                examples = [];
              $(ctEx)
                .find('> .examples .ex')
                .each((n, element) => {
                  if (n >= LIMIT_EXAMPLE) return;
                  examples.push($(element).text());
                });
              phraseObj = { phraseName, definition, example, examples };
              etymologyArray.push(phraseObj);
            });

          if (etymologyName.length === 0) continue;
          // etymologyName = 'other';
          entry.meaning.push({
            name: etymologyName,
            data: etymologyArray,
          });
        }
      }
      dictionary.push(entry);
    }

    Object.keys(dictionary).forEach((key) => {
      Array.isArray(dictionary[key]) &&
        !dictionary[key].length &&
        delete dictionary[key];
    });

    // console.timeEnd('test');
    const relatedWords = await findRelatedWords(word);
    const relatedImages = await findRelatedImages(word);
    return { data: dictionary, relatedWords, relatedImages };
  });
}

export async function getDefinitions(word, language, callback) {
  if (encodeURIComponent(word).includes('%20%20')) {
    return {
      statusCode: 404,
      title: 'Word not found',
      message:
        "Sorry pal, we couldn't find definitions for the word you were looking for.",
      resolution: 'You can try the search again or head to the web instead.',
    };
  }

  const URI = `http://tratu.soha.vn/dict/${language}/${word}`;

  return giveBody(URI, async (err, body) => {
    if (err) {
      return callback(err);
    }

    const $ = cheerio.load(body);
    if ($('.noarticletext').first()[0]) {
      return {
        statusCode: 404,
        title: 'Word not found',
        message:
          "Sorry pal, we couldn't find definitions for the word you were looking for.",
        resolution: 'You can try the search again or head to the web instead.',
      };
    }
    // $('#bodyContent')
    //   .find('.section-h2 > h2')
    //   .each((j, element) => {
    //     if ($(element).find('span').text().trim() == 'Các từ liên quan') {
    //       $(element).parent().remove();
    //     }
    //   });
    // $('#bodyContent h2').attr('onclick', 'window.hide()');
    $('#bodyContent > h3').remove();
    $('#bodyContent a').removeAttr('title');
    $('#bodyContent div').removeAttr('id');
    $('#bodyContent div').removeAttr('class');
    $('#bodyContent').find('#siteSub').remove();
    const dictionary = $('#bodyContent').html();
    const relatedWords = await findRelatedWords(word, language);
    const meta = {
      desc:
        $('#bodyContent').text().substring(0, 200).replace(/\s+/g, ' ') + '...',
    };
    return { data: { word, data: dictionary, relatedWords, meta } };
  });
}

async function findRelatedImages(word, limit = 3) {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=17961200-65c2345ba1aa9ef9bd6a98a9c&q=${word}&image_type=photo&pretty=false&&per_page=${limit}`
    );
    if (response) {
      const source = await response.json();
      return source;
    }
  } catch (error) {
    console.log('check');
    console.error(error);
    return null;
  }
}

async function findRelatedWords(word, language = 'en_en', limit = 8) {
  try {
    // console.log(`/api/index.php/search/${word}/${limit}`);
    const response = await fetch(
      `${process.env.ORIGIN_URL}/api/index.php/search/${language}/${word}/${limit}`
    );
    if (response) {
      const source = await response.json();
      return source;
    }
  } catch (error) {
    console.log('check');
    console.error(error);
    return null;
  }
}

function findSentencesEnglish(word, language, languageConvert, callback) {
  if (encodeURIComponent(word).includes('%20%20')) {
    return callback({
      statusCode: 404,
      title: 'Word not found',
      message:
        "Sorry pal, we couldn't find definitions for the word you were looking for.",
      resolution: 'You can try the search again or head to the web instead.',
    });
  }

  const URI = `https://glosbe.com/${language}/${languageConvert}/${word}`;

  return giveBody(URI, (err, body) => {
    if (err) {
      return callback(err);
    }

    const $ = cheerio.load(body);

    // if ($('.noarticletext').first()[0]) {
    // 	return callback({
    // 		statusCode: 404,
    // 		title: 'Word not found',
    // 		message:
    // 			"Sorry pal, we couldn't find definitions for the word you were looking for.",
    // 		resolution:
    // 			'You can try the search again or head to the web instead.',
    // 	});
    // }

    var dictionary = {};
    dictionary.data = [];
    var spanDOM = $(
      '#translationExamples .tableRow.row-fluid > .span12 > span'
    );
    spanDOM.find('.tm-p-, .tm-p-hide1, .tm-p-hide0').removeAttr('class');
    $('#translationExamples .tableRow.row-fluid').each((j, element) => {
      var sentences = {};
      sentences.author = $(element).find('.user-avatar-box').text();
      sentences.example = $(element).find('> .span12 > span').html();
      dictionary.data.push(sentences);
    });
    return callback(null, dictionary);
  });
}

function findEnglishDefinitions(word, language, callback) {
  if (encodeURIComponent(word).includes('%20%20')) {
    return callback({
      statusCode: 404,
      title: 'Word not found',
      message:
        "Sorry pal, we couldn't find definitions for the word you were looking for.",
      resolution: 'You can try the search again or head to the web instead.',
    });
  }

  const URI = `http://tratu.soha.vn/dict/${language}/${word}`;

  return giveBody(URI, (err, body) => {
    if (err) {
      return callback(err);
    }

    const $ = cheerio.load(body);

    if ($('.noarticletext').first()[0]) {
      return callback({
        statusCode: 404,
        title: 'Word not found',
        message:
          "Sorry pal, we couldn't find definitions for the word you were looking for.",
        resolution: 'You can try the search again or head to the web instead.',
      });
    }

    var dictionary = {};
    $('#bodyContent')
      .find('.section-h2 > h2')
      .each((j, element) => {
        if ($(element).find('span').text().trim() == 'Các từ liên quan') {
          $(element).parent().remove();
        }
      });
    $('#bodyContent > h3').remove();
    $('#bodyContent a').removeAttr('href');
    $('#bodyContent a').removeAttr('title');
    $('#bodyContent div').removeAttr('id');
    $('#bodyContent div').removeAttr('class');
    var source = $('#bodyContent').html();
    source = source.replace(/\<div\>/g, '');
    source = source.replace(/\<a name=\"(.*?)\"\>\<\/a\>/g, '');
    source = source.replace(/\<\/div\>/g, '');
    source = source.replace(/\<a\>/g, '');
    source = source.replace(/\<\/a\>/g, '');
    // return callback(null, source);
    dictionary.source = source;
    return callback(null, dictionary);
  });
}

export async function getSubtitleFromVideo(code = '', lang = 'en') {
  try {
    const response = await fetch(
      `https://video.google.com/timedtext?lang=${lang}&v=${code}`
    );
    const str = response.text();
    const result = await parseStringPromise(await str, function (err, ress) {
      return ress;
    });
    return { result };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 404,
      title: 'Word not found',
      message:
        "Sorry pal, we couldn't find definitions for the word you were looking for.",
      resolution: 'You can try the search again or head to the web instead.',
    };
  }
}

export async function searchWordOnYoutube(word) {
  try {
    const urlSource = `https://youglish.com/fetch.jsp?vers=4&qp=0&lg=0&accent=0&nagla=3&query=${word}`;
    const responseSource = await fetch(urlSource);
    const data = responseSource.json();
    var run = getRandom((await data).results, 5).map(async function ({
      display,
      vid,
      start,
    }) {
      var itemVideo = { title: display, code: vid, start };
      const url = `https://www.youtube.com/watch?v=${vid}`;
      const response = await fetch(
        `https://www.youtube.com/oembed?url=${url}&format=json`
      );
      const item = await response.json();
      const { author_url, author_name, title, thumbnail_url } = item;
      itemVideo.data = {
        author_url,
        author_name,
        title,
        thumbnail_url,
      };
      return itemVideo;
    });
    return Promise.all(run).then(function (listVideos) {
      return { data: listVideos };
    });
    // return true;
    //
    // const data = response.json();
    // console.log(await data);
  } catch (error) {
    console.log(error);
    return {
      statusCode: 404,
      title: 'Word not found',
      message:
        "Sorry pal, we couldn't find definitions for the word you were looking for.",
      resolution: 'You can try the search again or head to the web instead.',
    };
  }
}

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export function findDefinitions(word, language, callback) {
  return findEnglishDefinitionLexico(word, language, callback);
  // return findSentencesEnglish(word, 'en', language, callback);
  // return findEnglishDefinitions(word, language, callback);
}

function giveBody(url, options, callback) {
  !callback && (callback = options) && (options = {});

  return fetchData(url, function (err, body) {
    if (err) {
      return callback(err);
    }

    try {
      options.cleanBody && (body = cleanBody(body));
    } catch (e) {
      return callback({
        statusCode: 500,
        title: 'Something Went Wrong.',
        message: 'Sorry pal, Our servers ran into some problem.',
        resolution: 'You can try the search again or head to the web instead.',
      });
    }

    return callback(null, body);
  });
}

function cleanBody(body) {
  const { JSDOM } = jsdom;

  let c = '',
    d = 0,
    e = 0,
    arr = [];

  body = body.split('\n');
  body.shift();
  body = body.join('\n');

  for (c = c ? c : c + body; c; ) {
    d = 1 + c.indexOf(';');

    if (!d) {
      break;
    }

    e = d + parseInt(c, 16);

    arr.push(c.substring(d, e));

    c = c.substring(e);
    d = 0;
  }

  arr = arr.filter((e) => e.indexOf('[') !== 0);

  arr[1] = '<script>';
  arr[arr.length] = '</script>';

  return new JSDOM(arr.join(''), { runScripts: 'dangerously' }).serialize();
}

async function fetchData(url, callback) {
  try {
    const fetchURL = await fetch(encodeURI(url), {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36',
      },
    });
    const source = await fetchURL.text();
    return callback(null, source);
  } catch (error) {
    return callback({
      statusCode: 500,
      title: 'Something Went Wrong.',
      message: 'Sorry pal, Our servers ran into some problem.',
      resolution: 'You can try the search again or head to the web instead.',
    });
  }
}

module.exports = {
  findDefinitions,
  searchWordOnYoutube,
  getSubtitleFromVideo,
  getDefinitions,
};
