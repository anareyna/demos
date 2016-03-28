App = (->
	dom = {}
	st =
		btnEnviar: "button.enviar"
		mobileContact: ".mobileContact"
		tipoContact: ".tipoContact"
		commentContact: ".commentContact"
		nameContact: ".nameContact"
		lastnameContact: ".lastnameContact"
		emailContact: ".emailContact"
		phoneContact: ".phoneContact"
		lastnameContact: ".lastnameContact"
		lastnameContact: ".lastnameContact"
		sliderHome: ".slider_home"
		icoOpenMenu: "header .ico_menu"
		icoCloseMenu: "header .ico_close_menu"
		menuContainer: ".menu_container"
		offersCarousel: ".offers_carousel"
		categoryCarousel: ".category_carousel"
		sliderCategory: ".slider_category"
		mobileLayoutHome: ".mobile_layout"
		newsletterHome: ".box_home_newsletter"
		boxHomeTop: ".box_home_top"
		icoShoppingCart: ".shopping_cart_vtex"
		listCartItems: ".v2-vtexsc-cart"
		boxHomeCategory: ".box_home_category"
		selOffer: ".box_home_category .sel_offer"
		chkCategory: ".chk_category"
		boxCollapsableCategory: ".collapsable_mobile"
		ellipsis: ".ellipsis"
		btnShowFiltersMobile: ".btn_filter"
		boxSearchResults: ".box_search_results"
		sliderProduct: ".slider_product"
		productTitleSection: ".box_product .box_collapse .site_title"
		ruptureMobileCutoff : 700 

	catchDom = ->
		dom.mobileContact = $(st.mobileContact)
		dom.tipoContact = $(st.tipoContact)
		dom.phoneContact = $(st.phoneContact)
		dom.emailContact = $(st.emailContact)
		dom.btnEnviar =  $(st.btnEnviar)
		dom.commentContact = $(st.commentContact)
		dom.nameContact = $(st.nameContact)
		dom.lastnameContact = $(st.lastnameContact)
		dom.sliderHome = $(st.sliderHome)
		dom.icoOpenMenu = $(st.icoOpenMenu)
		dom.icoCloseMenu = $(st.icoCloseMenu)
		dom.menuContainer = $(st.menuContainer)
		dom.offersCarousel = $(st.offersCarousel)
		dom.categoryCarousel = $(st.categoryCarousel)
		dom.sliderCategory = $(st.sliderCategory)
		dom.mobileLayoutHome = $(st.mobileLayoutHome)
		dom.newsletterHome = $(st.newsletterHome)
		dom.boxHomeTop = $(st.boxHomeTop)
		dom.icoShoppingCart = $(st.icoShoppingCart)
		dom.listCartItems = $(st.listCartItems)
		dom.boxHomeCategory = $(st.boxHomeCategory)
		dom.selOffer = $(st.selOffer)
		dom.chkCategory = $(st.chkCategory)
		dom.boxCollapsableCategory = $(st.boxCollapsableCategory)
		dom.ellipsis = $(st.ellipsis)
		dom.btnShowFiltersMobile = $(st.btnShowFiltersMobile)
		dom.boxSearchResults = $(st.boxSearchResults)
		dom.sliderProduct = $(st.sliderProduct)
		dom.productTitleSection = $(st.productTitleSection)
		return

	subscribeEvents = ->
		dom.icoOpenMenu.on "click", events.openCloseMenu
		dom.icoCloseMenu.on "click", events.closeMenu
		dom.selOffer.on "change", events.redirectToCategory
		dom.chkCategory.on "change", events.toggleCategoryAccordion
		$('body').on "click", ".btn_filter", events.toggleFilterMobile
		$('body').on "keyup", ".txt_search_brand", events.filterBrands
		$('body').on "click", ".lnk_see_all_brands", events.toggleSeeAllBrands
		$('body').on "click", ".lnk_see_all_sizes", events.toggleSeeAllSizes
		$('body').on "click", ".box_product .product_details .dotdotdot-keep", events.animateScrolling
		$('body').on "click", ".filter_mobile .navigation-tabs h5, .filter_mobile .navigation-tabs h3", events.toggleFilterTitlesMobile
		#$('body').on "click", ".filter_tags .remove", events.removeFilterTags
		dom.productTitleSection.on "click", events.toggleProductSections
		$('.box_product .product_details .buy-button').on("click", events.checkSelectedProductSize)
		$('.product_details .buy-in-page-quantity').on "keypress blur", events.removeLetters
		$(window).on "resize", functions.moveSubscription
		$(window).on "resize", functions.cutLongTextLines
		$(window).on "resize", functions.addBreadcrumbResultNumber
		$(window).on "resize", functions.addBrandAutocomplete

		#$('.newsletter-button-ok').live "click", events.changeBackNewsletterText
		return

	events =
		openCloseMenu: ->
			dom.menuContainer.slideToggle()
			$(@).hide()
			dom.icoCloseMenu.show()
			return

		closeMenu: ->
			dom.menuContainer.slideUp()
			$(@).hide()
			dom.icoOpenMenu.show()
			return

		toggleProductSections: ->
			$(@).parent().find('.container').stop().slideToggle()
			$(@).toggleClass('collapsed')
			return

		changeBackNewsletterText: ->
			$('.newsletter-button-back').val('REGRESAR')
			return

		toggleSeeAllBrands: ->
			$('.filter_sidebar .txt_search_brand').val('')
			$('.filter_sidebar .search-single-navigator .Marca li').fadeIn().attr('style','display: block')
			$(@).hide()
			return

		toggleSeeAllSizes: ->
			$('.filter_sidebar .search-single-navigator .Talla li').fadeIn().attr('style','display: block')
			$(@).hide()
			return

		redirectToCategory: ->
			selectedOptionUrl = $(@).children('option:selected').data('url')
			if selectedOptionUrl
				window.location = selectedOptionUrl
			return

		filterBrands: ->

			filter = $.trim $(@).val()

			$('.filter_sidebar .search-single-navigator .Marca li').each ->
				# If the list item does not contain the text phrase fade it out
				if $(@).text().search(new RegExp(filter, 'i')) < 0
					$(@).fadeOut(100)
					# Show the list item if the phrase matches
				else
					$(@).fadeIn(100).attr('style', 'display: block')
				return

			if $(@).val() <= 0
				$('.filter_sidebar .search-single-navigator .Marca li:nth-child(n+6)').hide()

			if not $('.filter_sidebar .lnk_see_all_brands').is(':visible')
				$('.filter_sidebar .lnk_see_all_brands').show()
			return

		toggleCategoryAccordion: ->
			$(@).siblings(st.boxCollapsableCategory).stop().slideToggle() # $(@) = chkCategory
			dom.boxCollapsableCategory.not($(@).siblings(st.boxCollapsableCategory)).hide() # hide all but this
			dom.chkCategory.not($(@)).attr('checked', false)
			categoryTitleTopPosition = $(@).offset().top - 20 # take me to the top - 20px
			$('html, body').animate({scrollTop: categoryTitleTopPosition}, 200)
			return

		toggleFilterMobile: -> 
			if not $('.filter_mobile').is(':visible')
				$(st.btnShowFiltersMobile).text('OCULTAR FILTROS')
			else
				$(st.btnShowFiltersMobile).text('FILTRAR')

			$('.filter_mobile').slideToggle()
			return

		toggleFilterTitlesMobile: ->
			$(@).toggleClass('active')
			$(@).next().stop().slideToggle()
			return

		animateScrolling: (e) ->
			e.preventDefault()
			
			target = this.hash
			$target = $(target)

			$('html, body').stop().animate({
					'scrollTop': $target.offset().top - 20
				}, 900, 'swing')
			return 

		removeLetters: (event)->
			$(this).val $(this).val().replace(/[^\d].+/, '')
			if event.which < 48 or event.which > 57
				event.preventDefault()
			return 

		checkSelectedProductSize: ->
			if $(@).attr('href').indexOf('javascript:alert') is 0
				$(@).attr('href', 'javascript:alert("Seleccione su talla")')
			return 

		
	functions =
		changeSubscriptionText: ->
			$('.newsletter-button-ok').val('SUSCRIBIRME')
			return

		runSliderHome: ->
			dom.sliderHome.slick
				dots: true
				autoplay: true
			return

			$('.slider_product_nav').slick
				slidesToShow: 3
				slidesToScroll: 1,
				asNavFor: st.sliderProduct
				focusOnSelect: true

			return

		cloneFilterSidebarMobile: ->
			if $('.filter_sidebar')
				clone = $('.filter_sidebar').clone().html() 
				$('.search_result_layout .sub:first-of-type').after("<div class='filter_mobile'>#{clone}</div>")
			return 

		createFilterTags: ->
			if $('.breadcrumb .bread-crumb li').length > 2 and ( $('.box_category') or $('.box_search_results') )
				tags = $(".breadcrumb .bread-crumb ul").html()
				#if (window.outerWidth < st.ruptureMobileCutoff) # mobile
					#$('.search_result_layout .sub:first-of-type').append("<div class='filter_tags'>#{tags}</div>")
				#else # desktop
				$('.filter_sidebar').prepend("<div class='filter_tags'>#{tags}</div>")
			return

		createFilterBtn: ->
			if $('.box_category') or $('.box_search_results')
				$('.search_result_layout .sub:first-of-type .resultado-busca-filtro').prepend('<a href="javascript:;" class="btn btn_filter">FILTRAR</a>')
			return

		createRemoveFilterTagBtn: ->
			if $('.filter_tags')
				$(".filter_tags li").append("<span class='remove'>&times;</span>")
			return


		moveSubcategoriesFilter: ->
			$('.filter_sidebar .search-single-navigator .productClusterSearchableIds').remove()

			$('.filter_sidebar .search-single-navigator > *:first-child').after("<div class='subcategorias'></div>")
			categoryName = $('.filter_sidebar .search-single-navigator').children().eq(0).attr('class')

			$(".filter_sidebar .search-single-navigator .#{categoryName}:not(:first-child)").each ->
				$('.filter_sidebar .subcategorias').append( $(@).html() )
				$(@).detach()
				return
			return

		formatProductSizes: ->
			if $('.Talla')
				$(".filter_sidebar .search-single-navigator .Talla li a ").each ->
					txt = $(@).attr('title')
					$(@).html(txt)
					return 
			return 
 
		moveSubscription: ->
			if window.outerWidth < st.ruptureMobileCutoff
				dom.mobileLayoutHome.prepend(dom.newsletterHome)
			else
				dom.boxHomeTop.after(dom.newsletterHome)
			return

		runCarouselOffers: ->
			dom.offersCarousel.slick
				dots: true
				infinite: true
				slidesToShow: 4
				slidesToScroll: 4
				responsive: [
					{
						breakpoint: 900
						settings:
							slidesToShow: 3
							slidesToScroll: 3
					}
					{
						breakpoint: st.ruptureMobileCutoff
						settings:
							slidesToShow: 2
							slidesToScroll: 2
					}
				]
			return

		hidePagination: ->
			if $('.pgEmpty').length is 8 # total up and down
				$('.pgEmpty').parents('.pages').hide()
			return

		runSliderCategory: ->
			dom.sliderCategory.slick
				dots: true
			return

		runCarouselCategory: ->
			dom.categoryCarousel.slick
				slidesToShow: 4
				slidesToScroll: 4
				responsive: [
					{
						breakpoint: 900
						settings:
							slidesToShow: 3
							slidesToScroll: 3
					}
				]
			return

		cutLongTextLines: ->
			$(st.ellipsis).dotdotdot()
			return

		cutProductDescription: ->
			productDescription = $('.box_product .product_details .productDescription')
			productDescription.dotdotdot
				wrap: 'word'
				height: 70
				callback: (isTruncated, orgContent) ->
					if isTruncated
						productDescription.append('<a href="#boxDescription" class="dotdotdot-keep"> Ver más</a>')
					return 
			
			return

		changeSelectText: ->
			$('.box_category .resultado-busca-filtro select option:first-child').text('Ordenar por')
			$('.box_category .resultado-busca-filtro select option:last-child').text('Mejor Descuento')
			$('.box_product .sku-selector option:first-child').text('Seleccionar')
			return

		changeBreadcrumbText: ->
			$('.breadcrumb li:first-child a').text('Home').attr('title', 'Home')
			return

		addBreadcrumbResultNumber: ->
			if (window.outerWidth < st.ruptureMobileCutoff)
				if $('.breadcrumb .last').children('.number').length is 0
					$('.breadcrumb .last').append("<span class='number'> (" + $('.resultado-busca-numero:gt(0) .value').text() + ")</span>")
			else
				$('.breadcrumb .last .number').remove()
			return

		addSeeAllFilters: ->
			if $('.Marca') and ( $('.filter_sidebar .search-single-navigator .Marca li').length > 5 ) and (window.outerWidth > st.ruptureMobileCutoff)
				$('.filter_sidebar .search-single-navigator .Marca').append('<b class="lnk_see_all_brands">Ver todas las marcas</b>')
			return

		addSeeAllSizes: ->
			if $('.Talla') and ( $('.filter_sidebar .search-single-navigator .Talla li').length > 6 ) and (window.outerWidth > st.ruptureMobileCutoff)
				$('.filter_sidebar .search-single-navigator .Talla').append('<b class="lnk_see_all_sizes">Ver todas las tallas</b>')
			return

		addBrandAutocomplete: ->
			if (window.outerWidth > st.ruptureMobileCutoff) # desktop
				if $('ul.Marca').length > 0
					if $('.txt_search_brand').length is 0
						$('.filter_sidebar .search-single-navigator .Marca').before("<input class='txt_search_brand' type='text' placeholder='Buscar una marca'>")

				if $('h5.Marca').length > 0
					if $('.txt_search_brand').length is 0
						$('.filter_sidebar .search-single-navigator .Marca').after("<input class='txt_search_brand' type='text' placeholder='Buscar una marca'>")
			return

		tweakSliderProduct: ->
			if $('.box_product .thumbs li').length >  4

				$('.box_product .thumbs').slick
					slidesToShow: 4
					slidesToScroll: 4
					vertical: true
					verticalSwiping: true 
					infinite: false 
					responsive: [
						{
							breakpoint: st.ruptureMobileCutoff
							settings:
								vertical: false
								verticalSwiping: false
						}					
					]

			return 

		hideProductEmptyContent: ->
			# hide empty content
			if not $('.box_product .box_related .list_products').length 
				$('.box_product .box_related').hide()

			if not $('.box_product .box_specifications #caracteristicas table').length 
				$('.box_product .box_specifications').hide()

			if not $('.box_product .box_description .productDescription').length 
				$('.box_product .box_description').hide() 

			if $('.box_product .size .sku-selector-container').is(':empty')
				$('.box_product .size').hide() 

			if not $.trim($('.box_product .productReference').text()).length 
				$('.box_product .product_reference').hide()
			return 

		resizeProductPage: ->
			if (window.outerWidth < st.ruptureMobileCutoff) # mobile
				$('.box_product .thumbs').css('width','90%')
			else 
				$('.box_product .thumbs').removeAttr "style"
			return 

		addProductColor: ->
			productClone = $('.thumbs li:first-child').clone()
			productTitle = $('.box_product .product_details .productName').text()
			productClone.removeAttr('class style data-slick-index aria-hidden tabindex')
			productClone.find('a').addClass 'color_box active'
			productClone.find('a').attr 'title', productTitle
			productClone.find('img').removeAttr 'title'
			$('.product_options .color ul').prepend productClone
			return

		addProductUrl: ->
			$('.box_product .see_more').attr('href', $('.box_product .bread-crumb li').last().find('a').attr('href'))
			return 

		addSearchTermBreadcrumb: ->
			searchTerm = $($('.searchResultsTime .resultado-busca-termo .value')[0]).text()
			if dom.boxSearchResults
				$('.box_search_results .breadcrumb li:first-child').after("<span class='lbl_result'>Resultado para la búsqueda: #{searchTerm}</span>")
			return

		lazyLoad: ->
			$('.unveil').unveil( 200, ->
				$(@).load( ->
					this.style.opacity = 1
					)
				)
			return

		replaceBrandImage: ->
			if $('body').hasClass('Rediseno-Product')
				brandName = $('.box_product .product_details .brandName').attr('class').split(' ')[1].toLowerCase()
				imageUrl = '/arquivos/marca-' + brandName + '.jpg'

				$.get(imageUrl).done(->
					$('.box_product .brand_image img').attr 'src', imageUrl
					return
				).fail ->
					$('.box_product .brand_image img').attr 'src', '/arquivos/default_brand.jpg'
				return
			return

		changeProductTextNotification: ->
			$('.box_product .product_details .notifyme-form p').html('¿Quieres que te avisemos cuando tengamos stock? <b>Déjanos tu nombre y correo electrónico.</b>')
			$('.box_product .product_details .sku-notifyme-client-name').attr('placeholder', 'Escriba su nombre')
			$('.box_product .product_details .sku-notifyme-client-email').attr('placeholder', 'Escriba su email')
			$('.box_product .product_details #notifymeButtonOK').attr('value', 'NOTIFICARME')
			return

	initialize = ->
		catchDom()

		$ ->
			subscribeEvents()
			functions.runSliderHome()
			functions.runCarouselOffers()
			functions.runCarouselCategory()
			functions.runSliderCategory()
			functions.changeSubscriptionText()
			functions.moveSubscription()
			functions.cutLongTextLines()
			functions.changeSelectText()
			functions.changeBreadcrumbText()
			functions.moveSubcategoriesFilter() 
			functions.addBreadcrumbResultNumber()
			functions.addSeeAllFilters()
			functions.addSeeAllSizes()
			functions.addSearchTermBreadcrumb()
			functions.changeProductTextNotification()
			functions.replaceBrandImage()
			functions.lazyLoad()
			functions.hidePagination()
			functions.hideProductEmptyContent()
			functions.addProductColor()
			functions.cutProductDescription()
			functions.formatProductSizes()
			functions.createFilterTags()
			functions.createRemoveFilterTagBtn()
			functions.createFilterBtn()
			functions.addProductUrl()
			functions.addBrandAutocomplete() # don't move
			functions.cloneFilterSidebarMobile()
			return

		return

	init: initialize
)()
App.init()
