<?php
/* Smartfocus Integration with Template Generator
 * This uses XML, cURL, a RESTful API, POST, 
 * MySQL queries, and Javascript/jQuery on the front end.
 * The user will be able to send a fully responsive email 
 * to the Smartfocus API with all of the normal issues taken care of.
 * version 0.1
 * By Davis Ford, 08/2015
 */

//******************** SEND CREDENTIALS TO API ****************\\
$userName = "wjmadigitalmedia";
$password = "Number24!";
$apiKey = "CdX7CrxR51yOlUlaWdYut5eCfBUrJsq5h0ntS5hXne54rkXC";

$loginURL = "http://p5apie.emv3.com/apiccmd/services/rest/connect/open/" . $userName . "/" . $password . "/" . $apiKey;

function download_page($path)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $path);
    curl_setopt($ch, CURLOPT_FAILONERROR, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    $retValue = curl_exec($ch);
    curl_close($ch);
    return $retValue;
}

$sXML = download_page($loginURL);
$oXML = new SimpleXMLElement($sXML);

$token = $oXML->result;

//********************** PROCESS POST *******************************\\
//POST SECTION -- SETTING UP DATA FOR USE BELOW -- REFINE LATER //
$post = file_get_contents('php://input');    //workaround for $_POST, this data arrives in the form of a URL
$postdec = json_decode($post, true);

$clientCode = $postdec["clientCode"]; //e.g. ALPAC
$html = $postdec["html"];  //html contents of email

$servername = "testprocess.db";
$username = "testuser1";
$password = "Number24!";
$dbname = "testSchema";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//find the MySQL row, e.g. ALPAC
$sql = "SELECT * FROM SmartFocus WHERE clientCode = '$clientCode'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $headerTo = $row["headerTo"];
        $headerFrom = $row["headerFrom"];
        $replyTo = $row["replyTo"];
        $replyToEmail = $row["replyToEmail"];
    }
} else {
    //TODO: error handling here later
}

function encodeToUtf8($string)
{
    return mb_convert_encoding($string, "UTF-8", mb_detect_encoding($string, "UTF-8, ISO-8859-1, ISO-8859-15", true));
}

function encodeToIso($string)
{
    return mb_convert_encoding($string, "ISO-8859-1", mb_detect_encoding($string, "UTF-8, ISO-8859-1, ISO-8859-15", true));
}

//conversion, may mess with this
$htmlConvert = $postdec["html"];
$titleConvert = $postdec["title"];

//all credit to http://www.chuggnutt.com/html2text-source for the html to text conversion
//I slightly modified it to remove the url generator, as it was giving links to my private blog!
// Include the class definition file.
require_once('class.html2text.inc');

// Instantiate a new instance of the class. Passing the string
// variable automatically loads the HTML for you.
$h2t =& new html2text($htmlConvert);


$content_Title = $postdec["keycode"];        //title = keycode
$content_Native_Title = $titleConvert;
$content_Description = $postdec["keycode"];    //cannot be NULL or empty
$content_HeaderTo = $headerTo;
$content_HeaderFrom = $headerFrom;
$content_HTML = $htmlConvert;
$content_ReplyTo = $replyTo;
$content_ReplyToEmail = $replyToEmail;
$content_Text = $h2t->get_text();    //Simply call the get_text() method for the class to
//convert the HTML to the plain text.
//Store it into the variable.


//********************** CREATE AN EMAIL *******************************\\


// Assembling the XML string that we'll forward to Smartfocus API
$input_XML = '<message>
  					<type>email</type>
  					<body>[EMV TEXTPART]' . $content_Text . ' [EMV HTMLPART]<![CDATA[' . $content_HTML . ']]></body>
  					<isBounceback>false</isBounceback>
  					<description>' . $content_Title . '</description>
  					<encoding>UTF-8</encoding>
  					<from>' . $content_ReplyTo . '</from>
					<fromEmail>' . $content_HeaderFrom . '</fromEmail>
  					<name>' . $content_Title . '</name>
  					<replyTo>' . $content_ReplyTo . '</replyTo>
  					<replyToEmail>' . $content_ReplyToEmail . '</replyToEmail>
  					<subject>' . $content_Native_Title . '</subject>
  					<to>' . $content_HeaderTo . '</to>
  					<hotmailUnsubFlg>true</hotmailUnsubFlg>
  					<hotmailUnsubUrl>http://www.smartfocus.com</hotmailUnsubUrl>
				</message>';

//********************** SEND AN EMAIL *******************************\\
function CreateEmailAPI($token, $input_XML)
{
    //https://api-help.campaigncommander.com/#CAMPAIGN_MANAGEMENT_SOAP-REST/REST/Create_Message_POST.htm%3FTocPath%3DCampaign%2520Management%2520-%2520REST%7CMessage%7C_____3

    // url we're posting to, appended with our access token
    $url = 'https://p5apie.emv3.com/apiccmd/services/rest/message/create/' . $token;

    // create our curl handler
    $ch = curl_init($url);

    // set our options
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0); //ssl stuff
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/xml; charset=UTF-8'));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $input_XML);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    //sending this curl request creates the email in smartfocus
    // your return response
    $output = curl_exec($ch);

    // close the curl handler
    curl_close($ch);

    return $output;
}

//create an email
//echo CreateEmailAPI($token, $input_XML);
$createEmail = CreateEmailAPI($token, $input_XML);
$result_XML = new SimpleXMLElement($createEmail);

$emailID = $result_XML->result; //should add some error handling here? shouldn't fail, to be honest


//********************** TRACK LINKS *******************************\\
function trackLinks($token, $emailID)
{
    //auto-track all links
    //https://{server}/apiccmd/services/rest/message/trackAllLinks/{token}/{id}
    //https://api-help.campaigncommander.com/#CAMPAIGN_MANAGEMENT_SOAP-REST/REST/Track_All_Links.htm%3FTocPath%3DCampaign%2520Management%2520-%2520REST%7CMessage%7C_____16
    $trackLinks = download_page('https://p5apie.emv3.com/apiccmd/services/rest/message/trackAllLinks/' . $token . '/' . $emailID);
    $result_XML = new SimpleXMLElement($trackLinks);
    return $result_XML->result;
}


//********************** SEND TEST TO GROUP MEMBERS *******************************\\
//https://api-help.campaigncommander.com/#CAMPAIGN_MANAGEMENT_SOAP-REST/REST/Test_Email_Message_by_Group.htm%3FTocPath%3DCampaign%2520Management%2520-%2520REST%7CMessage%7C_____24
//segment id: 1911739
//https://{server}/apiccmd/services/rest/message/testEmailMessageByGroup/{token}/{id}/{groupId}/{campaignName}/{subject}/{part}

function sendTestEmail($token, $emailID, $groupID, $campaignName, $subject, $part = 'HTML')
{
    $sendAPIRequest = download_page('https://p5apie.emv3.com/apiccmd/services/rest/message/testEmailMessageByGroup/' . $token . '/' . $emailID . '/' . $groupID . '/Test/' . $subject . '/HTML');
    return var_dump($sendAPIRequest);
}

//sendTestEmail($token, $emailID, '1911739', 'TestCampaign', $content_Native_Title, 'HTML');


//********************** RETURN RESULTS *******************************\\
echo 'Links Tracked: ' . trackLinks($token, $emailID) . "\n";
echo 'Email ID: ' . $emailID . "\n";    //returns the number of the email created in SmartFocus
echo 'Token: ' . $token . "\n";
echo 'Send Test Result: ' . sendTestEmail($token, $emailID, '1911739', 'TestCampaign', $content_Native_Title, 'HTML');
?>
