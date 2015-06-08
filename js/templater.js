// JavaScript Document
//TODO change background of RSS. Maybe masonry?

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
            link: 'http://americanlibertypac.com/march-madness-final-round/',
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
        },
        BLACKOUTWW: {
            link: 'http://b79c75cgzvt1tyb3-m00an3o8d.hop.clickbank.net/?tid=', //default link to all sub-ads
            shortCode: 'BLACKOUTWW',
            longCode: 'Blackout USA WW3',
            advertisements: {
                0: {
                    name: 'BLACKOUTWW1',
                    description: '300 x 250 - Michelle Obama'
                },
                1: {
                    name: 'BLACKOUTWW2',
                    description: '300 x 250 - Putin'
                },
                2: {
                    name: 'BLACKOUTWW3',
                    description: '300 x 250 - Putin'
                }
            }
        },
        BLACKOUTNASA: {
            link: 'http://b79c75cgzvt1tyb3-m00an3o8d.hop.clickbank.net/?tid=', //default link to all sub-ads
            shortCode: 'BLACKOUTNASA',
            longCode: 'Blackout USA NASA',
            advertisements: {
                0: {
                    name: 'BLACKOUTNASA1',
                    description: '250 x 200'
                }
            }
        },
        AMMO: {
            link: 'http://edc049of2--85y64zovssouv0y.hop.clickbank.net/?tid=', //default link to all sub-ads
            shortCode: 'AMMO',
            longCode: 'Ammo Independence',
            advertisements: {
                0: {
                    name: 'AMMO1',
                    description: '336 x 280 - Red TXT, White BG'
                },
                1: {
                    name: 'AMMO2',
                    description: '600 x 74 - Red TXT, White BG'
                },
                2: {
                    name: 'AMMO3',
                    description: '250 x 250 - Grey BG'
                }
            }
        },
        FC: {
            link: 'http://f7b6abnhyxt1xx213hgzu7x5ud.hop.clickbank.net/?tid=', //default link to all sub-ads
            shortCode: 'FC',
            longCode: 'Food Crisis',
            advertisements: {
                0: {
                    name: 'FC1',
                    description: '468 x 60'
                },
                1: {
                    name: 'FC2',
                    description: '600 x 72'
                },
                2: {
                    name: 'FC3',
                    description: '250 x 250 - Gif'
                },
                3: {
                    name: 'FC4',
                    description: '250 x 250'
                },
                4: {
                    name: 'FC5',
                    description: '234 x 60'
                },
                5: {
                    name: 'FC6',
                    description: '240 x 400 - Gif'
                }
            }
        },
        AAC: {
            link: 'http://58e26xpavxu6zr8a1c5o0rjhk8.hop.clickbank.net/?tid=', //default link to all sub-ads
            shortCode: 'AAC',
            longCode: 'Alive After Crisis',
            advertisements: {
                0: {
                    name: 'AAC1',
                    description: '300 x 250 '
                },
                1: {
                    name: 'AAC2',
                    description: '180 x 150 - Shocking Video'
                },
                2: {
                    name: 'AAC3',
                    description: '180 x 150 - Leaked Report'
                },
                3: {
                    name: 'AAC4',
                    description: '180 x 150 - Disaster'
                },
                4: {
                    name: 'AAC5',
                    description: '180 x 150 - Market Crash'
                },
                5: {
                    name: 'AAC6',
                    description: '180 x 150 - 7 Things'
                },
                6: {
                    name: 'AAC7',
                    description: '320 x 50'
                }
            }
        },
        NSA: {
            link: 'http://a3e452m915sd3s3kfhqhsjca69.hop.clickbank.net/?tid=', //default link to all sub-ads
            shortCode: 'NSA',
            longCode: 'NSA',
            advertisements: {
                0: {
                    name: 'NSA1',
                    description: '300 x 250 - Stop Spying Thugs'
                },
                1: {
                    name: 'NSA2',
                    description: '300 x 250 - NSA Loopholes Revealed'
                },
                2: {
                    name: 'NSA3',
                    description: '300 x 250 - 13 Words/Big Brother'
                },
                3: {
                    name: 'NSA4',
                    description: '300 x 250 - NSA Banned This Video'
                },
                4: {
                    name: 'NSA5',
                    description: '300 x 250 - 13 Words'
                }
            }
        },
        SAC: {
            link: 'http://38c1e5i7zzx81mbp6o-4adf79s.hop.clickbank.net/?tid=', //default link to all sub-ads
            shortCode: 'SAC',
            longCode: 'Survive After Crisis',
            advertisements: {
                0: {
                    name: 'SAC1',
                    description: '120 x 600 - Blackbelt Secrets of Firearms '
                },
                1: {
                    name: 'SAC2',
                    description: '160 x 600 - Ex-Military Tell-All'
                },
                2: {
                    name: 'SAC3',
                    description: '250 x 250 - America Collapses'
                },
                3: {
                    name: 'SAC4',
                    description: '250 x 250- America Collapses (2)'
                },
                4: {
                    name: 'SAC5',
                    description: '300 x 250 - I Do Not Want To Scare You'
                },
                5: {
                    name: 'SAC6',
                    description: '300 x 300 - To All Men'
                },
                6: {
                    name: 'SAC7',
                    description: '300 x 300 - To All Men (2)'
                },
                7: {
                    name: 'SAC8',
                    description: '600 x 66 - Key Ingredients'
                },
                8: {
                    name: 'SAC9',
                    description: '600 x 66 - You Might Not Survive'
                },
                9: {
                    name: 'SAC10',
                    description: '600 x 74 - Mental Game - Scared Girl'
                },
                10: {
                    name: 'SAC11',
                    description: '600 x 66 - Mental Game - Soldiers'
                },
                11: {
                    name: 'SAC12',
                    description: '600 x 66 - To All Men (3)'
                },
                12: {
                    name: 'SAC13',
                    description: '250 x 250 - Shit Hits The Fan'
                },
                13: {
                    name: 'SAC14',
                    description: '250 x 250 - You Might Not Survive (2)'
                },
                14: {
                    name: 'SAC15',
                    description: '300 x 300 - Ex-Military Tell-All (2)'
                },
                15: {
                    name: 'SAC16',
                    description: '300 x 300 - Ex-Military Tell-All (3)'
                },
                16: {
                    name: 'SAC17',
                    description: '300 x 250 - America Collapses (3)'
                },
                17: {
                    name: 'SAC18',
                    description: '300 x 300 - Countdown To Chaos'
                },
                18: {
                    name: 'SAC19',
                    description: '300 x 300 - Survival Secrets'
                },
                19: {
                    name: 'SAC20',
                    description: '300 x 250 - How To Survive'
                },
                20: {
                    name: 'SAC21',
                    description: '300 x 250 - How To Survive (GIF)'
                },
                21: {
                    name: 'SAC22',
                    description: '250 x 250 - Key Ingredients (GIF)'
                },
                22: {
                    name: 'SAC23',
                    description: '250 x 250 - America Collapses (GIF)'
                },
                23: {
                    name: 'SAC24',
                    description: '125 x 125 - Watch Free Video'
                },
                24: {
                    name: 'SAC25',
                    description: '125 x 125 - Watch Free Video (2)'
                },
                25: {
                    name: 'SAC26',
                    description: '125 x 125 - Survival Shocker Secrets'
                },
                26: {
                    name: 'SAC27',
                    description: '125 x 125 - To All Men (4)'
                },
                27: {
                    name: 'SAC28',
                    description: '600 x 74 - To All Men (GIF)'
                },
                28: {
                    name: 'SAC29',
                    description: '600 x 74 - Countdown To Collapse (GIF)'
                }
            }
        },
        WTR: {
            link: 'http://7a2aa3ih5-0z4z0awl79rdvdn7.hop.clickbank.net/?tid=', //default link to all sub-ads
            shortCode: 'WTR',
            longCode: 'World War Water',
            advertisements: {
                0: {
                    name: 'WTR1',
                    description: '300 x 250 - Air Into Water'
                },
                1: {
                    name: 'WTR2',
                    description: '300 x 250 - Air Into Water (2)'
                },
                2: {
                    name: 'WTR3',
                    description: '300 x 250 - Climate Manipulation'
                },
                3: {
                    name: 'WTR4',
                    description: '300 x 250 - Weather Weapon'
                },
                4: {
                    name: 'WTR5',
                    description: '300 x 250 - Air Into Water (3)'
                }
            }
        },
        HP: {
            link: 'http://7e0c82nhx3p0vn8g-jpmztgh3x.hop.clickbank.net/?tid=', //default link to all sub-ads
            shortCode: 'HP',
            longCode: 'Home Power',
            advertisements: {
                0: {
                    name: 'HP1',
                    description: '300 x 250 - ISIS New Plan'
                },
                1: {
                    name: 'HP2',
                    description: '300 x 250 - The World You Know'
                },
                2: {
                    name: 'HP3',
                    description: '300 x 250 - New Terrorist Plot'
                }
            }
        },
        SMD: {
            link: 'http://76cc96o8-yx6wvbkvqybon5o2j.hop.clickbank.net/?tid=', //default link to all sub-ads
            shortCode: 'SMD',
            longCode: 'Survival MD',
            advertisements: {
                0: {
                    name: 'SMD1',
                    description: '180 x 150 - Bug'
                },
                1: {
                    name: 'SMD2',
                    description: '180 x 150 - Ebola False Flag'
                },
                2: {
                    name: 'SMD3',
                    description: '180 x 150 - Bug (2)'
                },
                3: {
                    name: 'SMD4',
                    description: '234 x 60 - Bug'
                },
                4: {
                    name: 'SMD5',
                    description: '234 x 60 - Bug (2)'
                },
                5: {
                    name: 'SMD6',
                    description: '234 x 60 - Ebola False Flag'
                },
                6: {
                    name: 'SMD7',
                    description: '234 x 60 - Mass Medical Crisis'
                },
                7: {
                    name: 'SMD8',
                    description: '300 x 100 - Mass Medical Crisis'
                },
                8: {
                    name: 'SMD9',
                    description: '300 x 100 - Mass Medical Crisis (2)'
                },
                9: {
                    name: 'SMD10',
                    description: '300 x 250 - SWAT Teams'
                },
                10: {
                    name: 'SMD11',
                    description: '300 x 250 - SWAT Teams (2)'
                },
                11: {
                    name: 'SMD12',
                    description: '300 x 250 - Mass Medical Crisis'
                },
                12: {
                    name: 'SMD13',
                    description: '300 x 250 - Bug'
                },
                13: {
                    name: 'SMD14',
                    description: '300 x 250 - Bug (2)'
                }
            }
        },
        BYL: {
            link: 'http://586f28j61xqz1ra4d8xzkcwp36.hop.clickbank.net/?tid=', //default link to all sub-ads
            shortCode: 'BYL',
            longCode: 'Backyard Liberty',
            advertisements: {
                0: {
                    name: 'BYL1',
                    description: '600 x 250 - Government Is After This'
                },
                1: {
                    name: 'BYL2',
                    description: '600 x 250 - Government Is After This (2)'
                },
                2: {
                    name: 'BYL3',
                    description: '600 x 250 - Government Is After This (3)'
                },
                3: {
                    name: 'BYL4',
                    description: '600 x 250 - Big Government Weapon'
                },
                4: {
                    name: 'BYL5',
                    description: '600 x 96 - Leaked Prepper Video'
                },
                5: {
                    name: 'BYL6',
                    description: '600 x 100 - Leaked Prepper Video (2)'
                },
                6: {
                    name: 'BYL7',
                    description: '300 x 100 - Big Government Weapon'
                },
                7: {
                    name: 'BYL8',
                    description: '300 x 100 - Big Government Weapon (2)'
                },
                8: {
                    name: 'BYL9',
                    description: '300 x 250 - Taking Your Food'
                },
                9: {
                    name: 'BYL10',
                    description: '300 x 250 - Leaked Prepper Video'
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
        ALPAC: {                //we start with the client name
            DB: {               //type of template (usually DB or MR)
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/alpac_db_Tmpl.htm', //location of template file
                emailCode: 'DB',
                shortCode: 'ALPACDB',
                longCode: 'Daily Bulletin',
                imgMaxWidth: 148,
                imgMaxHeight: 148,
                productMenu: adReferenceWJMA, //this stores the ads
                rssFeed: 'http://americanlibertypac.com/feed',  //Nocache is now handled within getRSSWithImage
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/880203000.png', //generally 150x150 to be safe
                feedStyle: function() {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
                }

            },
            DBDMS: {               //type of template (usually DB or MR)
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/alpac_db_dms_Tmpl.htm', //location of template file
                emailCode: 'DBDMS',
                shortCode: 'ALPACDBDMS',
                longCode: 'Daily Bulletin - DMS',
                imgMaxWidth: 148,
                imgMaxHeight: 148,
                productMenu: adReferenceWJMA, //this stores the ads
                rssFeed: 'http://americanlibertypac.com/feed',  //Nocache is now handled within getRSSWithImage
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/880203000.png', //generally 150x150 to be safe
                feedStyle: function() {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
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
                rssFeed: 'http://americanlibertypac.com/feed',
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/880203000.png',
                feedStyle: function() {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
                }
            },
            MRDMS: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/alpac_mr_dms_Tmpl.htm',
                emailCode: 'MRDMS',
                shortCode: 'ALPACMRDMS',
                longCode: 'Must Read - DMS',
                imgMaxWidth: 148,
                imgMaxHeight: 148,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://americanlibertypac.com/feed',
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/880203000.png',
                feedStyle: function() {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
                }
            },
            SL: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/alpac_sl_Tmpl.htm',
                emailCode: 'SL',
                shortCode: 'ALPACSL',
                longCode: '3rd Party Sales Letter - DMS',
                imgMaxWidth: 148,
                imgMaxHeight: 148,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://americanlibertypac.com/feed',
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/880203000.png',
                feedStyle: function() {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
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
                rssFeed: 'http://americanlibertypac.com/feed',
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/880203000.png',
                feedStyle: function() {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
                }
            },
            WIRDMS: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/alpac_wir_dms_Tmpl.htm',
                emailCode: 'WIRDMS',
                shortCode: 'ALPACWIRDMS',
                longCode: 'Week In Review - DMS',
                imgMaxWidth: 148,
                imgMaxHeight: 148,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://americanlibertypac.com/feed',
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/880203000.png',
                feedStyle: function() {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
                }
            },
            WL: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/alpac_wl_Tmpl.htm',
                emailCode: 'WL',
                shortCode: 'ALPACWL',
                longCode: 'Welcome Letter',
                imgMaxWidth: 148,
                imgMaxHeight: 148,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://americanlibertypac.com/feed',
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/880203000.png',
                feedStyle: function() {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
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
                rssFeed: 'http://americanlibertypac.com/feed',
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/880203000.png',
                feedStyle: function() {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
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
                rssFeed: 'http://conservativerepublicannews.com/blog/feed/',
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/1569720608.png',
                feedStyle: function() {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
                }
            },
            SL: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/crn_sl_Tmpl.htm',
                emailCode: 'SL',
                shortCode: 'CRNSL',
                longCode: '3rd Party Sales Letter',
                imgMaxWidth: 148,
                imgMaxHeight: 148,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://conservativerepublicannews.com/blog/feed/',
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/1569720608.png',
                feedStyle: function() {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
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
                rssFeed: 'http://minutemanproject.com/feed',
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/1081516611.png',
                feedStyle: function () {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
                }
            },
            DBDMS: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/jgm_db_dms_Tmpl.htm',
                emailCode: 'DBDMS',
                shortCode: 'JGMDBDMS',
                longCode: 'Daily Bulletin - DMS',
                imgMaxWidth: 135,
                imgMaxHeight: 135,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://minutemanproject.com/feed',
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/1081516611.png',
                feedStyle: function () {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
                }
            },
            MR: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/jgm_mr_Tmpl.htm',
                emailCode: 'MRDMS',
                shortCode: 'JGMMR',
                longCode: 'Must Read',
                imgMaxWidth: 135,
                imgMaxHeight: 135,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://minutemanproject.com/feed',
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/1081516611.png',
                feedStyle: function () {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
                }
            },
            MRDMS: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/jgm_mr_dms_Tmpl.htm',
                emailCode: 'MRDMS',
                shortCode: 'JGMMRDMS',
                longCode: 'Must Read - DMS',
                imgMaxWidth: 135,
                imgMaxHeight: 135,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://minutemanproject.com/feed',
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/1081516611.png',
                feedStyle: function () {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
                }
            },
            SL: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/jgm_sl_Tmpl.htm',
                emailCode: 'SL',
                shortCode: 'JGMSL',
                longCode: '3rd Party Sales Letter - DMS',
                imgMaxWidth: 148,
                imgMaxHeight: 148,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://minutemanproject.com/feed',
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/1081516611.png',
                feedStyle: function () {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
                }
            },
            WL: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/jgm_wl_Tmpl.htm',
                emailCode: 'WL',
                shortCode: 'JGMWL',
                longCode: 'Welcome Letter',
                imgMaxWidth: 135,
                imgMaxHeight: 135,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://minutemanproject.com/feed',
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/1081516611.png',
                feedStyle: function () {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
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
                rssFeed: 'http://senioramericansassociation.com/feed',
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/1917859770.png',
                feedStyle: function () {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
                }
            },
            DBDMS: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/saa_db_dms_Tmpl.htm',
                emailCode: 'DBDMS',
                shortCode: 'SAADBDMS',
                longCode: 'Daily Bulletin - DMS',
                imgMaxWidth: 135,
                imgMaxHeight: 135,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://senioramericansassociation.com/feed',
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/1917859770.png',
                feedStyle: function () {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
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
                rssFeed: 'http://senioramericansassociation.com/feed',
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/1917859770.png',
                feedStyle: function () {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
                }
            },
            MRDMS: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/saa_mr_dms_Tmpl.htm',
                emailCode: 'MRDMS',
                shortCode: 'SAAMRDMS',
                longCode: 'Must Read - DMS',
                imgMaxWidth: 135,
                imgMaxHeight: 135,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://senioramericansassociation.com/feed',
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/1917859770.png',
                feedStyle: function () {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
                }
            },
            SL: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/saa_sl_Tmpl.htm',
                emailCode: 'SL',
                shortCode: 'SAASL',
                longCode: '3rd Party Sales Letter - DMS',
                imgMaxWidth: 135,
                imgMaxHeight: 135,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://senioramericansassociation.com/feed',
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/1917859770.png',
                feedStyle: function () {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
                }
            },
            WL: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/saa_wl_Tmpl.htm',
                emailCode: 'WL',
                shortCode: 'SAAWL',
                longCode: 'Welcome Letter',
                imgMaxWidth: 135,
                imgMaxHeight: 135,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://senioramericansassociation.com/feed',
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/1917859770.png',
                feedStyle: function () {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
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
        SRC: {
            AP: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/src_ap_Tmpl.htm',
                emailCode: 'AP',
                shortCode: 'SRCAP',
                longCode: 'Always Prepared',
                imgMaxWidth: 135,
                imgMaxHeight: 135,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://www.selfreliancecentral.com/news/feed/', //had to update this to /news/feed when it broke. Maybe the result of using a fixed front page in Wordpress?
                defaultLogo: 'http://news.extras-americanlibertypac.com/IL/0/0/1/1101054001/2060965152.png',
                feedStyle: function () {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
                }
            },
            DB: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/src_db_Tmpl.htm',
                emailCode: 'DB',
                shortCode: 'SRCDB',
                longCode: 'Daily Bulletin',
                imgMaxWidth: 200,
                imgMaxHeight: 200,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://www.selfreliancecentral.com/news/feed/',
                defaultLogo: 'http://news.extras-americanlibertypac.com//IL/0/0/1/1101054001/2060965152.png',
                feedStyle: function () {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
                }
            },
            SL: {
                tmplLink: 'http://daviseford.com/sites/default/files/email_templater/txt/src_sl_Tmpl.htm',
                emailCode: 'SL',
                shortCode: 'SRCSL',
                longCode: 'Sales Letter',
                imgMaxWidth: 200,
                imgMaxHeight: 200,
                productMenu: adReferenceWJMA,
                rssFeed: 'http://www.selfreliancecentral.com/news/feed/',
                defaultLogo: 'http://news.extras-americanlibertypac.com//IL/0/0/1/1101054001/2060965152.png',
                feedStyle: function () {
                    getRSSWithImage(this.rssFeed);
                },
                utmStyle: function () {
                    var keycode = makeKeyCodeTest();
                    return '?utm_source=' + keycode + '&utm_medium=email&utm_campaign=' + keycode;
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
                    var d = S(b).strip('1', '2', '3', '4', '5', '6', '7', '8', '9', '0').s;
                    var e = d.toString();               //so we get the text portion of the keycode, which could be "XCOM" or "CAN".

                    var templateNumber = S(b).strip(e).s; //gives us our ad template number (1)
                    var adNum = (templateNumber - 1);

                    var currentEmailTemplate = getCurrentTemplateSettings();
                    var currentEmailTemplateShortCode = currentEmailTemplate.shortCode;
                    //console.log('shortcode = ' + currentEmailTemplateShortCode);

                    var currentEmailKeycode = makeKeyCodeTest();


                    var templateShortCode = adRef[e].shortCode; //This is the same as writing adReference.XCOM.shortCode
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
                    var templateUnTrackedLink = '<a href="'+ templateLink +'" target="_blank">';
                    var templateTrackedLink = '<a href="'+ templateTrackedURL +'" target="_blank">';

                    templateContainer.currentProduct = {
                        template: templateName,
                        link: templateLink,                 // raw link e.g. www.google.com
                        trackedLink: templateTrackedLink, //e.g. <a href="url+utm" >
                        untrackedLink: templateUnTrackedLink, //e.g. <a href="url" >
                        trackedURL: templateTrackedURL, //trackedURL is the raw URL + utm, whereas trackedLink is formatted with href
                        tmplNum: templateNumber,
                        shortCode: templateShortCode,
                        longCode: templateLongCode,
                        currentEmailTemplateShortCode: currentEmailTemplateShortCode,
                        currentEmailKeycode: currentEmailKeycode,
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
                        currentEmailTemplateShortCode: '',
                        currentEmailKeycode: '',
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
            }
        };
    }

    function imageDelay() {
        $('#story1Form').find('input').each(textFix);
        $('#story2Form').find('input').each(textFix);
        $('#story3Form').find('input').each(textFix);
        $('#story4Form').find('input').each(textFix);
        var currentTemplateSettings = getCurrentTemplateSettings(); //e.g. templateContainer.LL.DB

        var genericW = 200;
        var genericH = 200;

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
                var a = x.join(''); //e.g. RFARDB

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
        });

    function sendEmail() {
        var x = $("#resultsTextArea").val();
        var z = $("#keycodeInput").val();
        var y = S(x).unescapeHTML().s;
        z = z.toUpperCase();
        function ajaxSendEmail() {
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
            }).done(function () {
                $('#emailHTML').text('Email Sent!').effect('highlight', 'fast');
            });
        }
        if(templateContainer.currentProduct.enabled !== true) {
            swal({
                    title: "No Advertisement Selected",
                    text: "Are you sure you want to send an email without an advertisement?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, send it!",
                    cancelButtonText: "No, I forgot!",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function(isConfirm){
                    if (isConfirm) {
                        ajaxSendEmail();
                        swal({
                            title: "Sent!",
                            text: "Your email "+z+" has been sent!",
                            type: "success",
                            allowOutsideClick: "true",
                            timer: "2000",
                            showConfirmButton: "false"
                        });
                    }
                });
        } else {
            ajaxSendEmail();
            swal({
                title: "Sent!",
                text: "Your email "+z+" has been sent!",
                type: "success",
                allowOutsideClick: "true",
                timer: "2000",
                showConfirmButton: "false"
            });
        }
    }

    function makeWJMAEmailBtn() {
        $("#emailTestHTML")
            .button()
            .show()
            .mouseup(function() {
                sendTestEmail();
            });
    }

    function sendTestEmail() {
        var w = $("#subjectInput").val();
        var x = $("#resultsTextArea").val();
        var z = $("#keycodeInput").val();
        var y = S(x).unescapeHTML().s;
        z = z.toUpperCase();
        function ajaxSendEmail() {
            $.ajax({
                type: "POST",
                dataType: "html",
                url: "https://mandrillapp.com/api/1.0/messages/send.json",
                data: {
                    'key': 'MXTAqFwwNNGZdGtKOzG_Jw',
                    'message': {
                        'from_email': 'digitalmedia@wjmassociates.com',
                        'from_name': 'Template Generator',
                        'to': [
                            {
                                'email': 'dford@wjmassociates.com',
                                'name': 'Davis Ford',
                                'type': 'to'
                            },
                            {
                                'email': 'abitely@wjmassociates.com',
                                'name': 'Adam Bitely',
                                'type': 'to'
                            },
                            {
                                'email': 'adamrbitely@gmail.com',
                                'name': 'Adam Bitely (Gmail)',
                                'type': 'to'
                            },
                            {
                                'email': 'kgregerson@wjmassociates.com',
                                'name': 'Katie Gregerson',
                                'type': 'to'
                            },
                            {
                                'email': 'kelly@mustgoto.com',
                                'name': 'Kelly McCarthy',
                                'type': 'to'
                            }
                        ],
                        'auto_html': 'true',
                        'inline_css': 'true',
                        'subject': '[TEST] ' + w + ' - ' + z,
                        'html': y
                    }
                }
            }).done(function () {
                $('#emailTestHTML')
                    .text('Email Sent!')
                    .effect('highlight', 'fast')
                    .button('disable');
            });
        }
        if(templateContainer.currentProduct.enabled !== true) {
            swal({
                    title: "No Advertisement Selected",
                    text: "Are you sure you want to send an email without an advertisement?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, send it!",
                    cancelButtonText: "No, I forgot!",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function(isConfirm){
                    if (isConfirm) {
                        ajaxSendEmail();
                        swal({
                            title: "Sent!",
                            text: "Your email "+z+" has been sent!",
                            type: "success",
                            allowOutsideClick: "true",
                            timer: "2000",
                            showConfirmButton: "false"
                        });
                    }
                });
        } else {
            ajaxSendEmail();
            swal({
                title: "Sent!",
                text: "Your email "+z+" has been sent!",
                type: "success",
                allowOutsideClick: "true",
                timer: "2000",
                showConfirmButton: "false"
            });
        }
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
                makeWJMAEmailBtn();
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
    makeProductMenu(adReferenceWJMA); //initialize our menu with WJMA values, since we default to ALPAC

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
            var ratio = 0;  // Used for aspect ratio
            var width = this.naturalWidth;    // Current image width
            var height = this.naturalHeight;  // Current image height

            // Check if the current width is larger than the max
            if (width > maxWidth && width >= height) {
                ratio = maxWidth / width;   // get ratio for scaling image
                imgHeight[storage] = Math.floor(height * ratio);    // Reset height to match scaled image
                imgWidth[storage] = maxWidth;    // Reset width to match scaled image
            } else if (height > maxHeight) {
                ratio = maxHeight / height; // get ratio for scaling image
                imgWidth[storage] = Math.floor(width * ratio);    // Reset width to match scaled image
                imgHeight[storage] = maxHeight;    // Reset height to match scaled image
            }
        };
        img.src = src;
    }


    function getILNAPI(){
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

                for (var q = 0; q < 9; q++) { //displays 9 results
                    resultsHolder[q] = {
                        storyNum: q,
                        title: removeNewLine(results[q].title),
                        link: results[q].link,
                        imgsrc: x.defaultLogo
                    };

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
                    enableAdditionalContent();
                    $('#title3').val(resultsHolder[e].title);
                    $('#title3URL').val(resultsHolder[e].link);
                });
                $('#rss4Btn'+e).click(function () {
                    enableAdditionalContent();
                    $('#title4').val(resultsHolder[e].title);
                    $('#title4URL').val(resultsHolder[e].link);
                });

            }
            for(var n=0; n < 9; n++){ //makes nine buttons
                buttonUpdateField(n);
            }
        });
        equalHeight($("#rssPreviewGeneral").find(".row")); //makes sure that especially long titles don't break the table layout
    }


    var rssFeedHelpers = {
        defaultImageCheck: function (imgURL) { //replaces undefined images with a default
            var imgSrc;
            if (imgURL === undefined || imgURL === null) {
                var template = getCurrentTemplateSettings();
                imgSrc = template.defaultLogo;
                console.log('No image found in getRSSWithImage(), using defaultLogo');
            } else {
                imgSrc = imgURL;
            }
            return imgSrc;
        },
        fixDescription: function (description) {  //strips extraneous html tags from the story
            if (description !== null && description !== undefined) {
                var desc = S(description).unescapeHTML().s;
                return S(desc).stripTags('div', 'center', 'img', 'html', 'script', 'iframe', 'a', 'table', 'tbody', 'tr', 'td', 'style', 'blockquote', 'caption', 'font', 'h1', 'h2', 'h3', 'h4', 'h5', 'link').s;
            }
        },
        fixTitle: function (title) {
            if (title !== null && title !== undefined) {
                return S(title).unescapeHTML().s;
            }
        },
        masonry: function (container) {
            var $container = $(container);
            // initialize
            $container.imagesLoaded(function () {
                $container.masonry({
                    columnWidth: '.col-md-4',
                    itemSelector: '.rssHolder'
                });
            });
        }

    };

    function getRSSWithImage(feed) { //feed arrives in the form of a URL e.g. http://americanlibertypac.com/feed/
        var formatStorage = [];
        var rssObject = [];

        var request = $.ajax({
            url: "http://daviseford.com/sites/default/files/email_templater/php/rss_davis_simplepie.php",
            contentType: "application/json; charset=utf-8",
            method: "POST",
            data: JSON.stringify({"url": feed, "width": 135, "height": 135}), //send a JSON-encoded URL to the php script.
            dataType: 'json',
            success: function (data) {

                for (var i=0; i < data.length; i++) {

                    var itemRSS = data[i];
                    var imageRSS = itemRSS.imageArray;

                    //console.log("------------------------------------");
                    //console.log("Story #" + i + " : "+ itemRSS.title);
                    //console.log("Link: " + itemRSS.url);
                    //console.log("Description: " + itemRSS.description);
                    //console.log("Comments: " + itemRSS.comments);
                    //console.log("Height: " + imageRSS.fixedHeight);
                    //console.log("Width: " + imageRSS.fixedWidth);
                    //console.log("Image Info: " + imageRSS.width + "x" + imageRSS.height + " -- "+ imageRSS.src);

                    rssObject[i] = {
                        storyNum: i,
                        title: rssFeedHelpers.fixTitle(itemRSS.title),
                        link: itemRSS.url,
                        imgsrc: rssFeedHelpers.defaultImageCheck(imageRSS.src),
                        imgW: imageRSS.width,
                        imgH: imageRSS.height,
                        description: rssFeedHelpers.fixDescription(itemRSS.description)
                    };

                    var btnID1 = 'rss1Btn' + rssObject[i].storyNum;
                    var btnID2 = 'rss2Btn' + rssObject[i].storyNum;
                    var btnID3 = 'rss3Btn' + rssObject[i].storyNum;
                    var btnID4 = 'rss4Btn' + rssObject[i].storyNum;

                    var divID = 'rssStory' + rssObject[i].storyNum;
                    var imgID = 'rssImg' + rssObject[i].storyNum;

                    //if (i < 9) { //displays 9 results
                    //    var storage = [];
                    //    var a = '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-6 rssHolder" id="' + divID + '">';
                    //    var b = '<p>';
                    //    //var c = '<img src="' + rssObject[i].imgsrc + '" width="' + rssObject[i].thumbW + '" height="' + rssObject[i].thumbH + '" id="' + imgID + '" align="left" style=""/>';
                    //    //disabled above, as it was causing all sorts of resizing issues
                    //    var c = '<img src="' + rssObject[i].imgsrc + '" width="75" height="75" id="' + imgID + '" align="left" class="img-circle" style=""/>';
                    //    var d = rssObject[i].title;
                    //    var eecenter = '<br /><center>';
                    //    var btn1 = '<button type="button" class="btn btn-primary btn-xs" id="' + btnID1 + '">1</button>';
                    //    var btn2 = '<button type="button" class="btn btn-primary btn-xs" id="' + btnID2 + '">2</button>';
                    //    var btn3 = '<button type="button" class="btn btn-primary btn-xs" id="' + btnID3 + '">3</button>';
                    //    var btn4 = '<button type="button" class="btn btn-primary btn-xs" id="' + btnID4 + '">4</button>';
                    //    var fend = '</center></p></div>';
                    //    storage.push(a, b, c, d, eecenter, btn1, btn2, btn3, btn4, fend);
                    //    formatStorage[i] = storage.join('');
                    //}

                    function testReturn(i) {
                        return i;
                    }

                    if (i < 9) { //displays 9 results
                        var storage = [];
                        var rowstart = '';
                        var rowend = '';

                        switch(testReturn(i)){ //this handles setting the row clearfixes every 3 columns for bootstrap
                            case 0:
                                rowstart = '<div class="row clearfix rssRow">';
                                break;
                            case 2:
                                rowend = '</div>';
                                break;
                            case 3:
                                rowstart = '<div class="row clearfix rssRow">';
                                break;
                            case 5:
                                rowend = '</div>';
                                break;
                            case 6:
                                rowstart = '<div class="row clearfix rssRow">';
                                break;
                            case 8:
                                rowend = '</div>';
                                break;
                            default:
                                rowstart = '';
                                rowend = '';
                        }


                        var a = '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-6 column rssHolder" id="' + divID + '">';
                        var b = '<div class="row clearfix"><div class="col-md-3 column">';
                        //var c = '<img src="' + rssObject[i].imgsrc + '" width="' + rssObject[i].thumbW + '" height="' + rssObject[i].thumbH + '" id="' + imgID + '" align="left" style=""/>';
                        //disabled above, as it was causing all sorts of resizing issues
                        var c = '<img src="' + rssObject[i].imgsrc + '" alt="' + rssObject[i].title + '"width="75" height="75" id="' + imgID + '" class="img-circle"/>';
                        var d = '</div><div class="col-md-9 column"><h5 class="text-left">' + rssObject[i].title + '</h5>';
                        var ee = '<div class="btn-group">';
                        var btn1 = '<button type="button" class="btn btn-default btn-sm" id="' + btnID1 + '">Add To Story 1</button>';
                        var btn2 = '<button type="button" class="btn btn-default btn-sm" id="' + btnID2 + '">2</button>';
                        var btn3 = '<button type="button" class="btn btn-default btn-sm" id="' + btnID3 + '">3</button>';
                        var btn4 = '<button type="button" class="btn btn-default btn-sm" id="' + btnID4 + '">4</button>';
                        var fend = '</center></div></div></div></div>';
                        storage.push(rowstart, a, b, c, d, ee, btn1, btn2, btn3, btn4, fend, rowend);
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
            //Cases 5 and 6 are unused, but can be added in later
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

        var linkedImage = urlInsert + '<img class="no-scale" align="middle" src="' + titleIMG + '" alt="" height="' + adjustedHeight + '" width="' + adjustedWidth +'" /></a>';
        var imageAlignedRight = urlInsert + '<img align="right" alt="" src="' + titleIMG + '" style="padding: 6px; float:right;" height="' + adjustedHeight  + '" width="' + adjustedWidth + '" /></a>';
        var trackedURL = titleURL + utm;
        var storyName = 'story'+storyNum;
        var imageSalesLetter = urlInsert +  '<img src="' + titleIMG + '" alt="" width="' + adjustedWidth +'" height="' + adjustedHeight + '" align="left" style="display: block; -ms-interpolation-mode: bicubic; width: ' + adjustedWidth +'px; max-width: ' + adjustedWidth +'px; height: ' + adjustedHeight  + 'px; border: 0px solid #ffffff; border-radius: 0px; background-color: transparent;" />';

        var twitterTitle = S(title).escapeHTML();
        twitterTitle = S(twitterTitle).stripPunctuation();
        twitterTitle = S(twitterTitle).replaceAll(' ', '%20');
        var twitter = 'http://twitter.com/share?url='+titleURL;
        //http://www.facebook.com/sharer.php?u=http://americanlibertypac.com/draft-rand-paul-petition/
        var facebook = 'http://www.facebook.com/sharer.php?u='+titleURL;
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
            insertImageSalesLetter: imageSalesLetter,
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
        $.get( "http://daviseford.com/sites/default/files/email_templater/php/counter.php?page=templaterCounter", function( data ) {
            var counterDiv = $('#counterDiv');
            var dataNum = parseInt(data);
            var a = (dataNum * 22)/60;
            var estimateTimeSavedHours = Math.floor(a);
            var estimateTimeSavedDays = Math.floor(estimateTimeSavedHours/24);
            var estimateTimeSavedWeeks = Math.floor(estimateTimeSavedDays/7);
            var fruitFlyLives = Math.floor(estimateTimeSavedDays/45);
            var baseballGames = Math.floor(estimateTimeSavedHours/3);
            var insertText2 = '<ul class="list-group"><li class="list-group-item"><span class="badge">'+data+'</span>Times Used: </li><li class="list-group-item"><span class="badge">'+estimateTimeSavedHours+'</span>Hours Saved: </li><li class="list-group-item"><span class="badge">'+estimateTimeSavedDays+'</span>Days Saved: </li></ul>';
            var insertText = '<center><p class="bg-info">This application has been used <strong>' + data + '</strong> times.<br/>Time saved: <strong>' + estimateTimeSavedHours + '</strong> hours</p></center>';
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

    function makePreviewEmailBtn() {
        $("#previewEmailBtn")
            .button()
            .show()
            .mouseup(function() {
                openPreviewWindow();
            });
    }

    function openPreviewWindow() {
        var html = $('#resultsTextArea').val();
        var win = window.open("", "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=650, height=800");
        win.document.body.innerHTML = html;
    }

    function checkAdStatusDMS(){
        if(templateContainer.currentProduct.enabled !== true) {
            swal({
                    title: "No Advertisement Selected",
                    text: "Are you sure you want to send an email without an advertisement?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, send it!",
                    cancelButtonText: "No, I forgot!",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function(isConfirm){
                    if (isConfirm) {
                        sendToDMS();
                    }
                });
        } else {
            swal({
                    title: "Confirmation",
                    text: "Are you sure you want to send this email to the DMS Database?",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, send it!",
                    cancelButtonText: "Nope!",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function(isConfirm){
                    if (isConfirm) {
                        sendToDMS();
                    }
                });
        }
    }
    function sendToDMS() {
        var templateStyle = getTemplateStyle();
        var clientCode = templateStyle[0]; //e.g ALPAC
        var html = $('#resultsTextArea').val();
        var keycode = makeKeyCodeTest();
        console.log("keycode = " + keycode);
        var title = $('#subjectInput').val();

        var request = $.ajax({
            url: "http://daviseford.com/sites/default/files/email_templater/soap/php/davis.php",
            contentType: "application/json; charset=utf-8",
            method: "POST",
            data: JSON.stringify(
                {
                    "clientCode": clientCode,
                    "html": html,
                    "keycode": keycode,
                    "title": title
                }
            ), //send a JSON-encoded POST request to the php script.
            success: function (data) {
                if (data !== "Array") {
                    swal({
                        title: "Sent To DMS!",
                        text: "The email " + data + " has been created in DMS.",
                        type: "success",
                        allowOutsideClick: "true",
                        timer: "20000",
                        showConfirmButton: "true"
                    });
                    console.log("done with DMS: data = " + data);
                    console.log("data type = " + typeof data);
                } else {
                    swal({
                        title: "Error!",
                        text: "The email was not created in DMS!",
                        type: "error",
                        allowOutsideClick: "true",
                        timer: "10000",
                        showConfirmButton: "true"
                    });
                    console.log("done with DMS: data = " + data);
                    console.log("data type = " + typeof data);
                }
            }
        });

        //returns 'Array' if it failed.
        request.done(function(data) {
        });
    }

    function makeDMSBtn() {
        $("#sendToDMSBtn")
            .button()
            .show()
            .mouseup(function(e) {
                e.stopPropagation();
                checkAdStatusDMS();
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
            if ($("#title1").val() === "" || $("#subjectInput").val() === "") {
                swal("Slow down!", "Please enter a story first!", "error");
            } else {
                imageDelay();
                setTimeout(function(){
                    makeKeyCodeTest();
                    compileEmail(templateContainer); //pass in our object that contains all our template setup vars. info goes like this: templateContainer -> ALPAC -> DB -> shortCode: 'ALPACDB'
                    makeCopyButton();
                    makeCopyKeycodeButton();
                    makePreviewEmailBtn();
                    makeDMSBtn();
                    usageCounter();
                }, 500);
            }

        }
    );
});
