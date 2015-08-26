<?php

require 'Fastimage.php'; //for checking image dimensions
							//https://github.com/tommoor/fastimage

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

$description = $_POST["description"];
$clientCode = $_POST["clientCode"];
$imgURL = $_POST["imgURL"];
$adURL = $_POST["adURL"];


$image = new FastImage($imgURL);
list($width, $height) = $image->getSize();

function mysql_escape_mimic($inp) { 
    if(is_array($inp)) 
        return array_map(__METHOD__, $inp); 

    if(!empty($inp) && is_string($inp)) { 
        return str_replace(array('\\', "\0", "\n", "\r", "'", '"', "\x1a"), array('\\\\', '\\0', '\\n', '\\r', "\\'", '\\"', '\\Z'), $inp); 
    } 

    return $inp; 
} 

$imgURL_SQL = '"'.mysql_escape_mimic($imgURL).'"';
$adURL_SQL = '"'.mysql_escape_mimic($adURL).'"';
$description_SQL = '"'.mysql_escape_mimic($description).'"';
$clientCode_SQL = '"'.mysql_escape_mimic($clientCode).'"';

$sql = "INSERT INTO Advertisements (image_url, image_width, image_height, ad_url, description, clientCode)
VALUES ($imgURL_SQL, $width, $height, $adURL_SQL, $description_SQL, $clientCode_SQL)";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

//find the MySQL row, e.g. ALPAC
/*
$sql = "SELECT * FROM SmartFocus WHERE clientCode = '$clientCode'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {				
		$headerTo = $row["headerTo"];
		$headerFrom = $row["headerFrom"];	
		$replyTo = $row["replyTo"];
		$replyToEmail = $row["replyToEmail"];			
	}
} else {
	//TODO: error handling here later
}
*/

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>

<body>


Image URL:  <?php echo $_POST["imgURL"]; ?><br />
Ad URL: <?php echo $_POST["adURL"]; ?><br />
Dimensions: <?php echo $width . "x" . $height ?>


</body>
</html>