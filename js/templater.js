// JavaScript Document

$(document).ready(function() {
	$("#resultsContainer").hide();
	$("#story2Div").hide();
	var additionalContentVal = false;
	
//	$( "#additionalContentCheckbox" ).change(function() {
//		additionalContentVal = true;
//  		console.log( "Handler for .change() called." );
//	});
	
	$('#additionalContentCheckbox').click(function(){
    if (this.checked) {
		additionalContentVal = true;
        console.log("Checked? "+additionalContentVal);
		$("#story2Div").show();
    } else {
		additionalContentVal = false;
		console.log("Checked? "+additionalContentVal);
		$("#story2Div").hide();
	}
	});
	
	
//	var title2 = $.trim($("#title2").val());
//	var story2 = $.trim($("#text2").val());
//	var title2URL = $.trim($("#title2URL").val());
//	var title2img = $.trim($("#title2img").val());
//	var title2KEY = $.trim($("#title2KEY").val());
	
		
	//$("#story1").submit(function() { 
	$("#generateHTML").click(function(){
		event.preventDefault(); //Stops page from reloading
		var title1 = $.trim($("#title1").val());
		var title1text = $.trim($("#title1text").val());
		var title1URL = $.trim($("#title1URL").val());
		var title1IMG = $.trim($("#title1IMG").val());
		var title1KEY = $.trim($("#title1KEY").val());
		var urlInsert1 = '<a href="'+title1URL+'" target="_blank">';
		var linkedTitle1 = '<h4><a href="'+title1URL+'" target="_blank">'+title1+'</a></h4>';
		var imageRetrieve1 = '<center>'+urlInsert1+'<img src="'+title1IMG+'" class="img_thumb" alt="Story Image"></a></center>';
		
		
		
		var storyz = {
		story: [
		{
		title: title1,
		text: title1text,
		url: title1URL,
		imageURL: title1IMG,
		urlInsert: urlInsert1,
		linkedTitle: linkedTitle1,
		insertImage: imageRetrieve1
		},
		]
		};
		
		
		
		
		
		
		
		if(additionalContentVal === true) {
			var title2 = $.trim($("#title2").val());
			var title2text = $.trim($("#title2text").val());
			var title2URL = $.trim($("#title2URL").val());
			var title2IMG = $.trim($("#title2IMG").val());
			var title2KEY = $.trim($("#title2KEY").val());
			var urlInsert2 = '<a href="'+title2URL+'" target="_blank">';
			var linkedTitle2 = '<h4><a href="'+title2URL+'" target="_blank">'+title2+'</a></h4>';
			var imageRetrieve2 = '<center>'+urlInsert2+'<img src="'+title2IMG+'" class="img_thumb" alt="Story Image"></a></center>';
			console.log("Additional content enabled, vars set");
			
			
			var storyz = {
				story: [
				{
				title: title1,
				text: title1text,
				url: title1URL,
				imageURL: title1IMG,
				urlInsert: urlInsert1,
				linkedTitle: linkedTitle1,
				insertImage: imageRetrieve1
				},
				{
				title: title2,
				text: title2text,
				url: title2URL,
				imageURL: title2IMG,
				urlInsert: urlInsert2,
				linkedTitle: linkedTitle2,
				insertImage: imageRetrieve2
				}
				]
				};			
		};
		
		
	//$("#hereAdd").html(htmlout);	
	//var html = myTemplate.render(stories);
	
	//addDivTmpl.render(storyx); //Render the stories and hopefully put them into the overarching template
	var myTemplate = $.templates("#emailTmpl");
	var addDivTmpl = $.templates("#addDivTmpl");

	var html = myTemplate.render(storyz);

	$("#resultsDiv").html(html); //Renders the HTML version of the email
	$("#resultsTextArea").val(html); //Puts the raw HTML into the textbox so we can easily copy it.
	$("#resultsContainer").show("drop"); //Shows the results once everything is ready.
	console.log(storyz);
	});


});