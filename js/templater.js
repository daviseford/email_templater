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
    $("#emailBtnDiv").hide();
    $('#choiceRow2').hide();


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
        ALPAC: {
            link: 'http://americanlibertypac.com',
            shortCode: 'ALPAC',
            longCode: 'General ALPAC Ads',
            advertisements: {
                0: {
                    name: 'ALPAC1',
                    description: 'Twitter Banner',
                    link: 'https://twitter.com/uslibertypac'
                },
                1: {
                    name: 'ALPAC2',
                    description: 'Facebook Banner',
                    link: 'https://www.facebook.com/AmericanLibertyPAC'
                },
                2: {
                    name: 'ALPAC3',
                    description: 'Pinterest Banner',
                    link: 'https://www.pinterest.com/amlibpac/'
                }
            }
        },
        CRNPOLL: {
            link: 'http://conservativerepublicannews.com',
            shortCode: 'CRNPOLL',
            longCode: 'CRN Polls',
            advertisements: {
                0: {
                    name: 'CRNPOLL1',
                    description: 'Is it time to go after ISIS?',
                    link: 'http://conservativerepublicannews.com/poll-is-it-time-to-go-after-isis/'
                },
                1: {
                    name: 'CRNPOLL2',
                    description: 'Do you trust the Mainstream Media?',
                    link: 'http://conservativerepublicannews.com/poll-do-you-trust-the-media/'
                },
                2: {
                    name: 'CRNPOLL3',
                    description: 'Obama Impeachment',
                    link: 'http://conservativerepublicannews.com/poll-impeach-obama/'
                },
                3: {
                    name: 'CRNPOLL4',
                    description: 'Do You Trust The IRS?',
                    link: 'http://conservativerepublicannews.com/poll-do-you-trust-the-irs/'
                },
                4: {
                    name: 'CRNPOLL5',
                    description: 'Do You Think Social Security Is Running Out?',
                    link: 'http://conservativerepublicannews.com/poll-do-you-think-social-security-is-running-out/'
                },
                5: {
                    name: 'CRNPOLL6',
                    description: 'Should Kids Be Vaccinated?',
                    link: 'http://conservativerepublicannews.com/poll-should-kids-be-vaccinated/'
                },
                6: {
                    name: 'CRNPOLL7',
                    description: 'Will Obama Declare Martial Law?',
                    link: 'http://conservativerepublicannews.com/poll-obama-martial-law/'
                }
            }
        },
        PREZ: {
            link: 'http://americanlibertypac.com/madness-round-2/',
            shortCode: 'PREZ',
            longCode: 'Presidential Madness 2015',
            advertisements: {
                0: {
                    name: 'PREZ1',
                    description: 'Banner (Blue Text)'
                },
                1: {
                    name: 'PREZ2',
                    description: 'Banner (Red Text)'
                }
            }
        },
        PPP: {
            link: 'http://americanlibertypac.com/2016-presidential-preference-poll-2/',
            shortCode: 'PPP',
            longCode: 'Presidential Preference Poll 2016',
            advertisements: {
                0: {
                    name: 'PPP1',
                    description: 'Rand Paul | Mitt Romney'
                },
                1: {
                    name: 'PPP2',
                    description: 'Jeb Bush | Scott Walker'
                },
                2: {
                    name: 'PPP3',
                    description: 'Mike Lee | Rand Paul'
                },
                3: {
                    name: 'PPP4',
                    description: 'Scott Walker | Ben Carson'
                },
                4: {
                    name: 'PPP5',
                    description: 'Rand Paul | Ted Cruz'
                }
            }
        },
        HILL: {
            link: 'https://secure.yourpatriot.com/ou/alpac/1826/donate.aspx',
            shortCode: 'HILL',
            longCode: 'Not Ready For Hillary',
            advertisements: {
                0: {
                    name: 'HILL1',
                    description: 'Bumper Sticker (350x137)'
                },
                1: {
                    name: 'HILL2',
                    description: 'Bumper Sticker (500x196)'
                },
                2: {
                    name: 'HILL3',
                    description: 'Grey Square Ad'
                },
                3: {
                    name: 'HILL4',
                    description: 'Black Square Ad'
                }
            }

        },
        STICKER: {
            link: 'https://secure.yourpatriot.com/ou/alpac/1761/donate.aspx',
            shortCode: 'STICKER',
            longCode: 'ALPAC Bumper Stickers',
            advertisements: {
                0: {
                    name: 'STICKER1',
                    description: 'Freedom Sticker'
                },
                1: {
                    name: 'STICKER2',
                    description: 'Fire the Liars Sticker'
                },
                2: {
                    name: 'STICKER3',
                    description: 'Rand 2016 Sticker'
                },
                3: {
                    name: 'STICKER4',
                    description: 'Rand 2016 Bumper Sticker'
                },
                4: {
                    name: 'STICKER5',
                    description: 'Reboot America Draft Rand Paul'
                }
            }
        },
        JGM: {
            link: 'https://minutemanproject.com/donate-2/',
            shortCode: 'JGM',
            longCode: 'JGM General Ads',
            advertisements: {
                0: {
                    name: 'JGM1',
                    description: 'Secure The Border Sticker'
                },
                1: {
                    name: 'JGM2',
                    description: 'Twitter Banner',
                    link: 'http://twitter.com/jgmmp'
                },
                2: {
                    name: 'JGM3',
                    description: 'Facebook Banner',
                    link: 'https://www.facebook.com/MinutemanProjectNews'
                },
                3: {
                    name: 'JGM4',
                    description: 'Inline - Revoke Executive Action',
                    link: 'http://minutemanproject.rallycongress.com/17465/citizens-demand-to-congress-to-revoke-obamas-executive-action/'
                }
            }
        },
        RAND: {
            link: 'https://presidentrand.com',
            shortCode: 'RAND',
            longCode: 'Draft Rand Paul',
            advertisements: {
                0: {
                    name: 'RAND1',
                    description: 'Reboot America',
                    link: 'http://americanlibertypac.com/draft-rand-paul-for-president/'
                },
                1: {
                    name: 'RAND2',
                    description: 'Grassroots For Rand',
                    link: 'http://americanlibertypac.com/draft-rand-paul-for-president/'
                }
            }
        },
        SAA: {
            link: 'http://senioramericansassociation.com/', //default link to all sub-ads
            shortCode: 'SAA',
            longCode: 'Senior Americans Association',
            advertisements: {
                0: {
                    name: 'SAA1',
                    description: 'Facebook',
                    link: 'https://www.facebook.com/SeniorAmericans' //this link overrides the default set above
                },
                1: {
                    name: 'SAA2',
                    description: 'Older Americans Act',
                    link: 'http://senioramericansassociation.com/3004-2/' //this link overrides the default set above
                },
                2: {
                    name: 'SAA3',
                    description: 'Inline Coupon Ad',
                    link: 'http://senioramericansassociation.com/savings-center/'
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
    }

    templateContainer = {
        //storyTrack: [false, false, false, false], //initialize with all stories turned off.
        keycode: makeKeyCodeTest(),//templateContainer will eventually be the one stop shop for all constant variables
        ALPAC: {                //we start with the client name
            DB: {               //type of template (usually DB or MR)
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/alpac_db_Tmpl.htm', //location of template file
                emailCode: 'DB',
                shortCode: 'ALPACDB',
                longCode: 'Daily Bulletin',
                imgMaxWidth: 148,
                imgMaxHeight: 148,
                productMenu: adReferenceWJMA, //this stores the ads
                rssFeed: 'http://americanlibertypac.com/feed/' + '?nocache=' + ((new Date).getTime()),  //Nocache is important!
                defaultLogo: 'http://americanlibertypac.com/wp-content/uploads/2015/02/AMLIBPAC_circle_130x130.png',
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
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/alpac_mr_Tmpl.htm',
                emailCode: 'MR',
                shortCode: 'ALPACMR',
                longCode: 'Must Read',
                imgMaxWidth: 148,
                imgMaxHeight: 148,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://americanlibertypac.com/feed/' + '?nocache=' + ((new Date).getTime()),
                defaultLogo: 'http://americanlibertypac.com/wp-content/uploads/2015/02/AMLIBPAC_circle_130x130.png',
                feedStyle: function() {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var x = makeKeyCodeTest();
                    var y = '?utm_source=' + x + '&utm_medium=email&utm_campaign=' + x;
                    return y;
                }
            },
            WIR: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/alpac_wir_Tmpl.htm',
                emailCode: 'WIR',
                shortCode: 'ALPACWIR',
                longCode: 'Week In Review',
                imgMaxWidth: 148,
                imgMaxHeight: 148,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://americanlibertypac.com/feed/' + '?nocache=' + ((new Date).getTime()),
                defaultLogo: 'http://americanlibertypac.com/wp-content/uploads/2015/02/AMLIBPAC_circle_130x130.png',
                feedStyle: function() {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var x = makeKeyCodeTest();
                    var y = '?utm_source=' + x + '&utm_medium=email&utm_campaign=' + x;
                    return y;
                }
            },
            XL: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/alpac_xl_Tmpl.htm',
                emailCode: 'XL',
                shortCode: 'ALPACXL',
                longCode: 'XL Edition (Buggy)',
                imgMaxWidth: 148,
                imgMaxHeight: 148,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://americanlibertypac.com/feed/' + '?nocache=' + ((new Date).getTime()),
                defaultLogo: 'http://americanlibertypac.com/wp-content/uploads/2015/02/AMLIBPAC_circle_130x130.png',
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
        CRN: {
            DB: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/crn_db_Tmpl.htm',
                emailCode: 'DB',
                shortCode: 'CRNDB',
                longCode: 'Daily Bulletin',
                imgMaxWidth: 148,
                imgMaxHeight: 148,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://conservativerepublicannews.com/feed/' + '?nocache=' + ((new Date).getTime()),
                defaultLogo: 'http://daviseford.com/sites/default/files/email_templater/images/crn_75x75.png',
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
        JGM: {
            DB: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/jgm_db_Tmpl.htm',
                emailCode: 'DB',
                shortCode: 'JGMDB',
                longCode: 'Daily Bulletin',
                imgMaxWidth: 135,
                imgMaxHeight: 135,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://minutemanproject.com/feed/',
                defaultLogo: 'http://daviseford.com/sites/default/files/email_templater/images/mmp_75x75.png',
                feedStyle: function () {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var x = makeKeyCodeTest();
                    var y = '?utm_source=' + x + '&utm_medium=email&utm_campaign=' + x;
                    return y;
                }
            },
            MR: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/jgm_mr_Tmpl.htm',
                emailCode: 'MR',
                shortCode: 'JGMMR',
                longCode: 'Must Read',
                imgMaxWidth: 135,
                imgMaxHeight: 135,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://minutemanproject.com/feed/',
                defaultLogo: 'http://daviseford.com/sites/default/files/email_templater/images/mmp_75x75.png',
                feedStyle: function () {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var x = makeKeyCodeTest();
                    var y = '?utm_source=' + x + '&utm_medium=email&utm_campaign=' + x;
                    return y;
                }
            }
        },
        SAA: {
            DB: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/saa_db_Tmpl.htm',
                emailCode: 'DB',
                shortCode: 'SAADB',
                longCode: 'Daily Bulletin',
                imgMaxWidth: 135,
                imgMaxHeight: 135,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://senioramericansassociation.com/feed/' + '?nocache=' + ((new Date).getTime()),
                defaultLogo: 'http://daviseford.com/sites/default/files/email_templater/images/saa_75x75.png',
                feedStyle: function () {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var x = makeKeyCodeTest();
                    var y = '?utm_source=' + x + '&utm_medium=email&utm_campaign=' + x;
                    return y;
                }
            },
            MR: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/saa_mr_Tmpl.htm',
                emailCode: 'MR',
                shortCode: 'SAAMR',
                longCode: 'Must Read',
                imgMaxWidth: 135,
                imgMaxHeight: 135,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://senioramericansassociation.com/feed/' + '?nocache=' + ((new Date).getTime()),
                defaultLogo: 'http://daviseford.com/sites/default/files/email_templater/images/saa_75x75.png',
                feedStyle: function () {
                    getRSSWithImage(this.rssFeed);
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
                emailCode: 'DB',
                shortCode: 'ILNDB',
                longCode: 'Daily Bulletin',
                imgMaxWidth: '175',
                imgMaxHeight: '175',
                productMenu: adReferenceILN,
                rssFeed: '', //we use getILNAPI for this case, because their RSS isn't helpful
                defaultLogo: 'http://daviseford.com/sites/default/files/email_templater/images/iln_75x75.png',
                feedStyle: function() {
                    getILNAPI();
                },
                utmStyle: function() {
                    var x = makeKeyCodeTest();
                    var y = '?utm_source=' + x + '&keycode=' + x + '&u=[EMV FIELD]EMAIL_UUID[EMV /FIELD]';
                    return y;
                }
            }
        },
        RFAR: {
            DB: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/rfar_db_Tmpl.htm',
                emailCode: 'DB',
                shortCode: 'RFARDB',
                longCode: 'Daily Bulletin',
                imgMaxWidth: '130',
                imgMaxHeight: '130',
                productMenu: adReferenceILN,
                rssFeed: '', //we use getILNAPI for this case, because their RSS isn't helpful
                defaultLogo: 'http://daviseford.com/sites/default/files/email_templater/images/iln_75x75.png',
                feedStyle: function() {
                    getILNAPI();
                },
                utmStyle: function() {
                    var x = makeKeyCodeTest();
                    var y = '?utm_source=' + x + '&keycode=' + x + '&u=[EMV FIELD]EMAIL_UUID[EMV /FIELD]';
                    return y;
                }
            }
        },
        LL: {
            DB: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/ll_db_Tmpl.htm',
                emailCode: 'DB',
                shortCode: 'LLDB',
                longCode: 'Daily Bulletin',
                imgMaxWidth: '',
                imgMaxHeight: '',
                productMenu: '',
                rssFeed: 'http://opportunities.theihs.org/rss.xml?&t[]=200&w=100',
                defaultLogo: '',
                feedStyle: function() {
                    getRSSWithoutImage(this.rssFeed);
                },
                utmStyle: function() {
                    //return blank. if we add a utm style, this is where it will go
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
            },
            SAA: {
                keycode: keycode
            }
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
            .click(function() {
                sendEmail();
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
    makeProductMenu(adReferenceILN); //initialize our menu with ILN values, since the menu defaults to RFAR

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


    function getILNAPI(){
        //event.preventDefault();
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
                    var btnID3 = 'rss3Btn' + resultsHolder[q].storyNum;
                    var btnID4 = 'rss4Btn' + resultsHolder[q].storyNum;
                    formatStorage[q] =
                        '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-6 rssHolder"><p style="font-size: 10px; text-align: center;"><img src="' + resultsHolder[q].imgsrc + '" width="75" height="75" style="float: left"/>' +
                        resultsHolder[q].title +
                        '<br /><center><button type="button" class="btn btn-primary btn-xs" id="' + btnID1 + '">1</button> <button type="button" class="btn btn-primary btn-xs" id="' + btnID2 + '">2</button> <button type="button" class="btn btn-primary btn-xs" id="' + btnID3 + '">3</button> <button type="button" class="btn btn-primary btn-xs" id="' + btnID4 + '">4</button>' +
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
                    $('#title2').val(resultsHolder[e].title);
                    $('#title2URL').val(resultsHolder[e].link);
                });
                $('#rss3Btn'+e).click(function () {
                    if (additionalContentVal === true) {
                        $('#title3').val(resultsHolder[e].title);
                        $('#title3URL').val(resultsHolder[e].link);
                    } else {
                        swal({
                            title: "Whoa There!",
                            text: "Additional Content Hasn't Been Enabled",
                            type: "error",
                            allowOutsideClick: "true",
                            timer: "1500",
                            confirmButtonText: "Gotcha"
                        });
                    }
                });
                $('#rss4Btn'+e).click(function () {
                    if (additionalContentVal === true) {
                        $('#title4').val(resultsHolder[e].title);
                        $('#title4URL').val(resultsHolder[e].link);
                    } else {
                        swal({
                            title: "Whoa There!",
                            text: "Additional Content Hasn't Been Enabled",
                            type: "error",
                            allowOutsideClick: "true",
                            timer: "1500",
                            confirmButtonText: "Gotcha"
                        });
                    }
                });

            }
            for(var n=0; n < 9; n++){ //makes nine buttons
                buttonUpdateField(n);
            }
        });
        equalHeight($("#rssPreviewGeneral").find(".row")); //makes sure that especially long titles don't break the table layout
    }



    function getRSSWithImage(feed) {
        var storyNumber = 0;
        var formatStorage = [];
        var rssObject = [];
        $.ajax({
            url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(feed),
            dataType: 'json',
            success: function (data) {
                if (data.responseData.feed && data.responseData.feed.entries) {
                    $.each(data.responseData.feed.entries, function (i, e) {
                        var f = e.content;
                        //console.log('content = ' +f);

                        function cleanDescription(desc) {
                            var x = S(desc).stripTags('div', 'img', 'html', 'script', 'iframe', 'a', 'tr', 'td', 'style', 'blockquote', 'caption', 'table', 'font').s;
                            return x;
                        }

                        //this chunk grabs img src values from the RSS feed
                        //var content = document.createElement("content");
                        //content.innerHTML = e.content;
                        //var images = $(content).find('img').map(function () {
                        //    return $(this).attr('src');
                        //}).get(); // backup of how this used to work


                        //this chunk grabs img src values from the RSS feed
                        var content = document.createElement("content");
                        content.innerHTML = e.content;
                        var images = $(content).find('img').map(function () {
                            var i = [];
                            i.push($(this).attr('src'), $(this).attr('width'), $(this).attr('height'));
                            return i;
                        }).get();

                        //console.log('imgSrc = ' + images[0]);
                        //console.log('imgW = ' + images[1]);
                        //console.log('imgH = ' + images[2]);
                        //I've disabled this functionality for a few reasons
                        //1.) Breaks the div container that it spawns in. Maybe look into Flexbox for making these containers?
                        //function getImageSize(currentWidth, currentHeight) {
                        //    var maxWidth = 75; // Max width for the image
                        //    var maxHeight = 75;    // Max height for the image
                        //    var correctedSizes = []; //holding container for image sizes
                        //    var ratio = 0;  // Used for aspect ratio
                        //    var width = currentWidth;    // Current image width
                        //    var height = currentHeight;  // Current image height
                        //
                        //    // Check if the current width is larger than the max
                        //    if (width > maxWidth && width >= height) {
                        //        ratio = maxWidth / width;   // get ratio for scaling image
                        //        images[1] = maxWidth;    // Reset width to match scaled image
                        //        images[2] = Math.floor(height * ratio);    // Reset height to match scaled image
                        //    } else if (height > maxHeight) {
                        //        ratio = maxHeight / height; // get ratio for scaling image
                        //        images[1] = Math.floor(width * ratio);    // Reset width to match scaled image
                        //        images[2] = maxHeight;    // Reset height to match scaled image
                        //    }
                        //}
                        //getImageSize(images[1], images[2]);


                        function defaultImageCheck(){ //replaces undefined images with a default
                            if (images[0] === undefined){
                                var x = getCurrentTemplateSettings();
                                images[0] = x.defaultLogo;
                                console.log('No image found in getRSSWithImage(), using defaultLogo');
                            }
                        }
                        defaultImageCheck();

                        rssObject[i] = {
                            storyNum: storyNumber,
                            title: e.title,
                            link: e.link,
                            imgsrc: images[0],
                            thumbW: images[1],
                            thumbH: images[2],
                            description: cleanDescription(f)
                        };

                        var btnID1 = 'rss1Btn' + rssObject[i].storyNum;
                        var btnID2 = 'rss2Btn' + rssObject[i].storyNum;
                        var btnID3 = 'rss3Btn' + rssObject[i].storyNum;
                        var btnID4 = 'rss4Btn' + rssObject[i].storyNum;

                        var divID = 'rssStory' + rssObject[i].storyNum;
                        var imgID = 'rssImg' + rssObject[i].storyNum;

                        if (storyNumber < 9) { //displays 9 results
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
                            storage.push(a,b,c,d,eecenter,btn1,btn2,btn3,btn4,fend);
                            formatStorage[storyNumber] = storage.join('');
                        }
                        storyNumber++; // increment by one to keep the loop ticking up
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
                    $('#title1IMG').val(rssObject[e].imgsrc);
                });
                $('#rss2Btn'+e).click(function () {
                    $('#title2').val(rssObject[e].title);
                    $('#title2text-div').html(rssObject[e].description);
                    $('#title2URL').val(rssObject[e].link);
                    $('#title2IMG').val(rssObject[e].imgsrc);
                });
                $('#rss3Btn'+e).click(function () {
                    if (additionalContentVal === true) {
                        $('#title3').val(rssObject[e].title);
                        $('#title3text-div').html(rssObject[e].description);
                        $('#title3URL').val(rssObject[e].link);
                        $('#title3IMG').val(rssObject[e].imgsrc);
                    } else {
                        swal({
                            title: "Whoa There!",
                            text: "Additional Content Hasn't Been Enabled",
                            type: "error",
                            allowOutsideClick: "true",
                            timer: "1500",
                            confirmButtonText: "Gotcha"
                        });
                    }
                });
                $('#rss4Btn'+e).click(function () {
                    if (additionalContentVal === true) {
                        $('#title4').val(rssObject[e].title);
                        $('#title4text-div').html(rssObject[e].description);
                        $('#title4URL').val(rssObject[e].link);
                        $('#title4IMG').val(rssObject[e].imgsrc);
                    } else {
                        swal({
                            title: "Whoa There!",
                            text: "Additional Content Hasn't Been Enabled",
                            type: "error",
                            allowOutsideClick: "true",
                            timer: "1500",
                            confirmButtonText: "Gotcha"
                        });
                    }
                });


            }
            for(var n=0; n < 9; n++){
                buttonUpdateField(n);
            }
        });
        equalHeight($("#rssPreviewGeneral").find(".row")); //makes sure that especially long titles don't break the table layout
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
                    if (additionalContentVal === true) {
                        $('#title3').val(rssObject[e].title);
                        $('#title3text-div').html(rssObject[e].description);
                        $('#title3URL').val(rssObject[e].link);
                    } else {
                        swal({
                            title: "Whoa There!",
                            text: "Additional Content Hasn't Been Enabled",
                            type: "error",
                            allowOutsideClick: "true",
                            timer: "1500",
                            confirmButtonText: "Gotcha"
                        });
                    }
                });
                $('#rss4Btn'+e).click(function () {
                    if (additionalContentVal === true) {
                        $('#title4').val(rssObject[e].title);
                        $('#title4text-div').html(rssObject[e].description);
                        $('#title4URL').val(rssObject[e].link);
                    } else {
                        swal({
                            title: "Whoa There!",
                            text: "Additional Content Hasn't Been Enabled",
                            type: "error",
                            allowOutsideClick: "true",
                            timer: "1500",
                            confirmButtonText: "Gotcha"
                        });
                    }
                });

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

    //If this is checked, adds the second story box
    $('#additionalContentCheckbox').click(function(){
        if (this.checked) {
            var i = $('#choiceRow2');
            additionalContentVal = true;
            console.log("Additional Content: "+additionalContentVal);
            additionalContentBuilder(3,4, i);
            i.show();
        } else {
            additionalContentVal = false;
            console.log("Additional Content: "+additionalContentVal);
            $('#choiceRow2').hide();
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
        //http://www.facebook.com/sharer.php?u=http://americanlibertypac.com/draft-rand-paul-petition/
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
        $.get( "http://daviseford.com/sites/all/uploads/counter/counter.php?page=templaterCounter", function( data ) {
            var counterDiv = $('#counterDiv');
            var dataNum = parseInt(data);
            var a = (Math.floor(dataNum * 19))/60;
            var estimateTimeSaved = Math.floor(a);
            var insertText = '<center><p class="bg-info">This application has been used <strong>' + data + '</strong> times.<br/>Time saved (approx): <strong>' + estimateTimeSaved + '</strong> hours</p></center>';
            counterDiv.html(insertText);
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
                    usageCounter();
                }, 500);
            }

        }
    );
});
