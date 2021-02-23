<?php
header('Access-Control-Allow-Origin: *'); 
error_reporting(E_ALL);
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Server\RequestHandlerInterface as RequestHandler;

require 'vendor/autoload.php';
require 'src/models/WordsDB.class.php';
require 'src/Words.class.php';
date_default_timezone_set('Asia/Ho_Chi_Minh');
$config = [
  'settings' => [
      'displayErrorDetails' => true,
  ],
];
$app = new \Slim\App($config);
define('WORDS_PER_PAGE', 500);
define('CATEGORIES_PER_PAGE', 500);



// // Routes

$app->get('/reaction/cat/{category}/{limit}', function (Request $request, Response $response) {    
  try {
    // picking words from database 
    $wordsDb = new WordsDB();
    $limit = $request->getAttribute('limit');
    $category = $request->getAttribute('category');
    // $limit = 960;
    $words = $wordsDb->getReactionsListByCategory($category, $limit);

    // custom json response
    $response->withStatus(200);
    $response->withHeader('Content-Type', 'application/json');
    return $response->withJson($words);

  } catch (PDOException $e) {
    $response->withStatus(500);
    $response->withHeader('Content-Type', 'application/json');
    $error['err'] = $e->getMessage();
    return $response->withJson($error);
  }
});

$app->get('/reaction/page/{pageStart}/{pageEnd}', function (Request $request, Response $response) {    
  try {
    // picking words from database 
    $wordsDb = new WordsDB();
    $pageStart = $request->getAttribute('pageStart');
    $pageEnd = $request->getAttribute('pageEnd');
    // $limit = 960;
    $words = $wordsDb->getReactionsList($pageStart, $pageEnd);

    // custom json response
    $response->withStatus(200);
    $response->withHeader('Content-Type', 'application/json');
    return $response->withJson($words);

  } catch (PDOException $e) {
    $response->withStatus(500);
    $response->withHeader('Content-Type', 'application/json');
    $error['err'] = $e->getMessage();
    return $response->withJson($error);
  }
});

$app->get('/reaction/search/{type}/{substance}', function (Request $request, Response $response) {    
  try {
    // picking words from database 
    $type = $request->getAttribute('type');
    $substance = $request->getAttribute('substance');
    // error_log($cat);
    $limit = 10;
    $wordsDb = new WordsDB();
    if($type == "s"){
      $words = $wordsDb->searchReactionsByKeyword($substance);
    }else{
      $words = $wordsDb->searchBySubstance($type, $substance);
    }

    // custom json response
    $response->withStatus(200);
    $response->withHeader('Content-Type', 'application/json');
    return $response->withJson($words);

  } catch (PDOException $e) {
    $response->withStatus(500);
    $response->withHeader('Content-Type', 'application/json');
    $error['err'] = $e->getMessage();
    return $response->withJson($error);
  }
});

$app->get('/reaction/{reactants}/{products}', function (Request $request, Response $response) {    
  try {
    // picking words from database 
    $reactants = $request->getAttribute('reactants');
    $products = $request->getAttribute('products');
    // error_log($cat);
    $wordsDb = new WordsDB();
    $words = $wordsDb->getReaction($reactants, $products);
    
    // custom json response
    $response->withStatus(200);
    $response->withHeader('Content-Type', 'application/json');
    return $response->withJson($words);

  } catch (PDOException $e) {
    $response->withStatus(500);
    $response->withHeader('Content-Type', 'application/json');
    $error['err'] = $e->getMessage();
    return $response->withJson($error);
  }
});

$app->get('/cat/{cat}', function (Request $request, Response $response) {    
  try {
    // picking words from database 
    $cat = $request->getAttribute('cat');
    // error_log($cat);
    $wordsDb = new WordsDB();
    $words = $wordsDb->getCat($cat, WORDS_PER_PAGE);

    // custom json response
    $response->withStatus(200);
    $response->withHeader('Content-Type', 'application/json');
    return $response->withJson($words);

  } catch (PDOException $e) {
    $response->withStatus(500);
    $response->withHeader('Content-Type', 'application/json');
    $error['err'] = $e->getMessage();
    return $response->withJson($error);
  }
});

