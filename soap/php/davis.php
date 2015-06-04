<?php

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

echo "<h3> Current version of API at " . $wsdl_location . " is: " . $api_version . "</h3>\n";

$content_Title = '';
$content_Description = '';
$content_HeaderTo = '';
$content_HeaderFrom = ''; //TODO: Add to MySQL table
$content_Text = '';
$content_HTML = '';

// Create Content
        print "Running CreateContent()\n";
        $DocPartText = array ('MimePartName' => 'text', 'Body' => 'This is text body of this content', 'Encoding' => '8bit', 'CharSetID' => 1);
        $DocPartHtml = array ('MimePartName' => 'html', 'Body' => '<HTML>This is <B>text </B> body of this <U>content</U></HTML>', 'Encoding' => '8bit', 'CharSetID' => 1);
        $DocParts = array ($DocPartText, $DocPartHtml);
        $contentStruct = array('NativeTitle' => 'This is content native title', 'Description' => 'This content description', 'Title' => 'This is content title', 'HeaderTo' => 'group@maileater.lyris.com', 'HeaderFrom' => 'sender@maileater.lyris.com', 'DocType' => 'CONTENTv2', 'DocParts' => $DocParts, 'ListName' => 'alpac_master');

        $result = $lmapi->CreateContent($contentStruct);
                print "CreateContent result: ".var_dump($result) ;

                print "Running UpdateContent()\n";
                $contentStruct = array ('ContentID' => (int)$result, 'Description' => 'Modified description of the content', 'Title' => 'Modified content title');
		
// echo var_dump($lmapi->CreateContent());

?>
