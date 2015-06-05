<?php
//POST SECTION -- SETTING UP DATA FOR USE BELOW -- REFINE LATER //
$post = file_get_contents('php://input'); 	//workaround for $_POST, this data arrives in the form of a URL
$postdec = json_decode($post, true);


$wsdl_location = 'http://econnect.dmsgs.com:82/?wsdl';
$userName = 'dford@wjmassociates.com';
$password = 'dfwjmdms4';

// Pull in the NuSOAP code
if ( PHP_VERSION >= 5 )
  require_once('lib/nusoap_php5.php');
else
  require_once('lib/nusoap_php4.php');



// create client
if ( PHP_VERSION >= 5 )
  $lmapiClient = new nusoapclient( $wsdl_location, true );
else
  $lmapiClient = new soapclient( $wsdl_location, true );


//set basic authentication
$lmapiClient->setCredentials($userName,$password, 'basic');

//make sure there was no error.
$err= $lmapiClient->getError();
if ($err) {
  echo "<h2>Error</h2><pre> $err <hr> $lmapiClient->debug_str;\n\n";
  return false;
}

$lmapi = $lmapiClient->getProxy();

//set basic authentication
$lmapi->setCredentials($userName,$password, 'basic');

//echo "<h3> Current version of API at " . $wsdl_location . " is: " . $api_version . "</h3>\n";


$clientCode = $postdec["clientCode"]; //e.g. ALPAC
$html = $postdec["html"];  //html contents of email
$keycode = $postdec["keycode"]; //keycode
$title = $postdec["title"];

$servername = "10.209.129.184";
$username = "testuser1";
$password = "Number24!";
$dbname = "testSchema";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT * FROM DMS WHERE clientCode = '$clientCode'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {		
			
		$listName = $row["listName"];
		$headerTo = $row["headerTo"];
		$headerFrom = $row["headerFrom"];	
			
	}
} else {
	//TODO: error handling here later
}

// Include the class definition file.
require_once('class.html2text.inc');

// Instantiate a new instance of the class. Passing the string
// variable automatically loads the HTML for you.
$h2t =& new html2text($postdec["html"]);

// Simply call the get_text() method for the class to convert
// the HTML to the plain text. Store it into the variable.


$content_Title = $keycode;					//title = keycode
$content_Native_Title = $postdec["title"]; 	//Necessary? Probably not.
$content_Description = $keycode; 			//cannot be NULL or empty
$content_HeaderTo = $headerTo;
$content_HeaderFrom = $headerFrom; 	//TODO: Add to MySQL table
$content_HTML = $postdec["html"];
$content_Text = $h2t->get_text(); 	// Simply call the get_text() method for the class to convert
									// the HTML to the plain text. Store it into the variable.
//$content_Text = 'some text';
$list_Name = $listName;

// Create Content
        //print "Running CreateContent()\n";
        $DocPartText = array ('MimePartName' => 'text', 'Body' => $content_Text, 'Encoding' => '8bit', 'CharSetID' => 1);
        $DocPartHtml = array ('MimePartName' => 'html', 'Body' => $content_HTML, 'Encoding' => '8bit', 'CharSetID' => 1);
        $DocParts = array ($DocPartText, $DocPartHtml);
        $contentStruct = array('NativeTitle' => $content_Native_Title, 'Description' => $content_Description, 'Title' => $content_Title, 'HeaderTo' => $content_HeaderTo, 'HeaderFrom' => $content_HeaderFrom, 'DocType' => 'CONTENTv2', 'DocParts' => $DocParts, 'ListName' => $list_Name);

        $result = $lmapi->CreateContent($contentStruct);
                echo "CreateContent result: ".$result;

                //print "Running UpdateContent()\n";
                $contentStruct = array ('ContentID' => (int)$result, 'Description' => 'Modified description of the content', 'Title' => 'Modified content title');
		
// echo var_dump($lmapi->CreateContent());

?>
