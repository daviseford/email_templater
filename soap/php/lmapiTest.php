#!/usr/local/bin/php
<html>
<head>
<title>Listmanager   API SOAP Client (PHP).</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
</head>
<body>

<?php
/*
'Written by Byron Whitlock
'Copyright 2004 Lyris Technologies.

*/

// Pull in the NuSOAP code
if ( PHP_VERSION >= 5 )
        require_once('lib/nusoap_php5.php');
else
        require_once('lib/nusoap_php4.php');



$test = new lmapiTest();
$test->HomePage();

// To avoid long loading up time when local server isn't running
if (isset($_REQUEST['f']) && $test->initSoap())
{
    echo "<pre>";
    switch ($_REQUEST["f"])
    {
        case "CreateManyMember Performance":
            $test->CreateManyMemberPerformanceTest();
            break;

        case "Site/Topic Tests":
            $test->siteTopicTests();
            break;

        case "Member Tests":
            $test->MemberTests();
            break;

        case "List Tests":
            $test->ListTests();
            break;

        case "Content Tests":
            $test->ContentTests();
            break;

        case "SQL Tests":
            $test->SQLTests();
            break;

        case "Segment Tests":
            $test->SegmentTests();
            break;

        case "Mailing Tests":
            $test->MailingTests();
            break;

        case "Run All Tests":
            $test->MemberTests();
            $test->ListTests();
            $test->ContentTests();
            $test->SQLTests();
            $test->SegmentTests();
            $test->MailingTests();
            break;
    }
    echo "</pre>";
}

class lmapiTest
{
    var $lmapiClient;
    var $apiVersion = "---";

    function lmapiTest()
    {
        $this->wsdl_location =  isset($_REQUEST['wsdl'])? $_REQUEST['wsdl'] : "http://econnect.dmsgs.com:82/?wsdl";
        $this->userName = isset($_REQUEST['dford@wjmassociates.com'])? $_REQUEST['userName'] : "admin";
        $this->password = isset($_REQUEST['password'])? $_REQUEST['password'] : "lyris";
        $this->debug = isset($_REQUEST['debug'])? $_REQUEST['debug'] : 0;
    }

    function initSoap()
    {
                if ( PHP_VERSION >= 5 )
                $this->lmapiClient = new nusoapclient( $this->wsdl_location, true );
        else
                $this->lmapiClient = new soapclient( $this->wsdl_location, true );

        $this->lmapiClient->setCredentials($this->userName,$this->password, 'basic');
        //$this->lmapiClient

        $err= $this->lmapiClient->getError();
        if ($err) {

            echo "<h2>Constructor error</h2><pre> $err \n\n";
            if ($this->debug)
                echo $this->lmapiClient->debug_str;
            echo "</pre>";
            return false;
        }
        $this->lmapi    = $this->lmapiClient->getProxy();
        $this->lmapi->setCredentials($this->userName,$this->password, 'basic');


        $v = $this->lmapi->ApiVersion();
        if( $v== "")
        {
            echo "<h3>401 - Authorization Failure!</h3>";
            if ($this->debug)
            {
                echo "\n<fieldset><legend>Response</legend><pre> \n";
                echo $this->lmapi->response;
                echo "\n</pre></fieldset>\n";
            }
            return false;
        }

                $this->apiVersion = $v;
                echo "<H1>Current API version: " . $v . "</H1>";

        $this->email = $this->lmapi->CurrentUserEmailAddress();


        return true;
    }

