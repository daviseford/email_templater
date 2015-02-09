// JavaScript Document

$(document).ready(function() {
    var title1 = $.trim($("#title1").val());
	var story1 = $.trim($("#text1").val());
	var title1URL = $.trim($("#title1URL").val());
	var title1IMG = $.trim($("#title1IMG").val());
	var title1KEY = $.trim($("#title1KEY").val());
	$("#resultsContainer").hide();
	
	
//	var title2 = $.trim($("#title2").val());
//	var story2 = $.trim($("#text2").val());
//	var title2URL = $.trim($("#title2URL").val());
//	var title2img = $.trim($("#title2img").val());
//	var title2KEY = $.trim($("#title2KEY").val());
	
	
	
	$("#story1").submit(function() { 
		event.preventDefault(); //Stops page from reloading
		title1 = $.trim($("#title1").val());
		story1 = $.trim($("#text1").val());
		title1URL = $.trim($("#title1URL").val());
		title1IMG = $.trim($("#title1IMG").val());
		title1KEY = $.trim($("#title1KEY").val());
		
		var hrefFix = '<a href="'+title1URL+'" target="_blank">';
		//var titlehrefFix = '<a href="'+title1URL+'" target="_blank"><h2 style="line-height: 1.14em;margin-top: 0.5em;margin-bottom: 0.5em;color: #0000FF;font-family: Verdana;font-size: 16px;font-weight: bold;font-style: normal;text-transform: none;text-decoration: underline;">'+title1+'</h2></a>';
		var imageRetrieve = '<center>'+hrefFix+'<img src="'+title1IMG+'" class="img_thumb" alt="Story Image"></a></center>';
		console.log(hrefFix);
	
	
	
	var myTemplate = $.templates("#emailTmpl");
	var addDivTmpl = $.templates("#addDivTmpl");
	
	var numTmpl = [];

	var stories = [
  		{
		title: title1,	
    	url: title1URL,
		story: story1,
		img: title1IMG,
		key: title1KEY,
		insertURL: hrefFix,
		insertImage : imageRetrieve,
		additionalContent: true
  		}
	];

	var html = myTemplate.render(stories);

	$("#resultsDiv").html(html); //Renders the HTML version of the email
	$("#resultsTextArea").val(html); //Puts the raw HTML into the textbox so we can easily copy it.
	$("#resultsContainer").show("drop") //Shows the results once everything is ready.
	});


});