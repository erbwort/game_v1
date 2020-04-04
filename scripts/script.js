$(function(){



    var x = document.getElementsByClassName("a-slider");
    $(".a-slider").on('click', function() {
        alert(x[1].firstChild.nodeName)
        x.item(1).hide


        // $('div.a-slider-hidden:visible').closest(".a-slider").css("height", "80%")
        // $('div.a-slider-hidden:visible').closest(".a-slider").css("margin-top", "10%")
        // $('div.a-slider-hidden:visible').closest(".a-slider").toggleClass("unclicked")
        //
        // $('div.a-slider-hidden:visible').css("visibility", "hidden")
        // $(this).children(".a-slider-input").children(".a-slider-hidden").css("visibility", "visible")
        // $(this).toggleClass('clicked');
    });


});