    function MemberTests()
    {
        print "<h1> MemberTests</h1>";
        ################################################################################
        #   CreateMemberBan
        ####################
        #  CreateMemberBan $MemberBan
        #   MemberBan contains: {BanID ListName SiteName BanLogic UserName Domain}
        #       A = "accepted"
        #       C = "conditionally accepted"
        #       R = "banned"
        print "Running CreateMemberBan()... ";
        $result = $this->lmapi->CreateMemberBan( array("ListName"=>'list1',"BanLogic"=>'R',"Domain"  => 'banned-server.com') );
        if(! $this->detectFault($result))
            print "BanID: $result Created\n\n";


        ################################################################################
        #   CreateSingleMember
        ####################
        # this is very fast
        print "Running CreateSingleMember() (10 members)\n";
        $result = $this->lmapi->CreateSingleMember('donald_the_duck@maileater.lyris.com','Donald Duck','list1');
        if(! $this->detectFault($result)) print "Member created. MemberID: $result\n";

        $result = $this->lmapi->CreateSingleMember('darren_the_duck@banned-server.com','Darren Duck','list1');
        #this will fault member ban
        if($this->detectFault($result)) $this->faultcount-- ;

        $result = $this->lmapi->CreateSingleMember('darryl_the_duck@banned-server.com','Darryl Duck','list1');
        #this will fault member ban
        if($this->detectFault($result)) $this->faultcount-- ;

        $result = $this->lmapi->CreateSingleMember('howard_the_duck@maileater.lyris.com','Howard Duck','list1');
        if(! $this->detectFault($result)) print "Member created. MemberID: $result\n";

        $result = $this->lmapi->CreateSingleMember('manor_the_duck@maileater.lyris.com','Manor Duck','list1');
        if(! $this->detectFault($result)) print "Member created. MemberID: $result\n";
        $manorMemberID = $result;

        $result = $this->lmapi->CreateSingleMember('eliot_the_duck@maileater.lyris.com','Elliot Duck','list1');
        if(! $this->detectFault($result)) print "Member created. MemberID: $result\n";
        $eliotMemberID = $result;

        $result = $this->lmapi->CreateSingleMember('takeda_the_duck@maileater.lyris.com','Takeda Duck','list1');
        if(! $this->detectFault($result)) print "Member created. MemberID: $result\n";
        $takedaMemberID = $result;

        $result = $this->lmapi->CreateSingleMember('cathernie_the_duck@maileater.lyris.com','Chathernie ','list1');
        if(! $this->detectFault($result)) print "Member created. MemberID: $result\n";

        $result = $this->lmapi->CreateSingleMember('daffy_miss_duck@maileater.lyris.com','Daffy Duck ','list1');
        if(! $this->detectFault($result)) print "Member created. MemberID: $result\n";

        $result = $this->lmapi->CreateSingleMember('icy@maileater.lyris.com','Ice Queen ','list1');
        if(! $this->detectFault($result)) print "Member created. MemberID: $result\n";

        $result = $this->lmapi->CreateSingleMember('snow_white@maileater.lyris.com','Snow White ','list1');
        if(! $this->detectFault($result)) print "Member created. MemberID: $result\n";


        ################################################################################
        #  SelectMembersEx
        ####################
        print "Running SelectMembersEx(['MemberID', 'EmailAddress'], ['ListName=list1'])\n";
        $result = $this->lmapi->SelectMembersEx( array('MemberID', 'EmailAddress'), array('ListName=list1') );
        if(! $this->detectFault($result))
        {
          print "SelectMembersEx result: \n\n";
          var_dump($result);
        }

        ################################################################################
        #   UpdateMemberPassword
        ####################
        print "Running UpdateMemberPassword(MemberID=>$takedaMemberID)\n";
        $result = $this->lmapi->UpdateMemberPassword( array(MemberID => $takedaMemberID), 'takeda_password');
        if(! $this->detectFault($result)) print "UpdateMemberPassword result: $result\n\n";

        print "Running UpdateMemberPassword(EmailAddress,ListName)\n";
        $result = $this->lmapi->UpdateMemberPassword(
        array(
                "EmailAddress" =>'cathernie_the_duck@maileater.lyris.com',
                "ListName"    => 'list1') ,
        'cathernie_the_newpassword');
        if(! $this->detectFault($result)) print "UpdateMemberPassword result: $result\n\n";

        ################################################################################
        #   UpdateMemberKind
        ####################
        # memberkind can be {digest daymimedigest index nomail mail listmail}
        print "Running UpdateMemberKind(MemberID)\n";
        $result = $this->lmapi->UpdateMemberKind(array("MemberID" => $eliotMemberID), 'nomail');
        if(! $this->detectFault($result)) print "UpdateMemberKind result: $result\n\n";

        print "Running UpdateMemberKind(EmailAddress,ListName )\n";
        $result = $this->lmapi->UpdateMemberKind(
        array(
            "EmailAddress" =>'cathernie_the_duck@maileater.lyris.com',
            "ListName"    => 'list1'),
        'nomail');
        if(! $this->detectFault($result)) print "UpdateMemberKind result: $result\n\n";

        ################################################################################
        #   UpdateMemberEmail
        ####################
        # memberkind can be {digest daymimedigest index nomail mail listmail}
        print "Running UpdateMemberEmail(MemberID)\n";
        $result = $this->lmapi->UpdateMemberEmail(array(MemberID => $manorMemberID), 'my_name_is_no_longer_manor@maileater.lyris.com');
        if(! $this->detectFault($result)) print "UpdateMemberEmail result: $result\n\n";

        print "Running UpdateMemberEmail(EmailAddress,ListName )\n";
        $result = $this->lmapi->UpdateMemberEmail(
        array(
            EmailAddress =>'howard_the_duck@maileater.lyris.com',
            ListName     => 'list1'),
        'Howard_Duck@maileater.lyris.com');
        if(! $this->detectFault($result)) print "UpdateMemberEmail result: $result\n\n";

        ################################################################################
        #   UpdateMemberStatus
        ####################
        # memberstatus can be {normal member confirm private expired held unsub referred needs-confirm needs-hello needs-goodbye}
        print "Running UpdateMemberStatus()\n";
        $result = $this->lmapi->UpdateMemberStatus(array(MemberID => $takedaMemberID), 'expired');
        if(! $this->detectFault($result)) print "UpdateMemberStatus result: $result\n\n";

        ################################################################################
        #   CopyMember
        ####################
        # This creates demographic columns and is needed for further operations
        $result = $this->lmapi->CreateMemberColumn("MaidenName_","varchar100");
        $result = $this->lmapi->CreateMemberColumn("MyMotto_","varchar100");
        $result = $this->lmapi->CreateMemberColumn("ExtraInfo_","varchar100");


                                print "Running CopyMember()\n";
        $result = $this->lmapi->CopyMember(array(MemberID => $eliotMemberID), 'aliot_clone_of_eliot@maileater.lyris.com', 'aliot chase', 'list1');
        if(! $this->detectFault($result)) print "CopyMember result: $result\n\n";


        ################################################################################
        #   CreateManyMembers
        ####################
        # A member contains these elements.
        # Additional   MembershipKind   ApprovalNeeded   Password   NotifyError   ExpireDate   Comment   UserID   ReadsHtml   MailFormat   DateConfirm   NumberOfBounces   NumApprovalsNeeded   NotifySubmission   NoRepro   MemberID   Demographic   EmailAddress   ReciveAdminEmail   DateJoined   IsListAdmin   ReceiveAcknowlegment   DateBounce   DateHeld   MemberStatus   FullName   CanApprovePending   CleanAuto   ListName   DateUnsubscribed

        # remember that @ is a special value in perl must be single quoted or backslashed
        #$DaffyDuck = array(    "EmailAddress"  => 'daffy_miss_duck@maileater.lyris.com',
        #                   "ListName"      => "list1",
        #                   "Password"      => "donttelldonald",
        #                   "ReadsHtml"     => 0,
        #                   Demographics => array (
        #                                       array('Name' => 'First_Name_',  'Value' => 'Daffy'),
        #                                       array('Name' => 'Last_Name_',   'Value' => 'Duck'),
        #                                       array('Name' => 'Age_',         'Value' => 68),
        #                                       array('Name' => 'Birthday_',        'Value' => 'April 17, 1935')
        #                                          )
        #                   ); # this is a string field, so the date is stored as is. You need to know the format of your demographics table to use these effectivly.

        #$SnowWhite =array("EmailAddress"   => 'snow_white@maileater.lyris.com',
        #                   "ListName"      => "list1",
        #                   "ExpireDate"    => "2004-12-31T23:59:59"); # dates must be in xsd schema http://www.w3.org/TR/xmlschema-2/#dateTime

        #$IceQueen =array("EmailAddress"    => 'icy@maileater.lyris.com',
        #                   "ListName"      => "list1",
        #                   "MailFormat"    => "M"); #multipart format see the wsdl documentation for list of mail formats.


        #$MemberStructArray = array($DaffyDuck, $SnowWhite, $IceQueen, array( "EmailAddress" => 'test@banned-server.com', ListName => 'list1'));
        #print "Running CreateManyMembers()\n";
        #$result = $this->lmapi->CreateManyMembers($MemberStructArray, 0);
        #if(! $this->detectFault($result))
        #{
        #   var_dump($result);
        #   print "\n\n";
        #}



        ################################################################################
        #   UpdateMemberDemographics
        ####################


        $SimpleMemberType = array (
        EmailAddress => 'donald_the_duck@maileater.lyris.com',
        ListName     => 'list1');
        # Alternate form can specify memberID only
        # $SimpleMemberType = {MemberID => 114}


        $UpdateMemberDemographics = array(
        array('Name' => 'MaidenName_',  'Value' => 'Donald'),
        array('Name' => 'MyMotto_',   'Value' => 'Duck'),
        array('Name' => 'ExtraInfo_',         'Value' => 'Extra information') );

        print "Running UpdateMemberDemographics()\n";
        $result = $this->lmapi->UpdateMemberDemographics($SimpleMemberType, $UpdateMemberDemographics);
        if(! $this->detectFault($result)) print "Returned $result\n\n";


        print "Running UpdateMemberDemographics()\n";
        $result = $this->lmapi->UpdateMemberDemographics(

            array ('EmailAddress' => 'icy@maileater.lyris.com',
                   'ListName'     => 'list1'),
            array (
                array('Name' => 'MaidenName_',  'Value' => 'Ice'),
                array('Name' => 'MyMotto_',   'Value' => 'Queen is my motto'),
                array('Name' => 'ExtraInfo_',         'Value' => 'My extra info'),
                )
            );

        if(! $this->detectFault($result)) print "Returned $result\n\n";

        print "Running UpdateMemberDemographics()\n";
        $result = $this->lmapi->UpdateMemberDemographics(
            array('EmailAddress' => 'daffy_miss_duck@maileater.lyris.com',
                  'ListName' => 'list1'),
            array(
                array('Name' => 'MaidenName_', 'Value' => 'Icey')
                )
            );
        if(! $this->detectFault($result)) print "Returned $result\n\n";


        # Cleaning up
        $result = $this->lmapi->DeleteMemberColumn("MaidenName_");
        $result = $this->lmapi->DeleteMemberColumn("MyMotto_");
        $result = $this->lmapi->DeleteMemberColumn("ExtraInfo_");


        ################################################################################
        #   Unsubscribe
        ####################
        print "Running Unsubscribe()\n";
        $UnsubSimpleMembers =
        array(
            array( EmailAddress => 'donald_the_duck@maileater.lyris.com', ListName => 'list1'),
            array( MemberID => $manorMemberID),
            array( EmailAddress => 'icy@maileater.lyris.com', ListName => 'list1')
        );

        $result = $this->lmapi->Unsubscribe($UnsubSimpleMembers);
        if(! $this->detectFault($result))
        print "$result Members Unsubscribed.\n\n";

        #
        #  GetMemberID $EmailAddress $ListName
        #  GetListnameFromMemberID $MemberID
        #  GetEmailFromMemberID $MemberID
        #  EmailOnWhatLists $EmailAddress
        #  EmailPasswordOnWhatLists $EmailAddress $Password
        #  CreateMemberBan $MemberBan




        ################################################################################
        #   GetMemberID
        ####################
        print "Running GetMemberID()\n";
        $result = $this->lmapi->GetMemberID(array(EmailAddress => 'icy@maileater.lyris.com', ListName => 'list1'));
        if(! $this->detectFault($result))
        print "GetMemberID result: $result\n\n";

        ################################################################################
        #   EmailOnWhatLists
        ####################
        print "Running EmailOnWhatLists()\n";
        $result = $this->lmapi->EmailOnWhatLists('donald_the_duck@maileater.lyris.com');
        if (! $this->detectFault($result) ) {

            print "EmailOnWhatLists:";
            var_dump($result);
            print " \n\n";
        }

        ################################################################################
        #   EmailPasswordOnWhatLists
        ####################
        print "Running EmailPasswordOnWhatLists()\n";
        $result = $this->lmapi->EmailPasswordOnWhatLists('donald_the_duck@maileater.lyris.com','lyris');
        if (! $this->detectFault($result) ) {

            print "EmailPasswordOnWhatLists: ";
            var_dump($result);
            print " \n\n";
        }


        ################################################################################
        #   CreateListAdmin
        ####################
        #  CreateListAdmin $EmailAddress $Password $ListName $FullName $RecieveListAdminMail $RecieveModerationNotification $BypassListModeration
        print "Running CreateListAdmin()\n";
        $result = $this->lmapi->CreateListAdmin('naturelover@maileater.lyris.com','lyris','list1','Test A Whanny',1,1,1);
        if(! $this->detectFault($result))   print "CreateListAdmin result: $result\n\n";


        ################################################################################
        #   UpdateListAdmin
        ####################
        #  CreateListAdmin $EmailAddress $Password $ListName $FullName $RecieveListAdminMail $RecieveModerationNotification $BypassListModeration
        print "Running UpdateListAdmin()\n";
        $result = $this->lmapi->UpdateListAdmin(array(EmailAddress => 'naturelover@maileater.lyris.com', ListName => 'list1'),0,0,0,0);
        if(! $this->detectFault($result))   print "UpdateListAdmin result: $result\n\n";

        ################################################################################
        #   CreateServerAdmin
        ####################
        $result = 0;
        print "Running CreateServerAdmin()\n";
        $AdminStruct = array('EmailAddress' => 'serveradmin@maileater.lyris.com', 'Name' => 'Server Admin', 'Password' => 'ser123');
        $result = $this->lmapi->CreateServerAdmin($AdminStruct);
        if(! $this->detectFault($result))
        {
                print "CreateServerAdmin result: $result\n\n";

                ################################################################################
                #   UpdateServerAdmin
                ####################
                print "Running UpdateServerAdmin()\n";
                $AdminStruct = array('AdminID' => (int)$result, 'Name' => 'Update Server Admin', 'EmailAddress' => 'serveradmin@maileater.lyris.com', 'Password' => 'server123');
                $result = $this->lmapi->UpdateServerAdmin($AdminStruct);
                if(! $this->detectFault($result))   print "UpdateServerAdmin result: $result\n\n";

                ################################################################################
                #   DeleteServerAdmin
                ####################
                print "Running DeleteServerAdmin()\n";
                $result = $this->lmapi->DeleteServerAdmin($AdminStruct);
                if(! $this->detectFault($result))   print "DeleteServerAdmin result: $result\n\n";
        }

        ################################################################################
        #   CreateSiteAdmin
        ####################
        $result = 0;
        print "Running CreateSiteAdmin()\n";
        $WhatSites = array('main');
        $AdminStruct = array('EmailAddress' => 'siteadmin@maileater.lyris.com', 'Name' => 'Site Admin', 'Password' => 'ser123', 'WhatSites' => $WhatSites);
        $result = $this->lmapi->CreateSiteAdmin($AdminStruct);
        if(! $this->detectFault($result))
        {
                print "CreateSiteAdmin result: $result\n\n";

                ################################################################################
                #   UpdateSiteAdmin
                ####################
                print "Running UpdateSiteAdmin()\n";
                $AdminStruct = array('AdminID' => (int)$result, 'Name' => 'Update Site Admin', 'Password' => 'site123');
                $result = $this->lmapi->UpdateSiteAdmin($AdminStruct);
                if(! $this->detectFault($result))   print "UpdateSiteAdmin result: $result\n\n";

                ################################################################################
                #   DeleteSiteAdmin
                ####################
                print "Running DeleteSiteAdmin()\n";
                $result = $this->lmapi->DeleteSiteAdmin($AdminStruct);
                if(! $this->detectFault($result))   print "DeleteSiteAdmin result: $result\n\n";
        }


        ################################################################################
        #   SendMemberDoc
        ####################
        print "Running SendMemberDoc()\n";
        $result = $this->lmapi->SendMemberDoc(array(EmailAddress => $this->email , ListName => 'list1'), "confirm");
        if(! $this->detectFault($result))   print "SendMemberDoc result: $result\n\n";

        $result = $this->lmapi->SendMemberDoc(array(MemberID => $eliotMemberID), "goodbye");
        if(! $this->detectFault($result))   print "SendMemberDoc result: $result\n\n";


        ################################################################################
        #   CheckMemberPassword
        ####################
        print "Running CheckMemberPassword()\n";
        $result = $this->lmapi->CheckMemberPassword(
        array(
            EmailAddress => 'daffy_miss_duck@maileater.lyris.com',
            ListName => 'list1'),
        'is_this_her_pass');

        if(! $this->detectFault($result))   print "CheckMemberPassword result: $result (should be 0)\n\n";
        $result = $this->lmapi->CheckMemberPassword(
        array(
            EmailAddress => 'daffy_miss_duck@maileater.lyris.com',
            ListName => 'list1'),
        'donttelldonald');
        if(! $this->detectFault($result))   print "CheckMemberPassword result: $result (should be 1)\n\n";



        ################################################################################
        #   SelectSimpleMembers
        ####################
        $SelectMembers = array('EmailAddress like %', 'ListName=list1');
        print "Running SelectSimpleMembers()";

        $result = $this->lmapi->SelectSimpleMembers($SelectMembers);
        var_dump($result);

        print "\n\n";


        ################################################################################
        #   SelectMembers
        ####################
        $SelectMembers = array('EmailAddress like %maileater%', 'ListName = list1');
        print "Running SelectMembers()";

        $result = $this->lmapi->SelectMembers($SelectMembers);
        var_dump($result);

        print "\n\n";



        ################################################################################
        #   DeleteMember
        ####################
        print "Running DeleteMember()\n";
        $DeleteMembers = array('EmailAddress like %maileater%', 'ListName = list1');
        $result = $this->lmapi->DeleteMembers($DeleteMembers);
        if(! $this->detectFault($result)) print "$result Members Deleted.\n\n";

        ################################################################################
        #   SqlDelete
        ####################
        print "Running SqlDelete( bannedmembers_ , Domain = 'banned-server.com' )\n";
        $result = $this->lmapi->SqlDelete("bannedmembers_", "Domain_ = 'banned-server.com'");
        if(! $this->detectFault($result))   print "SqlDelete result: $result\n\n";

        ###############################################
        #   CreateMemberColumn
        ##################################################
        print "Running CreateMemberColumn(field_name, field_type)\n";
        $result = $this->lmapi->CreateMemberColumn("test_field_name","varchar20");
        if(! $this->detectFault($result))   print "CreateMemberColumn result: $result\n\n";

        ###############################################
        #   DeleteMemberColumn
        ##################################################
        print "Running DeleteMemberColumn(field_name)\n";
        $result = $this->lmapi->DeleteMemberColumn("test_field_name");
        if(! $this->detectFault($result))   print "DeleteMemberColumn result: $result\n\n";

        if ($this->faultcount != 0)
        {
            print "<h1>$this->faultcount MemberTests Failed</h1> Exiting!!"  ;
            return;
        }
    }

