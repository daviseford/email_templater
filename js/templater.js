// JavaScript Document
$(document).ready(function () {
    //*******************************
    // DOCUMENT AND VAR SETUP
    //*******************************
    var loadSpin = $('#loader'); //sets up our loading gif
    $(document).on({
        ajaxStart: function() { loadSpin.addClass("loadingOn");    },
        ajaxStop: function() { loadSpin.removeClass("loadingOn"); }
    });

    $("#resultsContainer1").hide(); //Hiding our results, as we don't need to see them yet!
    $("#resultsContainer2").hide();
    $("#story2Div").hide(); //Hiding our second story panel.
    $("#emailBtnDiv").hide();
    $("#getRSSBtn").hide();
    $("#getLLRSS").hide();

    var additionalContentVal = false; //This makes us default to a one-story format.
    var templateContainer;
    imgHeight = []; //global image container
    imgWidth = [];

    var adReferenceILN = {
        USR: {
            link: 'http://www.independentlivingnews.com/video/usr-vsl.php',
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
            link: 'http://www.independentlivingnews.com/video/great-american-blackout-ihnp.php',
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
            link: 'http://www.independentlivingnews.com/video/comfort-food-reserve.php',
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
            link: 'https://www.independentlivingnews.com/video/csg-video.php',
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
            link: 'http://www.independentlivingnews.com/video/lpl-video.php',
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
            link: 'http://www.independentlivingnews.com/video/epack2-video.php',
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
            link: 'http://www.independentlivingnews.com/video/suntrek/',
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
            link: 'http://www.survivalproshop.com/publications/medical-self-reliance-mega-manual.html',
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
            link: 'http://www.independentlivingnews.com/video/ffl-vsl.php',
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
            link: 'http://www.survivalproshop.com/extreme-weather-combo-30-day-maximum-shelf-life-food-reserve.html',
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
            link: 'http://www.independentlivingnews.com/video/pw-vsl.php',
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
            link: 'http://www.survivalproshop.com/survival-essentials/survival-kit-in-a-can.html',
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
            link: 'http://www.independentlivingnews.com/signup/membership.stml',
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
            link: 'http://americanlibertypac.com/2016-presidential-preference-poll-2/',
            shortCode: 'PPP',
            longCode: 'Presidential Preference Poll 2016',
            advertisements: {
                0: {
                    name: 'PPP1',
                    description: 'Rand/Romney'
                },
                1: {
                    name: 'PPP2',
                    description: 'Bush/Walker'
                }
            }
        },
        HILL: {
            link: 'https://secure.yourpatriot.com/ou/alpac/1826/donate.aspx',
            shortCode: 'HILL',
            longCode: 'Not Ready For Hillary Bumper Sticker',
            advertisements: {
                0: {
                    name: 'HILL1',
                    description: 'Not Ready For Hillary Sticker (350x137)'
                },
                1: {
                    name: 'HILL2',
                    description: 'Not Ready For Hillary Sticker (500x196)'
                }
            }

        },
        JGM: {
            link: 'https://minutemanproject.com/donate-2/',
            shortCode: 'JGM',
            longCode: 'Secure The Border Bumper Sticker',
            advertisements: {
                0: {
                    name: 'JGM1',
                    description: 'Secure The Border Bumper Sticker'
                }
            }
        }
    };

    function makeKeyCodeTest() {
        var x =[];
        x = [$("#inlinedate").val(),$("#listSelect").val(),$("#tmplSelect").val(),$("#productSelect").val()];
        x = x.join('');
        return x;
    }

    function updateKeyCodeField() {
        var x =[];
        x = [$("#inlinedate").val(),$("#listSelect").val(),$("#tmplSelect").val(),$("#productSelect").val()];
        x = x.join('');
        $("#keycodeInput")
            .val(x)
            .effect('highlight', 'slow');
    }

    templateContainer = {
        keycode: makeKeyCodeTest(),//templateContainer will eventually be the one stop shop for all constant variables
        ALPAC: {                //we start with the client name
            DB: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/alpac_db_Tmpl.htm',
                shortCode: 'ALPACDB',
                longCode: 'American Liberty PAC Daily Bulletin',
                imgMaxWidth: 130,
                imgMaxHeight: 130,
                productMenu: adReferenceWJMA, //may change in the future, this stores the ads
                rssFeed: 'http://americanlibertypac.com/feed/',
                defaultLogo: 'http://americanlibertypac.com/wp-content/uploads/2015/02/AMLIBPAC_circle_130x130.png',
                feedStyle: function() {
                    getRSSWithImage(event, this.rssFeed);
                },
                utmStyle: function() {
                    var x = makeKeyCodeTest();
                    var y = '?utm_source=' + x + '&utm_medium=email&utm_campaign=' + x;
                    return y;
                }

            },
            MR: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/alpac_mr_Tmpl.htm',
                shortCode: 'ALPACMR',
                longCode: 'American Liberty PAC Must Read',
                imgMaxWidth: '',
                imgMaxHeight: '',
                productMenu: adReferenceWJMA,
                rssFeed: 'http://americanlibertypac.com/feed/',
                defaultLogo: 'http://americanlibertypac.com/wp-content/uploads/2015/02/AMLIBPAC_circle_130x130.png',
                feedStyle: function() {
                    getRSSWithImage(event, this.rssFeed);
                },
                utmStyle: function () {
                    var x = makeKeyCodeTest();
                    var y = '?utm_source=' + x + '&utm_medium=email&utm_campaign=' + x;
                    return y;
                }
            }
        },
        JGM: {
            MR: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/jgm_mr_Tmpl.htm',
                shortCode: 'JGMMR',
                longCode: 'Minuteman Project Must Read',
                imgMaxWidth: '',
                imgMaxHeight: '',
                productMenu: adReferenceWJMA,
                rssFeed: 'http://minutemanproject.com/feed/',
                defaultLogo: 'http://daviseford.com/sites/default/files/email_templater/images/mmp_75x75.png',
                feedStyle: function () {
                    getRSSWithoutImage(event, this.rssFeed);
                },
                utmStyle: function () {
                    var x = makeKeyCodeTest();
                    var y = '?utm_source=' + x + '&utm_medium=email&utm_campaign=' + x;
                    return y;
                }
            },
            DB: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/jgm_db_Tmpl.htm',
                shortCode: 'JGMDB',
                longCode: 'Minuteman Project Daily Bulletin',
                imgMaxWidth: '',
                imgMaxHeight: '',
                productMenu: adReferenceWJMA,
                rssFeed: 'http://minutemanproject.com/feed/',
                defaultLogo: 'http://daviseford.com/sites/default/files/email_templater/images/mmp_75x75.png',
                feedStyle: function () {
                    getRSSWithoutImage(event, this.rssFeed);
                },
                utmStyle: function () {
                    var x = makeKeyCodeTest();
                    var y = '?utm_source=' + x + '&utm_medium=email&utm_campaign=' + x;
                    return y;
                }
            }
        },
        ILN: {
            DB: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/iln_db_Tmpl.htm',
                shortCode: 'ILNDB',
                longCode: 'Independent Living News Daily Bulletin',
                imgMaxWidth: '175',
                imgMaxHeight: '175',
                productMenu: adReferenceILN,
                rssFeed: '', //we use getILNAPI for this case, because their RSS isn't helpful
                defaultLogo: 'http://daviseford.com/sites/default/files/email_templater/images/iln_75x75.png',
                feedStyle: function() {
                    getILNAPI(event);
                },
                utmStyle: function() {
                    var x = makeKeyCodeTest();
                    var y = '?utm_source=' + x + '&keycode=' + x + '&u=[EMV FIELD]EMAIL_UUID[EMV /FIELD]';
                    return y;
                }
                //imgStyle: <img align="right" alt="" src="' + title1IMG + '" style="padding: 6px; float:right;" height="' + imgHeight[0] + '" width="' + imgWidth[0] + '"/></a>';
            }
        },
        RFAR: {
            DB: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/rfar_db_Tmpl.htm',
                shortCode: 'RFARDB',
                longCode: 'Ready For Anything Report',
                imgMaxWidth: '130',
                imgMaxHeight: '130',
                productMenu: adReferenceILN,
                rssFeed: '', //we use getILNAPI for this case, because their RSS isn't helpful
                defaultLogo: 'http://daviseford.com/sites/default/files/email_templater/images/iln_75x75.png',
                feedStyle: function() {
                    getILNAPI(event);
                },
                utmStyle: function() {
                    var x = makeKeyCodeTest();
                    var y = '?utm_source=' + x + '&keycode=' + x + '&u=[EMV FIELD]EMAIL_UUID[EMV /FIELD]';
                    return y;
                }
                //imgStyle: '<center>' + urlInsert1 + '<img src="' + title1IMG + '" alt="Story Image" height="' + imgHeight[0] + '" width="' + imgWidth[0] + '"></a></center>'
            }
        },
        LL: {
            DB: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/ll_db_Tmpl.htm',
                shortCode: 'LLDB',
                longCode: 'Learn Liberty Daily Bulletin',
                imgMaxWidth: '',
                imgMaxHeight: '',
                productMenu: '',
                rssFeed: 'http://opportunities.theihs.org/rss.xml?&t[]=200&w=100',
                defaultLogo: '',
                feedStyle: function() {
                    getRSSWithoutImage(event, this.rssFeed);
                },
                utmStyle: function() {
                    //var x = makeKeyCodeTest();
                    //console.log('rfardb utm x = ' + x);
                    //var y = '?utm_source=' + x + '&keycode=' + x + '&u=[EMV FIELD]EMAIL_UUID[EMV /FIELD]';
                    return '';
                }
            }
        },
        helpers: {
            updateCurrentProduct: function (adReference, utmStyle) { //returns the correct ad. for example, adReferenceILN.XCOM.
                var b;
                var adRef = adReference;
                var utm = utmStyle;
                b = $('#productSelect').val(); //example value: XCOM1
                if (b !== '' && b !== null) {
                    var c = S(b).right(1).toInt(); //gives us our ad template number (1)
                    var d = S(b).strip('1', '2', '3', '4', '5', '6', '7', '8', '9', '0').s;
                    var e = d.toString();               //so we get the text portion of the keycode, which could be "XCOM" or "CAN".
                    var f = adRef[e].link;
                    var g = adRef[e].shortCode; //This is the same as writing productReference.XCOM.longCode
                    var h = adRef[e].longCode;
                    var i = '<a href="'+ f + utm +'" target="_blank">';

                    templateContainer.currentProduct = {
                        link: f,
                        trackedLink: i,
                        tmplNum: c,
                        shortCode: g,
                        longCode: h,
                        enabled: true
                    };
                } else {
                    templateContainer.currentProduct = {
                        link: '',
                        trackedLink: '',
                        tmplNum: '',
                        shortCode: '',
                        longCode: '',
                        enabled: false
                    };
                    console.log('No Product selected!');
                }
            }
        }
    };


    //checks our template style for us, useful when doing keycodes
    function getTemplateStyle(){
        var y = [$('#listSelect').val(), $('#tmplSelect').val()]; //RFAR,DB
        var x = y.join(''); //can't return x the way I have it constructed
        return y; //return RFAR,DB
    }

    function enableSmartFocusVars() {
        var subjectLine = $.trim($('#subjectInput').val());
        var keycode = makeKeyCodeTest();

        var utmILN = templateContainer.ILN.DB.utmStyle();
        var utmALPAC = templateContainer.ALPAC.DB.utmStyle();

        templateContainer.smartFocus = {       //we use the smartfocus section for constant values like unsubscribe links, privacy policies, etc.
            title: subjectLine,
            keycode: keycode,
            ALPAC: {
                keycode: keycode,
                advertise: '<a href="mailto:info@americanlibertypac.org" target="_top">ADVERTISE</a>',
                subscribe: '<a href="http://americanlibertypac.com/join/" target="_blank">SUBSCRIBE</a>',
                unsubscribe: '<a href="http://news.extras-americanlibertypac.com/LP/ZHpjXCznPeQ" target="_blank">Unsubscribe</a> (You will be missed!)',
                privacy: '<a href="http://conservativeemail.com/privacy-policy.html" target="_blank">View our policy.</a>',
                alpacHeader: '<a href="http://www.americanlibertypac.com' + utmALPAC + '" target="new"><img src="http://p5tre.emv3.com/IL/0/0/1/1101054001/1686937737.gif" alt="American Liberty PAC" width="580" height="108" style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; width: auto; max-width: 100%; float: left; clear: both; display: block;" align="left" />'

            },
            ALP: {
                keycode: keycode,
                safeSend:'<a href="http://www.independentlivingnews.com/il/whitelisting.php' + utmILN + '" linkname="safe sender" target="_blank">Add as Safe Sender</a>',
                prefLink: '<a href="http://www.independentlivingnews.com/email/preferences/?u=[EMV FIELD]EMAIL_UUID[EMV /FIELD]&amp;k=' + keycode + '-P" linkname="Email Preferences">Email Preferences</a>',
                unsubLink: '<a href="http://www.independentlivingnews.com/email/preferences/?u=[EMV FIELD]EMAIL_UUID[EMV /FIELD]&amp;k=' + keycode + '-U" linkname="Bottom Unsubscribe">Unsubscribe</a>',
                spamLink: '<a href="http://www.independentlivingnews.com/email/preferences/?u=[EMV FIELD]EMAIL_UUID[EMV /FIELD]&amp;k=-S&amp;spam=1" linkname="Is this spam">Mark as Spam</a>',
                rfarHeader: '<a href="http://www.independentlivingnews.com/preppers' + utmILN + '" linkname="Todays Headlines" target="new"><img alt="Lee Bellingers Ready For Anything Report" border="0" height="118" src="http://www.independentlivingnews.com/email/images/iln_lb_ready-for-anything_header.jpg" style="display:block;" width="580" /></a>',
                subILN: '<a href="http://www.independentlivingnews.com/signup/membership.stml' + utmILN + '" target="_blank">',
                ilnHeader: '<a href="http://www.independentlivingnews.com' + utmILN + '" linkname="Todays Headlines" target="new"><img alt="Lee Bellingers Independent Living" border="0" height="118" src="http://www.independentlivingnews.com/email/images/ILN_LB_header_edited.jpg" style="display:block;" width="580" /></a>'
            }
        };
    }

    function imageDelay() {
        $('#story1Form').find('input').each(textFix);
        $('#story2Form').find('input').each(textFix);
        var currentTemplateSettings = getCurrentTemplateSettings(); //e.g. templateContainer.LL.DB

        var genericW = 130;
        var genericH = 130;

        var title1IMG = $("#title1IMG").val();
        var title2IMG = $("#title2IMG").val();

        var maxW = currentTemplateSettings.imgMaxWidth;
        var maxH = currentTemplateSettings.imgMaxHeight;

        if (maxH === '' || maxH === undefined || maxH === 0) {
            getImageSize(title1IMG, 0, genericW, genericH);
            getImageSize(title2IMG, 1, genericW, genericH); //if we don't have an image size set, use generic
        } else {
            getImageSize(title1IMG, 0, maxW, maxH); //otherwise use the currentTemplate's setting
            getImageSize(title2IMG, 1, maxW, maxH);
        }
    }
    function updateStory1(currentTemplateSettings){
        var currentTemplateSettings = currentTemplateSettings;
        var utm = currentTemplateSettings.utmStyle();
        var adjustedHeight = imgHeight[0];
        var adjustedWidth = imgWidth[0];
        var title = $('#title1').val();
        var titletext = $("#title1text-div").html();
        var titleURL = $("#title1URL").val();
        var titleIMG = $("#title1IMG").val();
        var urlInsert = '<a href="' + titleURL + utm + '" target="_blank">';
        var linkedImage = urlInsert + '<img src="' + titleIMG + '" alt="Story Image" height="' + adjustedHeight + '" width="' + adjustedWidth +'"></a>';
        var imageAlignedRight = urlInsert + '<img align="right" alt="" src="' + titleIMG + '" style="padding: 6px; float:right;" height="' + adjustedHeight  + '" width="' + adjustedWidth + '"/></a>';
        var trackedURL = titleURL + utm;

        templateContainer.story1 = {
            adjustedHeight: adjustedHeight,
            adjustedWidth: adjustedWidth,
            title: title,
            text: titletext,
            url: titleURL,
            imageURL: titleIMG,
            urlInsert: urlInsert,
            insertImage: linkedImage,
            insertImageAlignedRight: imageAlignedRight,
            utm: utm,
            trackedURL: trackedURL
        };
    }

    function updateStory2(currentTemplateSettings){
        var currentTemplateSettings = currentTemplateSettings;
        var utm = currentTemplateSettings.utmStyle();
        var adjustedHeight = imgHeight[1];
        var adjustedWidth = imgWidth[1];
        var title = $('#title2').val();
        var titletext = $("#title2text-div").html();
        var titleURL = $("#title2URL").val();
        var titleIMG = $("#title2IMG").val();
        var urlInsert = '<a href="' + titleURL + utm + '" target="_blank">';
        var linkedImage = urlInsert + '<img src="' + titleIMG + '" alt="Story Image" height="' + adjustedHeight + '" width="' + adjustedWidth +'"></a>';
        var trackedURL = titleURL + utm;

        templateContainer.story2 = {
            adjustedHeight: adjustedHeight,
            adjustedWidth: adjustedWidth,
            title: title,
            text: titletext,
            url: titleURL,
            imageURL: titleIMG,
            urlInsert: urlInsert,
            insertImage: linkedImage,
            utm: utm,
            trackedURL: trackedURL
        };
    }

    function compileEmail(templateContainer){ //pass in our references
        var x = getTemplateStyle(); //returns two values in an array, first value is the list, second is the template, e.g "RFAR","DB"
        var list = x[0];
        var tmpl = x[1];
        var currentTemplateSettings = templateContainer[list][tmpl]; //e.g. templateContainer.LL.DB

        updateStory1(currentTemplateSettings);
        if (additionalContentVal === true) {
            updateStory2(currentTemplateSettings);
        }

        enableSmartFocusVars(); //sets up common links (unsubscribes, etc)

        templateContainer.helpers.updateCurrentProduct(currentTemplateSettings['productMenu'], currentTemplateSettings.utmStyle());
        //finds out what productMenu (adReference object) we're using
        //pass the current product menu and current UTM style (keycodes are already pre-filled)


        if (currentTemplateSettings.tmplLink !== '') {
            spawnTemplate(currentTemplateSettings.tmplLink); //Sends link to spawnTemplate()
            $("#resultsContainer1").show("drop"); //Shows the results once everything is ready.
            $("#resultsContainer2").show("drop"); //Shows the results once everything is ready.
            $("#emailBtnDiv").show('drop');
        } else {
            alert('You have chosen an invalid email');
        }
    }

    //*******************************
    // BUTTON AND MENU SETUP START
    //*******************************

    //Establishing the datepicker
    $( "#inlinedate" ).datepicker({
        dateFormat: "ymmdd" //Outputs as YYMMDD
    });


    function updateAdReferenceMenu() {
        var x = getCurrentTemplateSettings();
        makeProductMenu(x.productMenu);
    }
    function getCurrentTemplateSettings(){
        var x = getTemplateStyle(); //returns two values in an array, first value is the list, second is the template, e.g "RFAR","DB"
        var list = x[0]; //list, e.g. RFAR
        var tmpl = x[1];
        return templateContainer[list][tmpl]; //e.g. templateContainer.LL.DB
    }

    function setupRSSBtn() {
        var currentTemplateSettings = getCurrentTemplateSettings(); //e.g. templateContainer.LL.DB
        currentTemplateSettings.feedStyle();
    }

    $('#getRSSNewButton')
        .button()
        .click(function(event) {
            event.preventDefault();
            setupRSSBtn();
        });
    $('#listSelect')
        .selectmenu({
            width: 150,
            change: function() {
                var x = getTemplateStyle(); //returns two values in an array, first value is the list, second is the template, e.g "RFAR","DB"
                var a = x.join('');

                updateAdReferenceMenu(); //added to cut down on makeProductMenu references

                //var rssPreviewGeneral = $('#rssPreviewGeneral');
                var title1Label = $("#title1label");

                if (a === 'ILNDB') {
                    title1Label.text('Modal Headline:');
                } else {
                    title1Label.text('Title #1:');
                }
            }
        });


    //setting up productSelect menu (with overflow because there's lots of products)
    $('#productSelect')
        .selectmenu({width:225})
        .selectmenu('menuWidget')
        .addClass('overflow');

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

    //setting up our story boxes
    var editor1 = new wysihtml5.Editor("title1text-div", { // id of textarea element
        toolbar:      "wysihtml-toolbar1", // id of toolbar element
        parserRules:  wysihtml5ParserRules // defined in parser rules set
    });
    var editor2 = new wysihtml5.Editor("title2text-div", { // id of textarea element
        toolbar:      "wysihtml-toolbar2", // id of toolbar element
        parserRules:  wysihtml5ParserRules // defined in parser rules set
    });


    function makeEmailBtn() {
        var i = 0; //I added this counter to stop the multiple submission bug.
        $("#emailHTML")
            .button()
            .show()
            .click(function() {
                if (i === 0) {
                    sendEmail();
                }
                i++;
            });
    }

    function sendEmail() {
        var x = $("#resultsTextArea").val();
        var z = $("#keycodeInput").val();
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

    function spawnTemplate(tmplLink) { //could probably replace this with the new loader https://github.com/stevenmhunt/tmpl.loader
        var templateLink = tmplLink;
        var templateLoader;
        function getTemplate(src) {
            return $.get(src, function (value) {
                templateLoader  = $.templates(value);
            });
        }
        $.when(
            getTemplate(templateLink)
        ).then(function () {
                var html = templateLoader.render(templateContainer);
                $("#resultsTextArea").val(html); //Puts the raw HTML into the textbox so we can easily copy it.
                $("#resultsDiv").html(sanitizeRender(html)); //Renders the HTML version of the email
                makeEmailBtn(); //take this out if it gets abused
            }).fail(function () {
                console.log("spawnTemplate(" + tmplLink + "): Something went wrong!");
            });
    }


    function makeProductMenu(x) {
        var setupMenu ='<label for="productSelect">STEP 4<br />Select a Product</label><br><select name="productSelect" id="productSelect"><option value="" selected="selected">None</option>';
        var endMenu = '</select>';
        var allAdsArray = [];
        var productSelect = $('#productSelect');
        if (x === '' || x === undefined) {
            productSelect.html(setupMenu+endMenu); //just spawns a blank list. could rework
            productSelect.selectmenu('refresh'); //refresh our changes. doesn't work without this.
        } else {
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
                        for (h = 0; h < z; h++) {
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
            productSelect.html(setupMenu + allAdsArray + endMenu);
            productSelect.selectmenu('refresh'); //refresh our changes. doesn't work without this.
        }
    }
    makeProductMenu(adReferenceILN); //initialize our menu with ILN values, since the menu defaults to RFAR

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

    function getImageSize(src, storage, width, height) { //e is the image src, x is the storage value in imgWidth/Height
        var img = new Image();
        var maxWidth = width; // Max width for the image
        var maxHeight = height;    // Max height for the image

        img.onload = function () {
            console.log('maxSize: ' + maxWidth + 'x' + maxHeight);
            console.log('Original Size of image ' + (storage + 1) + ': ' + img.naturalWidth + 'x' + img.naturalHeight);
            var ratio = 0;  // Used for aspect ratio
            var width = this.naturalWidth;    // Current image width
            var height = this.naturalHeight;  // Current image height

            // Check if the current width is larger than the max
            if (width > maxWidth && width >= height) {
                ratio = maxWidth / width;   // get ratio for scaling image
                console.log('RESIZE ----WIDTH---');
                console.log('Now: ' + maxWidth + 'x' + Math.floor(height * ratio));
                imgHeight[storage] = Math.floor(height * ratio);    // Reset height to match scaled image
                imgWidth[storage] = maxWidth;    // Reset width to match scaled image
            } else if (height > maxHeight) {
                ratio = maxHeight / height; // get ratio for scaling image
                console.log('RESIZE -----HEIGHT--');
                console.log('Now: ' + Math.floor(width * ratio) + 'x' + maxHeight);   // Set new height
                imgWidth[storage] = Math.floor(width * ratio);    // Reset width to match scaled image
                imgHeight[storage] = maxHeight;    // Reset height to match scaled image
            }
        };
        img.src = src;
    }


    function getILNAPI(event){
        event.preventDefault();
        var resultsHolder = [];
        var formatStorage = [];
        $.ajax({
            url:"https://www.kimonolabs.com/api/5pbx5hy0?apikey=t6jhRsPktqd4z4ZU72c3JRv97ji2EiPP",
            crossDomain: true,
            dataType: "jsonp",
            success: function (response) {
                var original = response;
                var numStories = original.count;
                var results = original.results.health;
                var x = getCurrentTemplateSettings();

                function removeNewLine(title){
                    //This javascript replaces all 3 types of line breaks with a space
                    //credit: http://www.textfixer.com/tutorials/javascript-line-breaks.php
                    return (title.replace(/(\r\n|\n|\r)/gm," "));
                }

                for (var i=0; i < numStories; i++){
                    resultsHolder[i] = {
                        storyNum: i,
                        title: removeNewLine(results[i].title),
                        link: results[i].link,
                        imgsrc: x.defaultLogo
                    };
                }

                for (var q = 0; q < 9; q++) { //displays 9 results
                    var btnID1 = 'rss1Btn' + resultsHolder[q].storyNum;
                    var btnID2 = 'rss2Btn' + resultsHolder[q].storyNum;
                    formatStorage[q] =
                        '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-6 rssHolder"><p style="font-size: 10px; text-align: center;"><img src="' + resultsHolder[q].imgsrc + '" width="75" height="75" style="float: left"/>' +
                        resultsHolder[q].title +
                        '<br /><center><button type="button" class="btn btn-primary btn-xs" id="' + btnID1 + '">Story #1</button> <button type="button" class="btn btn-primary btn-xs" id="' + btnID2 + '">Story #2</button>' +
                        '</center></p></div>';
                }

            },
            error: function (xhr, status) {
                console.log('ERROR Retrieving ILN API');
            }
        }).done(function() {
            var joinRSS = formatStorage.join('');
            $('#rssPreviewGeneral').html(joinRSS);
            function buttonUpdateField(e) {
                $('#rss1Btn'+e).click(function () {
                    $('#title1').val(resultsHolder[e].title);
                    $('#title1URL').val(resultsHolder[e].link);
                });
                $('#rss2Btn'+e).click(function () {
                    if (additionalContentVal === true) {
                        $('#title2').val(resultsHolder[e].title);
                        $('#title2URL').val(resultsHolder[e].link);
                    } else {
                        console.log('No second story!');
                    }
                });

            }
            for(var n=0; n < 9; n++){ //makes nine buttons
                buttonUpdateField(n);
            }
        });
    }



    function getRSSWithImage(event, feed) {
        event.preventDefault();
        var q = 0;
        var formatStorage = [];
        var rssObject = [];
        $.ajax({
            url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(feed),
            dataType: 'json',
            success: function (data) {
                if (data.responseData.feed && data.responseData.feed.entries) {
                    $.each(data.responseData.feed.entries, function (i, e) {
                        var f = e.content;

                        function cleanDescription(desc) {
                            var x = S(desc).stripTags('div', 'img', 'html', 'script', 'iframe', 'a', 'tr', 'td', 'style', 'blockquote', 'caption').s;
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
                                var x = getCurrentTemplateSettings();
                                images[0] = x.defaultLogo;
                            }
                        }
                        defaultImageCheck();

                        rssObject[i] = {
                            storyNum: q,
                            title: e.title,
                            link: e.link,
                            imgsrc: images[0],
                            description: cleanDescription(f)
                        };

                        var divID = 'rssStory' + rssObject[i].storyNum;
                        var btnID1 = 'rss1Btn' + rssObject[i].storyNum;
                        var btnID2 = 'rss2Btn' + rssObject[i].storyNum;
                        var imgID = 'rssImg' + rssObject[i].storyNum;


                        if (q < 9) { //displays 8 results
                            formatStorage[q] =
                                '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-6 rssHolder" id="' + divID + '"><p style="font-size: 10px; text-align: center;"><img src="' + rssObject[i].imgsrc + '" width="75" height="75" id="' + imgID + '" style="float: left"/>' +
                                rssObject[i].title +
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
            $('#rssPreviewGeneral').html(joinRSS);
            function buttonUpdateField(e) {
                $('#rss1Btn'+e).click(function () {
                    $('#title1').val(rssObject[e].title);
                    $('#title1text-div').html(rssObject[e].description);
                    $('#title1URL').val(rssObject[e].link);
                    $('#title1IMG').val(rssObject[e].imgsrc);
                    //getImageSize(rssObject[e].imgsrc, 0, maxWidth, maxHeight); //0 means first story, 130x130 image size
                });
                $('#rss2Btn'+e).click(function () {
                    if (additionalContentVal === true) {
                        $('#title2').val(rssObject[e].title);
                        $('#title2text-div').html(rssObject[e].description);
                        $('#title2URL').val(rssObject[e].link);
                        $('#title2IMG').val(rssObject[e].imgsrc);
                        //getImageSize(rssObject[e].imgsrc, 1, maxWidth, maxHeight);
                    } else {
                        console.log('No second story!');
                    }
                });

            }
            for(var n=0; n < 9; n++){
                buttonUpdateField(n);
            }
        });
    }

    function getRSSWithoutImage(event, feed) {
        event.preventDefault();
        var q = 0;
        var formatStorage = [];
        var rssObject = [];
        $.ajax({
            url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(feed),
            dataType: 'json',
            success: function (data) {
                if (data.responseData.feed && data.responseData.feed.entries) {
                    $.each(data.responseData.feed.entries, function (i, e) {
                        var x = getCurrentTemplateSettings();

                        var f = e.content;

                        rssObject[i] = {
                            storyNum: q,
                            title: e.title,
                            link: e.link,
                            description: e.content,
                            imgsrc: x.defaultLogo
                        };

                        var btnID1 = 'rss1Btn' + rssObject[i].storyNum;
                        var btnID2 = 'rss2Btn' + rssObject[i].storyNum;

                        if (q < 9) { //stores HTML formatted values for later use
                            formatStorage[q] =
                                '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-6 rssHolder"><p style="font-size: 10px; text-align: center;"><img src="' + rssObject[i].imgsrc + '" width="75" height="75" style="float: left"/>' +
                                rssObject[i].title +
                                '<br /><center><button type="button" class="btn btn-primary btn-xs" id="' + btnID1 + '">Story #1</button> <button type="button" class="btn btn-primary btn-xs" id="' + btnID2 + '">Story #2</button>' +
                                '</center></p></div>';
                        }

                        q++; // increment by one to keep the loop ticking up
                    });
                }
            }
        }).done(function() {  //assigns values to the buttons, after ajax request is done. if we don't wait for ajax, this won't render correctly.
            var joinRSS = formatStorage.join('');
            $('#rssPreviewGeneral').html(joinRSS);
            function buttonUpdateField(e) {
                $('#rss1Btn'+e).click(function () {
                    $('#title1').val(rssObject[e].title);
                    $('#title1text-div').html(rssObject[e].description);
                    $('#title1URL').val(rssObject[e].link);
                });
                $('#rss2Btn'+e).click(function () {
                    if (additionalContentVal === true) {
                        $('#title2').val(rssObject[e].title);
                        $('#title2text-div').html(rssObject[e].description);
                        $('#title2URL').val(rssObject[e].link);
                    } else {
                        console.log('No second story!');
                    }
                });

            }
            for(var n=0; n < 9; n++){
                buttonUpdateField(n);
            }
        });
    }


    //********************************
    //BEGIN POST-BUTTON CLICK ACTIONS
    //********************************


    $("#generateHTML")
        .button()
        .click(function(event) {
            event.preventDefault(); //Stops page from reloading
            updateKeyCodeField();
            if ($("#title1").val() === "") {
                alert("Please enter a story");
            } else {
                imageDelay();
                setTimeout(function(){
                    makeKeyCodeTest();
                    compileEmail(templateContainer); //pass in our object that contains all our template setup vars. info goes like this: templateContainer -> ALPAC -> DB -> shortCode: 'ALPACDB'
                }, 300);
            }
        }
    );

});
