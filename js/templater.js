// JavaScript Document

$(document).ready(function() {
	$("#resultsContainer").hide(); //Hiding our results, as we don't need to see them yet!
	$("#story2Div").hide(); //Hiding our second story panel.
	var additionalContentVal = false; //This makes us default to a one-story format.
    var templateStyle = $('#tmplPick').val();
    $('#tmplPick')
        .selectmenu({width:225})
        .selectmenu({
            change: function() {
                getTemplateStyle();
            }
        });

    function rfarLayoutDisplay(value){  //value = true, false
        if(value === false){
            $('#productDiv').hide();
            $('#keycodeDiv').hide();
        } else if(value === true) {
            $('#productDiv').show();
            $('#keycodeDiv').show();
        }

    }
    $('#productSelect')
        .selectmenu()
        .selectmenu('menuWidget')
            .addClass('overflow');

	//If this is checked, adds the second story box
	$('#additionalContentCheckbox').click(function(){
    if (this.checked) {
		additionalContentVal = true;
        console.log("Additional Content: "+additionalContentVal);
		$("#story1Div").removeClass("col-lg-12").addClass("col-lg-6");
		$("#story2Div").show( "fade" );
    } else {
		additionalContentVal = false;
		console.log("Additional Content: "+additionalContentVal);
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
        } else if(S(inputVal).contains(' - See more at:')) {
            var splitSeeMore = $.trim($(this).val().split(' - See more at:')[0]);
            $(this).val(splitSeeMore);
            console.log("Fixed string with SeeMoreCheck"); //Not necessary, just for keeping track
        }

    }
    //The textFix scrubs links of anything extending past
    // .html | .stml | ?utm_source |  - See more at:
    //Additionally, it strips existing UTM codes away, which is Kelly-proof (hopefully)



    //checks our template style for us, useful when doing keycodes
    function getTemplateStyle(){
            var x = $('#tmplPick').val();
            if (x === "DB") {
                templateStyle = "DB";
            } else if (x === "MR"){
                templateStyle = "MR";
                rfarLayoutDisplay(false);
            } else if (x === "RFAR"){
                templateStyle = "RFAR";
                rfarLayoutDisplay(true);
            } else {
                console.log("getTemplateStyle() - Error: None of above");
            }
        console.log("getTemplateStyle()"+x);
        }




    //****************************************************************
    //
    //BEGIN POST-BUTTON CLICK ACTIONS
    //
    //****************************************************************
	$("#generateHTML").click(function(){
		var storyz;
       // event.preventDefault(); //Stops page from reloading
        if($("#title1").val() === "") {
            alert("Please enter a story");
        } else {
            getTemplateStyle(); //Start by finding out which template we're using
            $('#story1Form').find('input').each(textFix);
            var title1 = $.trim($("#title1").val());
            var title1text = $.trim($("#title1text").val());
            var title1URL = $.trim($("#title1URL").val());
            var title1IMG = $.trim($("#title1IMG").val());
            var title1KEY = $.trim($("#title1KEY").val());
            var urlInsert1 = '<a href="' + title1URL + '" target="_blank">';
            var linkedTitle1 = '<h4><a href="' + title1URL + '" target="_blank">' + title1 + '</a></h4>';
            var imageRetrieve1 = '<center>' + urlInsert1 + '<img src="' + title1IMG + '" style="max-height: 125px; max-width: 125px;" alt="Story Image"></a></center>';


            if (templateStyle === "RFAR") {
                var utmsource = '?utm_source=' + title1KEY + '&keycode=' + title1KEY + '&u=[EMV FIELD]EMAIL_UUID[EMV /FIELD]';
                var safeSend = '<a href="http://www.independentlivingnews.com/il/whitelisting.php' + utmsource + '" linkname="safe sender" target="_blank">Add as Safe Sender</a>';
                var rfarHeader = '<a href="http://www.independentlivingnews.com/preppers' + utmsource + '" linkname="Todays Headlines" target="new"><img alt="Lee Bellingers Ready For Anything Report" border="0" height="122" src="http://www.independentlivingnews.com/email/images/iln_lb_ready-for-anything_header.jpg" style="display:block;" width="602" /></a>';
                var subILN = '<a href="http://www.survivalproshop.com/publications/subscription-to-independent-living-newsletter.html' + utmsource + '" target="_blank">';
                //for subILN, prefLink, unsubLink, remember to close with </a>
                var prefLink = '<a href="http://www.independentlivingnews.com/email/preferences/?u=[EMV FIELD]EMAIL_UUID[EMV /FIELD]&amp;k=' + title1KEY + '-P" linkname="Email Preferences">';
                var unsubLink = '<a href="http://www.independentlivingnews.com/email/preferences/?u=[EMV FIELD]EMAIL_UUID[EMV /FIELD]&amp;k=' + title1KEY + '-U" linkname="Bottom Unsubscribe">';
                title1URL += utmsource; //appends our URL with a tracking code
                urlInsert1 = '<a href="' + title1URL + '" target="_blank">'; //updates urlInsert with the new utm-appended keycode
                imageRetrieve1 = '<center>' + urlInsert1 + '<img src="' + title1IMG + '" style="max-height: 125px; max-width: 125px;" alt="Story Image"></a></center>';


                //template values. true = displayed
                var prod_USR = false;
                var prod_MSR = false;
                var prod_XCOM = false;
                var prod_LPL = false;
                var prod_FFL = false;
                var prod_GAB = false;
                var prod_SUB = false;
                var prod_PW = false;
                var prod_FOOD = false;
                var prod_CSG = false;
                var prod_EPACK = false;
                var prod_CAN = false;
                var prod_STREK = false;
                //TODO eventually pull all this together
                var prodLink = false;
                var productReference;


                productReference = {
                    USR: {
                        link:'<a href="http://www.independentlivingnews.com/video/usr-video.php' + utmsource + '" target="_blank">',
                        shortcode: 'USR',
                        longcode: 'Ultimate Self Reliance Manual',
                        selected: false
                    },
                    GAB: {
                        link:'<a href="http://www.independentlivingnews.com/video/great-american-blackout-ihnp.php' + utmsource + '" target="_blank">',
                        shortcode: 'GAB',
                        longcode: 'Great American Blackout',
                        selected: false
                    },
                    FOOD: {
                        link:'<a href="http://www.independentlivingnews.com/video/comfort-food-reserve.php' + utmsource + '" target="_blank">',
                        shortcode: 'FOOD',
                        longcode: 'Comfort Food Reserve',
                        selected: false
                    },
                    CSG: {
                        link:'<a href="https://www.independentlivingnews.com/video/csg-video.php' + utmsource + '" target="_blank">',
                        shortcode: 'CSG',
                        longcode: 'Colloidal Silver Generator',
                        selected: false
                    },
                    LPL: {
                        link:'<a href="http://www.independentlivingnews.com/video/lpl-video.php' + utmsource + '" target="_blank">',
                        shortcode: 'LPL',
                        longcode: 'Low Profile Living Manual',
                        selected: false
                    },
                    EPACK: {
                        link:'<a href="http://www.independentlivingnews.com/video/epack2-video.php' + utmsource + '" target="_blank">',
                        shortcode: 'EPACK',
                        longcode: 'Emergency Pack',
                        selected: false
                    },
                    STREK: {
                        link:'<a href="http://www.independentlivingnews.com/video/suntrek/' + utmsource + '" target="_blank">',
                        shortcode: 'STREK',
                        longcode: 'Sun Trek',
                        selected: false
                    },
                    MSR: {
                        link:'<a href="http://www.survivalproshop.com/publications/medical-self-reliance-mega-manual.html' + utmsource + '" target="_blank">',
                        shortcode: 'MSR',
                        longcode: 'Medical Self Reliance Mega Manual',
                        selected: false
                    },
                    FFL: {
                        link:'<a href="http://www.independentlivingnews.com/video/ffl-vsl.php' + utmsource + '" target="_blank">',
                        shortcode: 'FFL',
                        longcode: 'Freedom Fortress Library',
                        selected: false
                    },
                    XCOM: {
                        link: '<a href="http://www.survivalproshop.com/extreme-weather-combo-30-day-maximum-shelf-life-food-reserve.html' + utmsource + '" target="_blank">',
                        shortcode: 'XCOM',
                        longcode: 'Extreme Weather Combo',
                        selected: false
                    },
                    PW: {
                        link: '<a href="http://www.independentlivingnews.com/video/pw-vsl.php' + utmsource + '" target="_blank">',
                        shortCode: 'PW',
                        longCode: 'Power Whisperer',
                        selected: false
                    },
                    CAN: {
                        link: '<a href="http://www.survivalproshop.com/survival-essentials/survival-kit-in-a-can.html' + utmsource + '" target="_blank">',
                        shortCode: 'CAN',
                        longCode: 'Survival Can in a Kit',
                        selected: false
                    }
                };




                //This pulls the currently selected Product
                //and checks it against the product codes
                //It then sets prod_XXX to a number so the template engine knows to render it
                function getProduct() {
                    var b;
                    b = $('#productSelect').val();
                    if (b === "XCOM1") {
                        prodLink = productReference.XCOM.link;
                        prod_XCOM = 1;
                    } else if (b === "XCOM2") {
                        prodLink = productReference.XCOM.link;
                        prod_XCOM = 2;
                    } else if (b === "PW1") {
                        prodLink = productReference.PW.link;
                        prod_PW = 1;
                    } else if (b === "PW2") {
                        prodLink = productReference.PW.link;
                        prod_PW = 2;
                    } else if (b === "PW3") {
                        prodLink = productReference.PW.link;
                        prod_PW = 3;
                    } else if (b === "CAN1") {
                        prodLink = productReference.CAN.link;
                        prod_CAN = 1;
                    } else if (b === "EPACK1") {
                        prodLink = productReference.EPACK.link;
                        prod_EPACK = 1;
                    } else if (b === "EPACK2") {
                        prodLink = productReference.EPACK.link;
                        prod_EPACK = 2;
                    } else if (b === "EPACK3") {
                        prodLink = productReference.EPACK.link;
                        prod_EPACK = 3;
                    } else if (b === "EPACK4") {
                        prodLink = productReference.EPACK.link;
                        prod_EPACK = 4;
                    } else if (b === "USR1") {
                        prodLink = productReference.USR.link;
                        prod_USR = 1;
                    } else if (b === "USR2") {
                        prodLink = productReference.USR.link;
                        prod_USR = 2;
                    } else if (b === "LPL1") {
                        prodLink = productReference.LPL.link;
                        prod_LPL = 1;
                    } else if (b === "LPL2") {
                        prodLink = productReference.LPL.link;
                        prod_LPL = 2;
                    }  else if (b === "FFL1") {
                        prodLink = productReference.FFL.link;
                        prod_FFL = 1;
                    } else if (b === "FFL2") {
                        prodLink = productReference.FFL.link;
                        prod_FFL = 2;
                    } else if (b === "STREK1") {
                        prodLink = productReference.STREK.link;
                        prod_STREK = 1;
                    } else if (b === "STREK2") {
                        prodLink = productReference.STREK.link;
                        prod_STREK = 2;
                    } else if (b === "GAB1") {
                        prodLink = productReference.GAB.link;
                        prod_GAB = 1;
                    } else if (b === "GAB2") {
                        prodLink = productReference.GAB.link;
                        prod_GAB = 2;
                    } else if (b === "CSG1") {
                        prodLink = productReference.CSG.link;
                        prod_CSG = 1;
                    } else if (b === "CSG2") {
                        prodLink = productReference.CSG.link;
                        prod_CSG = 2;
                    } else if (b === "FOOD1") {
                        prodLink = productReference.FOOD.link;
                        prod_FOOD = 1;
                    } else if (b === "FOOD2") {
                        prodLink = productReference.FOOD.link;
                        prod_FOOD = 2;
                    } else if (b === "FOOD3") {
                        prodLink = productReference.FOOD.link;
                        prod_FOOD = 3;
                    } else if (b === "MSR1") {
                        prodLink = productReference.MSR.link;
                        prod_MSR = 1;
                    } else if (b === "MSR2") {
                        prodLink = productReference.MSR.link;
                        prod_MSR = 2;
                    } else {
                        console.log("getProduct() - None of above");
                    }
                }

                getProduct();

            }
            //END RFAR IF

		//TODO add keycode generator to page

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
                }],
            rfarSettings: {
                rfarHeader: rfarHeader,
                subILN: subILN,
                prefLink: prefLink,
                unsubLink: unsubLink,
                prodLink: prodLink,
                safeSend: safeSend,                //DON'T FORGET TO UPDATE THIS WITH EACH PRODUCT
                prod_USR: prod_USR,
                prod_MSR: prod_MSR,
                prod_XCOM: prod_XCOM,
                prod_LPL: prod_LPL,
                prod_FFL: prod_FFL,
                prod_GAB: prod_GAB,
                prod_SUB: prod_SUB,
                prod_PW: prod_PW,
                prod_FOOD: prod_FOOD,
                prod_CSG: prod_CSG,
                prod_EPACK: prod_EPACK,
                prod_CAN: prod_CAN,
                prod_STREK: prod_STREK
            },
            whatsGood: function(){
                console.log("prodLink: " + this.prodLink + "prod_LPL: " +this.prod_LPL);
            }
        };



		if(additionalContentVal === true) {
			var title2 = $.trim($("#title2").val());
			var title2text = $.trim($("#title2text").val());
			var title2URL = $.trim($("#title2URL").val());
			var title2IMG = $.trim($("#title2IMG").val());
			var urlInsert2 = '<a href="'+title2URL+'" target="_blank">';
			var linkedTitle2 = '<h4><a href="'+title2URL+'" target="_blank">'+title2+'</a></h4>';
			var imageRetrieve2 = '<center>' + urlInsert2 + '<img src="' + title2IMG + '" style="max-height: 125px; max-width: 125px;" alt="Story Image"></a></center>';

            if(templateStyle === "RFAR"){
                title2URL += utmsource; //appends our URL with a tracking code
                urlInsert2 = '<a href="' + title2URL + '" target="_blank">'; //updates urlInsert with the new utm-appended keycode
                imageRetrieve2 = '<center>' + urlInsert2 + '<img src="' + title2IMG + '" style="max-height: 125px; max-width: 125px;" alt="Story Image"></a></center>';
            }

			//constructor for story
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

        function spawnMR() {
            function getMR() {
                return $.get("http://daviseford.com/sites/default/files/email_templater/txt/mr_Tmpl.htm", function (value) {
                    mr_Tmpl = $.templates(value);
                });
            }
            $.when(
                getMR()
            ).then(function () {
                    var html = mr_Tmpl.render(storyz);
                    $("#resultsTextArea").val(html); //Puts the raw HTML into the textbox so we can easily copy it.
                    $("#resultsDiv").html(html); //Renders the HTML version of the email
                }).fail(function () {
                    console.log("spawnMR(): Something went wrong!");
                });
        }

        function spawnRFAR() { //TODO could probably replace this with the new loader https://github.com/stevenmhunt/tmpl.loader
            function getRFAR() {
                return $.get("http://daviseford.com/sites/default/files/email_templater/txt/rfar_Tmpl.htm", function (value) {
                    rfar_Tmpl = $.templates(value);
                });
            }
            $.when(
                getRFAR()
            ).then(function () {
                    var html = rfar_Tmpl.render(storyz);
                    $("#resultsTextArea").val(html); //Puts the raw HTML into the textbox so we can easily copy it.
                    $("#resultsDiv").html(html); //Renders the HTML version of the email
                }).fail(function () {
                    console.log("spawnRFAR(): Something went wrong!");
                });
        }


        //getResults() is responsible for reading the template selection box
        //and spawning the correct template
        //will probably be revised in the future, as it's a bit hacky and inelegant
        function getResults(){
            var x = $('#tmplPick').val();
            if (x === "MR"){
                spawnMR();
                console.log("getResults(): Spawned MR");
            } else if (x === "RFAR"){
                spawnRFAR();
                console.log("getResults(): Spawned RFAR");
            } else {
                console.log("getResults(): Error: Didn't spawn anything");
            }
        }
        getResults();

	$("#resultsContainer").show("drop"); //Shows the results once everything is ready.
            storyz.whatsGood();
        }}
        )
    });