$app->get('/{language}/cat/{pageStart}/{pageEnd}', function (Request $request, Response $response) {    
  try {
    // picking words from database 
    $wordsDb = new WordsDB();
    $language = $request->getAttribute('language');
    $pageStart = $request->getAttribute('pageStart');
    $pageEnd = $request->getAttribute('pageEnd');
    // $limit = 960;
    $words = $wordsDb->getCat($pageStart, $pageEnd, $language);

    // custom json response
    $response->withStatus(200);
    $response->withHeader('Content-Type', 'application/json');
    return $response->withJson($words);

  } catch (PDOException $e) {
    $response->withStatus(500);
    $response->withHeader('Content-Type', 'application/json');
    $error['err'] = $e->getMessage();
    return $response->withJson($error);
  }
});

$app->get('/substance/list', function (Request $request, Response $response) {    
  try {
    // picking words from database 
    
    $wordsDb = new WordsDB();
    $substanceData = $wordsDb->getSubstancesList();

    // custom json response
    $response->withStatus(200);
    $response->withHeader('Content-Type', 'application/json');
    return $response->withJson($substanceData);

  } catch (PDOException $e) {
    $response->withStatus(500);
    $response->withHeader('Content-Type', 'application/json');
    $error['err'] = $e->getMessage();
    return $response->withJson($error);
  }
});

$app->get('/substance/{substance}', function (Request $request, Response $response) {    
  try {
    // picking words from database 
    
    $wordsDb = new WordsDB();
    $substance = $request->getAttribute('substance');

    $substanceData = $wordsDb->findBySubstance($substance);

    // custom json response
    $response->withStatus(200);
    $response->withHeader('Content-Type', 'application/json');
    return $response->withJson($substanceData);

  } catch (PDOException $e) {
    $response->withStatus(500);
    $response->withHeader('Content-Type', 'application/json');
    $error['err'] = $e->getMessage();
    return $response->withJson($error);
  }
});


$app->get('/{language}/cat', function (Request $request, Response $response) {    
  try {
    // picking words from database 
    $wordsDb = new WordsDB();
    $language = $request->getAttribute('language');
    $words = $wordsDb->getCatAll($language);

    // custom json response
    $response->withStatus(200);
    $response->withHeader('Content-Type', 'application/json');
    return $response->withJson($words);

  } catch (PDOException $e) {
    $response->withStatus(500);
    $response->withHeader('Content-Type', 'application/json');
    $error['err'] = $e->getMessage();
    return $response->withJson($error);
  }
});

// all words
$app->get('/words/{type}/{page}', function (Request $request, Response $response) {    
  try {
    // picking words from database 
    $page = $request->getAttribute('page');
    $type = $request->getAttribute('type');
    // error_log($page);
    // echo $page;
    // echo WORDS_PER_PAGE;
    // return;
    $wordsDb = new WordsDB();
    $words = $wordsDb->getAll($type, $page, WORDS_PER_PAGE);

    // custom json response
    $response->withStatus(200);
    $response->withHeader('Content-Type', 'application/json');
    return $response->withJson($words);

  } catch (PDOException $e) {
    $response->withStatus(500);
    $response->withHeader('Content-Type', 'application/json');
    $error['err'] = $e->getMessage();
    return $response->withJson($error);
  }
});

// get one book by id
$app->get('/words/{id}', function (Request $request, Response $response) {
  try {
    $id = $request->getAttribute('id');
    // picking a book
    $wordsDb = new WordsDB();    
    $book = $wordsDb->findById($id);

    // custom json response
    $response->withStatus(200);
    $response->withHeader('Content-Type', 'application/json');
    return $response->withJson($book);

  } catch (PDOException $e) {
    $response->withStatus(500);
    $response->withHeader('Content-Type', 'application/json');
    $error['err'] = $e->getMessage(); 
    return $response->withJson($error);
  }
});

