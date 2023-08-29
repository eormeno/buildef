<?php

namespace BaseLogic;

class BaseLogic
{
   private $page;
   private $logger;

   function __construct()
   {
   }

   function changePage($page)
   {
      $this->page = $page;
   }

   function getPage()
   {
      return $this->page;
   }

   function log($message)
   {
   }
}