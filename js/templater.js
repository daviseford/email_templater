// JavaScript Document

$(document).ready(function () {
	$("#resultsContainer").hide(); //Hiding our results, as we don't need to see them yet!
	$("#story2Div").hide(); //Hiding our second story panel.
    $("#emailHTML")
        .button()
        .hide();


    	function makeDownloadBtn() {
            $("#emailHTML")
                .show()
                .click(function(){
                    //trying some ajax?
                    $.ajax({
                        type: "POST",
                        url: "https://mandrillapp.com/api/1.0/messages/send.json",
                        data: {
                            'key': 'MXTAqFwwNNGZdGtKOzG_Jw',
                            'message': {
                                'from_email': 'digitalmedia@wjmassociates.com',
                                'to': [
                                    {
                                        'email': 'dford@wjmassociates.com',
                                        'name': 'Davis Ford',
                                        'type': 'to'
                                    }
                                ],
                                'autotext': 'true',
                                'subject': $("#title1KEY").val(),
                                'html': $("#resultsDiv").html()
                            }}
                    }).done(function(response) {
                        console.log(response); // if you're into that sorta thing
                    });
                });
        }





	var additionalContentVal = false; //This makes us default to a one-story format.
    var templateStyle = $('#tmplSelect').val();
    $('#tmplSelect')
        .selectmenu({width: 225})
        .selectmenu({
            change: function() {
                getTemplateStyle();
            }
        });
    //hides RFAR-specific stuff if it's not selected
    function rfarLayoutDisplay(value){  //value = true, false
        if(value === false){
            $('#productDiv').hide();
        } else if(value === true) {
            $('#productDiv').show();
        }

    }
    //setting up other menus
    //Establishing the datepicker
    $( "#inlinedate" ).datepicker({
        dateFormat: "ymmdd" //Outputs as YYMMDD
    });
    //setting up other menus
    $('#listSelect').selectmenu({width: 150});

    //setting up productSelect menu (with overflow because there's lots of products)
    $('#productSelect')
        .selectmenu()
        .selectmenu('menuWidget')
            .addClass('overflow');


    //This handles generating the keycode. It simply joins all of the necessary values from an array.
    function makeKeyCode() {
        var keycodeGeneration = [$("#inlinedate").val(),$("#listSelect").val(),$("#tmplSelect").val(),$("#productSelect").val()];
        //This array stores our Keycode values, to be used shortly.
        //$("#keycodefield").val(keycodeGeneration.join(""));
        var currKeyCode = keycodeGeneration.join("");

        //keycodeGeneration[3] = Product Selection
        //Since the form ID's are set up with links as values, we can just grab the value of a matching form
        //It's trimmed in the end just to be safe, not really necessary though
        //For example - if keycodeGeneration[3] = SUB, this grabs the value of "#SUB", which is the link to the product
        $("#title1KEY")
            .val(currKeyCode)
            .effect('highlight', 'slow'); //Sets up our product link in the "#inputForm"
        console.log(currKeyCode);
    }

    $('#generateKeyCodeBtn')
        .button()
        .click(function(){
            event.preventDefault();
            makeKeyCode();
    });


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
        var y = [$('#listSelect').val(), $('#tmplSelect').val()];
        var x = y.join('');
        console.log('x = '+x);
            if (x === "DB") {
                templateStyle = "DB";
            } else if (x === "MR"){
                templateStyle = "MR";
                rfarLayoutDisplay(false);
            } else if (x === "RFARDB"){
                templateStyle = "RFARDB";
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
            if ($("#title1").val() === "") {
                alert("Please enter a story");
            } else {
                getTemplateStyle(); //Start by finding out which template we're using
                $('#story1Form').find('input').each(textFix);
                var subjectLine = $.trim($('#subjectInput').val());
                var title1 = $.trim($("#title1").val());
                //noinspection JSLint
                var title1text = $.trim($("#title1text").val());
                var title1URL = $.trim($("#title1URL").val());
                var title1IMG = $.trim($("#title1IMG").val());
                var urlInsert1 = '<a href="' + title1URL + '" target="_blank">';
                var linkedTitle1 = '<h4><a href="' + title1URL + '" target="_blank">' + title1 + '</a></h4>';
                var imageRetrieve1 = '<center>' + urlInsert1 + '<img src="' + title1IMG + '" style="max-height: 125px; max-width: 125px;" alt="Story Image"></a></center>';


                if (templateStyle === "RFARDB") {
                    makeKeyCode();
                    var title1KEY = $.trim($("#title1KEY").val());
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
                            link: '<a href="http://www.independentlivingnews.com/video/usr-video.php' + utmsource + '" target="_blank">',
                            shortCode: 'USR',
                            longCode: 'Ultimate Self Reliance Manual',
                            selected: false
                        },
                        GAB: {
                            link: '<a href="http://www.independentlivingnews.com/video/great-american-blackout-ihnp.php' + utmsource + '" target="_blank">',
                            shortCode: 'GAB',
                            longCode: 'Great American Blackout',
                            selected: false
                        },
                        FOOD: {
                            link: '<a href="http://www.independentlivingnews.com/video/comfort-food-reserve.php' + utmsource + '" target="_blank">',
                            shortCode: 'FOOD',
                            longCode: 'Comfort Food Reserve',
                            selected: false
                        },
                        CSG: {
                            link: '<a href="https://www.independentlivingnews.com/video/csg-video.php' + utmsource + '" target="_blank">',
                            shortCode: 'CSG',
                            longCode: 'Colloidal Silver Generator',
                            selected: false
                        },
                        LPL: {
                            link: '<a href="http://www.independentlivingnews.com/video/lpl-video.php' + utmsource + '" target="_blank">',
                            shortCode: 'LPL',
                            longCode: 'Low Profile Living Manual',
                            selected: false
                        },
                        EPACK: {
                            link: '<a href="http://www.independentlivingnews.com/video/epack2-video.php' + utmsource + '" target="_blank">',
                            shortCode: 'EPACK',
                            longCode: 'Emergency Pack',
                            selected: false
                        },
                        STREK: {
                            link: '<a href="http://www.independentlivingnews.com/video/suntrek/' + utmsource + '" target="_blank">',
                            shortCode: 'STREK',
                            longCode: 'Sun Trek',
                            selected: false
                        },
                        MSR: {
                            link: '<a href="http://www.survivalproshop.com/publications/medical-self-reliance-mega-manual.html' + utmsource + '" target="_blank">',
                            shortCode: 'MSR',
                            longCode: 'Medical Self Reliance Mega Manual',
                            selected: false
                        },
                        FFL: {
                            link: '<a href="http://www.independentlivingnews.com/video/ffl-vsl.php' + utmsource + '" target="_blank">',
                            shortCode: 'FFL',
                            longCode: 'Freedom Fortress Library',
                            selected: false
                        },
                        XCOM: {
                            link: '<a href="http://www.survivalproshop.com/extreme-weather-combo-30-day-maximum-shelf-life-food-reserve.html' + utmsource + '" target="_blank">',
                            shortCode: 'XCOM',
                            longCode: 'Extreme Weather Combo',
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

                    function newGetProduct() {
                        var b;
                        var current = {};
                        b = $('#productSelect').val();
                        if (b !== '' && b !== null) {
                            var c = S(b).right(1).toInt(); //gives us our ad template number TODO expand to accomodate more than 9
                            console.log("c="+c);
                            var d = S(b).strip('1', '2', '3', '4', '5', '6', '7', '8', '9', '0').s;
                            var e = d.toString();
                            console.log('e = ' + e);
                            var f = productReference[e].link;
                            var g = productReference[e].shortCode;
                            var h = productReference[e].longCode;
                            productReference[e].selected = d;
                            console.log('f=' + f);
                            console.log('g=' + g);
                            storyz.currentProduct.link = f; //currentProduct product link updated to whatever the product link is
                            storyz.currentProduct.shortCode = g; //currentProduct product link updated to whatever the product shortCode is
                            storyz.currentProduct.longCode = h; //currentProduct product link updated to whatever the product longCode is
                            storyz.currentProduct.tmplNum = c; //currentProduct product link updated to whatever the product longCode is
                            storyz.currentProduct.enabled = true;
                        }

                    }
                }
                //END RFAR IF


                //TODO add keycode generator to page


                //TODO /doing, making a optgroup generator. This way I can cut down on havign to updatee so much across three files -
                //TODO so it should spawn
                //<optgroup label="Colloidal Silver Generator Kit">
                //<option value="CSG1">CSG - Banner 560x56</option>
                //<option value="CSG2">CSG - Image with copy</option>
                //</optgroup>
                //TODO actually do this
                //function getRep(x) {
                //    var keys = [];
                //    var that = this;
                //    var optionValueRep = '<option value="' + x.shortCode + '">'+ x.longCode + '</option>';
                //    var optGroupSpawnRep = '<optgroup label="' + x.longCode + '">';
                //    var optGroupRep = '</optgroup>';
                //    console.log("1: " + optionValueRep);
                //    console.log("2: " + optGroupSpawnRep);
                //    console.log("3: " + optGroupRep);
                //    var html = optionValueRep + optGroupSpawnRep + optGroupRep;
                //    $('#testResults').html(html);
                //
                //
                //}

                //probably delete up above later


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
                    smartFocus: {
                        title: subjectLine,
                        keycode: title1KEY
                    },
                    currentProduct: {
                        link: '',
                        shortCode: '',
                        longcode: '',
                        enabled: false
                    }
                };
                newGetProduct();
                console.log(storyz.currentProduct);


                if (additionalContentVal === true) {
                    var title2 = $.trim($("#title2").val());
                    var title2text = $.trim($("#title2text").val());
                    var title2URL = $.trim($("#title2URL").val());
                    var title2IMG = $.trim($("#title2IMG").val());
                    var urlInsert2 = '<a href="' + title2URL + '" target="_blank">';
                    var linkedTitle2 = '<h4><a href="' + title2URL + '" target="_blank">' + title2 + '</a></h4>';
                    var imageRetrieve2 = '<center>' + urlInsert2 + '<img src="' + title2IMG + '" style="max-height: 125px; max-width: 125px;" alt="Story Image"></a></center>';

                    if (templateStyle === "RFARDB") {
                        title2URL += utmsource; //appends our URL with a tracking code
                        urlInsert2 = '<a href="' + title2URL + '" target="_blank">'; //updates urlInsert with the new utm-appended keycode
                        imageRetrieve2 = '<center>' + urlInsert2 + '<img src="' + title2IMG + '" style="max-height: 125px; max-width: 125px;" alt="Story Image"></a></center>';
                    }

                    //we push this to storyz so we can render our second story
                    storyz.storyTwo = [{
                        title: title2,
                        text: title2text,
                        url: title2URL,
                        imageURL: title2IMG,
                        urlInsert: urlInsert2,
                        linkedTitle: linkedTitle2,
                        insertImage: imageRetrieve2
                    }];

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

                function spawnRFARDB() { //TODO could probably replace this with the new loader https://github.com/stevenmhunt/tmpl.loader
                    function getRFARDB() {
                        return $.get("http://daviseford.com/sites/default/files/email_templater/txt/rfar_db_Tmpl.htm", function (value) {
                            rfar_db_Tmpl = $.templates(value);
                        });
                    }

                    $.when(
                        getRFARDB()
                    ).then(function () {
                            var html = rfar_db_Tmpl.render(storyz);
                            $("#resultsTextArea").val(html); //Puts the raw HTML into the textbox so we can easily copy it.
                            $("#resultsDiv").html(html); //Renders the HTML version of the email
                            makeDownloadBtn();
                        }).fail(function () {
                            console.log("spawnRFARDB(): Something went wrong!");
                        });
                }


                //getResults() is responsible for reading the template selection box
                //and spawning the correct template
                //will probably be revised in the future, as it's a bit hacky and inelegant
                function getResults() {
                    var y = [$('#listSelect').val(), $('#tmplSelect').val()];
                    var x = y.join('');
                    console.log('x = '+x);
                    if (x === "MR") {
                        spawnMR();
                        console.log("getResults(): Spawned MR");
                    } else if (x === "RFARDB") {
                        spawnRFARDB();
                        console.log("getResults(): Spawned RFARDB");
                    } else {
                        console.log("getResults(): Error: Didn't spawn anything");
                    }
                }

                getResults();

                $("#resultsContainer").show("drop"); //Shows the results once everything is ready.
                //storyz.whatsGood();
                //TODO deal with this whatsGood nonsense

            }}
        )
    });