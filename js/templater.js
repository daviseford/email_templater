// JavaScript Document

$(document).ready(function () {
    //*******************************
    // DOCUMENT AND VAR SETUP
    //*******************************
    $("#resultsContainer1").hide(); //Hiding our results, as we don't need to see them yet!
    $("#resultsContainer2").hide();
    $("#story2Div").hide(); //Hiding our second story panel.
    $("#emailBtnDiv").hide();
    $("#rssPreview").hide();
    var additionalContentVal = false; //This makes us default to a one-story format.
    publicArray = [];
    imgHeight = [];
    imgWidth = [];

    var adReferenceILN = {
        USR: {
            shortCode: 'USR',
            longCode: 'Ultimate Self Reliance Manual',
            advertisements: {
                0: {
                    name: 'USR1',
                    description: "Image with copy"
                },
                1: {
                    name: 'USR2',
                    description: "GIF 468x80"
                },
                2: {
                    name: 'USR3',
                    description: 'Image with copy (2)'
                }
            }
        },
        GAB: {
            shortCode: 'GAB',
            longCode: 'Great American Blackout',
            advertisements: {
                0: {
                    name: 'GAB1',
                    description: 'Image with copy'
                }
            }
        },
        FOOD: {
            shortCode: 'FOOD',
            longCode: '30 Day Emergency Food Reserve',
            advertisements: {
                0: {
                    name: 'FOOD1',
                    description: 'Banner 580x58'
                },
                1: {
                    name: 'FOOD2',
                    description: 'Banner 580x58'
                },
                2: {
                    name: 'FOOD3',
                    description: 'Banner 580x58'
                }
            }
        },
        CSG: {
            shortCode: 'CSG',
            longCode: 'Colloidal Silver Generator',
            advertisements: {
                0: {
                    name: 'CSG1',
                    description: "Banner 580x58"
                },
                1: {
                    name: 'CSG2',
                    description: "Image with copy"
                }
            }
        },
        LPL: {
            shortCode: 'LPL',
            longCode: 'Low Profile Living Manual',
            advertisements: {
                0: {
                    name: 'LPL1',
                    description: "Image with copy"
                },
                1: {
                    name: 'LPL2',
                    description: "Banner 580x58"
                }
            }
        },
        EPACK: {
            shortCode: 'EPACK',
            longCode: 'Emergency Pack',
            advertisements: {
                0: {
                    name: 'EPACK1',
                    description: "Image with copy"
                },
                1: {
                    name: 'EPACK2',
                    description: "Banner 580x58"
                },
                2: {
                    name: 'EPACK3',
                    description: 'EPACK - Banner 580x58'
                },
                3: {
                    name: 'EPACK4',
                    description: 'EPACK - GIF 580x75'
                }
            }
        },
        STREK: {
            shortCode: 'STREK',
            longCode: 'Sun Trek',
            advertisements: {
                0: {
                    name: 'STREK1',
                    description: "Image with copy"
                },
                1: {
                    name: 'STREK2',
                    description: "Banner (Holiday Theme)"
                }
            }
        },
        MSR: {
            shortCode: 'MSR',
            longCode: 'Medical Self Reliance Mega Manual',
            advertisements: {
                0: {
                    name: 'MSR1',
                    description: "GIF 468x60"
                },
                1: {
                    name: 'MSR2',
                    description: "Image with copy"
                }
            }

        },
        FFL: {
            shortCode: 'FFL',
            longCode: 'Freedom Fortress Library',
            advertisements: {
                0: {
                    name: 'FFL1',
                    description: "Image with copy"
                }
            }
        },
        XCOM: {
            shortCode: 'XCOM',
            longCode: 'Extreme Weather Combo',
            advertisements: {
                0: {
                    name: 'XCOM1',
                    description: "Image with copy"
                },
                1: {
                    name: 'XCOM2',
                    description: "Banner (White + Green)"
                }
            }
        },
        PW: {
            shortCode: 'PW',
            longCode: 'Power Whisperer',
            advertisements: {
                0: {
                    name: 'PW1',
                    description: "Image with copy"
                },
                1: {
                    name: 'PW2',
                    description: "Banner 580x58"
                }
            }
        },
        CAN: {
            shortCode: 'CAN',
            longCode: 'Survival Can in a Kit',
            advertisements: {
                0: {
                    name: 'CAN1',
                    description: 'Image with copy'
                }
            }
        },
        SUB: {
            shortCode: 'SUB',
            longCode: 'Subscription to Independent Living News',
            advertisements: {
                0: {
                    name: 'SUB1',
                    description: 'Image with copy'
                },
                1: {
                    name: 'SUB2',
                    description: 'Smaller Image with copy'
                }
            }
        }
    };
    var adReferenceWJMA = {
        PPP: {
            shortCode: 'PPP',
            longCode: 'Presidential Preference Poll 2016',
            advertisements: {
                0: {
                    name: 'PPP1',
                    description: 'Rand/Romney'
                }
            }
        }
    };


    //*******************************
    // BUTTON AND MENU SETUP START
    //*******************************

    //Establishing the datepicker
    $( "#inlinedate" ).datepicker({
        dateFormat: "ymmdd" //Outputs as YYMMDD
    });

    $('#listSelect')
        .selectmenu({
            width: 150,
            change: function() {
                var a = getTemplateStyle();
                var x = $('#rssPreview');
                var y = $("#title1label");
                if (a === 'ALPACDB'){
                    makeProductMenu(adReferenceWJMA); //if our selected menu is ALPAC, get WJMA ads
                    x.show('scale', 'fast');
                } else {
                    makeProductMenu(adReferenceILN); //otherwise, get ILN ads - this will change behavior in the future
                    x.hide();
                }
                if (a === 'ILNDB') {
                    y.text('Modal Headline:');
                } else {
                    y.text('Title #1:');
                }
            }
        });


    //setting up productSelect menu (with overflow because there's lots of products)
    $('#productSelect')
        .selectmenu({width:225})
        .selectmenu('menuWidget')
        .addClass('overflow');


    $('#generateKeyCodeBtn')
        .button({icons: { primary: "ui-icon-gear"}})
        .click(function(event){
            makeKeyCode(event);
        });

    //If this is checked, adds the second story box
    $('#additionalContentCheckbox').click(function(){
        if (this.checked) {
            additionalContentVal = true;
            console.log("Additional Content: "+additionalContentVal);
            $("#story1Div").removeClass("col-lg-12 col-md-12").addClass("col-lg-6 col-md-6");
            $("#story2Div").show( "fade" );
        } else {
            additionalContentVal = false;
            console.log("Additional Content: "+additionalContentVal);
            $("#story2Div").hide( "fade", function() {
                $("#story1Div").removeClass("col-lg-6 col-md-6").addClass("col-lg-12 col-md-12");
            });
        }
    });

    $('#tmplSelect')
        .selectmenu({width: 225})
        .selectmenu({
            change: function() {
                getTemplateStyle();
            }
        });

    $('#title1IMG').change(function() {
        var x = $('#title1IMG').val();
        getImageSize(x, 0);
    });
    $('#title2IMG').change(function() {
        var z = $('#title2IMG').val();
        getImageSize(z, 1);
    });

    //setting up our story boxes
    //var editor1 = new wysihtml5.Editor("title1text-textarea", { // id of textarea element
    //    toolbar:      "wysihtml-toolbar1", // id of toolbar element
    //    parserRules:  wysihtml5ParserRules // defined in parser rules set
    //});
    var editor1 = new wysihtml5.Editor("title1text-div", { // id of textarea element
        toolbar:      "wysihtml-toolbar1", // id of toolbar element
        parserRules:  wysihtml5ParserRules // defined in parser rules set
    });
    var editor2 = new wysihtml5.Editor("title2text-div", { // id of textarea element
        toolbar:      "wysihtml-toolbar2", // id of toolbar element
        parserRules:  wysihtml5ParserRules // defined in parser rules set
    });

    $('#getRSSBtn')
        .button()
        .click(function(event){
            getRSS(event);
        });

    function makeEmailBtn() {
        $("#emailHTML")
            .button()
            .show()
            .click(function() {
                sendEmail();
            });
    }

    function sendEmail() {
        var x = $("#resultsTextArea").val();
        var z = $("#title1KEY").val();
        var y = S(x).unescapeHTML().s;
        z = z.toUpperCase();
        $.ajax({
            type: "POST",
            dataType: "text",
            processData: "false",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
                'key': 'MXTAqFwwNNGZdGtKOzG_Jw',
                'message': {
                    'from_email': 'digitalmedia@wjmassociates.com',
                    'to': [
                        {
                            'email': 'trigger@recipe.ifttt.com',
                            'name': 'Trigger',
                            'type': 'to'
                        }
                    ],
                    'autotext': 'true',
                    'subject': z,
                    'text': y
                }
            }
        }).done();
        $.ajax({
            type: "POST",
            dataType: "text",
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
                    'subject': '[SUBMISSION] ' + z,
                    'text': y
                }
            }
        }).done(function() {
            $('#emailHTML').text('Email Sent!').effect('highlight', 'fast');
        });
    }


    //*******************************
    // GETTERS AND FUNCTIONS
    //*******************************

    //This handles generating the keycode. It simply joins all of the necessary values from an array.
    function makeKeyCode(event) {
        event.preventDefault();
        var keycodeGeneration = [$("#inlinedate").val(),$("#listSelect").val(),$("#tmplSelect").val(),$("#productSelect").val()];
        //This array stores our Keycode values, to be used shortly.
        var currKeyCode = keycodeGeneration.join("");
        $("#title1KEY")
            .val(currKeyCode)
            .effect('highlight', 'slow'); //Sets up our product link in the "#inputForm"
    }

    //checks our template style for us, useful when doing keycodes
    function getTemplateStyle(){
        var y = [$('#listSelect').val(), $('#tmplSelect').val()];
        var x = y.join('');
        if (x === "ALPACDB") {
            return 'ALPACDB';
        } else if (x === "ILNDB"){
            return 'ILNDB';
        } else if (x === "RFARDB"){
            return 'RFARDB';
        } else {
            console.log("getTemplateStyle() - Error: None of above");
        }
        console.log("getTemplateStyle() = " + x);
    }

    function spawnILNDB() {
        function getILNDB() {
            return $.get("http://daviseford.com/sites/default/files/email_templater/txt/iln_db_Tmpl.htm", function (value) {
                iln_db_Tmpl = $.templates(value);
            });
        }
        $.when(
            getILNDB()
        ).then(function () {
                var html = iln_db_Tmpl.render(storyz);
                $("#resultsTextArea").val(html); //Puts the raw HTML into the textbox so we can easily copy it.
                $("#resultsDiv").html(sanitizeRender(html)); //Renders the HTML version of the email
                makeEmailBtn(); //take this out if it gets abused
            }).fail(function () {
                console.log("spawnILNDB(): Something went wrong!");
            });
    }

    function spawnRFARDB() { //could probably replace this with the new loader https://github.com/stevenmhunt/tmpl.loader
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
                $("#resultsDiv").html(sanitizeRender(html)); //Renders the HTML version of the email
                makeEmailBtn(); //take this out if it gets abused
            }).fail(function () {
                console.log("spawnRFARDB(): Something went wrong!");
            });
    }

    function spawnALPACDB() {
        function getALPACDB() {
            return $.get("http://daviseford.com/sites/default/files/email_templater/txt/alpac_db_Tmpl.htm", function (value) {
                alpac_db_Tmpl = $.templates(value);
            });
        }

        $.when(
            getALPACDB()
        ).then(function () {
                var html = alpac_db_Tmpl.render(storyz);
                $("#resultsTextArea").val(html); //Puts the raw HTML into the textbox so we can easily copy it.
                $("#resultsDiv").html(sanitizeRender(html)); //Renders the HTML version of the email
                makeEmailBtn(); //take this out if it gets abused
            }).fail(function () {
                console.log("spawnALPACDB(): Something went wrong!");
            });
    }

    //getResults() is responsible for reading the template selection box
    //and spawning the correct template
    //will probably be revised in the future, as it's a bit hacky and inelegant
    function getResults() {
        var y = [$('#listSelect').val(), $('#tmplSelect').val()]; //will give us a value like ILNDB or ALPACDB
        var x = y.join('');
        if (x === "ILNDB") {
            spawnILNDB();
        } else if (x === "RFARDB") {
            spawnRFARDB();
        } else if (x === "ALPACDB") {
            spawnALPACDB();
        } else {
            console.log("getResults(): Error: Didn't spawn anything");
        }
    }

    function makeProductMenu(x) {
        var setupMenu ='<label for="productSelect">STEP 4<br />Select a Product</label><br><select name="productSelect" id="productSelect"><option value="" selected="selected">None</option>';
        var endMenu = '</select>';
        var allAdsArray = [];

        for (var i in x) { //x = adReference, generally
            var adLongCode = x[i].longCode;
            var adShortCode = x[i].shortCode;
            if (x[i].hasOwnProperty('advertisements')) {
                var ad = x[i].advertisements;
                var z = Object.keys(ad).length; //gets the length of the advertisements object. Lets us know how many ads to expect
                //console.log('Number of '+adShortCode+' Ads = ' + z);
                if (z !== 0) {
                    var optGroupStart = '<optgroup label="' + adLongCode + '">';
                    var optGroupEnd = '</optgroup>';
                    var adEntries = [];
                    var h = 0;
                    for (h=0; h < z; h++) {
                        //console.log('Ad = ' + ad[h].name + ' - ' + ad[h].description);
                        var adName = ad[h].name;
                        var adDescription = ad[h].description;
                        var optionValue = '<option value="' + adName + '">' + adShortCode + ' - ' + adDescription + '</option>';
                        adEntries.push(optionValue);
                    }
                    var combineOptions = optGroupStart + adEntries + optGroupEnd;
                    allAdsArray.push(combineOptions);
                }
            }
        }
        var productSelect = $('#productSelect');
        productSelect.html(setupMenu+allAdsArray+endMenu);
        productSelect.selectmenu('refresh'); //refresh our changes. doesn't work without this.
    }
    makeProductMenu(adReferenceILN); //initialize our menu with ILN values, since the menu defaults to RFAR


    function firstStorySetup() {
        $('#story1Form').find('input').each(textFix);
        var productReference;
        var utmsource;
        var codedURL;
        var subjectLine = $('#subjectInput').val();
        var title1 = $("#title1").val();
        var title1text = $("#title1text-div").html();
        var title1URL = $("#title1URL").val();
        var title1IMG = $("#title1IMG").val();
        var imageRetrieve1 = '<center>' + urlInsert1 + '<img src="' + title1IMG + '" alt="Story Image" height="130" width="130"></a></center>';
        var urlInsert1 = '<a href="' + title1URL + '" target="_blank">';
        var linkedTitle1 = '<h4><a href="' + title1URL + '" target="_blank">' + title1 + '</a></h4>';
        var keycodeArray = [];
        keycodeArray[0]= $.trim($("#title1KEY").val());

        function getProduct() {
            var b;
            b = $('#productSelect').val();
            if (b !== '' && b !== null) {
                var c = S(b).right(1).toInt(); //gives us our ad template number
                var d = S(b).strip('1', '2', '3', '4', '5', '6', '7', '8', '9', '0').s;
                var e = d.toString();               //so we get the text portion of the keycode, which could be "XCOM" or "CAN".
                var f = productReference[e].link;
                var g = productReference[e].shortCode; //This is the same as writing productReference.XCOM.longCode
                var h = productReference[e].longCode;
                storyz.currentProduct = {
                    link: f,
                    shortCode: g,
                    longCode: h,
                    tmplNum: c,
                    keyCode: keycodeArray,
                    utm: utmsource.toString(),
                    enabled: true
                };
            }
        }

        if (getTemplateStyle() === "RFARDB" || getTemplateStyle() === "ILNDB") {
            utmsource = '?utm_source=' + keycodeArray + '&keycode=' + keycodeArray + '&u=[EMV FIELD]EMAIL_UUID[EMV /FIELD]';
            codedURL = title1URL + utmsource; //appends our URL with a tracking code
            urlInsert1 = '<a href="' + codedURL + '" target="_blank">'; //updates urlInsert with the new utm-appended keycode
            imageRetrieve1 = '<center>' + urlInsert1 + '<img src="' + title1IMG + '" alt="Story Image" height="' + imgHeight[0] + '" width="' + imgWidth[0] + '"></a></center>';

            if (getTemplateStyle() === 'ILNDB') {
                imageRetrieve1 = urlInsert1 + '<img align="right" alt="" src="' + title1IMG + '" style="padding: 6px; float:right;" height="' + imgHeight[0] + '" width="' + imgWidth[0] + '"/></a>';
            }

            productReference = {
                USR: {
                    link: '<a href="http://www.independentlivingnews.com/video/usr-vsl.php' + utmsource + '" target="_blank">',
                    shortCode: 'USR',
                    longCode: 'Ultimate Self Reliance Manual'
                },
                GAB: {
                    link: '<a href="http://www.independentlivingnews.com/video/great-american-blackout-ihnp.php' + utmsource + '" target="_blank">',
                    shortCode: 'GAB',
                    longCode: 'Great American Blackout'
                },
                FOOD: {
                    link: '<a href="http://www.independentlivingnews.com/video/comfort-food-reserve.php' + utmsource + '" target="_blank">',
                    shortCode: 'FOOD',
                    longCode: 'Comfort Food Reserve'
                },
                CSG: {
                    link: '<a href="https://www.independentlivingnews.com/video/csg-video.php' + utmsource + '" target="_blank">',
                    shortCode: 'CSG',
                    longCode: 'Colloidal Silver Generator'
                },
                LPL: {
                    link: '<a href="http://www.independentlivingnews.com/video/lpl-video.php' + utmsource + '" target="_blank">',
                    shortCode: 'LPL',
                    longCode: 'Low Profile Living Manual'
                },
                EPACK: {
                    link: '<a href="http://www.independentlivingnews.com/video/epack2-video.php' + utmsource + '" target="_blank">',
                    shortCode: 'EPACK',
                    longCode: 'Emergency Pack'
                },
                STREK: {
                    link: '<a href="http://www.independentlivingnews.com/video/suntrek/' + utmsource + '" target="_blank">',
                    shortCode: 'STREK',
                    longCode: 'Sun Trek'
                },
                MSR: {
                    link: '<a href="http://www.survivalproshop.com/publications/medical-self-reliance-mega-manual.html' + utmsource + '" target="_blank">',
                    shortCode: 'MSR',
                    longCode: 'Medical Self Reliance Mega Manual'
                },
                FFL: {
                    link: '<a href="http://www.independentlivingnews.com/video/ffl-vsl.php' + utmsource + '" target="_blank">',
                    shortCode: 'FFL',
                    longCode: 'Freedom Fortress Library'
                },
                XCOM: {
                    link: '<a href="http://www.survivalproshop.com/extreme-weather-combo-30-day-maximum-shelf-life-food-reserve.html' + utmsource + '" target="_blank">',
                    shortCode: 'XCOM',
                    longCode: 'Extreme Weather Combo'
                },
                PW: {
                    link: '<a href="http://www.independentlivingnews.com/video/pw-vsl.php' + utmsource + '" target="_blank">',
                    shortCode: 'PW',
                    longCode: 'Power Whisperer'
                },
                CAN: {
                    link: '<a href="http://www.survivalproshop.com/survival-essentials/survival-kit-in-a-can.html' + utmsource + '" target="_blank">',
                    shortCode: 'CAN',
                    longCode: 'Survival Can in a Kit'
                },
                SUB: {
                    link: '<a href="http://www.independentlivingnews.com/signup/membership.stml' + utmsource + '" target="_blank">',
                    shortCode: 'SUB',
                    longCode: 'Subscription to Independent Living News'
                }
            };

        }
        if (getTemplateStyle() === "ALPACDB"){
            utmsource = '?utm_source=' + keycodeArray + '&utm_medium=email&utm_campaign=' + keycodeArray;
            codedURL = title1URL + utmsource; //appends our URL with a tracking code
            urlInsert1 = '<a href="' + codedURL + '" target="_blank">'; //updates urlInsert with the new utm-appended keycode
            if (imgHeight.length === 0 && imgWidth.length === 0) {
                imageRetrieve1 = '<center>' + urlInsert1 + '<img src="' + title1IMG + '" alt="Story Image" height="130" width="130"></a></center>';
            } else {
                imageRetrieve1 = '<center>' + urlInsert1 + '<img src="' + title1IMG + '" alt="Story Image" height="' + imgHeight[0] + '" width="' + imgWidth[0] + '"></a></center>';
            }

            productReference = {
                PPP: {
                    link: '<a href="http://americanlibertypac.com/2016-presidential-preference-poll-2/' + utmsource + '" target="_blank" alt="Presidential Preference Poll 2016">',
                    shortCode: 'PPP',
                    longCode: 'Presidential Preference Poll 2016'
                }
            };

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
                }
            ],
            smartFocus: {
                title: subjectLine,
                ALPAC: {
                    keycode: keycodeArray,
                    utmString: utmsource.toString(),
                    advertise: '<a href="mailto:info@americanlibertypac.org" target="_top">ADVERTISE</a>',
                    subscribe: '<a href="http://americanlibertypac.com/join/" target="_blank">SUBSCRIBE</a>',
                    unsubscribe: '<a href="http://news.extras-americanlibertypac.com/LP/ZHpjXCznPeQ" target="_blank">Unsubscribe</a> (You will be missed!)',
                    privacy: '<a href="http://conservativeemail.com/privacy-policy.html" target="_blank">View our policy.</a>'

                },
                ALP: {
                    keycode: keycodeArray,
                    utmString: utmsource.toString(),
                    safeSend:'<a href="http://www.independentlivingnews.com/il/whitelisting.php' + utmsource + '" linkname="safe sender" target="_blank">Add as Safe Sender</a>',
                    prefLink: '<a href="http://www.independentlivingnews.com/email/preferences/?u=[EMV FIELD]EMAIL_UUID[EMV /FIELD]&amp;k=' + keycodeArray + '-P" linkname="Email Preferences">Email Preferences</a>',
                    unsubLink: '<a href="http://www.independentlivingnews.com/email/preferences/?u=[EMV FIELD]EMAIL_UUID[EMV /FIELD]&amp;k=' + keycodeArray + '-U" linkname="Bottom Unsubscribe">Unsubscribe</a>',
                    spamLink: '<a href="http://www.independentlivingnews.com/email/preferences/?u=[EMV FIELD]EMAIL_UUID[EMV /FIELD]&amp;k=-S&amp;spam=1" linkname="Is this spam">Mark as Spam</a>'
                }
            },
            ALPACDB: {
                homepage: '<a href="http://www.americanlibertypac.com' + utmsource + '" target="new">Visit ALPAC</a>',
                alpacHeader: '<a href="http://www.americanlibertypac.com' + utmsource + '" target="new"><img src="http://p5tre.emv3.com/IL/0/0/1/1101054001/1686937737.gif" alt="American Liberty PAC" width="580" height="108" style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; width: auto; max-width: 100%; float: left; clear: both; display: block;" align="left" />'
            },
            RFARDB: {
                rfarHeader: '<a href="http://www.independentlivingnews.com/preppers' + utmsource + '" linkname="Todays Headlines" target="new"><img alt="Lee Bellingers Ready For Anything Report" border="0" height="118" src="http://www.independentlivingnews.com/email/images/iln_lb_ready-for-anything_header.jpg" style="display:block;" width="580" /></a>',
                subILN: '<a href="http://www.independentlivingnews.com/signup/membership.stml' + utmsource + '" target="_blank">'
            },
            ILNDB: {
                ilnHeader: '<a href="http://www.independentlivingnews.com' + utmsource + '" linkname="Todays Headlines" target="new"><img alt="Lee Bellingers Independent Living" border="0" height="117" src="http://www.independentlivingnews.com/email/images/ILN_LB_header.jpg" style="display:block;" width="580" /></a>',
                modalLink: '<a href="' + codedURL + '" linkname="Modal Headline" target="_blank"><span style="font-family:Arial, Helvetica, sans-serif; font-size:11px; color:#000000;">' + title1 + '</span></a>'
            },
            currentProduct: {
                link: '',
                shortCode: '',
                longCode: '',
                keyCode: '',
                utm: '',
                enabled: false
            }
        };
        getProduct();
        //console.log(storyz.currentProduct);
    }

    function secondStorySetup() {
        $('#story2Form').find('input').each(textFix);
        var utmsource;
        var codedURL;
        var title2 = $("#title2").val();
        var title2text = $("#title2text-div").html();
        var title2URL = $("#title2URL").val();
        var title2IMG = $("#title2IMG").val();
        var urlInsert2 = '<a href="' + title2URL + '" target="_blank">';
        var linkedTitle2 = '<h4><a href="' + title2URL + '" target="_blank">' + title2 + '</a></h4>';
        var imageRetrieve2 = '<center>' + urlInsert2 + '<img src="' + title2IMG + '"  width="130" height="130" alt="Story Image"></a></center>';
        var keycodeArray = [];
        keycodeArray[0]= $.trim($("#title1KEY").val());

        if (getTemplateStyle() === "RFARDB" || getTemplateStyle()  === "ILNDB") {
            utmsource = '?utm_source=' + keycodeArray + '&keycode=' + keycodeArray + '&u=[EMV FIELD]EMAIL_UUID[EMV /FIELD]';
            codedURL = title2URL + utmsource; //appends our URL with a tracking code
            urlInsert2 = '<a href="' + codedURL + '" target="_blank">'; //updates urlInsert with the new utm-appended keycode
            imageRetrieve2 = '<center>' + urlInsert2 + '<img src="' + title2IMG + '" alt="Story Image" height="' + imgHeight[1] + '" width="' + imgWidth[1] + '"></a></center>';

        }
        if (getTemplateStyle()  === 'ALPACDB'){
            utmsource = '?utm_source=' + keycodeArray + '&utm_medium=email&utm_campaign=' + keycodeArray;
            codedURL = title2URL + utmsource; //appends our URL with a tracking code
            urlInsert2 = '<a href="' + codedURL + '" target="_blank">'; //updates urlInsert with the new utm-appended keycode
            if (imgHeight.length === 0 && imgWidth.length === 0) {
                imageRetrieve2 = '<center>' + urlInsert2 + '<img src="' + title2IMG + '" alt="Story Image" height="130" width="130"></a></center>';
            } else {
                imageRetrieve2 = '<center>' + urlInsert2 + '<img src="' + title2IMG + '" alt="Story Image" height="' + imgHeight[1] + '" width="' + imgWidth[1] + '"></a></center>';
            }
        }

        //we push this directly to storyz so we can render our second story
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


    //**********************
    //BEGIN TEXT HANDLING  *
    //**********************

    function textFix(){
        var inputVal = $.trim($(this).val());
        if(S(inputVal).contains('.stml')) {
            var splitSTML = $.trim($(this).val().split('.stml')[0]); //split the value into two parts of an array.
            $(this).val(splitSTML+".stml");	//re-add the .stml ending
        } else if(S(inputVal).contains('.html')) {
            var splitHTML = $.trim($(this).val().split('.html')[0]);
            $(this).val(splitHTML+".html");
        } else if(S(inputVal).contains('?utm_source')) {
            var splitUTM = $.trim($(this).val().split('?utm_source')[0]);
            $(this).val(splitUTM);
        } else if(S(inputVal).contains(' - See more at:')) {
            var splitSeeMore = $.trim($(this).val().split(' - See more at:')[0]);
            $(this).val(splitSeeMore);
        }

    }
    //The textFix scrubs links of anything extending past
    // .html | .stml | ?utm_source |  - See more at:
    //Additionally, it strips existing UTM codes away, which is Kelly-proof (hopefully)

    //sanitizeRender takes the value of our template and removes the head, body, html, and style sections.
    //I used string replace because simply removing the tags was not enough.
    function sanitizeRender(content){
        var that = this;
        if(S(content).contains('<style>')) {
            var x = true;
            var i = 0;
            while (x === true) {
                if (S(content).contains('<style>')) {
                    content = content.replace(/<style>[\s\S]*?<\/style>/, '');
                    i++;
                    console.log("sanitizeRender() used " + i + " times.");
                } else {
                    x = false;
                }
            }
        }
        return (S(content).stripTags('html', 'head', 'body').s);
    }

    function getImageSize(e, x) { //e is the image src, x is the storage value in imgWidth/Height
        var img = new Image();
        img.onload = function() {

            console.log('Original Size: ' + this.naturalHeight + 'x' + this.naturalWidth);
            var maxWidth = 130; // Max width for the image
            var maxHeight = 130;    // Max height for the image
            var ratio = 0;  // Used for aspect ratio
            var width = this.naturalWidth;    // Current image width
            var height = this.naturalHeight;  // Current image height

            // Check if the current width is larger than the max
            if(width > maxWidth && width >= height ){
                ratio = maxWidth / width;   // get ratio for scaling image
                console.log('RESIZE ----WIDTH---');
                console.log('Now: ' + maxWidth + 'x' + (height * ratio));
                imgHeight[x] = height * ratio;    // Reset height to match scaled image
                imgWidth[x] = maxWidth;    // Reset width to match scaled image
            } else if(height > maxHeight) {
                ratio = maxHeight / height; // get ratio for scaling image
                console.log('RESIZE -----HEIGHT--');
                console.log('Now: ' + maxHeight + 'x' + (width * ratio));   // Set new height
                imgWidth[x] = width * ratio;    // Reset width to match scaled image
                imgHeight[x] = maxHeight;    // Reset height to match scaled image
            }

        };
        img.src = e;
    }


    //TODO RSS attempt - in progress
    function getRSS(event) {
        event.preventDefault();
        var q = 0;
        var formatStorage = [];
        $.ajax({
            url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent('http://americanlibertypac.com/feed/'),
            dataType: 'json',
            success: function (data) {
                if (data.responseData.feed && data.responseData.feed.entries) {
                    $.each(data.responseData.feed.entries, function (i, e) {
                        var f = e.content;

                        function cleanDescription(desc) {
                            var x = S(desc).stripTags('div', 'img', 'html', 'script', 'iframe').s;
                            console.log(x);
                            return x;
                        }

                        //this chunk grabs img src values from the RSS feed
                        var content = document.createElement("content");
                        content.innerHTML = e.content;
                        var images = $(content).find('img').map(function () {
                            return $(this).attr('src');
                        }).get();


                        function defaultImageCheck(){ //replaces undefined images with a default
                            if (images[0] === undefined){
                                images[0] = 'http://americanlibertypac.com/wp-content/uploads/2015/02/AMLIBPAC_circle_130x130.png';
                            }
                        }
                        defaultImageCheck();

                        publicArray[i] = {
                            storyNum: q,
                            title: e.title,
                            link: e.link,
                            imgsrc: images[0],
                            description: cleanDescription(f)
                        };

                        var divID = 'rssStory' + publicArray[i].storyNum;
                        var btnID1 = 'rss1Btn' + publicArray[i].storyNum;
                        var btnID2 = 'rss2Btn' + publicArray[i].storyNum;
                        var imgID = 'rssImg' + publicArray[i].storyNum;


                        //if (q < 8) { //displays 8 results
                        //    $('#rssPreview').append(
                        //        '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-6" style="padding-top:15px;" id="' + divID + '"><p style="font-size: 10px; text-align: center;"><img src="' + publicArray[i].imgsrc + '" width="75" height="75" id="' + imgID + '" style="float: left"/>' +
                        //        publicArray[i].title +
                        //        '<br /><center><button type="button" class="btn btn-primary btn-xs" id="' + btnID1 + '">Story #1</button> <button type="button" class="btn btn-primary btn-xs" id="' + btnID2 + '">Story #2</button>' +
                        //        '</center></p></div>'
                        //    );
                        //}

                        if (q < 8) { //displays 8 results
                            formatStorage[q] =
                                '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-6" style="padding-top:15px;" id="' + divID + '"><p style="font-size: 10px; text-align: center;"><img src="' + publicArray[i].imgsrc + '" width="75" height="75" id="' + imgID + '" style="float: left"/>' +
                                publicArray[i].title +
                                '<br /><center><button type="button" class="btn btn-primary btn-xs" id="' + btnID1 + '">Story #1</button> <button type="button" class="btn btn-primary btn-xs" id="' + btnID2 + '">Story #2</button>' +
                                '</center></p></div>';
                        }

                        q++; // increment by one to keep the loop ticking up
                    });
                }
            }
        }).done(function() {  //assigns values to the buttons, after ajax request is done. if we don't wait for ajax, this won't render correctly.
            //TODO perhaps add the "Generate RSS" button back after generating.
            var joinRSS = formatStorage.join('');
            $('#rssPreview').html(joinRSS);
            function buttonUpdateField(e) {
                $('#rss1Btn'+e).click(function () {
                    $('#title1').val(publicArray[e].title);
                    $('#title1text-div').html(publicArray[e].description);
                    $('#title1URL').val(publicArray[e].link);
                    $('#title1IMG').val(publicArray[e].imgsrc);
                    getImageSize(publicArray[e].imgsrc, 0); //0 means first story
                });
                $('#rss2Btn'+e).click(function () {
                    if (additionalContentVal === true) {
                        $('#title2').val(publicArray[e].title);
                        $('#title2text-div').html(publicArray[e].description);
                        $('#title2URL').val(publicArray[e].link);
                        $('#title2IMG').val(publicArray[e].imgsrc);
                        getImageSize(publicArray[e].imgsrc, 1);
                    } else {
                        console.log('No second story!');
                    }
                });

            }
            for(var n=0; n < 8; n++){
                buttonUpdateField(n);
            }
        });
    }


    //********************************
    //BEGIN POST-BUTTON CLICK ACTIONS
    //********************************
    $("#generateHTML").click(function(event) {
            event.preventDefault(); //Stops page from reloading
            if ($("#title1").val() === "") {
                alert("Please enter a story");
            } else {
                makeKeyCode(event);
                getTemplateStyle(); //Start by finding out which template we're using
                firstStorySetup();
                if (additionalContentVal === true) {
                    secondStorySetup();
                }
                getResults();

                $("#resultsContainer1").show("drop"); //Shows the results once everything is ready.
                $("#resultsContainer2").show("drop"); //Shows the results once everything is ready.
                $("#emailBtnDiv").show('drop');
            }
        }
    );

});
