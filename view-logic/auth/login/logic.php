<?php

namespace Login;

class LoginLogic extends \BaseLogic\BaseLogic
{
   private $email;
   private $password;

   function setEmail($email)
   {
      $this->email = $email;
   }

   function setPassword($password)
   {
      $this->password = $password;
   }

   function login()
   {
      $this->log("Login with username: $this->email and password: $this->password");
      $this->changePage("CMSPage");
   }

   function resetPassword()
   {
      $this->changePage("ResetPasswordPage");
   }
}