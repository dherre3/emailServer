<?php

class User{
  public $chat;
  public $fractals;
  public $image;
  public $user;
  public function __construct()
  {
    echo 'boom';
  }
  public function getUserById($uid)
  {
    $user=$db->select("* FROM sessions WHERE uid=:t", array("t" => $uid))->one();
    return $user;
  }
  public function getUser()
  {
    if(!isset($this->$user))
    {
      $u=$db->select("* FROM sessions WHERE token=:t", array("t" => $token))->one();

      $this->$user=$u;
      return $this->$user;
    }else{
      return $this->$user;
    }
  }
  public static function sendMessage($param)
  {
    $db = basePDO();
    $param=array();
    $param["uid"]="2";
    $param["cid"]="1";
    $param["message"]="Hello!";
    $time=time();

    if(isset($param['message'])&&isset($param['uid'])&&isset($param['cid']))
    {
      try {
        $db->insert("conversation_msg",array(
          "MessageSerNum"=>$param["cid"],
          "UserSerNum"=>$param["uid"],
          "MessageContent"=>$param['message'],
          "TimeCreated"=>$time
        ));
        $db->insert("conversation_msg_read",array(
          "MessageSerNum"=>$db->lastInsertId(),
          "UserSerNum"=>$param["uid"],
          "TimeRead"=>$time
        ));


        return 1;
      } catch (Exception $e) {
        return -1;
      }
    }else{
      return -1;
    }
  }
  public static function createConversations($param)
  {
    
  }
  public static function getUserConversations($uid)
  {

      $db = basePDO();
      $uid = 2;
      $session=$db->select("* FROM sessions WHERE id=:t", array("t" => $uid))->one();
      $id=$session->id;
      $conv=$db->select("* FROM conversation_access WHERE UserSerNum=:e", array("e"=>$id))->all();
      for ($i=0; $i < count($conv); $i++) {
        $cid=$conv[$i]['cid'];
        $mess=$db->select("* FROM conversation_msg WHERE UserSerNum=:e AND ConversationSerNum=:r", array("e"=>$id,"r"=>$cid))->all();
        $readStatus=Messages::getReadStatusMessageArray($mess);
        if($readStatus==-1)
        {

        }
        $conv['Messages']=$mess;

      }
      echo json_encode($conv);

  }
  public function getUserFractals($userId)
  {

  }
  public function getUserDetails($uid)
  {
    if(!isset($self))
    {

    }
  }

}
class Fractal{
  public $chat;
  public $users;
  public $owner;
  public $permissions;
  public $rootId;
  public $fractalId;
  public static function getFractalConversation($fractalId)
  {
    //$db->select(* )
  }



}
class FractalChat extends UserConversation{
  public $fractalId;
  public function get_fractalId () {
        return $this->$fractalId;
  }
  public static function get_fractal_chat($fractalId)
  {

  }
}
class UserChat{
  public $userConversations;


}


class Conversation{
  public $convId;
  public $conv_name;
  public $users;
  public $messages;
  public $readStatus;
  public static function readConversation($convId)
  {


  }
  public static function getConversationReadStatus()
  {

  }

}
class UserConversation extends Conversation{
  public $readStatus;
  public $userId;

}
class UserMessage extends Message{
  public $readStatus;

}
class Message{
  public $messageId;
  public $content;
  public $convId;
  public $userId;
  public $timecreated;
  public $attachment;
  public static function getReadStatusMessageArray($array)
  {
    $db=basePDO();
    $max=-1;
    for ($i=0; $i < count($array); $i++) {
      $readDate=$db->select("time_created FROM conversation_msg WHERE MessageSerNum=:r",array("r"=>$array[$i]['mid']))->all();
        if(count($readDate)>0&&$max<$readDate[0]['time_created'])
        {
          $max=$readDate[0]['time_created'];
        }
    }
    return $max;
  }

}






 ?>
