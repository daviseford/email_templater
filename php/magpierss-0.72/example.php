<?php
require_once 'rss_fetch.inc'; //
include('simple_html_dom.php'); //http://sourceforge.net/projects/simplehtmldom/files/
 
$post = file_get_contents('php://input'); //workaround for $_POST, this data arrives in the form of a URL
$postdec = json_decode($post, true);
$feedurl = $postdec["url"];

$rss = fetch_rss($feedurl);

$loopCounter = 0;
$storageArray = array();

foreach ($rss->items as $item ) {	
		
	$encoded = $item[content][encoded];
	$html = str_get_html($encoded);
	$htmlTest = htmlentities($item[description]);
	
	// find all images in an individual RSS entry
	$imageInfo = array();
	foreach($html->find('img') as $e) {
		$imageInfo["src"] = $e->src;				//the URI of the image
		$imageInfo["width"] = $e->width;			//width
		$imageInfo["height"] = $e->height;			//height
		$imageInfo["outertext"] = $e->outertext;	//fully formatted, original. not recommended to use because it will likely have broken tags

	}
	//add all items to our array, will be sent to JS
	$storyTest = array (
		"title" => $item[title],
		"url" => $item[link],
		"desc" => $item[description],
		"descTest" => $htmlTest,
		"encoded" => $encoded,
		"imageArray" => $imageInfo,
		);
		
	$storageArray[$loopCounter] = $storyTest;
	
	
	$loopCounter++;
}


echo header('Content-type: application/json; charset=utf-8');
echo json_encode($storageArray, true);  


?>