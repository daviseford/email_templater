<?php 
//extract data from the post
extract($_POST);

$servername = "10.209.129.184";
$username = "testuser1";
$password = "Number24!";
$dbname = "testSchema";

$postData = $_POST;

$client = $_POST['client'];
$template = $_POST['template'];
$date = $_POST['datepicker'];

echo $date;
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT * FROM Templates WHERE clientCode = '$client' AND templateCode = '$template'";
$result = $conn->query($sql);

/*
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
*/
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Template URL: " . $row["templateURL"]. " RSS Feed: " . $row["rssFeedURL"]. " Client: ". $row["clientCode"]. "<br>";	
		
	$url = $row["templateURL"];
	$keycode = "sometussdsd";
	$utmStyle = "asdasdasd";
	
					$fields = array(					
						'storyPost' => $postData,
						'clientCode' => $client,
						'keycode' => $keycode,
						'utmStyle' => $utmStyle,
					);
					
					
					}
} else {
    echo "0 results";
}

//open connection
					$ch = curl_init();

					//set the url, number of POST vars, POST data
					curl_setopt($ch,CURLOPT_URL, $url);
					curl_setopt($ch,CURLOPT_POST, TRUE);
					curl_setopt($ch,CURLOPT_POSTFIELDS, json_encode($fields));

					//execute post
					$curlResult = curl_exec($ch);

					//close connection
					curl_close($ch);
					
$conn->close();	
					
					?>