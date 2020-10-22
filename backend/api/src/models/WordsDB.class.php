<?php
require __DIR__ . '/../../configDB.php';

  class WordsDB {    
    private $pdo;

    public function connect(){
      $connect_str = "mysql:host=".DB_HOST.";dbname=".DB_NAME;

      $pdo = new PDO($connect_str, DB_USER, DB_PASSWORD);

      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      $this->pdo = $pdo;
    }

    public function getCat($cat, $wordLimit){
      $sql = "SELECT type, COUNT(type) as numcount, (ceiling(COUNT(type) / $wordLimit)) as pageCount FROM `words` WHERE type='$cat'";
      $this->connect();

      $stmt = $this->pdo->query($sql);

      $this->pdo = null;
      return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getWordsByCat($cats){
      $sql = "SELECT *  FROM `words` WHERE type='$cats'";
      $this->connect();

      $stmt = $this->pdo->query($sql);

      $this->pdo = null;
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getCatAll($limit, $wordLimit){
      $sql = "SELECT DISTINCT type, COUNT(type) as numcount, (ceiling(COUNT(type) / $wordLimit)) as pageCount FROM `words` GROUP BY type LIMIT $limit";
      $this->connect();

      $stmt = $this->pdo->query($sql);

      $this->pdo = null;
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAll($type, $page, $limit){
      $off = ($page - 1)*$limit;
      // error_log($off);
      $sql = "SELECT * FROM words WHERE type='$type' LIMIT $off, $limit";
      $this->connect();

      $stmt = $this->pdo->query($sql);

      $this->pdo = null;
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function findById($id){
      $sql = "SELECT * FROM words WHERE id=$id";
      $this->connect();

      $stmt = $this->pdo->query($sql);

      $this->pdo = null;
      return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function add(Words $word){
      $sql = "INSERT INTO words Values (default, :word, :created_at)";
      
      $this->connect();

      $stmt = $this->pdo->prepare($sql);

      $res = $stmt->execute(array(
         ":word" => $word->__get('word'),
         ":created_at" => $word->__get('created_at')
        )
      );      
    }

    public function findByWord($word){
      $sql = "SELECT * FROM words WHERE word=:word";
      $this->connect();

      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(":word", $word);
      $stmt->execute(); 
      $this->pdo = null;
      return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function addList($list, $type, $date){
      $query = '';
      $query_parts = array();
      for($x=0; $x<count($list); $x++){
          $query_parts[] = "(default, '" . mysql_escape_string($list[$x]) . "', '".$type."', '" . $date . "')";
      };
      $query .= implode(',', $query_parts);
      $sql = "INSERT INTO words Values $query";
      $this->connect();

      $stmt = $this->pdo->prepare($sql);

      $res = $stmt->execute();      
    }   

    public function findByKeyword($keyword, $limit = 8){
      $sql = "SELECT * FROM words WHERE word LIKE :keyword LIMIT :limit";
      $this->connect();

      $stmt = $this->pdo->prepare($sql);

      $this->pdo = null;
      $stmt->bindValue(":limit", intval($limit), PDO::PARAM_INT);
      $stmt->bindValue(":keyword", $keyword . '%');
      $res = $stmt->execute(); 
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update(Book $book){
      $sql = "UPDATE words SET word = :word, created_at = :created_at WHERE id = :id";
      
      $this->connect();

      $stmt = $this->pdo->prepare($sql);

      $res = $stmt->execute(array(
         ":id" => $book->__get('id'),
         ":word" => $book->__get('word'),
         ":created_at" => $book->__get('created_at'),
        )
      );      
  }       
   
    public function delete($id){
      $sql = "DELETE FROM words WHERE id= :id";

      $this->connect();
      
      $stmt = $this->pdo->prepare($sql);      
      $res = $stmt->execute(array( ":id" => $id ));      
  }       
}