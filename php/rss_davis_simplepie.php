<?php
require_once 'simplepie/autoloader.php'; 	//Make sure SimplePie is included.
include('simple_html_dom.php'); 			//http://sourceforge.net/projects/simplehtmldom/files/
 
$post = file_get_contents('php://input'); 	//workaround for $_POST, this data arrives in the form of a URL
$postdec = json_decode($post, true);
$feedurl = $postdec["url"]; 				//e.g http://sample.com/feed

// We'll process this feed with all of the default options.
$feed = new SimplePie();

$feed->set_feed_url($feedurl);
//$feed->set_feed_url("http://selfreliancecentral.com/?feed=rss2");

// Run SimplePie.
$feed->init();

// This makes sure that the content is sent to the browser as text/html and the UTF-8 character set (since we didn't change it).
$feed->handle_content_type();
$feed->set_output_encoding('utf-8');

$loopCounter = 0;
$storageArray = array();

foreach ($feed->get_items() as $item ) {	

	$permalink = $item->get_permalink(); 
	$title = $item->get_title();
	$content = $item->get_content(); 
	$publishDate = $item->get_date('j F Y | g:i a');
	$comments = $item->get_item_tags('http://purl.org/rss/1.0/modules/slash/', 'comments'); //credit: http://stackoverflow.com/questions/5341811/simplepie-and-slashcomments
	$number = $comments[0]['data'];
	
	
	// find the first image in an individual RSS entry, and create an array with its properties
	// uses simple_html_dom_parser
	$html = str_get_html($content);
	$e = $html->find('img', 0);
	
	//give us proper email sizes if we're given the right JSON values
	$tmplW = $postdec["width"];  //maximum dimensions for the template, passed from JS
	$tmplH = $postdec["height"]; 
	$origW = $e->width;
	$origH = $e->height;
	
	if ($origW > $tmplW && $origW >= $origH) {
		$ratio = $tmplW / $origW; //get ratio for scaling image
		$fixedHeight = floor($origH * $ratio);
		$fixedWidth = $tmplW;	
	} else if ($origH > $tmplH) {
		$ratio = $tmplH / $origH; //get ratio for scaling image
		$fixedHeight = $tmplH;
		$fixedWidth = floor($origW * $ratio);	
	}
	
	
	$imageInfo = array(
		"src" => $e->src,				//the URI of the image
		"alt" => $e->alt,				//alt property
		"width" => $origW,				//width
		"height" => $origH,				//height
		"outertext" => $e->outertext,	//fully formatted, original. not recommended to use because it will likely have broken tags
		"fixedHeight" => $fixedHeight,	//not used yet
		"fixedWidth" => $fixedWidth,
	);
	
	
	
	
	
	//add all items to our array, will be sent to JS
	$storyArray = array (
		"title" => $title,
		"url" => $permalink,
		"description" => $content,
		"comments" => $number,
		"imageArray" => $imageInfo,
		);
		
	$storageArray[$loopCounter] = $storyArray; //add the current loop's data to the storage container	
	
	$loopCounter++;
}

echo header('Content-type: application/json; charset=utf-8');
echo json_encode($storageArray, true);  
?>