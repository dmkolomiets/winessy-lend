<?php
$toEmail ="info@winessy.fr";
$mailHeaders = "From: Winessy";
$theme = 'Winessy subscription';
$msg = 'Name: ' . $_REQUEST['name'] .
        "\r\n" . 'Email: ' . $_REQUEST['email'];

mail($toEmail, $theme, $msg, $mailHeaders);