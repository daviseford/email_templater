<?php 
/* Smartfocus Integration with Template Generator
 * This uses XML, cURL, a RESTful API, POST, 
 * MySQL queries, and Javascript/jQuery on the front end.
 *
 * Retrieving last five mailings from SmartFocus
 *
 * By Davis Ford, 08/2015
 */
 
//******************** SEND CREDENTIALS TO API AND GET TOKEN ****************\\
$userName = "wjmadigitalmedia";
$password = "Number24!";
$apiKey = "CdX7CrxR51yOlUlaWdYut5eCfBUrJsq5h0ntS5hXne54rkXC";

$loginURL = "http://p5apie.emv3.com/apiccmd/services/rest/connect/open/" . $userName . "/" . $password . "/" . $apiKey;

function download_page($path){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL,$path);
	curl_setopt($ch, CURLOPT_FAILONERROR,1);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION,1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
	curl_setopt($ch, CURLOPT_TIMEOUT, 15);
	$retValue = curl_exec($ch);			 
	curl_close($ch);
	return $retValue;
}

$sXML = download_page($loginURL);
$oXML = new SimpleXMLElement($sXML);

$token = $oXML->result;

//http://{server}/apireporting/services/ReportingService?wsdl


//********************** SEND AN EMAIL *******************************\\
function getReportAPI($token) {
	//https://api-help.campaigncommander.com/#CAMPAIGN_MANAGEMENT_SOAP-REST/REST/Create_Message_POST.htm%3FTocPath%3DCampaign%2520Management%2520-%2520REST%7CMessage%7C_____3

	// url we're posting to, appended with our access token        
	//$url = 'https://p5apie.emv3.com/apiccmd/services/rest/message/create/' . $token;
	
	//yyyy-MM-dd-HH:mm:ss
	$beginDate = '2015-08-15-23:59:00';
	$endDate = '2015-08-31-23:59:00';
	$url = 'http://p5apie.emv3.com/apireporting/services/rest/getAggregatedReportByDateRange/'.$token.'/'.$beginDate.'/'.$endDate;
	//https://{server}/apireporting/services/rest/getAggregatedReportByDateRange/{token}/{beginDate}/{endDate}
	$runReport = download_page($url);
	$oXML = new SimpleXMLElement($runReport);

	echo var_dump($runReport) . "<br />";
	echo $runReport . "<br />";
	echo var_dump($oXML) . "<br />";
	echo var_dump($oXML->result);
	
}
getReportAPI($token);
?>