    function ListTests ()
    {
        print "<h1> ListTests</h1>";
        # DeleteList( $ListName )
        # CreateList( $ListType $ListName $ShortDescription $AdminName $AdminEmail $AdminPassword )
        # UpdateList( $ListStructIn )
        # SelectLists( $ListName $SiteName )
        # GetListID ($ListName )

        ################################################################################
        #   CreateList
        ####################
        #List Type: marketing announcements-moderated discussion-moderated discussion-unmoderated
        print "Running CreateList(  )\n";
        $result = $this->lmapi->CreateList("marketing", 'test-list1', 'The Test List', 'Barry White','barry@maileater.lyris.com','lyris','main');
        if(! $this->detectFault($result))   print "CreateList result: $result\n\n";

        ################################################################################
        #   UpdateList
        ####################
        print "Running UpdateLists(  )\n";
        $result = $this->lmapi->UpdateList(array(
                                ListName            => 'test-list1',
                                KeepOutmailPostings => 1,
                                MaxMessageSize      => 500, #in kilobytes
                                ConfirmUnsubscribes => 0,
                                DefaultSubject      => "Barry's News Blog",
                                NoEmail             => 1,
                                Topic               => 'main', # this is the site name
                                SubscriptionReports => array('daily','daily-email','daily-nochart')));
        if(! $this->detectFault($result))
        print "UpdateList result: $result\n\n";

        ################################################################################
        #   SelectLists
        ####################
        print "Running SelectLists(  )\n";
        $result = $this->lmapi->SelectLists('test-list1',''); #select all lists on server
        if (! $this->detectFault($result) )
        {
            var_dump ($result);
            print "\n\n";
        }

        print "Running SelectListsEx\n";
        $fieldArray = array ("ListName", "Admin", "CreationTimestamp");
        $criteriaArray = array ("ListName = test-list1");
        $result = $this->lmapi->SelectListsEx('','', $fieldArray, $criteriaArray);
        if(! $this->detectFault($result))
        {
                var_dump( $result );
                print "\n\n";
        }

        ################################################################################
        #   GetListID
        ####################
        print "Running GetListID(  )\n";
        $result = $this->lmapi->GetListID('test-list1');
        if(! $this->detectFault($result))
            print "ListID: $result\n\n";


        #clean up admin user created with create list
        ################################################################################
        #   DeleteList
        ####################
        print "Running DeleteList()\n";
        $result = $this->lmapi->DeleteList('test-list1');
        if(! $this->detectFault($result))
            print "DeleteList result: $result\n\n";

        if ($this->faultcount != 0)
        {
            print "<h1>$this->faultcount List Tests Failed</h1> Exiting!!"  ;
            return;
        }

    }


