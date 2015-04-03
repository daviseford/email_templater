<?php
$filename = 'download.html';
$content = $_POST["data"];

header("Cache-Control: public");
header("Content-Description: File Transfer");
header('Content-Length: '.strlen($content));
header("Content-Disposition: attachment; filename=$filename");
header("Content-Type: application/octet-stream; "); 
header("Content-Transfer-Encoding: binary");

echo $content;

?>