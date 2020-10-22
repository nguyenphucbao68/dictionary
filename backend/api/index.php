<?php
header('Access-Control-Allow-Origin: *'); 

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

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
// Routes

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

$app->get('/cat', function (Request $request, Response $response) {    
  try {
    // picking words from database 
    $wordsDb = new WordsDB();
    $words = $wordsDb->getCatAll(CATEGORIES_PER_PAGE, WORDS_PER_PAGE);

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
$app->get('/search/{keyword}/{limit}', function (Request $request, Response $response) {
  try {
    $keyword = $request->getAttribute('keyword');
    $limit = $request->getAttribute('limit');
    // picking a book
    $wordsDb = new WordsDB();    
    // print_r($wordsDb->findByWord($keyword));
    $keyword2 = $keyword;
    $word = $wordsDb->findByKeyword($keyword, $limit);
    while(count($word) <= 5){
      $keyword = substr($keyword, 0, -1);
      $word = $wordsDb->findByKeyword($keyword, $limit);
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

$app->run();