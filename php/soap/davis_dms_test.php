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

$yesterday = date("Y-m-d", strtotime('-4 days'));

$date = $yesterday; //standard format = '2015-08-26'

$ar = array("ListName = alpac_master", "DateCreated > $date");
$trackingArray = "21898528";
        $result = $lmapi->SelectContent($ar);
		
		
		if (count($result) > 0) {
    		// output data of each row
			echo "Emails Returned: " . count($result) . "<br />";
    		foreach($result as $value) {
				echo "--------------------------<br />";
				echo "ContentID: " . $value["ContentID"] . "<br />";
				//echo "tracking summary: " . var_dump($lmapi->TrackingSummary($trackingArray)) . "<br />";
				//echo "sql: " . var_dump($lmapi->SqlStatement("SELECT *")) . "<br />";
        		echo "Description: " . $value["Description"] . "<br />";
				echo "NativeTitle: " . $value["NativeTitle"] . "<br />";
				echo "DateCreated: " . $value["DateCreated"] . "<br />";
    		}
		} else {
    		echo "0 results";
		}
				
       echo var_dump($result) . "<br />";
		

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>

<body>
</body>
</html>
