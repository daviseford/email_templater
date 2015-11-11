<?php
/* Common DMS and MySQL Functions that I don't want to repeat. */

/* ------ MYSQL FUNCTIONS------
 * function mySqlQuery($query) - returns the result of a SQL statement. Connects to testSchema
 * function mysql_escape_mimic($inp) - returns a mysql-safe string
 *
 */

/* STRING FUNCTIONS
 *
 *  encodeToUtf8($string)
 *  encodeToIso($string)
 */

/*
 * Connect to testSchema and execute a query
 * Returns the query result
 */

function mySqlQuery($query)
{
    $servername = 'testprocess.db';
    $username = "testuser1";
    $password = "Number24!";
    $dbname_testSchema = "testSchema";

    $conn = new mysqli($servername, $username, $password, $dbname_testSchema);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $result = $conn->query($query);

    $conn->close();

    return $result;
}

/* DMS-RELATED FUNCTION */
function returnLmapiClient()
{
    $wsdl_location = 'http://econnect.dmsgs.com:82/?wsdl';
    $userName = 'dford@wjmassociates.com';
    $password = 'dfwjmdms4';

// Pull in the NuSOAP code
    if (PHP_VERSION >= 5)
        require_once('lib/nusoap_php5.php');
    else
        require_once('lib/nusoap_php4.php');

// create client
    if (PHP_VERSION >= 5)
        $lmapiClient = new nusoapclient($wsdl_location, true);
    else
        $lmapiClient = new soapclient($wsdl_location, true);


//set basic authentication
    $lmapiClient->setCredentials($userName, $password, 'basic');

//make sure there was no error.
    $err = $lmapiClient->getError();
    if ($err) {
        echo "<h2>Error</h2><pre> $err <hr> $lmapiClient->debug_str;\n\n";
        return false;
    }

    $lmapi = $lmapiClient->getProxy();

    //set basic authentication
    $lmapi->setCredentials($userName, $password, 'basic');

    return $lmapi;
}

function mysql_escape_mimic($inp)
{
    if (is_array($inp))
        return array_map(__METHOD__, $inp);

    if (!empty($inp) && is_string($inp)) {
        return str_replace(array('\\', "\0", "\n", "\r", "'", '"', "\x1a"), array('\\\\', '\\0', '\\n', '\\r', "\\'", '\\"', '\\Z'), $inp);
    }

    return $inp;
}

function encodeToUtf8($string)
{
    return mb_convert_encoding($string, "UTF-8", mb_detect_encoding($string, "UTF-8, ISO-8859-1, ISO-8859-15", true));
}

function encodeToIso($string)
{
    return mb_convert_encoding($string, "ISO-8859-1", mb_detect_encoding($string, "UTF-8, ISO-8859-1, ISO-8859-15", true));
}