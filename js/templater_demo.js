// JavaScript Document
//TODO change background of RSS. Maybe masonry?

$(document).ready(function () {
    $('[data-toggle="popover"]').popover();
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
    $("#emailBtnDiv").hide();
    $('#choiceRow2').hide();


    var additionalContentVal = false; //This makes us default to a one-story format.
    var templateContainer;
    imgHeight = []; //global image container
    imgWidth = [];

    var adReferenceDEMO2 = {
        IMG: {
            link: 'http://www.daviseford.com/',
            shortCode: 'IMG',
            longCode: 'Banner Advertisements',
            advertisements: {
                0: {
                    name: 'IMG1',
                    description: "Banner 450x150"
                },
                1: {
                    name: 'IMG2',
                    description: "Banner 580x90"
                },
                2: {
                    name: 'IMG3',
                    description: 'Banner 250x250'
                }
            }
        },
        TEXT: {
            link: 'http://www.daviseford.com/',
            shortCode: 'TEXT',
            longCode: 'Native (In-line) Advertising',
            advertisements: {
                0: {
                    name: 'TEXT1',
                    description: 'Native Advertising'
                }
            }
        }
    };
    var adReferenceDEMO = {
        IMG: {
            link: 'http://www.daviseford.com/',
            shortCode: 'IMG',
            longCode: 'Banner Advertisements',
            advertisements: {
                0: {
                    name: 'IMG1',
                    description: "Banner 450x150"
                },
                1: {
                    name: 'IMG2',
                    description: "Banner 580x90"
                },
                2: {
                    name: 'IMG3',
                    description: 'Banner 250x250'
                }
            }
        },
        TEXT: {
            link: 'http://www.daviseford.com/',
            shortCode: 'TEXT',
            longCode: 'Native (In-line) Advertising',
            advertisements: {
                0: {
                    name: 'TEXT1',
                    description: 'Native Advertising'
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

    function updateKeyCodeField() { //this used to be bundled in with the rest of the email generation. Now it's a standalone function, you can call it anytime.
        var x =[];
        x = [$("#inlinedate").val(),$("#listSelect").val(),$("#tmplSelect").val(),$("#productSelect").val()];
        x = x.join('');
        $("#keycodeInput")
            .val(x)
            .effect('highlight', 'slow');
        $('#keycodeHiddenForm').val(x); //this updates the hidden form in resultsContainer2. Our PHP script uses this value to name the downloaded .html file.
    }

    templateContainer = {
        keycode: makeKeyCodeTest(),//templateContainer will eventually be the one stop shop for all constant variables
        NOIMAGE: {                //we start with the client name
            DB: {               //type of template (usually DB or MR)
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/demo/noimage_mr_Tmpl.htm', //location of template file
                emailCode: 'DB',
                shortCode: 'NOIMAGEDB',
                longCode: 'Daily Bulletin',
                imgMaxWidth: '',
                imgMaxHeight: '',
                productMenu: adReferenceDEMO, //this stores the ads
                rssFeed: 'http://www.selfreliancecentral.com/news/feed/',  //Nocache is important!
                defaultLogo: 'http://daviseford.com/sites/default/files/email_templater/images/demo/TheEconomistLogo.jpg',
                feedStyle: function() {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function() {
                    var x = makeKeyCodeTest();
                    var y = '?utm_source=' + x + '&utm_medium=email&utm_campaign=' + x;
                    return y;
                }

            },
            MR: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/demo/noimage_mr_Tmpl.htm',
                emailCode: 'MR',
                shortCode: 'NOIMAGEMR',
                longCode: 'Must Read',
                imgMaxWidth: '',
                imgMaxHeight: '',
                productMenu: adReferenceDEMO, //this stores the ads
                rssFeed: 'http://americanlibertypac.com/feed/',  //Nocache is important!
                defaultLogo: 'http://daviseford.com/sites/default/files/email_templater/images/demo/TheEconomistLogo.jpg',
                feedStyle: function() {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var x = makeKeyCodeTest();
                    var y = '?utm_source=' + x + '&utm_medium=email&utm_campaign=' + x;
                    return y;
                }
            }
        },
        IMAGE: {
            DB: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/crn_db_Tmpl.htm',
                emailCode: 'DB',
                shortCode: 'CRNDB',
                longCode: 'Daily Bulletin',
                imgMaxWidth: 148,
                imgMaxHeight: 148,
                productMenu: adReferenceDEMO,
                rssFeed: 'http://www.selfreliancecentral.com/news/feed/',  //Nocache is important!
                defaultLogo: 'http://daviseford.com/sites/default/files/email_templater/images/demo/TheEconomistLogo.jpg',
                feedStyle: function() {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function() {
                    var x = makeKeyCodeTest();
                    var y = '?utm_source=' + x + '&utm_medium=email&utm_campaign=' + x;
                    return y;
                }
            }
        },
        helpers: {
            updateCurrentProduct: function (adReference, utmStyle) { //returns the correct ad. for example, adReferenceILN.XCOM.
                var b;
                var adRef = adReference;
                var utm = utmStyle;
                b = $('#productSelect').val(); //example value: XCOM1
                var templateName = 'ad_templates_'+b;
                if (b !== '' && b !== null) { //if there is a product selected, update currentProduct
                    var templateNumber = S(b).right(1).toInt(); //gives us our ad template number (1)
                    var adNum = (templateNumber - 1);
                    var d = S(b).strip('1', '2', '3', '4', '5', '6', '7', '8', '9', '0').s;
                    var e = d.toString();               //so we get the text portion of the keycode, which could be "XCOM" or "CAN".
                    var templateShortCode = adRef[e].shortCode; //This is the same as writing adReference.XCOM.longCode
                    var templateLongCode = adRef[e].longCode;
                    var templateLink;
                    var currentAd = adRef[e].advertisements[adNum];

                    //check if we've got a special link setting
                    if (currentAd.hasOwnProperty('link')) {
                        if (currentAd.link !== undefined || currentAd.link !== '') {
                            console.log('currentAd.link = '+ currentAd.link);
                            templateLink = currentAd.link;
                        }
                    } else { //if there's no link set, fall back to the 'category' link, which is set by default
                        templateLink = adRef[e].link;
                    }
                    var templateTrackedURL = templateLink + utm;
                    var templateTrackedLink = '<a href="'+ templateTrackedURL +'" target="_blank">';

                    templateContainer.currentProduct = {
                        template: templateName,
                        link: templateLink,
                        trackedLink: templateTrackedLink,
                        trackedURL: templateTrackedURL, //trackedURL is the raw URL + utm, whereas trackedLink is formatted with href
                        tmplNum: templateNumber,
                        shortCode: templateShortCode,
                        longCode: templateLongCode,
                        enabled: true
                    };
                } else {
                    templateContainer.currentProduct = { //otherwise, update it to be blank
                        template: '',
                        link: '',
                        trackedLink: '',
                        trackedURL: '',
                        tmplNum: '',
                        shortCode: '',
                        longCode: '',
                        enabled: false //this tells jsrender not to render the ad section. important!
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

        templateContainer.smartFocus = {       //we use the smartfocus section for constant values like unsubscribe links, privacy policies, etc.
            title: subjectLine,
            keycode: keycode
        };
    }

    function imageDelay() {
        $('#story1Form').find('input').each(textFix);
        $('#story2Form').find('input').each(textFix);
        $('#story3Form').find('input').each(textFix);
        $('#story4Form').find('input').each(textFix);
        var currentTemplateSettings = getCurrentTemplateSettings(); //e.g. templateContainer.LL.DB

        var genericW = 130;
        var genericH = 130;

        var title1IMG = $("#title1IMG").val();
        var title2IMG = $("#title2IMG").val();
        var title3IMG = $("#title3IMG").val();
        var title4IMG = $("#title4IMG").val();

        var maxW = currentTemplateSettings.imgMaxWidth;
        var maxH = currentTemplateSettings.imgMaxHeight;

        if (maxH === '' || maxH === undefined || maxH === 0) {
            getImageSize(title1IMG, 0, genericW, genericH);
            getImageSize(title2IMG, 1, genericW, genericH); //if we don't have an image size set, use generic
            getImageSize(title3IMG, 2, genericW, genericH);
            getImageSize(title3IMG, 3, genericW, genericH);
        } else {
            getImageSize(title1IMG, 0, maxW, maxH); //otherwise use the currentTemplate's setting
            getImageSize(title2IMG, 1, maxW, maxH); //image url, storage value, width, height
            getImageSize(title3IMG, 2, maxW, maxH);
            getImageSize(title4IMG, 3, maxW, maxH);
        }
    }

    function compileEmail(templateContainer){ //pass in our references
        var x = getTemplateStyle(); //returns two values in an array, first value is the list, second is the template, e.g "RFAR","DB"
        var list = x[0];
        var tmpl = x[1];
        var currentTemplateSettings = templateContainer[list][tmpl]; //e.g. templateContainer.LL.DB

        getStoryValues(1);
        getStoryValues(2);
        if (additionalContentVal === true) {
            getStoryValues(3);
            getStoryValues(4);
        }


        enableSmartFocusVars(); //sets up common links (unsubscribes, etc)

        templateContainer.helpers.updateCurrentProduct(currentTemplateSettings.productMenu, currentTemplateSettings.utmStyle());
        //finds out what productMenu (adReference object) we're using
        //pass the current product menu and current UTM style (keycodes are already pre-filled)


        if (currentTemplateSettings.tmplLink !== '') {
            spawnTemplate(currentTemplateSettings.tmplLink); //Sends link to spawnTemplate()
            $("#resultsContainer1").show("drop"); //Shows the results once everything is ready.
            $("#resultsContainer2").show("drop"); //Shows the results once everything is ready.
            $("#emailBtnDiv").show('drop');
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

    function setupRSSBtn() { //calling feedStyle runs the proper RSS fetcher (e.g. getRSSWithImage())
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

                updateTemplateMenu(); //update valid email styles. e.g. DB, MR. call this first to avoid conflict with updateAdReferenceMenu()
                updateAdReferenceMenu(); //added to cut down on makeProductMenu references

                var title1Label = $("#title1label");

                if (a === 'ILNDB' || a === 'JGMMR' || a === 'ALPACMR') {
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

    $('#tmplSelect')
        .selectmenu({width: 225})
        .selectmenu({
            change: function() {
                getTemplateStyle();
            }
        });

    function makeEmailBtn() {
        $("#emailHTML")
            .button()
            .show()
            .mouseup(function() {
                sendEmail();
            });
    }

    $('#downloadHTMLBtn')
        .button()
        .click(function(){
            $('#downloadForm').submit();
            swal({
                title: "Downloading Email",
                text: "Feel free to import into your favorite email client and see what the Easy Email Generator can do for you.",
                type: "success",
                allowOutsideClick: "true",
                timer: "10000",
                confirmButtonText: "Fantastic!"
            });
        });

    function sendEmail() {
        swal({
            title: "Email Sent!",
            text: "Well, not really. This is just a demo page. This can be linked up to a company dropbox, Google Drive, or a myriad of other services via Zapier/IFTTT",
            type: "info",
            allowOutsideClick: "true",
            timer: "10000",
            confirmButtonText: "Understood!"
        });
    }


    //*******************************
    // GETTERS AND FUNCTIONS
    //*******************************

    function equalHeight(group) { //credit: http://www.cssnewbie.com/example/equal-heights/
        var tallest = 0;
        group.each(function() {
            var thisHeight = $(this).height();
            if(thisHeight > tallest) {
                tallest = thisHeight;
            }
        });
        group.height(tallest);
    }

    function spawnTemplate(tmplLink) {
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
    makeProductMenu(adReferenceDEMO2); //initialize our menu with ILN values, since the menu defaults to RFAR

    function updateTemplateMenu() {
        var list = $('#listSelect').val();
        var thisList = templateContainer[list];
        var setupMenu ='<label for="tmplSelect">STEP 3<br />Select an Email</label><br><select name="tmplSelect" id="tmplSelect">';
        var endMenu = '</select>';
        var arrayThing = [];
        var tmplSelect = $('#tmplSelect');
        for (var i in thisList) {
            if (thisList[i].hasOwnProperty('tmplLink')) {
                var emailCode = thisList[i]['emailCode'];
                var longCode = thisList[i]['longCode'];
                var addOption = '<option value="' + emailCode + '">' + longCode + '</option>';
                arrayThing.push(addOption);
            }
        }
        tmplSelect.html(setupMenu + arrayThing + endMenu);
        tmplSelect.selectmenu('refresh'); //refresh our changes. doesn't work without this.
    }
    updateTemplateMenu(); //initialize our menu

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
        if (src === undefined){  //if we send an invalid (empty) image source, just return. This helps prevent fetching invalid objects
            return;
        }
        var img = new Image();
        var maxWidth = width; // Max width for the image
        var maxHeight = height;    // Max height for the image

        img.onload = function () {
            //console.log('maxSize: ' + maxWidth + 'x' + maxHeight);
            //console.log('Original Size of image ' + (storage + 1) + ': ' + img.naturalWidth + 'x' + img.naturalHeight);
            var ratio = 0;  // Used for aspect ratio
            var width = this.naturalWidth;    // Current image width
            var height = this.naturalHeight;  // Current image height

            // Check if the current width is larger than the max
            if (width > maxWidth && width >= height) {
                ratio = maxWidth / width;   // get ratio for scaling image
                //console.log('RESIZE ----WIDTH---');
                //console.log('Now: ' + maxWidth + 'x' + Math.floor(height * ratio));
                imgHeight[storage] = Math.floor(height * ratio);    // Reset height to match scaled image
                imgWidth[storage] = maxWidth;    // Reset width to match scaled image
            } else if (height > maxHeight) {
                ratio = maxHeight / height; // get ratio for scaling image
                //console.log('RESIZE -----HEIGHT--');
                //console.log('Now: ' + Math.floor(width * ratio) + 'x' + maxHeight);   // Set new height
                imgWidth[storage] = Math.floor(width * ratio);    // Reset width to match scaled image
                imgHeight[storage] = maxHeight;    // Reset height to match scaled image
            }
        };
        img.src = src;
    }

    function asshole() {
        var stringTestALPAC = JSON.stringify({"url": "http://americanlibertypac.com/feed/"});
        var stringTestSRC = JSON.stringify({"url": "http://selfreliancecentral.com/news/feed/"});
        var request = $.ajax({
            url: "http://daviseford.com/sites/default/files/email_templater/php/rss_davis_simplepie.php",
            contentType: "application/json; charset=utf-8",
            method: "POST",
            data: stringTestSRC,
            dataType: "json"
        });

        request.done(function (msg) {
            var data = msg;
            for (i=0; i < msg.length; i++) {
                console.log("Number: " + i + data[i]["url"]);
                console.log("Number: " + i + data[i]["title"]);
                //console.log("Number: " + i + data[i]["imageArray"]["resized"]);
            }
        });

        request.fail(function (jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        });
    }
    //asshole();


    function getRSSWithImage(feed) {
        var formatStorage = [];
        var rssObject = [];

        var request = $.ajax({
            url: "http://daviseford.com/sites/default/files/email_templater/php/rss_davis_simplepie.php",
            contentType: "application/json; charset=utf-8",
            method: "POST",
            data: JSON.stringify({"url": feed}), //send a JSON-encoded URL to the php script.
            dataType: 'json',
            success: function (data) {
                var dataNew = data;

                for (var i=0; i < data.length; i++) {
                    var thisRSS = dataNew[i];
                    console.log("------------------------------------");
                    console.log("Story #" + i + " : "+ thisRSS["title"]);
                    console.log("Link: " + thisRSS["url"]);
                    console.log("Description: " + thisRSS["desc"]);
                    console.log("Image Info: " + thisRSS["imageArray"]["width"] + "x" + thisRSS["imageArray"]["height"] + " -- "+thisRSS["imageArray"]["src"]);
                    console.log("Comments: " + thisRSS["comments"]);

                    function defaultImageCheck() { //replaces undefined images with a default
                        var imgSrc;
                        if (thisRSS["imageArray"]["src"] === undefined || thisRSS["imageArray"]["src"] === null) {
                            var template = getCurrentTemplateSettings();
                            imgSrc = template.defaultLogo;
                            console.log('No image found in getRSSWithImage(), using defaultLogo');
                        } else {
                            imgSrc = thisRSS["imageArray"]["src"];
                        }
                        return imgSrc;
                    }

                    function fixDescription() {
                        var description = thisRSS["desc"];
                        if (description !== null && description !== undefined) {
                            return S(description).unescapeHTML().s;
                        }
                    }

                    function fixTitle() {
                        var title = thisRSS["title"];
                        if (title !== null && title !== undefined) {
                            return S(title).unescapeHTML().s;
                        }
                    }

                    function cleanDescription(desc) {
                        if(desc !== null || desc !== undefined) {
                            var x = S(desc).stripTags('div', 'img', 'html', 'script', 'iframe', 'a', 'tr', 'td', 'style', 'blockquote', 'caption', 'table', 'font').s;
                            return x;
                        }
                    }
                    //console.log("cleanup: " + cleanDescription(thisRSS["desc"]));


                    rssObject[i] = {
                        storyNum: i,
                        title: fixTitle(),
                        link: thisRSS["url"],
                        imgsrc: defaultImageCheck(),
                        imgW: thisRSS["imageArray"]["width"],
                        imgH: thisRSS["imageArray"]["height"],
                        description: fixDescription()
                    };

                    var btnID1 = 'rss1Btn' + rssObject[i].storyNum;
                    var btnID2 = 'rss2Btn' + rssObject[i].storyNum;
                    var btnID3 = 'rss3Btn' + rssObject[i].storyNum;
                    var btnID4 = 'rss4Btn' + rssObject[i].storyNum;

                    var divID = 'rssStory' + rssObject[i].storyNum;
                    var imgID = 'rssImg' + rssObject[i].storyNum;

                    if (i < 9) { //displays 9 results
                        var storage = [];
                        var a = '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-6 rssHolder" id="' + divID + '">';
                        var b = '<p style="font-size: 10px; text-align: center;">';
                        //var c = '<img src="' + rssObject[i].imgsrc + '" width="' + rssObject[i].thumbW + '" height="' + rssObject[i].thumbH + '" id="' + imgID + '" align="left" style=""/>';
                        //disabled above, as it was causing all sorts of resizing issues
                        var c = '<img src="' + rssObject[i].imgsrc + '" width="75" height="75" id="' + imgID + '" align="left" class="img-circle" style=""/>';
                        var d = rssObject[i].title;
                        var eecenter = '<br /><center>';
                        var btn1 = '<button type="button" class="btn btn-primary btn-xs" id="' + btnID1 + '">1</button>';
                        var btn2 = '<button type="button" class="btn btn-primary btn-xs" id="' + btnID2 + '">2</button>';
                        var btn3 = '<button type="button" class="btn btn-primary btn-xs" id="' + btnID3 + '">3</button>';
                        var btn4 = '<button type="button" class="btn btn-primary btn-xs" id="' + btnID4 + '">4</button>';
                        var fend = '</center></p></div>';
                        storage.push(a, b, c, d, eecenter, btn1, btn2, btn3, btn4, fend);
                        formatStorage[i] = storage.join('');
                    }

                }
            }
        });

        request.done(function() {  //assigns values to the buttons, after ajax request is done. if we don't wait for ajax, this won't render correctly.
            var joinRSS = formatStorage.join('');
            $('#rssPreviewGeneral').html(joinRSS);
            function buttonUpdateField(e) {
                $('#rss1Btn'+e).click(function () {
                    $('#title1').val(rssObject[e].title);
                    $('#title1text-div').html(rssObject[e].description);
                    $('#title1URL').val(rssObject[e].link);
                    $('#title1IMG').val(rssObject[e].imgsrc);
                });
                $('#rss2Btn'+e).click(function () {
                    $('#title2').val(rssObject[e].title);
                    $('#title2text-div').html(rssObject[e].description);
                    $('#title2URL').val(rssObject[e].link);
                    $('#title2IMG').val(rssObject[e].imgsrc);
                });
                $('#rss3Btn'+e).click(function () {
                    enableAdditionalContent();
                    $('#title3').val(rssObject[e].title);
                    $('#title3text-div').html(rssObject[e].description);
                    $('#title3URL').val(rssObject[e].link);
                    $('#title3IMG').val(rssObject[e].imgsrc);
                });
                $('#rss4Btn'+e).click(function () {
                    enableAdditionalContent();
                    $('#title4').val(rssObject[e].title);
                    $('#title4text-div').html(rssObject[e].description);
                    $('#title4URL').val(rssObject[e].link);
                    $('#title4IMG').val(rssObject[e].imgsrc);
                });


            }
            for(var n=0; n < 9; n++){
                buttonUpdateField(n);
            }
        });
        equalHeight($("#rssPreviewGeneral").find(".row")); //makes sure that especially long titles don't break the table layout
        //TODO replace with masonry
    }


function getRSSWithoutImage(feed) {
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
                            var btnID3 = 'rss3Btn' + rssObject[i].storyNum;
                            var btnID4 = 'rss4Btn' + rssObject[i].storyNum;

                            if (q < 9) { //stores HTML formatted values for later use
                                formatStorage[q] =
                                '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-6 rssHolder"><p style="font-size: 10px; text-align: center;"><img src="' + rssObject[i].imgsrc + '" width="75" height="75" style="float: left"/>' +
                                rssObject[i].title +
                                '<br /><center><button type="button" class="btn btn-primary btn-xs" id="' + btnID1 + '">1</button> <button type="button" class="btn btn-primary btn-xs" id="' + btnID2 + '">2</button> <button type="button" class="btn btn-primary btn-xs" id="' + btnID3 + '">3</button> <button type="button" class="btn btn-primary btn-xs" id="' + btnID4 + '">4</button>' +
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
                    $('#title2').val(rssObject[e].title);
                    $('#title2text-div').html(rssObject[e].description);
                    $('#title2URL').val(rssObject[e].link);
                });
                $('#rss3Btn'+e).click(function () {
                        enableAdditionalContent();
                        $('#title3').val(rssObject[e].title);
                        $('#title3text-div').html(rssObject[e].description);
                        $('#title3URL').val(rssObject[e].link);
                    }
                );
                $('#rss4Btn'+e).click(function () {
                        enableAdditionalContent();
                        $('#title4').val(rssObject[e].title);
                        $('#title4text-div').html(rssObject[e].description);
                        $('#title4URL').val(rssObject[e].link);
                    }
                );

            }
            for(var n=0; n < 9; n++){
                buttonUpdateField(n);
            }
        });
        equalHeight($("#rssPreviewGeneral").find(".row")); //makes sure that especially long titles don't break the table layout
    }

    function additionalContentBuilder(firstStoryNumber, secondStoryNumber, location) { //location is where the generated form will spawn
        var choiceRowNumber = 0;
        var storyNumber1 = firstStoryNumber;
        var storyNumber2 = secondStoryNumber;
        var builderStorage = [];
        var a = '<div class="row" id="choiceRow' + choiceRowNumber + '">';
        var b = '<div class="col-lg-6 col-md-6" id="story'+storyNumber1+'Div">';
        var c = '<form id="story'+storyNumber1+'Form" action="#"><fieldset><div class="form-group">';
        var d = '<label id="title'+storyNumber1+'label" for="title'+storyNumber1+'">Title #'+storyNumber1+': </label>';
        var e = '<input class="form-control" type="text" id="title'+storyNumber1+'" name="title'+storyNumber1+'"/></div>';
        var f = '<div class="form-group"><label for="title'+storyNumber1+'text-div">Story #'+storyNumber1+': </label><div id="title'+storyNumber1+'text-div" style="width: 100%; height: 100%" data-placeholder="" class="form-control"></div>';
        var g = '<div id="wysihtml-toolbar'+storyNumber1+'" style="display: none;"><a data-wysihtml5-command="bold"><strong>bold </strong></a><a data-wysihtml5-command="italic"><em>italic </em></a><a data-wysihtml5-command="createLink">insert link </a><div data-wysihtml5-dialog="createLink" style="display: none;">';
        var h = '<label>Link:<input data-wysihtml5-dialog-field="href" value="http://" class="text"></label><a data-wysihtml5-dialog-action="save">OK</a> <a data-wysihtml5-dialog-action="cancel">Cancel</a></div></div></div>';
        var i = '<div class="form-group"><label for="title'+storyNumber1+'URL">Story URL: </label><input class="form-control" type="text" id="title'+storyNumber1+'URL" name="title'+storyNumber1+'URL" placeholder="Put the link to the article here."/>';
        var j = '</div><div class="form-group"><label for="title'+storyNumber1+'IMG">Image URL: </label><input class="form-control" type="text" id="title'+storyNumber1+'IMG" name="title'+storyNumber1+'IMG" placeholder=""/> <br />';
        var k = '</fieldset></form></div>';
        var l = '<div class="col-lg-6 col-md-6" id="story'+storyNumber2+'Div"><form id="story'+storyNumber2+'Form" action="#"><fieldset><div class="form-group"><label for="title'+storyNumber2+'">Title #'+storyNumber2+': </label>';
        var m = '<input class="form-control" type="text" id="title'+storyNumber2+'" name="title'+storyNumber2+'"/></div><div class="form-group"><label for="title'+storyNumber2+'text-div">Story #'+storyNumber2+': </label><div id="title'+storyNumber2+'text-div" style="width: 100%; height: 100%" data-placeholder="" class="form-control"></div>';
        var n = '<div id="wysihtml-toolbar'+storyNumber2+'" style="display: none;"><a data-wysihtml5-command="bold"><strong>bold </strong></a><a data-wysihtml5-command="italic"><em>italic </em></a><a data-wysihtml5-command="createLink">insert link </a><div data-wysihtml5-dialog="createLink" style="display: none;">';
        var o = '<label>Link:<input data-wysihtml5-dialog-field="href" value="http://" class="text"></label><a data-wysihtml5-dialog-action="save">OK</a> <a data-wysihtml5-dialog-action="cancel">Cancel</a></div></div></div>';
        var p =  '<div class="form-group"><label for="title'+storyNumber2+'URL">Story URL: </label> <input class="form-control" type="text" id="title'+storyNumber2+'URL" name="title'+storyNumber2+'URL" placeholder="Link to the article here."/></div>';
        var q = '<div class="form-group"><label for="title'+storyNumber2+'IMG">Image URL: </label><input class="form-control" type="text" id="title'+storyNumber2+'IMG" name="title'+storyNumber2+'IMG" placeholder=""/> </div></fieldset></form></div></div>';
        builderStorage.push(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q);
        var xx = builderStorage.join('');
        var x;
        location.html(xx);


        switch (firstStoryNumber) {
            case 0:
                break;
            case 1:
                x = new wysihtml5.Editor("title1text-div", { // id of textarea element
                    toolbar:      "wysihtml-toolbar1", // id of toolbar element
                    parserRules:  wysihtml5ParserRules // defined in parser rules set
                });
                break;
            case 2:
                x = new wysihtml5.Editor("title2text-div", { // id of textarea element
                    toolbar:      "wysihtml-toolbar2", // id of toolbar element
                    parserRules:  wysihtml5ParserRules // defined in parser rules set
                });
                break;
            case 3:
                x = new wysihtml5.Editor("title3text-div", { // id of textarea element
                    toolbar:      "wysihtml-toolbar3", // id of toolbar element
                    parserRules:  wysihtml5ParserRules // defined in parser rules set
                });
                break;
            case 4:
                x = new wysihtml5.Editor("title4text-div", { // id of textarea element
                    toolbar:      "wysihtml-toolbar4", // id of toolbar element
                    parserRules:  wysihtml5ParserRules // defined in parser rules set
                });
                break;
            case 5:
                x = new wysihtml5.Editor("title5text-div", { // id of textarea element
                    toolbar:      "wysihtml-toolbar5", // id of toolbar element
                    parserRules:  wysihtml5ParserRules // defined in parser rules set
                });
                break;
            case 6:
                x = new wysihtml5.Editor("title6text-div", { // id of textarea element
                    toolbar:      "wysihtml-toolbar6", // id of toolbar element
                    parserRules:  wysihtml5ParserRules // defined in parser rules set
                });
                break;
            default:
                break;
        }
        switch (secondStoryNumber) {
            case 0:
                break;
            case 1:
                x = new wysihtml5.Editor("title1text-div", { // id of textarea element
                    toolbar:      "wysihtml-toolbar1", // id of toolbar element
                    parserRules:  wysihtml5ParserRules // defined in parser rules set
                });
                break;
            case 2:
                x = new wysihtml5.Editor("title2text-div", { // id of textarea element
                    toolbar:      "wysihtml-toolbar2", // id of toolbar element
                    parserRules:  wysihtml5ParserRules // defined in parser rules set
                });
                break;
            case 3:
                x = new wysihtml5.Editor("title3text-div", { // id of textarea element
                    toolbar:      "wysihtml-toolbar3", // id of toolbar element
                    parserRules:  wysihtml5ParserRules // defined in parser rules set
                });
                break;
            case 4:
                x = new wysihtml5.Editor("title4text-div", { // id of textarea element
                    toolbar:      "wysihtml-toolbar4", // id of toolbar element
                    parserRules:  wysihtml5ParserRules // defined in parser rules set
                });
                break;
            case 5:
                x = new wysihtml5.Editor("title5text-div", { // id of textarea element
                    toolbar:      "wysihtml-toolbar5", // id of toolbar element
                    parserRules:  wysihtml5ParserRules // defined in parser rules set
                });
                break;
            case 6:
                x = new wysihtml5.Editor("title6text-div", { // id of textarea element
                    toolbar:      "wysihtml-toolbar6", // id of toolbar element
                    parserRules:  wysihtml5ParserRules // defined in parser rules set
                });
                break;
            default:
                break;
        }
    }
    additionalContentBuilder(1,2, $('#choiceRow')); //builds our initial story section


    function enableAdditionalContent () {
        if (additionalContentVal !== true) {
            var i = $('#choiceRow2');
            additionalContentVal = true;
            var checkbox = $('#additionalContentCheckbox');
            checkbox.prop('checked', true);
            console.log("Additional Content: " + additionalContentVal);
            additionalContentBuilder(3, 4, i);
            i.show();
        }
    };

    function disableAdditionalContent() {
        additionalContentVal = false;
        console.log("Additional Content: "+additionalContentVal);
        $('#choiceRow2').hide();
    }
    //If this is checked, adds the second story box
    $('#additionalContentCheckbox').click(function(){
        var i = $('#choiceRow2');
        if (this.checked) {
            additionalContentVal = true;
            console.log("Additional Content: "+additionalContentVal);
            additionalContentBuilder(3,4, i);
            i.show();
        } else {
            additionalContentVal = false;
            console.log("Additional Content: "+additionalContentVal);
            i.hide();
        }
    });

    function getStoryValues (storyNumber){
        var storyNum = storyNumber;
        var storageNum = (storyNum - 1);
        var currentTemplateSettings = getCurrentTemplateSettings();
        var utm = currentTemplateSettings.utmStyle();
        var adjustedHeight = imgHeight[storageNum];
        var adjustedWidth = imgWidth[storageNum];
        var title = $('#title'+storyNum).val();
        var titletext = $("#title"+storyNum+"text-div").html();
        var titleURL = $("#title"+storyNum+"URL").val();
        var titleIMG = $("#title"+storyNum+"IMG").val();
        var urlInsert = '<a href="' + titleURL + utm + '" target="_blank">';

        if (adjustedHeight === undefined || adjustedWidth === undefined || adjustedHeight === ''){ //last ditch effort incase loading images goes wrong
            adjustedHeight = 130;
            adjustedWidth = 130;
        }

        var linkedImage = urlInsert + '<img class="no-scale" align="middle" src="' + titleIMG + '" alt="" height="' + adjustedHeight + '" width="' + adjustedWidth +'"></a>';
        var imageAlignedRight = urlInsert + '<img align="right" alt="" src="' + titleIMG + '" style="padding: 6px; float:right;" height="' + adjustedHeight  + '" width="' + adjustedWidth + '"/></a>';
        var trackedURL = titleURL + utm;
        var storyName = 'story'+storyNum;

        var twitterTitle = S(title).escapeHTML();
        twitterTitle = S(twitterTitle).stripPunctuation();
        twitterTitle = S(twitterTitle).replaceAll(' ', '%20');
        var twitter = '<a href="http://twitter.com/share?text='+twitterTitle+'&url='+titleURL+'">';
        var facebook = '<a href="http://www.facebook.com/sharer.php?u='+titleURL+'">';
        //picture
        //The URL of a picture attached to this post.
        //https://developers.facebook.com/docs/sharing/reference/feed-dialog/v2.2
        // The picture must be at least 200px by 200px.
        // See our documentation on sharing best practices for more information on sizes.
        //console.log('twitter = ' + twitter);
        //console.log('facebook = ' + facebook);


        templateContainer[storyName] = {
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
            trackedURL: trackedURL,
            social: {
                twitter: twitter,
                facebook: facebook
            }
        };
    }

    //the counter script is located.. well, you can figure it out
    //credit: http://www.phpjunkyard.com/php-text-hit-counter.php
    function usageCounter() {
        $.get( "http://daviseford.com/sites/default/files/email_templater/php/counter.php?page=demoCounter", function( data ) {
            var counterDiv = $('#counterDiv');
            var dataNum = parseInt(data);
            var a = (Math.floor(dataNum * 19))/60;
            var estimateTimeSaved = Math.floor(a);
            var insertText2 = '<ul class="list-group"><li class="list-group-item"><span class="badge">'+data+'</span>Times Used: </li></ul>';
            var insertText = '<center><p class="bg-info">This application has been used <strong>' + data + '</strong> times.</p></center>';
            counterDiv.html(insertText2);
        });
    }
    function makeCopyButton(){
        var client = new ZeroClipboard($("#copy-button"));
        client.on( "ready", function( readyEvent ) {
            // alert( "ZeroClipboard SWF is ready!" );
            client.on( "aftercopy", function( event ) {
                // `this` === `client`
                // `event.target` === the element that was clicked
                //event.target.style.display = "none";
                //alert("Copied text to clipboard: " + event.data["text/plain"] );
                swal({
                    title: "Copied!",
                    text: "Ctrl + V wildly!",
                    type: "success",
                    allowOutsideClick: "true",
                    timer: "1500",
                    confirmButtonText: "Copy that!"
                });
            } );
        } );
    }

    function makeCopyKeycodeButton(){
        var client = new ZeroClipboard($("#copyKeycode-button"));
        client.on( "ready", function( readyEvent ) {
            client.on( "aftercopy", function( event ) {
                swal({
                    title: event.data["text/plain"],
                    text: "The Keycode has been copied to your clipboard",
                    type: "success",
                    allowOutsideClick: "true",
                    timer: "1000",
                    showConfirmButton: "false"
                });
            } );
        } );
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
                swal("Slow down!", "Please enter a story first!", "error");
            } else {
                imageDelay();
                setTimeout(function(){
                    makeKeyCodeTest();
                    compileEmail(templateContainer); //pass in our object that contains all our template setup vars. info goes like this: templateContainer -> ALPAC -> DB -> shortCode: 'ALPACDB'
                    makeCopyButton();
                    makeCopyKeycodeButton();
                    usageCounter();
                }, 500);
            }

        }
    );



    function butthole2 () {
        var stringTest = JSON.stringify({url:"http://americanlibertypac.com/feed/"});
        $.ajax({
            type: 'POST',
            datatype: 'json',
            url: 'http://daviseford.com/sites/default/files/email_templater/php/magpierss-0.72/example.php',
            data: "val=http://americanlibertypac.com/feed/"
        })
            .done(function(data){

                console.log(data);

            })
            .fail(function() {

                // just in case posting your form failed
                alert( "Posting failed." );

            });

        // to prevent refreshing the whole page page
        return false;
    }

    function butthole () {
        var stringTest = JSON.stringify({url:"http://americanlibertypac.com/feed/"});
        $.getJSON("http://daviseford.com/sites/default/files/email_templater/php/magpierss-0.72/example.php", stringTest)
            .done(function (json) {
                console.log("JSON Data Title: " + json);
            })
            .fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
            });
    }



    //butthole();

});