$app->get('/complete/{keyword}/{limit}', function (Request $request, Response $response) {
  try {
    $keyword = $request->getAttribute('keyword');
    $limit = $request->getAttribute('limit');
    // picking a book
    $wordsDb = new WordsDB();    
    $word = $wordsDb->findByKeyword($keyword, $limit);
    // custom json response
    $response->withStatus(200);
    $response->withHeader('Content-Type', 'application/json');
    return $response->withJson($word);

  } catch (PDOException $e) {
    $response->withStatus(500);
    $response->withHeader('Content-Type', 'application/json');
    $error['err'] = $e->getMessage(); 
    return $response->withJson($error);
  }
});

// search words
$app->get('/search/{language}/{keyword}/{limit}', function (Request $request, Response $response) {
  try {
    $keyword = $request->getAttribute('keyword');
    $limit = $request->getAttribute('limit');
    $language = $request->getAttribute('language');
    $wordsDb = new WordsDB();    
    $keyword2 = $keyword;
    $word = $wordsDb->findByKeyword($keyword, $language, $limit);
    error_log(json_encode($word));
    while(count($word) <= 5){
      
      $keyword = substr($keyword, 0, -1);
      $word = $wordsDb->findByKeyword($keyword, $language, $limit);
    }
    $keyword = $keyword == '' ? $keyword2 : $keyword;

    // custom json response
    $response->withStatus(200);
    $response->withHeader('Content-Type', 'application/json');
    return $response->withJson($word);

  } catch (PDOException $e) {
    $response->withStatus(500);
    $response->withHeader('Content-Type', 'application/json');
    $error['err'] = $e->getMessage(); 
    return $response->withJson($error);
  }
});

// adding a book
$app->post('/words', function (Request $request, Response $response) { 
  try {
    $word = new Words();    
    $date = date('m/d/Y h:i:s a', time());
    $word->__set('word', $request->getParam('word'));
    $word->__set('created_at', $date);

    // adding book in db
    $wordsDb = new WordsDB();
    $wordsDb->add($word);

    // custom json response
    $response->withStatus(200);
    $response->withHeader('Content-Type', 'application/json');
    $message['ok'] = "Word added successfully";
    return $response->withJson($message);

  } catch (PDOException $e) {
    $response->withStatus(500);
    $response->withHeader('Content-Type', 'application/json');
    $error['err'] = $e->getMessage(); 
    return $response->withJson($error);
  }
});

// adding words
$app->post('/words/list', function (Request $request, Response $response) { 
  try {
    $word = new Words();    
    $date = date('m/d/Y h:i:s a', time());
    $words = $request->getParam('words');
    $type = $request->getParam('type');
    $wordList = explode(",", $words);

    // adding book in db
    $wordsDb = new WordsDB();
    $wordsDb->addList($wordList, $type, $date);

    // custom json response
    $response->withStatus(200);
    $response->withHeader('Content-Type', 'application/json');
    $message['ok'] = "Words added successfully";
    return $response->withJson($message);

  } catch (PDOException $e) {
    $response->withStatus(500);
    $response->withHeader('Content-Type', 'application/json');
    $error['err'] = $e->getMessage(); 
    return $response->withJson($error);
  }
});

// // update a book
// $app->put('/words', function (Request $request, Response $response) { 
//   try {

//     $book = new Book();
//     $book->__set('id', $request->getParam('id'));
//     $book->__set('title', $request->getParam('title'));
//     $book->__set('author', $request->getParam('author'));
//     $book->__set('book_description', $request->getParam('description'));


//     // updating book in db
//     $wordsDb = new WordsDB();
//     $wordsDb->update($book);

//     // custom json response
//     $response->withStatus(200);
//     $response->withHeader('Content-Type', 'application/json');
//     $message['ok'] = "Book updated successfully";
//     return $response->withJson($message);

