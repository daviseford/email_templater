<?php

include('dms_mysql_functions.php'); //common mysql and dms functions

//find the MySQL row, e.g. ALPAC
$sql = "SELECT * FROM emailGenerator WHERE id = '3' LIMIT 1";
$result = mySqlQuery($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $html = $row["DocPartHtml_Body"];
    }
} else {
    //TODO: error handling here later
}

echo json_encode($html);




