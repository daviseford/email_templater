// JavaScript Document

$(document).ready(function() {
    var title1 = $.trim($("#title1").val());
	var story1 = $.trim($("#text1").val());
	var title1URL = $.trim($("#title1URL").val());
	var title1img = $.trim($("#title1img").val());
	var title1KEY = $.trim($("#title1KEY").val());
	
	var titlehrefFix = '<a href="'+title1URL+'" target="_blank"><span style="font-size: 18px; font-weight: bold; padding-top:10px;">'+title1+'</span></a>';
	
//	var title2 = $.trim($("#title2").val());
//	var story2 = $.trim($("#text2").val());
//	var title2URL = $.trim($("#title2URL").val());
//	var title2img = $.trim($("#title2img").val());
//	var title2KEY = $.trim($("#title2KEY").val());
	
	$("#accordion").accordion();
	
	
	$("#generateHTML").click(function(){
		title1 = $.trim($("#title1").val());
		story1 = $.trim($("#text1").val());
		title1URL = $.trim($("#title1URL").val());
		title1img = $.trim($("#title1img").val());
		title1KEY = $.trim($("#title1KEY").val());
		
		var hrefFix = '<a href="'+title1URL+'" target="_blank">';
		var titlehrefFix = '<a href="'+title1URL+'" target="_blank"><span style="font-size: 18px; font-weight: bold; padding-top:10px;">'+title1+'</span></a>';
		
		console.log(titlehrefFix);
	
	
	
	var myTemplate = $.templates("#emailTmpl");

	var stories = [
  		{
		title: title1,	
    	url: title1URL,
		story: story1,
		img: title1img,
		key: title1KEY,
		titlehrefFix: titlehrefFix,
		hrefFix: hrefFix
  		}
	];

	var html = myTemplate.render(stories);

	$("#resultsDiv").html(html);
	$("#resultsTextArea").val(html);
	});


});