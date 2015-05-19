<?php 
/*
Author: Davis Ford
Date: May 2015
Purpose: Interprets which template is requested from POST data, retrieves advertisement info from MySQL, and returns the result to the ad template that called it.
*/

$post = file_get_contents('php://input'); //workaround for $_POST, this data arrives in the form of a URL
$postdec = json_decode($post, true);

$clientCode = $postdec["clientCode"];
$keycode = $postdec["keycode"];
$utmStyle = $postdec["utmStyle"]; //?

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

$sql = 'SELECT * FROM Advertisements WHERE clientCode = "'.$clientCode.'"';
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
	if ($row["clientCode"] = $clientCode) {
		$adArray = array (
			"id" => $row["id"],
			"image_url" => $row["image_url"],
			"image_width" => $row["image_height"],
			"image_height" => $row["image_height"],
			"ad_url" => $row["ad_url"],
			"alt_text" => $row["alt_text"],
			"clientCode" => $row["clientCode"],
			"clientName" => $row["clientName"],
			"responsive" => $row["responsive"],
		);
	} else {
    echo "0 results";
}
}

$conn->close();	

//if the ad is marked non-responsive, add css to hide on mobile
if($adArray["responsive"] == 0){
	$responsive_insert = "hide-on-responsive";
} else {
	$responsive_insert = "";
}


?>
<!-- START <?php echo $adArray["clientCode"]; ?> -->
<td align="center" class="sf-img sf-td <?php echo $responsive_insert; ?>" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding: auto; text-align: center; font-size: 8pt; font-style: italic;">
    <em>Sponsored Message</em>
    <br />
    <center>
        <a href="<?php echo $adArray["ad_url"]; ?>" target="_new">
            <img src="<?php echo $adArray["image_url"]; ?>" alt=<?php echo $adArray["alt-text"]; ?> class="no-scale" width="<?php echo $adArray["image_width"]; ?>" height="<?php echo $adArray["image_height"]; ?>" align="center" style="display: block; width: <?php echo $adArray["image_width"].'px'; ?>; max-width: <?php echo $adArray["image_width"].'px'; ?>; height: <?php echo $adArray["image_height"].'px'; ?>; border: 0px solid #ffffff; border-radius: 0px;" />
        </a>
    </center>
</td>
<!-- END <?php echo $adArray["clientCode"]; ?> -->
