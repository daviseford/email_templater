<?php
require_once 'rss_fetch.inc'; //
include('simple_html_dom.php'); //http://sourceforge.net/projects/simplehtmldom/files/
 
$post = file_get_contents('php://input');
$postdec = json_decode($post, true);
$feedurl = $postdec["url"];

$rss = fetch_rss($feedurl);

$loopCounter = 0;
$storageArray = array();

foreach ($rss->items as $item ) {	
		
	$encoded = $item[content][encoded];
	$html = str_get_html($encoded);
	
	// find all image with full tag
	$imageInfo = array();
	foreach($html->find('img') as $e) {
		$imageInfo["src"] = $e->src;
		$imageInfo["width"] = $e->width;
		$imageInfo["height"] = $e->height;
		$imageInfo["outertext"] = $e->outertext;		
	}
	//add all items to our array, will be sent to JS
	$storyTest = array (
		"title" => $item[title],
		"url" => $item[link],
		"desc" => $item[description],
		"imageArray" => $imageInfo,
		);
		
	$storageArray[$loopCounter] = $storyTest;
	
	
	$loopCounter++;
}


echo header('Content-type: application/json; charset=utf-8');
echo json_encode($storageArray, true);  


?>