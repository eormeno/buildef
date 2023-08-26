<?php

namespace App\Components;

class AWPage extends AWContainer
{

   private string $title;

   public function __construct(string $title)
   {
      parent::__construct();
      $this->title = $title;
   }

   public function toJson(): string
   {
      $children = [];
      foreach ($this->children as $child) {
         $children[] = $child->toJson();
      }
      return json_encode([
         'id' => $this->id,
         'class' => get_class($this),
         'title' => $this->title,
         'children' => $children
      ]);
   }
}