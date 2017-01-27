var ScrollInf = function(settings){

	this.defaults = {
		paginatorElement       : ".c-pagination",
		itemPageClass          : ".l-search-result__page",
		scrollingContent       : "#scrollingContent",
		baseURLRequest         : "",
		baseURLSuffix          : "",
		queryString            : "",
		filter                 : "",
		sort                   : "",
		gender				   : "",
		min					   : "",
		max					   : "",
		onShowPrevPage         : false,
		onShowNextPage         : false,
		onScrollPage           : false,
		onPageItsMostVisible   : false,
		onInitLoading          : false,
		onEndLoading           : false
	};

	this.setUp(settings);

	this.nextUrl = "";
	this.prevUrl= "";
	this.cache = {
		nextData: "",
		prevData: ""
	};
	this.isLoading = 0;
	this.elementHideOnLoad = "";
	this.lastScroll = 0;
};

ScrollInf.prototype.setUp = function(settings){
	this.settings = $.extend({}, this.defaults, settings);
	for(var index in this.settings){
		this[index] = this.settings[index];
	}
};

ScrollInf.prototype.loadFollowing = function(){
	var that = this;
	if(this.nextUrl == ""){
		//log("debe estar siempre visible el pagination");
		this.togglePagination(1);
	} else {
		this.isLoading = 1;
		this.onInitLoading && this.onInitLoading();
		//this.togglePagination();
		if(this.cache.nextData){
			this.showNextPage(this.cache.nextData);
			this.onEndLoading && this.onEndLoading();
			this.isLoading = 0;
		} else {
			$.getJSON(this.nextUrl, function(data){
				that.onEndLoading && that.onEndLoading();
				that.showNextPage(data);
				that.isLoading = 0;
			});
		}
	}
};

ScrollInf.prototype.showNextPage = function(response){
	var that = this,
		lastItemPage = this.itemPageClass + ":last";

	//insert the next page from data
	if(typeof this.onShowNextPage === "function"){
		this.onShowNextPage(lastItemPage, response);
	} else {
		$(lastItemPage).after(response.data);
	}

	var nextNumPageFromRequest = response.data.next;
	if(String( nextNumPageFromRequest ) == ""){
		this.nextUrl = "";
	} else {
		this.nextUrl = "" + this.baseURLRequest + this.filter + this.queryString + this.sort + this.gender + this.min + this.max + nextNumPageFromRequest + this.baseURLSuffix;
		this.cache.nextData = false;
		$.getJSON(this.nextUrl, function(previewData){
			that.cache.nextData = previewData;
		});
	}
};

ScrollInf.prototype.togglePagination = function(handler){
	var realHandler = (typeof handler === "undefined")?0:1;
	if(realHandler){
		$(this.paginatorElement).show();
	} else {
		$(this.paginatorElement).hide();
	}
};

ScrollInf.prototype.loadPrevious = function(){
	var that = this;
	if(this.prevUrl == ""){
		this.togglePagination(1);
	} else {
		this.isLoading = 1;
		this.onInitLoading && this.onInitLoading();

		if(this.cache.prevData){
			this.showPreviousPage(this.cache.prevData);
			this.onEndLoading && this.onEndLoading();
			this.isLoading = 0;
		} else {
			$.getJSON(this.prevUrl, function(data){
				that.onEndLoading && that.onEndLoading();
				that.showPreviousPage(data);
				that.isLoading = 0;
			});
		}
	}
};

