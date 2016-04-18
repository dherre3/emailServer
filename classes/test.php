<?php

require 'Db.php';
require 'Db-auth.php';
require 'Secure.php';
require '../lib/google-api-php-client/src/Google/autoload.php';
require './classes/classes.php';
$user=new User();
User::getUserConversations();
User::sendMessage();

 ?>
