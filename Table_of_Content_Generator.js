// using window.size() = 1683 because of the width of scrollbar
// Table of content is in two designs: On the side of the page when screen size is big and on the top of the page for smaller screen
// Please add the anchor tag into the html under <div id="precontent"></div>
// Anchor: <div class="toc"> <div class="container-12"> <div class="grid-12"> </div> </div> </div>

// generate content inside of the Table of Content: use div tag id instead of h2 tag
$(function() {
	// when finish loading the page, if width < 1600, shift toc's position
	if ($(window).width() <= 1683) { 
		if ($(".toc").parent().attr("id") != "content-container") { // div is in precontent; need to shift
			$(".toc").insertAfter($("#intro"));
		}
	}
	// generate TOC
	var $toc = $(".toc .container-12 .grid-12");
	// detect language of the html
	var theLanguage = $('html').attr('lang');
	// French version
	if (theLanguage == "fr") {
		$(".toc").find("h2").text("Sur cette page:");
	} else { // English version
		$(".toc").find("h2").text("On this page:");
	}
	// append a list to contain all anchor links
	$toc.append("<ul></ul>");
	// find all articles and then get the h2 tags as the anchor links
	$(".article").each(function() {
		var current = $(this), // pointing at the article
		heading = current.find("h2"); // find the h2 tag inside the article
		if (current.attr("class") != "article toc") {
			heading.each(function() {
				var currentHeading = $(this);
				// for headings without ID,
				// if the heading has data-toc attribute, then use the data-toc as the ID for it
				// otherwise use the content inside the heading as its ID
				if (currentHeading.attr('data-toc') == null) { // data-toc not exist
					var toInsert = currentHeading.text().replace(/-/g,' ');
				} else {
					var toInsert = currentHeading.attr('data-toc').replace(/-/g,' ');
				}
				// go to the heading instead of article
				if (currentHeading.attr('id') == null){
					currentHeading.attr('id', currentHeading.text().replace(/[^A-Z0-9]+/ig, '-'));
				}
				// create an anchor link in the TOC directing to the headings 
				$(".toc ul").append("<li><a href='#" + currentHeading.attr('id') + "'>" + toInsert + "</a></li>");
			});
		}
	});

	// for the animation/styles of the TOC
	boldTOC();

	if($(window).width() > 1683){
		// move share-on buttons below the TOC
		$("#share").insertAfter($(".toc .container-12"));
		$("#share").addClass("share-in-toc");
	}
});



// change the design of Table of Contents for responsivenss
var $toc = $(".toc"),
$window = $(window),
$wrapper = $("#content-container"),
topPadding = 70;

// to change TOC for responsiveness
function changeToc() {

	if ($(window).width() > 1683){ // applicable only for screen width > 1700
		if ($toc.parent().attr("id") != "precontent") { // div is in content-container; need to shift
			$("#precontent").append($toc);
		}

		var offset = $toc.offset(),
		wrapperOffset = $wrapper.offset();
		if ($window.scrollTop() + $toc.height() > wrapperOffset.top + $wrapper.height()) {// TOC at the bottom of the page
			$toc.css('position','static');
		} else if ($("#preheader").offset().top+$("#preheader").height() < $window.scrollTop() ) {// TOC when scrolling
			$toc.css('position','fixed');
			$toc.css('top','0px');
			$toc.css('right','0px');
		} else {// TOC at the top of the page
			$toc.css('position','absolute');
			$toc.css('top',"");
			$toc.css('right','0');
		}
		// for the animation/styles of the TOC
		boldTOC();

		// move share-on buttons
		$("#share").insertAfter($(".toc .container-12"));
		$("#share").addClass("share-in-toc");

	} else { // applicable for screen width <= 1700

		if ($toc.parent().attr("id") != "content-container") { // div is in precontent; need to shift
		$toc.insertAfter($("#intro"));
		}
		$(".toc").css("position", "static");
		$(".toc").find("a").each(function() {
		$(this).removeClass("strong");
		});
		// move share-on buttons
		$("#share").insertAfter($("#subheader .breadcrumb"));
		$("#share").removeClass("share-in-toc");
	}

}

// call changeTOC when scroll or resize of the window is down
$(window).scroll(changeToc);
$(window).resize(changeToc);



// function to check if a DOM element is within view by using ID and jQuery
function isElementOnScreen(id) {
	var curr = "#" + id;
	return $(curr).offset().top < ($(window).scrollTop() + $(window).height()/2 );
}



// for the animation/styles of the TOC
function boldTOC(){
	// make the TOC entry font strong when its corresponding content is inside the screen
	$("#content-container h2").each(function(){
		// ID of each h2 tag
		var currentElement = $(this).attr("id");
		if (isElementOnScreen(currentElement)){//current h2 is on the screen
			// search through all anchor links in TOC
			$(".toc a").each(function(){
				var toCompare = "#" + currentElement;
				// Macthed
				if ( toCompare == $(this).attr("href")){
					$(this).addClass("strong");
				} else {
					$(this).removeClass("strong");
				}
			});
		}
		return;
	});
}

// for scrolling animation effect
$(".toc").on('click', 'a[href^="#"]', function (event) {
	event.preventDefault();
	$('html, body').animate({
		scrollTop: $($.attr(this, 'href')).offset().top-100 //-100 for anchor to change
	}, 'slow');
});

