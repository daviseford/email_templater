<?php
include('simple_html_dom.php'); //http://sourceforge.net/projects/simplehtmldom/files/ 
$ad_Enabled = 'true';

//extract data from the post
extract($_POST);

echo $_POST['keycode'];

function resizeImage($imgurl){
	list($origW, $origH) = getimagesize($imgurl);
	//give us proper email sizes if we're given the right JSON values
	$tmplW = 148;  //maximum dimensions for the template
	$tmplH = 148;
	
	if ($origW > $tmplW && $origW >= $origH) {
		$ratio = $tmplW / $origW; //get ratio for scaling image
		$fixedHeight = floor($origH * $ratio);
		$fixedWidth = $tmplW;	
	} else if ($origH > $tmplH) {
		$ratio = $tmplH / $origH; //get ratio for scaling image
		$fixedHeight = $tmplH;
		$fixedWidth = floor($origW * $ratio);	
	}
	$imageInfo = array(
		"src" => $imgurl,				//alt property
		"width" => $origW,				//width
		"height" => $origH,				//height
		"fixedHeight" => $fixedHeight,	//not used yet
		"fixedWidth" => $fixedWidth,
	);
	return $imageInfo;
	}


//echo header('Content-type: application/json; charset=utf-8');
//echo json_encode($storageArray, true);  

