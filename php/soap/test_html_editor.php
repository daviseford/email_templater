<?php
/**
 * Created by PhpStorm.
 * User: Davis
 * Date: 11/11/2015
 * Time: 4:08 PM
 */

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>A Simple Page with CKEditor</title>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha256-MfvZlkHCEqatNoGiOXveE8FIwMzZg4W85qfrfIFBfYc= sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ=="
          crossorigin="anonymous">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"
            integrity="sha256-Sk3nkD6mLTMOF0EOpNtsIry+s1CsaqQC1rVLTAy+0yc= sha512-K1qjQ+NcF2TYO/eI3M6v8EiNYZfA95pQumfvcVrTHtwQVDG+aHRqLi/ETn2uB+1JqwYqVG3LIvdm9lj6imS/pQ=="
            crossorigin="anonymous"></script>
    <script src="//cdn.ckeditor.com/4.5.4/full/ckeditor.js"></script>
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <textarea name="editor1" id="editor1" rows="10" cols="60">
                This is my textarea to be replaced with CKEditor.
            </textarea>
        </div>
        <div class="col-md-2"></div>
    </div>
</div>
<script>


    $(document).ready(function () {

        // Replace the <textarea id="editor1"> with a CKEditor
        // instance, using default configuration.
//            CKEDITOR.replace('editor1');
//
//            CKEDITOR.instances.editor1.setData( '<p>This is the editor data.</p>' );

//            CKEDITOR.ajax.post( 'dms_html_json.php', '', null, function( data ) {
//                console.log( data );
//            } );

        function getHTML() {
            return $.ajax({
                url: 'dms_html_json.php',
                contentType: "application/json; charset=utf-8",
                method: "POST",
                dataType: 'json',
                success: function (data) {
                },
                error: function (data) {
                    console.log(data)
                }
            });
        }

        var getHtml = getHTML();

        getHtml.done(function (data) {
            console.log(data);

            CKEDITOR.replace( 'editor1', { // Replace the <textarea id="editor1"> with a CKEditor instance, using default configuration.
                extraAllowedContent: 'style;*[id,rel](*){*}'
            } );
            CKEDITOR.instances.editor1.setData(data);
        })
    })
</script>
</body>
</html>