    function ContentTests ()
    {
        print "<h1> ContentTests</h1>";

        ################################################################################
        #   SelectContent
        ####################
        print "Running SelectContent()\n";

        #$result = $this->lmapi->SelectContent([]);
        $result = $this->lmapi->SelectContent(array("Title like %sample-09%"));

        if(! $this->detectFault($result))
            var_dump($result);

        print "\n\n";


        if ($this->faultcount != 0)
        {
            print "<h1>$this->faultcount Content Tests Failed</h1> Exiting!!"  ;
            return;
        }


        // Create Content
        print "Running CreateContent()\n";
        $DocPartText = array ('MimePartName' => 'text', 'Body' => 'This is text body of this content', 'Encoding' => '8bit', 'CharSetID' => 1);
        $DocPartHtml = array ('MimePartName' => 'html', 'Body' => '<HTML>This is <B>text </B> body of this <U>content</U></HTML>', 'Encoding' => '8bit', 'CharSetID' => 1);
        $DocParts = array ($DocPartText, $DocPartHtml);
        $contentStruct = array('NativeTitle' => 'This is content native title', 'Description' => 'This content description', 'Title' => 'This is content title', 'HeaderTo' => 'group@maileater.lyris.com', 'HeaderFrom' => 'sender@maileater.lyris.com', 'DocType' => 'CONTENTv2', 'DocParts' => $DocParts, 'ListName' => 'list1');

        $result = $this->lmapi->CreateContent($contentStruct);
        if(! $this->detectFault($result))
        {
                print "CreateContent result: $result\n\n";

                print "Running UpdateContent()\n";
                $contentStruct = array ('ContentID' => (int)$result, 'Description' => 'Modified description of the content', 'Title' => 'Modified content title');
                $result = $this->lmapi->UpdateContent($contentStruct);
                if(! $this->detectFault($result))  print "UpdateContent result: $result\n\n";
                print "Running DeleteContent()\n";
                $result = $this->lmapi->DeleteContent($contentStruct);
                if(! $this->detectFault($result))  print "DeleteContent result: $result\n\n";
        }
    }