//   } catch (PDOException $e) {
//     $response->withStatus(500);
//     $response->withHeader('Content-Type', 'application/json');
//     $error['err'] = $e->getMessage(); 
//     return $response->withJson($error);
//   }
// });
// delete a book
$app->delete('/words/{id}', function (Request $request, Response $response) { 
  try {
    $id = $request->getAttribute('id');
    
    // delete book from database 
    $wordsDb = new WordsDB();
    $wordsDb->delete($id);

    // custom json response
    $response->withStatus(200);
    $response->withHeader('Content-Type', 'application/json');
    $message['ok'] = "Book deleted successfully";
    return $response->withJson($message);

  } catch (PDOException $e) {
    $response->withStatus(500);
    $response->withHeader('Content-Type', 'application/json');
    $error['err'] = $e->getMessage();
    return $response->withJson($error);
  }
});

// {
//   "query": {
//       "bool": {
//           "filter": {
//               "term": {
//                   "type.keyword": "Q"
//               }
//           },
//           "should": [
//               {
//                   "multi_match": {
//                       "query": "hàm số 4x^3 - 3x^2 + 2x-2",
//                       "fields": [
//                           "title",
//                           "content",
//                           "text"
//                       ]
//                   }
//               },
//               {
//                   "multi_match": {
//                       "query": "hàm số 4x^3 - 3x^2 + 2x-2",
//                       "fields": [
//                           "title",
//                           "content",
//                           "text"
//                       ],
//                       "operator": "and"
//                   }
//               },
//               {
//                   "match_phrase": {
//                       "content": {
//                           "query": "hàm số 4x^3 - 3x^2 + 2x-2",
//                           "boost": 2
//                       }
//                   }
//               }
//           ]
//       }
//   },
//   "from": 0,
//   "size": 5
// }

$app->post('/search/{service}', function (Request $request, Response $response) { 
  try {
    $parsedBody = $request->getParsedBody();
    $service = $request->getAttribute('service');
    $from = $parsedBody['from'];
    $query = urldecode($parsedBody['query']);
    $esClient = new GuzzleHttp\Client([
      'base_uri' => '',
    ]);
    if ($service == "hoidap")  {
      $esResults = json_decode($esClient->post(ELASTIC_HOST.':'.ELASTIC_PORT.'/'.ELASTIC_HOIDAP_INDEX.'/_search', [
        'headers' => [
          'Content-Type' => 'application/json',
        ],
        'auth' => [
          ELASTIC_USERNAME, ELASTIC_PASSWORD
        ],
        'body' => '{
          "query": {
              "bool": {
                  "filter": {
                      "term": {
                          "type": "Q"
                      }
                  },
                  "must_not": [ 
                    {
                        "term": {
                            "catidpath1": "71"
                        }
                    },
                    {
                        "term": {
                          "catidpath1": "12"
                        }
                    }
                  ],
                  "should": [
                      {
                          "multi_match": {
                              "query": "'.$query.'",
                              "fields": [
                                  "title",
                                  "text"
                              ]
                          }
                      },
                      {
                          "multi_match": {
                              "query": "'.$query.'",
                              "fields": [
                                  "title",
                                  "text"
                              ],
                              "operator": "and"
                          }
                      },
                      {
                          "match_phrase": {
                              "content": {
                                  "query": "'.$query.'",
                                  "boost": 2
                              }
                          }
                      }
                  ]
              }
          },
          "min_score": 50,
          "from": '.$from.',
          "size": 10
      }'
      ])->getBody());
    } else if ($service == "lecttr") {
      $esResults = json_decode($esClient->post(ELASTIC_HOST.':'.ELASTIC_PORT.'/'.ELASTIC_LECTTR_INDEX.'/_search', [
        'headers' => [
          'Content-Type' => 'application/json'
        ],
        'auth' => [
          ELASTIC_USERNAME, ELASTIC_PASSWORD
        ],
        'body' => '{
          "query": {
            "bool": {
              "filter": [
                {
                  "term": {
                    "post_status": "publish"
                  }
                },
                {
                  "term": {
                    "post_type.raw": "post"
                  }
                }
              ],
              "should": {
                "match": {
                  "query": "'.$query.'"
                }
              }
            }
          },
          "from": '.$from.',
          "size": 30
        }'
      ])->getBody());
    } else {
      $response->withStatus(500);
      $response->withHeader('Content-Type', 'application/json');
      $error['err'] = "Not allowed";
      return $response->withJson($error);
    }
    // custom json response
    $response->withStatus(200);
    $response->withHeader('Content-Type', 'application/json');
    return $response->withJson($esResults);

  } catch (PDOException $e) {
    $response->withStatus(500);
    $response->withHeader('Content-Type', 'application/json');
    $error['err'] = $e->getMessage();
    return $response->withJson($error);
  }
});

