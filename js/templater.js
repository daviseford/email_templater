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
		$("#story1Div").removeClass("col-lg-12").addClass("col-lg-6");
		$("#story2Div").show( "fade" );
    } else {
		additionalContentVal = false;
		console.log("Checked? "+additionalContentVal);
		$("#story2Div").hide( "fade", function() {
		$("#story1Div").removeClass("col-lg-6").addClass("col-lg-12");
		});
	}
	});

    //**********************
    //BEGIN TEXT HANDLING  *
    //**********************

    function textFix(){
        var inputVal = $.trim($(this).val());
        if(S(inputVal).contains('.stml')) {
            var splitSTML = $.trim($(this).val().split('.stml')[0]); //split the value into two parts of an array.
            $(this).val(splitSTML+".stml");	//re-add the .stml ending
            console.log("Fixed string with stmlCheck"); //Not necessary, just for keeping track
        } else if(S(inputVal).contains('.html')) {
            var splitHTML = $.trim($(this).val().split('.html')[0]);
            $(this).val(splitHTML+".html");
            console.log("Fixed string with htmlCheck"); //Not necessary, just for keeping track
        } else if(S(inputVal).contains('?utm_source')) {
            var splitUTM = $.trim($(this).val().split('?utm_source')[0]);
            $(this).val(splitUTM);
            console.log("Fixed string with utmCheck"); //Not necessary, just for keeping track
        } else if(S(inputVal).contains('See more at:')) {
            var splitSeeMore = $.trim($(this).val().split(' - See more at:')[0]);
            $(this).val(splitSeeMore);
            console.log("Fixed string with SeeMoreCheck"); //Not necessary, just for keeping track
        }

    }
    //The textFix scrubs links of anything extending past
    // .html | .stml | ?utm_source |  - See more at:
    //Additionally, it strips existing UTM codes away, which is Kelly-proof (hopefully)
		


    //****************************************************************
    //
    //BEGIN POST-BUTTON CLICK ACTIONS
    //
    //****************************************************************
	$("#generateHTML").click(function(){
		var storyz;
        event.preventDefault(); //Stops page from reloading
        if($("#title1").val() === "") {
            alert("Please enter a story");
            return;
        } else {
            $('#story1Form').find('input').each(textFix);
            var title1 = $.trim($("#title1").val());
            var title1text = $.trim($("#title1text").val());
            var title1URL = $.trim($("#title1URL").val());
            var title1IMG = $.trim($("#title1IMG").val());
            var title1KEY = $.trim($("#title1KEY").val());
            var urlInsert1 = '<a href="' + title1URL + '" target="_blank">';
            var linkedTitle1 = '<h4><a href="' + title1URL + '" target="_blank">' + title1 + '</a></h4>';
            var imageRetrieve1 = '<center>' + urlInsert1 + '<img src="' + title1IMG + '" class="img_thumb" alt="Story Image"></a></center>';
        }
		
		
		//This Object/Array is used with JSRender. 
		//The template will iterate over the contained "story" array
		//and spit out as many stories as we have objects in the array.
        storyz = {
            story: [
                {
                    title: title1,
                    text: title1text,
                    url: title1URL,
                    imageURL: title1IMG,
                    urlInsert: urlInsert1,
                    linkedTitle: linkedTitle1,
                    insertImage: imageRetrieve1
                }]
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
			var storyTwo = {
				title: title2,
				text: title2text,
				url: title2URL,
				imageURL: title2IMG,
				urlInsert: urlInsert2,
				linkedTitle: linkedTitle2,
				insertImage: imageRetrieve2
				};
			storyz.story.push(storyTwo);
        }

        function spawnDB() {
            function getDB() {
                return $.get("http://daviseford.com/sites/default/files/email_templater/txt/db_Tmpl.txt", function (value) {
                    db_Tmpl = $.templates(value);
                });
            }

            $.when(
                getDB()
                //prepareInterface()
            ).then(function () {
                    console.log("fire after requests succeed");
                    $.templates(db_addDiv, db_Tmpl); //adds db_addDiv as a subtemplate of db_Tmpl
                    html = db_Tmpl.render(storyz);
                    $("#resultsDiv").html(html); //Renders the HTML version of the email
                    $("#resultsTextArea").val(html); //Puts the raw HTML into the textbox so we can easily copy it.
                }).fail(function () {
                    console.log("something went wrong!");
                });
        }
        spawnDB();






        function renderDB(){
		$.templates(db_addDiv, db_Tmpl); //adds db_addDiv as a subtemplate of db_Tmpl
		html = db_Tmpl.render(storyz);
		$("#resultsDiv").html(html); //Renders the HTML version of the email
		$("#resultsTextArea").val(html); //Puts the raw HTML into the textbox so we can easily copy it.
        }

        //renderDB();
	$("#resultsContainer").show("drop"); //Shows the results once everything is ready.
	});


});