    function SQLTests ()
    {
        print "<h1> SQLTests</h1>";
        ################################################################################
        #   SqlInsert
        ####################
        print "Running SqlInsert(lyrWebDoc)\n";
        $Table = "lyrWebDocs";
        $ReturnID  = 1;
        $InsertArray =
        array(
            array(Name  => 'Title',     Value => 'New Document'),
            array(Name  => 'Descript',  Value => 'This is a test HTML doc created by soap.'),
            array(Name  => 'Body' ,     Value => '<html><body><h1>This is a test</h1><b>Foo meets the bar</b></body></html>'),
            array(Name  => 'WebDocTypeID', Value => 3)
        );

        $webDocID = $this->lmapi->SqlInsert($Table, $InsertArray, $ReturnID);
        if(! $this->detectFault($webDocID))
            print "Inserted into $Table id $webDocID \n\n";


        ################################################################################
        #   SqlUpdate
        ####################
        print "Running SqlUpdate()\n";
        $InsertArray = array(
            array(Name  => 'Title',     Value => 'Updated The New Document'),
            array(Name  => 'IsTemplate',Value => 'T'),
            array(Name  => 'IsReadOnly',Value => 'T')
        );
        $Where  = "WebDocID = $webDocID";
        $result = $this->lmapi->SqlUpdate($Table, $InsertArray, $Where);
        if(! $this->detectFault($result))
            print "Updated $Table. Result: $result \n\n";

        ################################################################################
        #   SqlSelect
        ####################
        print "Running SqlSelect()\n";
        $result = $this->lmapi->SqlSelect("SELECT * FROM $Table WHERE $Where");
        if(! $this->detectFault($result))
        {
            print "SqlSelect: ";
            var_dump($result);
        }
        print "\n\n";


        ################################################################################
        #   SqlDelete
        ####################
        print "Running SqlDelete()\n";
        $result = $this->lmapi->SqlDelete($Table, $Where);
        if(! $this->detectFault($result))
        print "SqlDelete $Table. Result: $result \n\n";

        if ($this->faultcount != 0)
        {
            print "<h1>$this->faultcount SQL Tests Failed</h1> Exiting!!"  ;
            return;
        }

    }