//$filename = "lol.html";
//
//header("Cache-Control: public");
//header("Content-Description: File Transfer");
//header("Content-Disposition: attachment; filename=$filename");
//header("Content-Type: application/octet-stream; "); 
//header("Content-Transfer-Encoding: binary");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html style="margin: 0;padding: 0;">
<head>
<!-- SUBJECT LINE: {{:smartFocus.title}} -->
<!-- KEYCODE: {{:smartFocus.keycode}} -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>{{:smartFocus.title}}</title>
<style type="text/css">
.p {
	color: #000000;
	font-family: Verdana, Geneva, sans-serif;
	font-size: 16px;
	mso-line-height-rule: exactly;
	line-height: 1.14em;
	font-weight: normal;
	font-style: normal;
	text-transform: none;
	margin-top: 0.5em;
	margin-left: 0;
	margin-right: 0;
	margin-bottom: 0.5em;
	padding: 0;
}
 @media only screen and (max-width: 640px) {
table.sf-main, td.sf-main, table.sf-cont, td.sf-cont {
	width: 100% !important;
	max-width: 100% !important;
	min-width: 100% !important;
	padding: 0 !important;
}
}
 @media only screen and (max-width: 640px) {
tr:not(.noresp) > td.sf-td {
	display: block !important;
	width: auto !important;
	height: auto !important;
	min-width: initial !important;
	max-width: initial !important;
	clear: both;
}
}
 @media only screen and (max-width: 640px) {
tr.noresp > td.sf-td {
	display: table-cell !important;
}
}
 @media only screen and (max-width: 640px) {
td.sf-img img {
	max-width: 100% !important;
	padding: 0 !important;
	box-sizing: border-box;
}
}
 @media only screen and (max-width: 640px) {
td.sf-img img:not(.no-scale) {
	width: 100% !important;
	min-width: 100% !important;
	height: auto !important;
}
}
 @media only screen and (max-width: 640px) {
td.sf-video table, td.sf-video td {
	width: 100% !important;
	min-width: 100% !important;
}
}
 @media only screen and (max-width: 640px) {
img.sf-video-thumbnail {
	width: 100% !important;
	height: auto !important;
}
}
 @media only screen and (max-width: 640px) {
td.sf-html table, td.sf-html td, td.sf-html img {
	height: auto !important;
	max-width: 100% !important;
	padding: 0 !important;
	width: auto !important;
	display: block !important;
}
}
 @media only screen and (max-width: 640px) {
td.sf-img, td.sf-video {
	padding: 0 !important;
	width: 100% !important;
}
}
 @media only screen and (max-width: 640px) {
table.sf-share img {
	width: 22px !important;
	height: auto !important;
}
}
 @media only screen and (max-width: 640px) {
td.sf-share {
	display: table-cell !important;
}
}
 @media only screen and (max-width: 640px) {
td.sf-share-icon {
	width: 22px !important;
}
}
 @media only screen and (max-width: 640px) {
table.sf-text-image table {
	border-spacing: 10px !important;
}
}
 @media only screen and (max-width: 640px) {
table.hide-on-responsive, tr:not(.noresp) > td.sf-td.hide-on-responsive, tr.noresp > td.sf-td.hide-on-responsive {
	display: none !important;
}
}
 @media only screen and (max-width: 640px) {
table.sf-reco img {
	display: block;
}
}
</style>
</head>
<body style="margin: 0;padding: 0;">
<table class="sf-main" border="0" cellpadding="0" cellspacing="0" width="100%" style="height: 100%; background: #f2f2f2; table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
  <tr>
    <td class="sf-main" align="center" valign="top" style="padding: 40px 20px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><table class="sf-cont" border="0" cellpadding="0" cellspacing="0" width="600" style="min-width: 600px; max-width: 600px; width: 600px; table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
        <tr>
          <td class="sf-cont" width="600" style="min-width: 600px; width: 600px; text-align: left; background: #ffffff; padding: 0px; border: 1px solid #bcbcbc; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><!-- BEGIN TEXT HEADER BLOCK -->
            
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent;" bgcolor="#ffffff">
              <tr>
                <td class="sf-td" valign="top" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent; width: 50%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <tr>
                      <td class="sf-html sf-td hide-on-responsive" style="padding: 13px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><p style="color: #a1a1a1;font-family: Verdana, Geneva, sans-serif;font-size: 12px;mso-line-height-rule: exactly;line-height: 1.14em;font-weight: normal;font-style: normal;text-transform: none;margin-top: 0.5em;margin-left: 0;margin-right: 0;margin-bottom: 0.5em;padding: 0;">The Latest From American Liberty PAC</p></td>
                    </tr>
                  </table></td>
                <td class="sf-td" valign="top" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent; width: 50%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <tr>
                      <td class="sf-html sf-td" style="padding: 13px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><p style="color: #71C6F0;font-family: Verdana, Geneva, sans-serif;font-size: 12px;mso-line-height-rule: exactly;line-height: 1.14em;font-weight: normal;font-style: normal;text-transform: none;margin-top: 0.5em;margin-left: 0;margin-right: 0;margin-bottom: 0.5em;padding: 0;text-align:right;"><a style="background-color: transparent;color: #71c6f0;font-family: Verdana, Geneva, sans-serif;font-size: 12px;font-weight: normal;font-style: normal;text-transform: none;text-decoration: underline;" target="_blank" href="&&&">View this email in your browser</a><br />
                        </p></td>
                    </tr>
                  </table></td>
              </tr>
            </table>
            
            <!-- END TEXT HEADER BLOCK --> 
            
            <!-- BEGIN BANNER BLOCK -->
            
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent;">
              <tr>
                <td class="sf-td" valign="top" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent; width: 100%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" align="left" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <tr>
                      <td align="left" class="sf-img sf-td" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding: auto;"><img src="http://p5tre.emv3.com/IL/0/0/1/1101054001/1686937737.gif" alt="320065854" width="598" height="112" align="center" style="display: block; width: 598px; max-width: 598px; height: 112px; border: 0px solid #ffffff; border-radius: 0px;" /></td>
                    </tr>
                  </table></td>
              </tr>
            </table>
            
            <!-- END BANNER BLOCK -->
            
            <?php if( isset($_POST['title1']) && $_POST['title1'] != ""): ?>
            
            <!-- START ALPACDBIMG1 -->
            
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent;">
              <tr>
                <td class="sf-td" valign="top" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent; width: 75%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <tr>
                      <td class="sf-html sf-td" style="padding: 13px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><h2 style="color: #000000;font-family: Verdana, Geneva, sans-serif;font-size: 20px;mso-line-height-rule: exactly;line-height: 1.14em;font-weight: bold;font-style: normal;text-transform: none;background-color: transparent;margin-top: 0.5em;margin-left: 0;margin-right: 0;margin-bottom: 0.5em;"> <a target="_blank" style="background-color: transparent;color: #0000FF;font-family: Verdana, Geneva, sans-serif;font-size: 16px;font-weight: bold;font-style: normal;text-transform: none;text-decoration: underline;" href="<?php echo $_POST["title1URL"] . $_POST["utm"]; ?>"> <?php echo $_POST["title1"]; ?> </a> </h2>
                        <span style="color: #000000;font-family: Verdana, Geneva, sans-serif;font-size: 16px;mso-line-height-rule: exactly;line-height: 1.14em;font-weight: normal;font-style: normal;text-transform: none;margin-top: 0.5em;margin-left: 0;margin-right: 0;margin-bottom: 0.5em;padding: 0;"> 
                        <!-- BEGIN STORY --> 
                        <?php echo $_POST['storyPost']["title1text-div"]; ?> 
                        <?php echo $_POST["title1text-div"]; ?> 
                        <!-- END STORY --> 
                        </span> <br /></td>
                    </tr>
                  </table></td>
                <td class="sf-td hide-on-responsive" valign="top" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent; width: 25%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" align="left" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <tr>
                      <td align="left" class="sf-img sf-td" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding: auto;"><center>
                          <br />
                          <br />
                          <a href="<?php echo $_POST["title1URL"]; ?>" target="_blank">
                          <?php 
						   $title1resize = resizeImage($_POST["title1IMG"]);
						   $title1FixedW = $title1resize["fixedWidth"];
						   $title1FixedH = $title1resize["fixedHeight"];
						   ?>
                          <img class="no-scale" align="middle" src="<?php echo $_POST["title1IMG"]; ?>" alt="<?php echo $_POST["title1"]; ?>" height="<?php echo $title1FixedH ?>" width="<?php echo $title1FixedW ?>" style="width: <?php echo $title1FixedW.'px'; ?>; max-width: <?php echo $title1FixedH.'px'; ?>; height: <?php echo $title1FixedH.'px'; ?>"/> </a>
                        </center></td>
                    </tr>
                  </table></td>
              </tr>
            </table>
            
            <!-- END ALPACDBIMG1 -->
            
            <?php else: ?>
            
            <!-- TITLE1 NOT SET! -->
            
            <?php endif; ?>
            <?php if( isset($_POST['title2']) && $_POST['title2'] != ""): ?>
            
            <!-- START ALPACDBIMG2 -->
            
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent;">
              <tr>
                <td class="sf-td" valign="top" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent; width: 75%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <tr>
                      <td class="sf-html sf-td" style="padding: 13px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><h2 style="color: #000000;font-family: Verdana, Geneva, sans-serif;font-size: 20px;mso-line-height-rule: exactly;line-height: 1.14em;font-weight: bold;font-style: normal;text-transform: none;background-color: transparent;margin-top: 0.5em;margin-left: 0;margin-right: 0;margin-bottom: 0.5em;"> <a target="_blank" style="background-color: transparent;color: #0000FF;font-family: Verdana, Geneva, sans-serif;font-size: 16px;font-weight: bold;font-style: normal;text-transform: none;text-decoration: underline;" href="<?php echo $_POST["title2URL"] . $_POST["utm"]; ?>"> <?php echo $_POST["title2"]; ?> </a> </h2>
                        <span style="color: #000000;font-family: Verdana, Geneva, sans-serif;font-size: 16px;mso-line-height-rule: exactly;line-height: 1.14em;font-weight: normal;font-style: normal;text-transform: none;margin-top: 0.5em;margin-left: 0;margin-right: 0;margin-bottom: 0.5em;padding: 0;"> 
                        <!-- BEGIN STORY --> 
                        <?php echo $_POST["title2text-div"]; ?> 
                        <!-- END STORY --> 
                        </span> <br /></td>
                    </tr>
                  </table></td>
                <td class="sf-td hide-on-responsive" valign="top" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent; width: 25%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" align="left" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <tr>
                      <td align="left" class="sf-img sf-td" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding: auto;">
                      <?php if( isset($_POST['title2IMG']) && $_POST['title2IMG'] != "" ): ?>
                      <center>
                          <br />
                          <br />
                          <a href="<?php echo $_POST["title2URL"]; ?>" target="_blank">
                          <?php 
						   $title2resize = resizeImage($_POST["title2IMG"]);
						   $title2FixedW = $title2resize["fixedWidth"];
						   $title2FixedH = $title2resize["fixedHeight"];
						   ?>
                          <img class="no-scale" align="middle" src="<?php echo $_POST["title2IMG"]; ?>" alt="<?php echo $_POST["title2"]; ?>" height="<?php echo $title2FixedH ?>" width="<?php echo $title2FixedW ?>" style="width: <?php echo $title2FixedW.'px'; ?>; max-width: <?php echo $title2FixedH.'px'; ?>; height: <?php echo $title2FixedH.'px'; ?>"/> </a>
                        </center>
                        <?php endif; ?>
                        </td>
                    </tr>
                  </table></td>
              </tr>
            </table>
            
            <!-- END ALPACDBIMG2 -->
            
            <?php else: ?>
            
            <!-- TITLE2 NOT SET! -->
            
            <?php endif; ?>
            
            <!-- TODO - Add "if Post[ad] isset -->
            <!-- BEGIN PRODUCT BLOCK -->
            
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent;">
              <tr>
                <td class="sf-td" valign="top" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent; width: 100%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" align="center" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; margin: auto;">
                    <tr>
                      <?php 	
					  if($ad_Enabled == 'true'){	
					  /*
					  $clientCode = $_POST["clientCode"];	//implement eventually
					  $keycode = $_POST["keycode"];			//implement eventually
					  $utmStyle = $_POST["utmStyle"];		//implement eventually
					  */
					$clientCode = "AAC1";
					$keycode = "SAMPLEKEYCODE";
					$utmStyle = "";
$url = 'http://daviseford.com/sites/default/files/email_templater/php/ad_image_template.php';
					$fields = array(
						'clientCode' => $clientCode,
						'keycode' => $keycode,
						'utmStyle' => $utmStyle,
					);
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
					} else {}
					?>
                    </tr>
                  </table></td>
              </tr>
            </table>
            
            <!-- END PRODUCT BLOCK -->
            
            <?php if( isset($_POST['title3']) && $_POST['title3'] != "" ): ?>
            
            <!-- START ALPACDBIMG3 -->
            
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent;">
              <tr>
                <td class="sf-td" valign="top" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent; width: 75%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <tr>
                      <td class="sf-html sf-td" style="padding: 13px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><h2 style="color: #000000;font-family: Verdana, Geneva, sans-serif;font-size: 20px;mso-line-height-rule: exactly;line-height: 1.14em;font-weight: bold;font-style: normal;text-transform: none;background-color: transparent;margin-top: 0.5em;margin-left: 0;margin-right: 0;margin-bottom: 0.5em;"> <a target="_blank" style="background-color: transparent;color: #0000FF;font-family: Verdana, Geneva, sans-serif;font-size: 16px;font-weight: bold;font-style: normal;text-transform: none;text-decoration: underline;" href="<?php echo $_POST["title3URL"] . $_POST["utm"]; ?>"> <?php echo $_POST["title3"]; ?> </a> </h2>
                        <span style="color: #000000;font-family: Verdana, Geneva, sans-serif;font-size: 16px;mso-line-height-rule: exactly;line-height: 1.14em;font-weight: normal;font-style: normal;text-transform: none;margin-top: 0.5em;margin-left: 0;margin-right: 0;margin-bottom: 0.5em;padding: 0;"> 
                        <!-- BEGIN STORY --> 
                        <?php echo $_POST["title3text-div"]; ?> 
                        <!-- END STORY --> 
                        </span> <br /></td>
                    </tr>
                  </table></td>
                <td class="sf-td hide-on-responsive" valign="top" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent; width: 25%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" align="left" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <tr>
                      <td align="left" class="sf-img sf-td" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding: auto;">
                      <?php if( isset($_POST['title3IMG']) && $_POST['title3IMG'] != "" ): ?>
                      <center>
                          <br />
                          <br />
                          <a href="<?php echo $_POST["title3URL"]; ?>" target="_blank">
                          <?php 
						   $title3resize = resizeImage($_POST["title3IMG"]);
						   $title3FixedW = $title3resize["fixedWidth"];
						   $title3FixedH = $title3resize["fixedHeight"];
						   ?>
                          <img class="no-scale" align="middle" src="<?php echo $_POST["title3IMG"]; ?>" alt="<?php echo $_POST["title3"]; ?>" height="<?php echo $title3FixedH ?>" width="<?php echo $title3FixedW ?>" style="width: <?php echo $title3FixedW.'px'; ?>; max-width: <?php echo $title3FixedH.'px'; ?>; height: <?php echo $title3FixedH.'px'; ?>"/> </a>
                        </center>
                        <?php endif; ?></td>
                    </tr>
                  </table></td>
              </tr>
            </table>
            
            <!-- END ALPACDBIMG3 -->
            
            <?php else: ?>
            
            <!-- TITLE3 NOT SET! -->
            
            <?php endif; ?>
            <?php if( isset($_POST['title4']) && $_POST['title4'] != ""): ?>
            
            <!-- START ALPACDBIMG3 -->
            
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent;">
              <tr>
                <td class="sf-td" valign="top" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent; width: 75%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <tr>
                      <td class="sf-html sf-td" style="padding: 13px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><h2 style="color: #000000;font-family: Verdana, Geneva, sans-serif;font-size: 20px;mso-line-height-rule: exactly;line-height: 1.14em;font-weight: bold;font-style: normal;text-transform: none;background-color: transparent;margin-top: 0.5em;margin-left: 0;margin-right: 0;margin-bottom: 0.5em;"> <a target="_blank" style="background-color: transparent;color: #0000FF;font-family: Verdana, Geneva, sans-serif;font-size: 16px;font-weight: bold;font-style: normal;text-transform: none;text-decoration: underline;" href="<?php echo $_POST["title4URL"] . $_POST["utm"]; ?>"> <?php echo $_POST["title4"]; ?> </a> </h2>
                        <span style="color: #000000;font-family: Verdana, Geneva, sans-serif;font-size: 16px;mso-line-height-rule: exactly;line-height: 1.14em;font-weight: normal;font-style: normal;text-transform: none;margin-top: 0.5em;margin-left: 0;margin-right: 0;margin-bottom: 0.5em;padding: 0;"> 
                        <!-- BEGIN STORY --> 
                        <?php echo $_POST["title4text-div"]; ?> 
                        <!-- END STORY --> 
                        </span> <br /></td>
                    </tr>
                  </table></td>
                <td class="sf-td hide-on-responsive" valign="top" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent; width: 25%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" align="left" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <tr>
                      <td align="left" class="sf-img sf-td" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding: auto;"><center>
                          <br />
                          <br />
                          <a href="<?php echo $_POST["title4URL"]; ?>" target="_blank">
                          <?php 
						   $title4resize = resizeImage($_POST["title4IMG"]);
						   $title4FixedW = $title4resize["fixedWidth"];
						   $title4FixedH = $title4resize["fixedHeight"];
						   ?>
                          <img class="no-scale" align="middle" src="<?php echo $_POST["title4IMG"]; ?>" alt="<?php echo $_POST["title4"]; ?>" height="<?php echo $title4FixedH ?>" width="<?php echo $title4FixedW ?>" style="width: <?php echo $title4FixedW.'px'; ?>; max-width: <?php echo $title4FixedH.'px'; ?>; height: <?php echo $title4FixedH.'px'; ?>"/> </a>
                        </center></td>
                    </tr>
                  </table></td>
              </tr>
            </table>
            
            <!-- END ALPACDBIMG4 -->
            
            <?php else: ?>
            
            <!-- TITLE4 NOT SET! -->
            
            <?php endif; ?>
            
            <!-- BEGIN SIGNATURE BLOCK -->
            
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent;">
              <tr>
                <td class="sf-td" valign="top" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent; width: 100%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <tr>
                      <td class="sf-html sf-td" style="padding: 13px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><p style="color: #000000;font-family: Verdana, Geneva, sans-serif;font-size: 16px;mso-line-height-rule: exactly;line-height: 1.14em;font-weight: normal;font-style: normal;text-transform: none;margin-top: 0.5em;margin-left: 0;margin-right: 0;margin-bottom: 0.5em;padding: 0;"><span style="color: #000000;font-family: Verdana, Geneva, sans-serif;font-size: 16px;mso-line-height-rule: exactly;line-height: 1.14em;font-weight: normal;font-style: normal;text-transform: none;">For Liberty,</span><br />
                        </p>
                        <p style="color: #000000;font-family: Verdana, Geneva, sans-serif;font-size: 16px;mso-line-height-rule: exactly;line-height: 1.14em;font-weight: normal;font-style: normal;text-transform: none;margin-top: 0.5em;margin-left: 0;margin-right: 0;margin-bottom: 0.5em;padding: 0;">Adam Bitely</p>
                        <p style="color: #000000;font-family: Verdana, Geneva, sans-serif;font-size: 16px;mso-line-height-rule: exactly;line-height: 1.14em;font-weight: normal;font-style: normal;text-transform: none;margin-top: 0.5em;margin-left: 0;margin-right: 0;margin-bottom: 0.5em;padding: 0;">Executive Director</p>
                        <p style="color: #000000;font-family: Verdana, Geneva, sans-serif;font-size: 16px;mso-line-height-rule: exactly;line-height: 1.14em;font-weight: normal;font-style: normal;text-transform: none;margin-top: 0.5em;margin-left: 0;margin-right: 0;margin-bottom: 0.5em;padding: 0;">American Liberty PAC</p></td>
                    </tr>
                  </table></td>
              </tr>
            </table>
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent;">
              <tr>
                <td class="sf-td" valign="top" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent; width: 100%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <tr>
                      <td class="sf-html sf-td" style="padding: 13px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><p style="color: #000000;font-family: Verdana, Geneva, sans-serif;font-size: 16px;mso-line-height-rule: exactly;line-height: 1.14em;font-weight: normal;font-style: normal;text-transform: none;margin-top: 0.5em;margin-left: 0;margin-right: 0;margin-bottom: 0.5em;padding: 0;"><b>P.S.</b> The Battle for Liberty is long. And we've come too far to give up now. Will you help us keep the fight going to expose and stop the corrupt Obama regime?&nbsp;<b> <a href="https://secure.yourpatriot.com/ou/alpac/1826/donate.aspx" style="background-color: transparent;color: #0000FF;font-family: Verdana, Geneva, sans-serif;font-size: 16px;font-weight: bold;font-style: normal;text-transform: none;text-decoration: underline;" target="_blank"><b>Please chip in $5 to keep the battle going!</b></a></b></p></td>
                    </tr>
                  </table></td>
              </tr>
            </table>
            
            <!-- END SIGNATURE BLOCK --> 
            
            <!-- BEGIN DISCLAIMER BLOCK -->
            
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent;">
              <tr>
                <td class="sf-td" valign="top" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent; width: 100%;"><table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td class="sf-td" style=""><table align="center" width="100%">
                          <tr>
                            <td class="center" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: center; color: #222222; font-family: Verdana, Geneva, sans-serif; font-weight: normal; line-height: 19px; font-size: 14px; margin: 0; padding: 0px 0px 10px; border: 1px solid #000000;" align="center" valign="top"><center style="width: 100%;">
                                <span style="font-size: 10px; text-align: center;">
                                <center style="width: 100%;">
                                  Paid for by American Liberty PAC.
                                </center>
                                </span> <span style="font-size: 10px; text-align: center;">
                                <center style="width: 100%;">
                                  <a href="http://www.americanlibertypac.com" alt="" target="_blank" style="color: #2ba6cb; text-decoration: none;"> www.AmericanLibertyPAC.com</a>
                                </center>
                                </span> <span style="font-size: 10px; text-align: center;">
                                <center style="width: 100%;">
                                  Not authorized by any candidate or candidate's committee.
                                </center>
                                </span> <span style="font-size: 10px; text-align: center;">
                                <center style="width: 100%;">
                                  Contributions to American Liberty PAC are not tax-deductible for federal income tax purposes.
                                </center>
                                </span>
                              </center></td>
                          </tr>
                          <tr>
                            <td class="center" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: center; color: #222222; font-family: Verdana, Geneva, sans-serif; font-weight: normal; line-height: 19px; font-size: 10px; margin: 0; padding: 0px 0px 10px;" align="center" valign="top">
                            <!-- START ALPACFOOTER --> 
                                This email is never sent unsolicited.
                                <br />
                                You have received this <a href="http://americanlibertypac.com/" target="_blank">AmericanLibertyPAC.com</a> email because you subscribed to it or someone forwarded it to you.
                              <br />
                                To opt out, see the links below.
                              <br />
                                If this email has been forwarded to you and you would like to sign up: {{:subscribe}}
                              <br />
                                For information on advertising with American Liberty PAC, please click: {{:advertise}}
                              <br />
                                We respect your right to privacy. {{:privacy}}
                              <br />
                                {{:unsubscribe}}
                              <!-- END ALPACFOOTER -->
                              </td>
                          </tr>
                        </table></td>
                    </tr>
                  </table></td>
              </tr>
            </table>
            
            <!-- END DISCLAIMER BLOCK --> 
            
            <!-- BEGIN FOOTER BLOCK -->
            
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent;" bgcolor="#d8d8d8">
              <tr>
                <td class="sf-td" valign="top" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border: 0px solid transparent; width: 100%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; border: 0px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <tr>
                      <td class="sf-html sf-td" style="padding: 13px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-align:center;"><p style="color: #666666;font-family: Verdana, Geneva, sans-serif;font-size: 9px;mso-line-height-rule: exactly;line-height: 1.14em;font-weight: normal;font-style: normal;text-transform: none;margin-top: 0.5em;margin-left: 0;margin-right: 0;margin-bottom: 0.5em;padding: 0;"> This email was sent by: American Liberty PAC 610 S. Boulevard, Tampa, FL 33606 <br />
                          {{:smartFocus.keycode}}</p></td>
                    </tr>
                  </table></td>
              </tr>
            </table>
            
            <!-- END FOOTER BLOCK --></td>
        </tr>
      </table></td>
  </tr>
</table>
</body>
</html>