ScrollInf.prototype.showPreviousPage = function(response){
	var that = this;
	//insert in the before side of the current page
	var firstItemPage = this.itemPageClass + ":first";
	//insert the next page from data
	if(typeof this.onShowPrevPage === "function"){
		this.onShowPrevPage(firstItemPage, response);
	} else {
		$(firstItemPage).before(data.response);
	}

	var itemHeight = $(firstItemPage).height();
	window.scrollTo(0, $(window).scrollTop() + itemHeight); //adjust the scroll

	var prevNumPageFromRequest = response.data.prev;
	if(String( prevNumPageFromRequest ) == ""){
		this.prevUrl = "";
	} else {
		this.prevUrl = "" + this.baseURLRequest + this.filter + this.queryString + this.sort + this.gender + this.min + this.max + prevNumPageFromRequest + this.baseURLSuffix;
		this.cache.prevData =  false;

		$.getJSON(this.prevUrl, function(prevData){
			that.cache.prevData = prevData;
		});

		if(this.elementHideOnLoad){
			$(this.elementHideOnLoad).hide();
			this.elementHideOnLoad = "";
		}
	}

};

ScrollInf.prototype.elementOfPageMostlyVisible = function(element){
	//if ca 25% of element is visible
	var scrollPos = $(window).scrollTop(),
		windowHeight = $(window).height(),
		elementTop = $(element).offset().top,
		elementHeight = $(element).height(),
		elementBottom = elementTop + elementHeight;
	return ((elementBottom - elementHeight*0.25 > scrollPos) &&
			(elementTop < (scrollPos+0.5*windowHeight)));
};

//init the paginator with the events
ScrollInf.prototype.init = function(){
	var that = this;
	$(window).scroll(function(){
		that.onScroll();
	});
	$(document).ready(function(){
		that.onDocumentReady();
	});
};

ScrollInf.prototype.onScroll = function(){
	var that = this,
		scrollPos = $(window).scrollTop(),
		diferenceWithWindowAndDocumentHeights = function(){
			return $(document).height() - $(window).height();
		};
	if(scrollPos >= 0.7 * diferenceWithWindowAndDocumentHeights()){
		if(this.isLoading == 0){
			this.loadFollowing();
		}
	}

	if(scrollPos <= 0.7 * $("header").height()){

		if(this.isLoading == 0){
			this.loadPrevious();
		}
	}

	//Adjust the URL based on the top item shown for reasonable amounts of items
	if(Math.abs(scrollPos - this.lastScroll) > $(window).height() * 0.1){
		this.lastScroll = scrollPos;
		$(this.itemPageClass).each(function(index){
			if(that.elementOfPageMostlyVisible(this)){
				var dataPagination = $(this).data("pagination");
				if(typeof history.replaceState !== "undefined"){
					history.replaceState(null, null, $(this).attr("data-url"));
				}

				if(that.onPageItsMostVisible){
					that.onPageItsMostVisible($(this).attr("data-url"), that.paginatorElement, dataPagination);
				} else {
					$(that.paginatorElement).html(dataPagination);
				}
				return false;
			}
		});
	}

	if( typeof that.onScrollPage === "function"){
		that.onScrollPage.call(this);
	}

};

ScrollInf.prototype.onDocumentReady = function(){
	//if we have enough room, load the next batch
	if($(window).height() > $(this.scrollingContent).height() ){
		if(this.nextUrl !== ""){
			this.loadFollowing();
		} else {
			//var filler = document.createElement("div");
			//filler.id = "filler";
			//filler.style.height = ($(window).height() - $(this.scrollingContent).height()) + "px";
			//$(this.scrollingContent).after(filler);
			//this.elementHideOnLoad = "filler";
		}
	}

};

ScrollInf.prototype.moveUnderHeader = function(){
	//scroll down to hide empty page
	var headHeight = $("header").height();
	window.scrollTo(0, headHeight);
};

ScrollInf.prototype.primeInCache = function(prevURLData, nextURLData){
	var that = this;

	if(prevURLData){
		this.prevUrl = prevURLData;
		$.getJSON(prevURLData, function(data){
			that.cache.prevData = data;
		});
	}

	if(nextURLData){
		this.nextUrl = nextURLData;
		$.getJSON(nextURLData, function(data){
			that.cache.nextData = data;
		});
	}

};