    function SegmentTests ()
    {
        print "<h1> SegmentTests</h1>";

        ################################################################################
        #   SelectSegment
        ####################
        print "Running SelectSegments()\n";

        #$result = $this->lmapi->SelectSegments([]);
        $result = $this->lmapi->SelectSegments(array("SegmentName = not-aol", "ListName = list1"));

        if(! $this->detectFault($result))
            var_dump($result);
        print "\n\n";

        #create segment
        $SegmentStruct = array('SegmentName' => 'test_segment', 'ListName' => 'list1','Description' => 'api created segment', 'ClauseWhere' => 'MemberID_ < 1000');
        print "Running CreateSegment(SegmentStruct)\n";
        $result = $this->lmapi->CreateSegment($SegmentStruct);
        if(! $this->detectFault($result))print "Created segment with ID: $result \n\n";

        #delete segment
        print "Running DeleteSegment(SegmentStruct)\n";
        $segmentID = $result;
        $result = $this->lmapi->DeleteSegment($segmentID);
        if(! $this->detectFault($result))print "Deleted segment successful. \n\n";

        if ($this->faultcount != 0)
        {
            print "<h1>$this->faultcount Segment Tests Failed</h1> Exiting!!"  ;
            return;
        }

    }

    function MailingTests ()
    {
        print "<h1> MailingTests</h1>";
        # SendMailing $SegmentID $MailingStructIn
        # SendMailingDirect $EmailAddressArray $MemberIDArray $MailingStructIn
        # ImportContent $ContentID


        #first get some html content to send.
        print "Running SelectContent()\n";

        # bug in default serializer doens't send array with 1 element correctly.
        $content = $this->lmapi->SelectContent(array("Title = content-sample-20", "ContentID != 0")) ;
        if (! $this->detectFault($content) ) {

            print "Running ImportContent(".$content[0][ContentID].")\n";
            $Mailing = $this->lmapi->ImportContent($content[0][ContentID]);

            if (! $this->detectFault($Mailing) ) {


                #Import Content doesn't set all the fields we need.
                $Mailing[ListName] = 'list1'; #this needs to be set even if we are sending to a single recipient
                $Mailing[RewriteDateWhenSent] = true;
                $Mailing[BypassModeration] = true;
                $Mailing[From] = $this->email;
                $segmentID = 0 ; # send to whole list

                #preview mailing
                print "Running GetPreviewMailing(PreviewMailingStruct)\n";
                $DeleteMembers = array('EmailAddress like previewmailing%', 'ListName = list1');
                $this->lmapi->DeleteMembers($DeleteMembers);
                $result = $this->lmapi->CreateSingleMember('previewmailing@maileater.lyris.com','Preview Member','list1');
                if(! $this->detectFault($result))
                {
                        print "GetPreviewMailing for MemberID: $result\n";
                        $prevMail = array('TextToMerge' => $Mailing[HtmlMessage],'SubsetID' => 0,'MemberID' => $result);
                        #print_r( $prevMail);
                        # print_r($Mailing);
                        $result = $this->lmapi->GetPreviewMailing($prevMail);
                        if(! $this->detectFault($result))print "Preview: $result\n\n";

                        $DeleteMembers = array('EmailAddress like previewmailing%', 'ListName = list1');
                        $this->lmapi->DeleteMembers($DeleteMembers);
                }


                print "Running SendMailing()\n";
                $inMailID = $this->lmapi->SendMailing($segmentID, $Mailing);
                if(! $this->detectFault($result))
                print "Got InMailID $inMailID\n\n";


                #now get the status of the mailing and display it
                # note status may take some time to become available
                print "sleeping...\n";
                sleep (5);

                print "Running MailingStatus($inMailID)\n";
                $result = $this->lmapi->MailingStatus($inMailID);
                if(! $this->detectFault($result))
                    var_dump($result);
                print "\n\n";

                $recipients = array($this->email, 'testsend2@maileater.lyris.com', 'Thomas-Aquinas@maileater.lyris.com');
                $memberids  = array();

                print "Running SendMailingDirect()\n";
                $outmailid = $this->lmapi->SendMailingDirect($recipients, $memberids , $Mailing);
                $result = $outmailid;
                if ( (! $this->detectFault($result)) && $result != 0) {print "Mail Sent outMailID $outmailid \n\n";}

                print "Running SendMessage()\n";
                $HeadersIn = array(
                  array('Name' => 'Subject',  'Value' => 'This is a SendMessage test subject'),
                  array('Name' => 'From',   'Value' => 'ApiClient@maileater.lyris.com') );
                $recipients = array($this->email, 'testsend2@maileater.lyris.com', 'Thomas-Aquinas@maileater.lyris.com');
                $memberids = array();
                $sendmessage = array ( 'HeadersIn' => $HeadersIn,
                         'ListName' => 'list1',
                         'Body' => 'This is a body of a message',
                         'RecipientEmailsIn' => $recipients,
                         'RecipientMemberIDsIn' => $memberids );
                $result = $this->lmapi->SendMessage($sendmessage);
                if ( (! $this->detectFault($result)) && $result != 0) {print "Send message ID = $result \n\n";}

                print "Running TMSendMessage()      // create a transactional message thru GUI, update MailingID below and uncomment PHP code to test\n";
                /*
                $KeyValues = array(
                  array('Name' => 'name',  'Value' => 'Mr. Donald Duck'),
                  array('Name' => 'bookname',   'Value' => 'Adventures of PHP Donald Duck'),
                  array('Name' => 'amount',   'Value' => '19.99') );
                $tmsendmessage = array ( 'Payload' => $KeyValues,
                         'MailingID' => 7,
                         'RecipientEmail' => 'donald_duck@maileater.lyris.com');
                $result = $this->lmapi->TMSendMessage($tmsendmessage);
                if ( (! $this->detectFault($result)) && $result != 0) {print "TM Send message ID = $result \n\n";}
*/

                print "\nRunning ScheduleMailing()\n";
                $moderateID = $this->lmapi->ScheduleMailing(0, "2020-12-17T09:30:47-05:00", $Mailing);
                if ( ! $this->detectFault($result) && $result != 0) {print "Mailing Scheduled  $moderateID \n\n";}
                $moderated = $this->lmapi->ModerateMailing($moderateID, 1, 0); # Approve mailing    3rd parameter is undefined
                if (! $this->detectFault($result) && $moderated)    {
                    print "Moderate Approve successful! moderateID $moderateID" ;
                } else {
                    print "Moderate Approve  FAILED! $moderateID";
                }

                print "\nRunning ScheduleMailing()\n";
                $moderateID = $this->lmapi->ScheduleMailing(0, "2020-12-17T09:30:47-05:00", $Mailing);
                if ( ! $this->detectFault($result) && $result != 0) {print "Mailing Scheduled  $moderateID \n\n";}
                $moderated = $this->lmapi->ModerateMailing($moderateID, 0, 0); # reject no message mailing  3rd parameter is undefined
                if (! $this->detectFault($result) && $moderated)    {
                    print "Moderate rejection, no message successful! moderateID $moderateID" ;
                } else {
                    print "Moderate rejection, no message successful! $moderateID";
                }

                print "\nRunning ScheduleMailing()\n";
                $moderateID = $this->lmapi->ScheduleMailing(0, "2020-12-17T09:30:47-05:00", $Mailing);
                if ( ! $this->detectFault($result) && $result != 0) {print "Mailing Scheduled  $moderateID \n\n";}
                $moderated = $this->lmapi->ModerateMailing($moderateID, 0, 1); # reject with message mailing    3rd parameter is undefined
                if (! $this->detectFault($result) && $moderated)    {
                    print "Moderate rejection, send rejection message  successful! moderateID $moderateID" ;
                } else {
                    print "Moderate rejection, send rejection message  FAILED! $moderateID";
                }

                print "Running TrackingSummary()\n";
                $result = $this->lmapi->TrackingSummary($outmailid);
                if(! $this->detectFault($result))
                    var_dump($result);




            } else {print "Could not ImportContent: "; var_dump($Mailing); print "\n"; }

        } else {print "Could not SelectContent! "; var_dump($Mailing); print "\n"; }

        if ($this->faultcount != 0)
        {
            print "<h1>$this->faultcount Mailing Tests Failed</h1> Exiting!!"  ;
            return;
        }

    }

