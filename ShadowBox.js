$(document).ready(function () {

    // Set shadowbox img to shadowb0x background image
    var moveImg = "";
    $('.shadowb0x > img').each(function () {
        moveImg = $(this).attr('src');
        $(this).parent().css('background-image', 'url(' + moveImg + ')');
        $(this).parent().css('background-size', 'cover');
        $(this).parent().css('background-repeat', 'no-repeat');
        $(this).parent().css('background-position', 'center 20%');
    });
        

    var title_array = $('.shadowb0x > img').map(function() {
            return $(this).attr('title');
    });

    var title = "";
    var url = "";
    var imageIndex = 0;     

    generateShadowBox();

    function generateShadowBox() {        
        // Generate structure
        $("<div class='shadowDiv'></div>").prependTo('body');
        $('.shadowDiv').each(function(){
            $("<div class=shadowActive></div>").appendTo(this);
            $("<a href='#' class='leftArrow'></a>").appendTo(this);
            $("<a href='#' class='rightArrow'></a>").appendTo(this);
            $(".shadowDiv").children().hide();
        });
        // Generate Links for Image number buttons
        if (img_array.length > 2) {
            for (var z = 0; z < img_array.length; z++) {            
            $("<a href=# class='shadowButton' src=" + img_array[z] + ">" + (z + 1)  + "</a>").appendTo('.shadowDiv');
        }
        // Generate positioning for image number buttons
        var buttonCenter = 100 / parseInt(img_array.length);
        for (var x = 0; x < img_array.length; x++) {
            $( ".shadowButton").eq(x).css('left', buttonCenter * (x + 1) - (buttonCenter/2) + '%');        
        };    
        }

    }


    function displayShadowBox(url, title) {
        $('.shadowDiv > div').addClass("shadowActive").hide();
        $('.shadowActive').css('background-image', 'url(' + url + ')' );
        $("<p>" + title + "</p>").appendTo('.shadowActive');
        $(".shadowDiv").children().show();
        console.log(url);
        $('.shadowActive').fadeTo(300, 1.0);

    }


    function setLeftArrowLink(url) {
        if (img_array.length == 1) {
            $('.leftArrow').hide();
        }
        $('.leftArrow').click(function(event) {
            event.preventDefault();
            console.log(this);
            for (var i = 0; i < img_array.length; i++){
                if (url == img_array[i]){
                    if (i == 0){
                        $('.shadowActive').css('background-image', 'url(' + img_array[img_array.length - 1] + ')' );
                        url = img_array[img_array.length - 1];
                        $('.shadowActive p').text(title_array[title_array.length - 1]);
                        title = title[title.length - 1];
                        break;
                    }
                    else{
                        $('.shadowActive').css('background-image', 'url(' + img_array[i - 1] + ')' );
                        url = img_array[i - 1];
                        $('.shadowActive p').text(title_array[i - 1]);
                        title = title_array[i - 1];
                        break;
                    }                    
                }
            }
        });
    }


    function setRightArrowLink(url) {
        if (img_array.length == 1) {
            $('.rightArrow').hide();
        }
        $('.rightArrow').click(function(event) {
            event.preventDefault();
            console.log(this);
            for (var i = 0; i < img_array.length; i++){
                if (url == img_array[i]){
                    if (i == (img_array.length - 1)){
                        $('.shadowActive').css('background-image', 'url(' + img_array[0] + ')' );
                        url = img_array[0];        
                        $('.shadowActive p').text(title_array[0]);
                        title = title_array[0];                
                    }
                    else{
                        $('.shadowActive').css('background-image', 'url(' + img_array[i + 1] + ')' );
                        url = img_array[i + 1];
                        $('.shadowActive p').text(title_array[i + 1]);
                        title = title_array[i + 1];
                        break;
                    }                    
                }
            }
        });
    }

    // When you click on an a tag with this class
    $('.shadowb0x').click(function(event) {
        event.preventDefault();
        url = $(this).children().attr('src');
        title = $(this).children().attr('title');
        displayShadowBox(url, title);
        setLeftArrowLink(url);
        setRightArrowLink(url);    
        $('.shadowButton').show();
        $('body').addClass('stop-scrolling');
        jQuery('body').unbind('touchmove');
    });

    // When you click on shadowActive shadowbox
    $('.shadowDiv > div').click(function(event){
        $(this).fadeTo(300, 0).hide();
        $(this).siblings().hide();
        $(this).children().hide();
        $('body').removeClass('stop-scrolling');
        jQuery('body').bind('touchmove');
    });

    // ShadowBox Images links inside gallery
    $('.shadowButton').click(function(event) {
        event.preventDefault();
        var sButtonLink = $(this).attr('src');
        $('.shadowActive').css('background-image', 'url(' + sButtonLink + ')' );
        for (var v = 0; v < img_array.length; v++){
            if (sButtonLink == img_array[v]){
                $('.shadowActive p').text(title_array[v]);
                console.log(title_array[v]);
                setLeftArrowLink(sButtonLink);
                setRightArrowLink(sButtonLink);
                sButtonLink = "";
                break;
            } 
        }
    });

    // If gallery class exists, use images within it for the shadowbox and ignore the rest. 

    // if ($('.gallery').length) {
    //     var img_array = $('.gallery .shadowb0x > img').map(function () {
    //         return $(this).attr('src');
    //     });
    // } else {
    //     var img_array = $('.shadowb0x > img').map(function () {
    //         return $(this).attr('src');
    //     });
    // }

    // Add minified images

    //var minImgArray = [];
    //var tempEnd = "";
    //for (var q = 0; q < img_array.length; q++) {
    //    tempEnd = img_array[q].slice((img_array[q].length - 4), img_array[q].length);
    //    minImgArray[q] = img_array[q].slice(0, (img_array[q].length - 4) ) + ".min" + tempEnd;
    //    console.log(minImgArray[q]);
    //}

});


