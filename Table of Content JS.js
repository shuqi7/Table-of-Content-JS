
// for TOC
// use div tag instead of h2 tag
// loading
$(function() {
  
    // generate TOC
    var $toc = $(".toc .container-12 .grid-12");
    
    $toc.append("<ul></ul>");
    $(".article").each(function() {
        var current = $(this),  // pointing at article
            heading = current.find("h2").first();
       if ((current.attr("id") != "toc" && current.attr("id") != null) && heading.text() != "") {
                if (heading.attr('data-toc') == null) { // data-toc not exist
                      var toInsert = heading.text().replace(/-/g,' ');
                } else {
                      var toInsert = heading.attr('data-toc').replace(/-/g,' ');
                }                

               $(".toc ul").append("<li><a href='#" + current.attr('id') + "'>" + toInsert + "</a></li>");
               $(".toc ul li a").css("text-transform", "capitalize");
       }
    });

    

    if ($(window).width() > 1683){
    	$(".toc").find("h2").text("On this page:");
    	$("#intro").css('margin-top','100px');
    } else {
    	$("#intro").css('margin-top','30px');

    }

});



// resizing or scrolling
$(function() { 

    var $toc   = $(".toc"), 
        $window = $(window),
        $wrapper = $("#content-container"),
        topPadding = 70;
        
        function changeToc() {

          if ($(window).width() > 1683){ // applicable only for screen width > 1700
          	  $(".toc").find("h2").text("On this page:");
          	  // change margin of Intro
          	  $("#intro").css('margin-top','100px');
          	  $(".toc").css('left','');
          	  $(".toc ul").removeClass("afterClick");
              var offset = $toc.offset(),
                  wrapperOffset = $wrapper.offset();
              if ($window.scrollTop() + $toc.height() > wrapperOffset.top + $wrapper.height()) { // at the bottom
                  $toc.css('position','static');
              } else if ($("#precontent").offset().top+$("#precontent").height() < $window.scrollTop()) {   // when scrolling
                $toc.css('position','fixed');
                $toc.css('top','0px');
                $toc.css('right','100px');

             } else {     
                $toc.css('position','absolute');
                $toc.css('top',"");
                $toc.css('right','100px');
            } 
            
          } else if ($(window).width() <= 1683 && $(window).width() > 633){ // applicable for screen width 650 <= 1700
          	  $(".toc").find("h2").text("");
          	  // change margin of Intro
          	  $("#intro").css('margin-top','30px');

          	  $(".toc").css('left','');
          	  $(".toc").css("position", "static");
          	  $(".toc ul").removeClass("afterClick");
          	  // clear color when resizing
              $(".toc").find("a").each(function() {
                  $(this).css("color", "");
                  $(this).parent().css("background-color", "");
              });
          } else{ // width <= 650
				$(".toc").find("h2").text("");
				if($(window).scrollTop() > $("#precontent").offset().top){
					$(".toc").css("position","fixed");
					$(".toc").css("top","0");
					$(".toc").css("left","0");
				} else {
					$(".toc").css("position","static");
									
				}
          }
        
       }

    $(window).scroll(changeToc);
    $(window).resize(changeToc);
      

});

//toggle TOC icon

$(function(){
		$("#tocIcon").click(function(){
			if ($(".toc ul").css("display") == "none"){
				$(".toc ul").addClass("afterClick");
			} else {
				$(".toc ul").removeClass("afterClick");
			}
		});
});



// Back to Top
$(function(){
	
	function changeBackToTop(){
		if ($(window).scrollTop() < 600){
			$("#backToTop").css("display","none");
		} else {
			$("#backToTop").css("display","");
		}
	}
    $(document).ready(changeBackToTop);
	$(window).scroll(changeBackToTop);
	$(window).resize(changeBackToTop);
});



 // for scrolling animation effect

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 40//-20 for anchor change
    }, 'slow');
});
