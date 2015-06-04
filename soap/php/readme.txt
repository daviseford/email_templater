You can find example code written in PHP showing the usage of ListManager's API functions in the soap directory available at :

                http://yourlistmanagerurl/soap
 

Your ListManager installation includes the example code as well as the required NuSoap library.

To use the client example code:
 

1. Download your packed example code from http://yourlistmanagerurl/soap/php.zip.
2. Unpack the ZIP file to a web-accessible directory on a PHP-enabled webserver (e.g., Apache, IIS).  For example, create a lmapiTest directory in your /var/www/html/ path, and then unpack files there.

Notes

    * The built-in ListManager webservice is not suitable for PHP integration. For assistance with choosing or installing a PHP webserver implementation, please refer to http://www.php.net/
    * Packed NuSoap library can also be found at http://yourlistmanagerurl/soap/php/nusoap-0.6.7.zip
 

Your directory structure after unpacking should look like the one below:

lmapiTest/php/
|
|_ lmapiTest.php
|_ readme.txt
|_ lib/
|_ samples/


3. To run your script, point your browser to the location:

                http://yourlistmanagerurl/lmapiTest/php/lmapiTest.php
 

If you are using php as a standalone, run
 

php lmapiTest.php

 
4. The following code snippet is a minimal client script for PHP. To test the code below, change the value “youradminname” to your admin name and the value “yourlyrispassword” to your password . This code connects you to your local ListManager server and retrieves the current API version.
 

---------CUT HERE----------


<?php

$wsdl_location = 'http://econnect.dmsgs.com:82/?wsdl';
$userName = 'youradminname';
$password = 'yourlyrispassword';

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

?>

