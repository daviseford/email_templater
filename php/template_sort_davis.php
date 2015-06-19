<?php 
//extract data from the post
extract($_POST);

$servername = "10.209.129.184";
$username = "testuser1";
$password = "Number24!";
$dbname = "testSchema";


$client = $_POST['client'];
$template = $_POST['template'];
$date = $_POST['datepicker'];
$advertisement = $_POST['advertisement'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT * FROM Templates WHERE clientCode = '$client' AND templateCode = '$template'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
		/*
        echo "id: " . $row["id"]. " - Template URL: " . $row["templateURL"]. " RSS Feed: " . $row["rssFeedURL"]. " Client: ". $row["clientCode"]. "<br>";	
		*/
		
	$url = $row["templateURL"];
	$keycode = $date . $client . $template . $advertisement;
	$utmStyle = "asdasdasd";
	
					$fields = array(		
						'subscribeLink' => $row["subscribeLink"],
						'unsubscribeLink' => $row["unsubscribeLink"],
						'viewInBrowser' => $row["viewInBrowser"],
						'privacyPolicyLink' => $row["privacyPolicyLink"],
						'defaultLogo' => $row["defaultLogo"],
						'imageMaxWidth' => $row["imageMaxWidth"],
						'imageMaxHeight' => $row["imageMaxHeight"],
						'clientCode' => $client,
						'keycode' => $keycode,
						'utmStyle' => $utmStyle,
					);
					$mergedPOST = array_merge($_POST, $fields);
					
					
					}
} else {
	//TODO: error handling here later
}

					//open connection
					$ch = curl_init();

					//set the url, number of POST vars, POST data
					curl_setopt($ch,CURLOPT_URL, $url);
					curl_setopt($ch,CURLOPT_POST, TRUE);
					curl_setopt($ch,CURLOPT_MAXREDIRS, 0);
					curl_setopt($ch,CURLOPT_FOLLOWLOCATION, 0); //anti-redirect
					//pass our merged array to the template file. it handles the data from there.
					curl_setopt($ch,CURLOPT_POSTFIELDS, $mergedPOST);

					//execute post
					$curlResult = curl_exec($ch);

					curl_close($ch);
					
					$conn->close();	


					echo json_encode($curlResult);
					
					?>