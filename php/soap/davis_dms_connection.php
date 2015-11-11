<?php

include('dms_mysql_functions.php'); //common mysql and dms functions

require_once('class.html2text.inc');
// all credit to http://www.chuggnutt.com/html2text-source for the html to text conversion
// I slightly modified it to remove the url generator, as it was giving links to my private blog!

//POST SECTION -- SETTING UP DATA FOR USE BELOW -- REFINE LATER //
$post = file_get_contents('php://input');    //workaround for $_POST, this data arrives in the form of a URL
$postdec = json_decode($post, true);

$clientCode = $postdec["clientCode"]; //e.g. ALPAC
$html = $postdec["html"];
$title = $postdec["title"];

//find the MySQL row, e.g. ALPAC
$sql = "SELECT * FROM DMS WHERE clientCode = '$clientCode' LIMIT 1";
$result = mySqlQuery($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $listName = $row["listName"];
        $headerTo = $row["headerTo"];
        $headerFrom = $row["headerFrom"];
    }
} else {
    //TODO: error handling here later
}


// Instantiate a new instance of the class. Passing the string
// variable automatically loads the HTML for you.
$h2t =& new html2text($html);


$content_Title = $postdec["keycode"];        //title = keycode
$content_Native_Title = $title;
$content_Description = $postdec["keycode"];    //cannot be NULL or empty
$content_HeaderTo = $headerTo;
$content_HeaderFrom = $headerFrom;
$content_HTML = $html;
$content_Text = $h2t->get_text();    //Simply call the get_text() method for the class to
//convert the HTML to the plain text.
//Store it into the variable.

// Create Content
$DocPartText = array(
    'MimePartName' => 'text',
    'Body'         => $content_Text,
    'Encoding'     => '8bit',
    'CharSetID'    => 16            //set CharSetID to 16 per James Beecher, DMS,
    //who found the fix for this encoding error.
);

$DocPartHtml = array(
    'MimePartName' => 'html',
    'Body'         => $content_HTML,
    'Encoding'     => '8bit',
    'CharSetID'    => 16        //set CharSetID to 16 per James Beecher, DMS,
    //who found the fix for this encoding error.
);

$DocParts = array($DocPartText, $DocPartHtml);

$contentStruct = array(
    'NativeTitle' => '[TEST]' . $content_Native_Title, //prepends our testing naming convention to the title
    'Description' => $content_Description,
    'Title'       => $content_Title,
    'HeaderTo'    => $content_HeaderTo,
    'HeaderFrom'  => $content_HeaderFrom,
    'DocType'     => 'CONTENTv2',
    'DocParts'    => $DocParts,
    'ListName'    => $listName
);

$lmapi = returnLmapiClient();
$result = $lmapi->CreateContent($contentStruct);

echo $result;

if(is_int($result)) {
    $result_escaped = mysql_escape_mimic($result);
    $nativeTitle_escaped = mysql_escape_mimic($content_Native_Title);
    $description_escaped = mysql_escape_mimic($content_Description);
    $title_escaped = mysql_escape_mimic($content_Title);
    $headerTo_escaped = mysql_escape_mimic($content_HeaderTo);
    $headerFrom_escaped = mysql_escape_mimic($content_HeaderFrom);
    $listName_escaped = mysql_escape_mimic($listName);
    $html_escaped = mysql_escape_mimic($content_HTML);
    $text_escaped = mysql_escape_mimic($content_Text);


    $sql = "INSERT INTO `emailGenerator` SET
`ContentID` = '$result_escaped',
`NativeTitle` = '$nativeTitle_escaped',
`Description` = '$description_escaped',
`Title` = '$title_escaped',
`HeaderTo` = '$headerTo_escaped',
`HeaderFrom` = '$headerFrom_escaped',
`ListName` = '$listName_escaped',
`DocPartText_Body` = '$text_escaped',
`DocPartHtml_Body` = '$html_escaped';";
    $update_result = mySqlQuery($sql);

    if ($update_result) {
//        echo 'Success inserting email row';
    } else {
        echo 'Error: ' . $conn->error;
    }
}