    function siteTopicTests ()
    {
        print "<h1>Site/Topic Tests</h1>";

        #create site and topic
        print "Running CreateSite";

        $SiteStruct =
            array( 'SiteName' => 'test_site','HostName' => 'localhost', 'SiteDescription' => 'Test Desc');
        $TopicStruct =
            array ('TopicDescription' => 'Test Description', 'TopicName'=> 'test_topic',
                'SiteName' => 'test_site');

        $result = $this->lmapi->CreateSite($SiteStruct);
        if(! $this->detectFault($result)) print "Site created id is $result.\n\n";

        $siteID = $result;

        print "Running CreateTopic";
        $result = $this->lmapi->CreateTopic($TopicStruct);
        if(! $this->detectFault($result)) print "Topic created successfully.\n\n";

        #update site and topic
        $SiteStruct['SiteDescription'] = "New Test Description";
        $SiteStruct['SiteID'] = $siteID;
        $TopicStruct['TopicDescription'] = "New Test Description";
        print "Running UpdateSite";

        $result = $this->lmapi->UpdateSite($SiteStruct);
        if(! $this->detectFault($result)) print "Site updated successfully.\n\n";

        print "Running UpdateTopic";

        $result = $this->lmapi->UpdateTopic($TopicStruct);
        if(! $this->detectFault($result)) print "Topic updated successfully.\n\n";

        #delete site topic
        print "Running DeleteTopic";

        $result = $this->lmapi->DeleteTopic($TopicStruct['TopicName']);
        if(! $this->detectFault($result)) print "Topic deleted successfully.\n\n";

        print "Running DeleteSite";

        $result = $this->lmapi->DeleteSite($siteID);
        if(! $this->detectFault($result)) print "Site deleted successfully.\n\n";


        if ($this->faultcount != 0)
        {
            print "<h1>$this->faultcount Site/Topic Tests Failed</h1> Exiting!!"  ;
            return;
        }

    }
    function CreateManyMemberPerformanceTest ()
    {
        print "<h1>CreateManyMember Performance Test</h1>";

        print "Running DeleteMember()\n";
        $DeleteMembers = array('EmailAddress like %maileater%', 'ListName = list1');
        $result = $this->lmapi->DeleteMembers($DeleteMembers);
        if(! $this->detectFault($result)) print "$result Members Deleted.\n\n";

        print "Running CreateManyMember()\n";

        for ($i = 0 ; $i < $_REQUEST[members_to_create]; $i++) {
            $MemberStructArray[] = array( "EmailAddress" => "test$i".'@maileater.lyris.com', ListName => 'list1');
        }

				if ( empty( $MemberStructArray ) )
				{
					print "<BR>Number of members to be created must be larger than 0";
					return;
				}
        $this->lmapi->response_timeout = 60 * 60;
        print "Running CreateManyMembers()\n";
        $start_time = time();
        $result = $this->lmapi->CreateManyMembers($MemberStructArray, "list1", 0);
        $end_time = time();

        print "CreateManyMembers() took: ". date("i:s", $end_time - $start_time) ."  \n";
        if(! $this->detectFault($result))
        {
            print "Created $result members";
            print "\n\n";
        }
    }

