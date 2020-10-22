<?php
  class Words 
  {
    private $id;
    private $word  = "";
    private $created_at = "";

    public function __get($attr){
      return $this->$attr;
    }

    public function __set($attr, $val){
      return $this->$attr = $val;
    }
  }