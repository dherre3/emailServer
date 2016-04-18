<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST)){
  $_POST = json_decode(file_get_contents('php://input'), true);
}
require 'autoload.php';
// multiple recipients
$to  = 'davidfherrerar@gmail.com';

// subject
$subject = 'Email from learnSwift';
$mail = new PHPMailer;
$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'Smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'davidfherrerarhacker@gmail.com';                 // SMTP username
$mail->Password = 'V_y_d100';                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;
// message

$mail->setFrom('davidfherrerarhacker@gmail.com', 'EmailSwiftSite');
$mail->addAddress('davidfherrerar@gmail.com', 'David F Herrera');
$message = json_encode($_POST);
$mail->isHTML(true);
$date = intval($_POST["date"]);
$date = $date/1000;
$date = date("d/m/Y, g:i a", $date);
                   // Set email format to HTML
$message = "<strong>Name: ".$_POST["name"]."</strong><br>"."<strong>Email: ".$_POST["email"]."</strong><br>"."<strong>Date: ".$date."</strong><br>"."<p>Content: ".$_POST["message"]."</p>";
$mail->Subject = $subject;
$mail->Body    = $message;
if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}
 ?>