$app->get('/search/{service}-suggest/{keyword}', function (Request $request, Response $response) { 
  try {
    $service = $request->getAttribute('service');
    $keyword = $request->getAttribute('keyword');
    $esClient = new GuzzleHttp\Client([
      'base_uri' => '',
    ]);
    if ($service == "hoidap")  {
      $esResults = json_decode($esClient->post(ELASTIC_HOST.':'.ELASTIC_PORT.'/'.ELASTIC_HOIDAP_INDEX.'/_search?filter_path=hits.hits.fields.title', [
        'headers' => [
          'Content-Type' => 'application/json',
        ],
        'auth' => [
          ELASTIC_USERNAME, ELASTIC_PASSWORD
        ],
        'body' => '{
          "query": {
              "bool": {
                  "filter": {
                      "term": {
                          "type": "Q"
                      }
                  },
                  "must_not": [ 
                    {
                        "term": {
                            "catidpath1": "71"
                        }
                    },
                    {
                        "term": {
                          "catidpath1": "12"
                        }
                    }
                  ],
                  "should": [
                      {
                          "multi_match": {
                              "query": "'.$keyword.'",
                              "fields": [
                                  "title",
                                  "title._2gram",
                                  "title._3gram"
                              ]
                          }
                      }
                  ]
              }
          },
          "fields": ["title"],
          "_source": false,
          "min_score": 5,
          "from": 0,
          "size": 4
      }'
      ])->getBody());
    } else if ($service == "lecttr") {
      $esResults = json_decode($esClient->post(ELASTIC_HOST.':'.ELASTIC_PORT.'/'.ELASTIC_LECTTR_INDEX.'/_search?filter_path=hits.hits.fields.title', [
        'headers' => [
          'Content-Type' => 'application/json'
        ],
        'auth' => [
          ELASTIC_USERNAME, ELASTIC_PASSWORD
        ],
        'body' => '{
          "query": {
              "bool": {
                  "filter": {
                      "term": {
                          "type": "Q"
                      }
                  },
                  "must_not": {
                    "term": {
                        "catidpath1": "71"
                    }
                  },
                  "should": [
                      {
                          "multi_match": {
                              "query": "'.$keyword.'",
                              "fields": [
                                  "title",
                                  "title._2gram",
                                  "title._3gram"
                              ]
                          }
                      }
                  ]
              }
          },
          "fields": ["title"],
          "_source": false,
          "min_score": 5,
          "from": 0,
          "size": 4
      }'
      ])->getBody());
    } else {
      $response->withStatus(500);
      $response->withHeader('Content-Type', 'application/json');
      $error['err'] = "Not allowed";
      return $response->withJson($error);
    }
    // custom json response
    $response->withStatus(200);
    $response->withHeader('Content-Type', 'application/json');
    return $response->withJson($esResults);

  } catch (PDOException $e) {
    $response->withStatus(500);
    $response->withHeader('Content-Type', 'application/json');
    $error['err'] = $e->getMessage();
    return $response->withJson($error);
  }
});

$app->run();