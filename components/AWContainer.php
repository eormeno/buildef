<?php

namespace App\Components;

class AWContainer extends AWidget
{

   private array $children = [];

   public function __construct()
   {
      parent::__construct();
   }

   public function addChild(AWidget $child): void
   {
      $this->children[] = $child;
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
         'children' => $children
      ]);
   }
}