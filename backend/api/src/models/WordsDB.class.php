<?php
require __DIR__ . '/../../configDB.php';

  class WordsDB {    
    private $pdo;
    private $currentLanguage = array("en_en", "en_vn");
    public function connect(){
      $connect_str = "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8;port=".DB_PORT;

      $pdo = new PDO($connect_str, DB_USER, DB_PASSWORD);

      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $this->pdo = $pdo;
    }

    public function getReactionsListByCategory($category, $limit){
      $sql = "SELECT * FROM `reactions_detail` as v1 INNER JOIN (SELECT rid FROM `reactions_detail` WHERE name=:category AND type='t' LIMIT 10) as v2 ON v1.rid = v2.rid";
      $this->connect();
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue("category", $category);
      $stmt->execute();
      $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
      return $this->generateNewObject($data);
    }

    public function searchReactionsByKeyword($keyword){
      $keyword = str_replace("  ", " ", $keyword);
      $keyword = str_replace("  ", " ", $keyword);
      $keyword = str_replace(" ", " + ", $keyword);
      $sql = "SELECT * FROM `reactions`  INNER JOIN reactions_detail ON reactions.id = reactions_detail.rid WHERE reaction LIKE '%".$this->mysql_escape_mimic($keyword)."%'";
      $this->connect();

      $stmt = $this->pdo->prepare($sql);
      $stmt->execute();
      $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
      return $this->generateNewObject($data);
    }

    private function createConditionReaction($data, $first){
      $str = "";
      for ($i=0; $i < count($data); $i++) { 
        if($first && $i == 0) {
          $str .= " name != '".$this->mysql_escape_mimic($data[$i])."'";
        }else{
          $str .= " AND name != '".($this->mysql_escape_mimic($data[$i]))."'";
        }
      }
      return $str;
    }

    private function createSubstanceConditions($data){
      $s = "";
      for ($i=0; $i < count($data); $i++) { 
        if($i == 0)
          $s .= " reaction LIKE '%".$data[$i]."%'";
        else
          $s .= " AND reaction LIKE '%".$data[$i]."%'";
      }
      $s .= " AND (";
      for ($i=0; $i < count($data); $i++) { 
        if($i == 0)
          $s .= " name='".$data[$i]."'";
        else
          $s .= " OR name='".$data[$i]."'";
      }
      $s .= ")";
      return $s;
    }

    private function searchBySubstanceDB($type, $substanceArr){
      $sql = "SELECT * FROM reactions_detail WHERE rid IN (SELECT rid FROM `reactions` INNER JOIN reactions_detail ON reactions.id = reactions_detail.rid WHERE ".$this->createSubstanceConditions($substanceArr)." AND type=:type)";
      $this->connect();
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(":type", $type);
      $stmt->execute();
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function searchBySubstance($type, $substance){    
      $substanceArr = explode(" ", $substance);  
      $data = $this->searchBySubstanceDB($type, $substanceArr);
      $listSubstance = array();
      for ($i=0; $i < count($data); $i++) { 
          $element = $data[$i];
          if($element["type"] == $type){
            if(!isset($listSubstance[$element["rid"]])) $listSubstance[$element["rid"]] = array();
            array_push($listSubstance[$element["rid"]], $element["name"]);
          }
      }
      $listResult = array();
      foreach($listSubstance as $key => $value){
        for ($i=0; $i < count($substanceArr); $i++) { 
          if(!in_array($substanceArr[$i], $value)) break;
        }
        if($i == count($substanceArr)){
          array_push($listResult, $key);
        }
      }
     $result = array();
      for ($i=0; $i < count($data); $i++) { 
        $element = $data[$i];
        if(in_array($element["rid"], $listResult)){
          if(!isset($result[$element["rid"]])) $result[$element["rid"]] = array();
          array_push($result[$element["rid"]], $data[$i]);
        }
      }
      return $result;
    }

    private function getInfoReaction($id){
      $sql = "SELECT * FROM `reactions_detail` WHERE rid=:id";
      $this->connect();
      $stmt = $this->pdo->prepare($sql);
      
      $stmt->bindValue(":id", $id, PDO::PARAM_INT);
      $stmt->execute();
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAllReaction($reactantsArr, $productsArr){
      $qrReactants = $this->createConditionReaction($reactantsArr, true);
      $qrProducts = $this->createConditionReaction($productsArr, false);
      $sql = "SELECT * FROM `reactions_detail` WHERE rid NOT IN (SELECT rid FROM reactions_detail WHERE $qrReactants $qrProducts AND type != 't') GROUP BY rid";
      $this->connect();
      $stmt = $this->pdo->prepare($sql);
      $this->pdo = null;
      $res = $stmt->execute();
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getReaction($reactants, $products){
      $productsArr = explode(" ", $products);
      $reactantsArr = explode(" ", $reactants);
      $dataReaction = $this->getAllReaction($reactantsArr, $productsArr);
      for ($i=0; $i < count($dataReaction); $i++) { 
        $reaction = $this->getInfoReaction($dataReaction[$i]["rid"]);
        for ($j=0; $j < count($reaction); $j++) { 
          if($reaction[$j]["type"] == "t"){
            continue;
          }
          if($reaction[$j]["type"] == "r" && !in_array($reaction[$j]["name"],$reactantsArr)){
            break;
          }
          if($reaction[$j]["type"] == "p" && !in_array($reaction[$j]["name"],$productsArr)){
            break;
          }
         
        }
        if($j == count($reaction) ){
          return $reaction;
        } 
      }
      return array();
    }

    public function getSubstancesList(){
      $sql = "SELECT * FROM substance WHERE 1";
      $this->connect();

      $stmt = $this->pdo->prepare($sql);
      $this->pdo = null;

      $stmt->execute();
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private function generateNewObject($data){
      $listReactions = array();
      for ($i=0; $i < count($data); $i++) { 
        $element = $data[$i];
          if(!isset($listReactions[$element["rid"]])) $listReactions[$element["rid"]] = array();
          array_push($listReactions[$element["rid"]], $element);
      }
      return $listReactions;
    }


    public function getReactionsList($pageStart, $pageEnd){
      $sql = "SELECT * FROM reactions_detail WHERE rid>=:pageStart and rid<=:pageEnd ORDER BY rid ASC";
      $this->connect();

      $stmt = $this->pdo->prepare($sql);

      $this->pdo = null;
      $stmt->bindValue(":pageStart", (int)$pageStart, PDO::PARAM_INT);
      $stmt->bindValue(":pageEnd", (int)$pageEnd, PDO::PARAM_INT);
      // $stmt->bindValue(":limit", $limit, PDO::PARAM_INT);
      $res = $stmt->execute(); 
      $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

      // $listReactions = array();
      // for ($i=0; $i < count($data); $i++) { 
      //   $element = $data[$i];
      //     if(!isset($listReactions[$element["rid"]])) $listReactions[$element["rid"]] = array();
      //     array_push($listReactions[$element["rid"]], $element);
      // }
      return $this->generateNewObject($data);
    }

    
    public function getCat($pageStart, $pageEnd, $language){
      $sql = "SELECT * FROM ".$this->mysql_escape_mimic($language)." WHERE page>=:pageStart and page<=:pageEnd ORDER BY page ASC";
      $this->connect();

      $stmt = $this->pdo->prepare($sql);

      $this->pdo = null;
      $stmt->bindValue(":pageStart", (int)$pageStart, PDO::PARAM_INT);
      $stmt->bindValue(":pageEnd", (int)$pageEnd, PDO::PARAM_INT);
      // $stmt->bindValue(":limit", $limit, PDO::PARAM_INT);
      $res = $stmt->execute(); 
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getWordsByCat($cats){
      $sql = "SELECT *  FROM `words` WHERE type='$cats'";
      $this->connect();

      $stmt = $this->pdo->query($sql);

      $this->pdo = null;
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getCatAll($language){
      $sql = "SELECT page from ".$this->mysql_escape_mimic($language)." GROUP BY page";
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

    public function findBySubstance($substance){
      $sql = "SELECT * FROM substance WHERE word=:substance LIMIT 1";
      $this->connect();

      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(":substance", $substance);
      $stmt->execute(); 
      $this->pdo = null;
      return $stmt->fetch(PDO::FETCH_ASSOC);
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
          $query_parts[] = "(default, '" . $this->mysql_escape_string($list[$x]) . "', '".$type."', '" . $date . "')";
      };
      $query .= implode(',', $query_parts);
      $sql = "INSERT INTO words Values $query";
      $this->connect();

      $stmt = $this->pdo->prepare($sql);

      $res = $stmt->execute();      
    }   

    public function findByKeyword($keyword, $language, $limit = 8){
      if(!in_array($language, $this->currentLanguage)) throw new Error("Error");
      $sql = "SELECT * FROM $language WHERE word LIKE :keyword LIMIT :limit";
      $sql = "SELECT 
      * 
    FROM 
      (
        (
          SELECT 
            *, 
            1 as prio 
          FROM 
            en_vn 
          WHERE 
            word = :keyword1
          LIMIT 
            1
        ) 
        UNION 
          (
            SELECT 
              *, 
              2 as prio 
            FROM 
              en_vn 
            WHERE 
              word LIKE :keyword2 
            LIMIT 
            :limit
          ) 
        UNION 
          (
            SELECT 
              *, 
              3 as prio 
            FROM 
              en_vn 
            WHERE 
              word LIKE :keyword3
            LIMIT 
            :limit
          )
      ) as ts 
    GROUP BY 
      ts.word 
    ORDER BY 
      prio ASC 
    LIMIT 
      :limit
    ";
      $this->connect();

      $stmt = $this->pdo->prepare($sql);

      $this->pdo = null;
      $stmt->bindValue(":limit", intval($limit), PDO::PARAM_INT);
      $stmt->bindValue(":keyword1", $keyword);
      $stmt->bindValue(":keyword2", $keyword . '%');
      $stmt->bindValue(":keyword3", '%'. $keyword . '%');
      $res = $stmt->execute(); 
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private function mysql_escape_mimic($inp) { 
      if(is_array($inp)) 
          return array_map(__METHOD__, $inp); 
  
      if(!empty($inp) && is_string($inp)) { 
          return str_replace(array('\\', "\0", "\n", "\r", "'", '"', "\x1a"), array('\\\\', '\\0', '\\n', '\\r', "\\'", '\\"', '\\Z'), $inp); 
      } 
  
      return $inp; 
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