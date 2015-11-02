<?php
$content = $_POST["resultsTextArea"];
$keycode = $_POST["keycodeHiddenForm"];

$filename = $keycode . ".html";

header("Cache-Control: public");
header("Content-Description: File Transfer");
header('Content-Length: ' . strlen($content));
header("Content-Disposition: attachment; filename=$filename");
header("Content-Type: application/octet-stream; ");
header("Content-Transfer-Encoding: binary");

echo $content;