    function detectFault ($result)
    {   // Check for a fault
        if ($this->lmapi->fault)
        {
            $this->faultcount++;
            echo '<h2>Fault</h2><pre>';
            ECHO "<font color=red>".$this->lmapi->faultstring."</font>";
            if ($this->debug)
                print_r($result);

            echo '</pre>';
            return true;

        }
        else
        {   // Check for errors
            $err = $this->lmapi->getError();

            if ($err)
            {   // Display the error
                echo '<h2>Error</h2><pre>' . $err . '</pre>';
                if ($this->debug)
                    echo "<pre>".$this->lmapi->debug_str.'<pre>';
                return true;
            }
        }
        return false;
    }

    function HomePage()
    {
        $debugChecked= $this->debug ? "CHECKED" : "";
        $members_to_create = isset($_REQUEST['members_to_create']) ? $_REQUEST['members_to_create'] : "";

        print '<form action='.$_SERVER["SCRIPT_NAME"].'><div align="center">
                    <fieldset>
                      <div align="left">
                        <legend><font size="+1"><em>Listmanager API Client Using PHP</em></font></legend>
                        <br>
                      </div>
                      <table width="75%" border="0" align="center" cellpadding="0" cellspacing="0">
                        <tr>
                          <td><strong>WSDL Location</strong></td>
                          <td><input name="wsdl" type="text" value="'.$this->wsdl_location.'" size=45> <input type=submit name=Refresh value=Refresh></td>
                        </tr>
                        <tr>
                          <td><strong>UserName</strong></td>
                          <td>
                              <input name="userName" type="text" value="'.$this->userName.'" size="20">
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Password</strong></td>
                          <td><input name="password" type="password" value="'.$this->password.'" size="10"></td>
                        </tr>
                        <tr>
                          <td><B><label for=debugCheckbox>Enable Debugging?</label></B></td>
                          <td><input type=checkbox value=1 '.$debugChecked.' id=debugCheckbox name=debug> </td>
                      </table>
                      <br>
                      <table width="75%" border="0" align="center" cellpadding="5" cellspacing="0">
                        <tr>
                          <td> <input name="f" type="submit" id="f" value="Member Tests"> </td>
                          <td> <input name="f" type="submit" id="f" value="List Tests"> </td>
                          <td> <input name="f" type="submit" id="f" value="Content Tests"> </td>
                        </tr>
                        <tr>
                          <td> <input name="f" type="submit" id="f" value="SQL Tests"> </td>
                          <td> <input name="f" type="submit" id="f" value="Segment Tests"> </td>
                          <td> <input name="f" type="submit" id="f" value="Mailing Tests">
                          </td>
                        </tr>
                        <tr>
                          <td> <input name="f" type="submit" id="f" value="Site/Topic Tests"> </td>
                          <td><input name="f" type="submit" id="f" value="CreateManyMember Performance"></td>
                        </tr>
                        <tr>
                          <td><!-- <input name="f" type="submit" id="f" value="CreateSingleMember Performance">--></td>
                          <td>Number of members to create: <input value="'.$members_to_create.'" name="members_to_create"></td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td><input name="f" type="submit" id="f" value="Run All Tests"> </td>
                          <td>&nbsp;</td>
                        </tr>
                      </table>

                    </fieldset>
                </div></form>';
    }
}
?>

</body>
</html>

