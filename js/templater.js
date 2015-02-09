// JavaScript Document

$(document).ready(function() {
	$("#resultsContainer").hide(); //Hiding our results, as we don't need to see them yet!
	$("#story2Div").hide(); //Hiding our second story panel.
	var additionalContentVal = false; //This makes us default to a one-story format.
	
	//If this is checked, adds the second story box
	$('#additionalContentCheckbox').click(function(){
    if (this.checked) {
		additionalContentVal = true;
        console.log("Checked? "+additionalContentVal);
		$("#story1Div").removeClass("col-lg-12");
		$("#story1Div").addClass("col-lg-6");
		$("#story2Div").show( "fade" );
    } else {
		additionalContentVal = false;
		console.log("Checked? "+additionalContentVal);
		$("#story2Div").hide( "fade", function() {
		$("#story1Div").removeClass("col-lg-6");
		$("#story1Div").addClass("col-lg-12");
		});
	}
	});
		
		
		
		
		
		
		
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
		
		
		//This Object/Array is used with JSRender. 
		//The template will iterate over the contained "story" array
		//and spit out as many stories as we have objects in the array.
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
		}
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
			
			//experimental constructor for story
			var storyTwoTest = {
				title: title2,
				text: title2text,
				url: title2URL,
				imageURL: title2IMG,
				urlInsert: urlInsert2,
				linkedTitle: linkedTitle2,
				insertImage: imageRetrieve2
				};
			storyz.story.push(storyTwoTest);
			//Worked!!!!!!!!!
		};
		
			
		
		
	//var myTemplate = $.templates("#emailTmpl");  //Establishing templates for JSRender
	var addDivTmpl = $.templates("#addDivTmpl"); //Establishing templates for JSRender

	//var html = myTemplate.render(storyz); //Set this var to pass the storyz object to the template.
	
	
	
	var getScripts = function(){	
		//get our Daily Bulletin template
		$.get("http://daviseford.com/sites/default/files/email_templater/txt/dailybulletin.txt", function(value) {
  		emailTmpl = $.templates(value);
		addDivTmpl = $.templates("#addDivTmpl"); //Want to move this to external
		$.templates(addDivTmpl, emailTmpl);
		html = emailTmpl.render(storyz);
		$("#resultsDiv").html(html); //Renders the HTML version of the email
	    $("#resultsTextArea").val(html); //Puts the raw HTML into the textbox so we can easily copy it.
		});
	}
	getScripts();
	
	
	
	
	
	//var html = emailTemplate.render(storyz);
	//$.templates(addDivTmpl, emailTemplate);
		
		
	//$("#exDiv").html(html);
	//$("#resultsDiv").html(html); //Renders the HTML version of the email
	//$("#resultsTextArea").val(html); //Puts the raw HTML into the textbox so we can easily copy it.
	$("#resultsContainer").show("drop"); //Shows the results once everything is ready.
	console.log(storyz);
	});


});