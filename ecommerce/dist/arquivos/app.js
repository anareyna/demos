var App;

App = (function() {
  var catchDom, dom, events, functions, initialize, st, subscribeEvents;
  dom = {};
  st = {
    btnEnviar: "button.enviar",
    mobileContact: ".mobileContact",
    tipoContact: ".tipoContact",
    commentContact: ".commentContact",
    nameContact: ".nameContact",
    lastnameContact: ".lastnameContact",
    emailContact: ".emailContact",
    phoneContact: ".phoneContact",
    lastnameContact: ".lastnameContact",
    lastnameContact: ".lastnameContact",
    sliderHome: ".slider_home",
    icoOpenMenu: "header .ico_menu",
    icoCloseMenu: "header .ico_close_menu",
    menuContainer: ".menu_container",
    offersCarousel: ".offers_carousel",
    categoryCarousel: ".category_carousel",
    sliderCategory: ".slider_category",
    mobileLayoutHome: ".mobile_layout",
    newsletterHome: ".box_home_newsletter",
    boxHomeTop: ".box_home_top",
    icoShoppingCart: ".shopping_cart_vtex",
    listCartItems: ".v2-vtexsc-cart",
    boxHomeCategory: ".box_home_category",
    selOffer: ".box_home_category .sel_offer",
    chkCategory: ".chk_category",
    boxCollapsableCategory: ".collapsable_mobile",
    ellipsis: ".ellipsis",
    btnShowFiltersMobile: ".btn_filter",
    boxSearchResults: ".box_search_results",
    sliderProduct: ".slider_product",
    productTitleSection: ".box_product .box_collapse .site_title",
    ruptureMobileCutoff: 700
  };
  catchDom = function() {
    dom.mobileContact = $(st.mobileContact);
    dom.tipoContact = $(st.tipoContact);
    dom.phoneContact = $(st.phoneContact);
    dom.emailContact = $(st.emailContact);
    dom.btnEnviar = $(st.btnEnviar);
    dom.commentContact = $(st.commentContact);
    dom.nameContact = $(st.nameContact);
    dom.lastnameContact = $(st.lastnameContact);
    dom.sliderHome = $(st.sliderHome);
    dom.icoOpenMenu = $(st.icoOpenMenu);
    dom.icoCloseMenu = $(st.icoCloseMenu);
    dom.menuContainer = $(st.menuContainer);
    dom.offersCarousel = $(st.offersCarousel);
    dom.categoryCarousel = $(st.categoryCarousel);
    dom.sliderCategory = $(st.sliderCategory);
    dom.mobileLayoutHome = $(st.mobileLayoutHome);
    dom.newsletterHome = $(st.newsletterHome);
    dom.boxHomeTop = $(st.boxHomeTop);
    dom.icoShoppingCart = $(st.icoShoppingCart);
    dom.listCartItems = $(st.listCartItems);
    dom.boxHomeCategory = $(st.boxHomeCategory);
    dom.selOffer = $(st.selOffer);
    dom.chkCategory = $(st.chkCategory);
    dom.boxCollapsableCategory = $(st.boxCollapsableCategory);
    dom.ellipsis = $(st.ellipsis);
    dom.btnShowFiltersMobile = $(st.btnShowFiltersMobile);
    dom.boxSearchResults = $(st.boxSearchResults);
    dom.sliderProduct = $(st.sliderProduct);
    dom.productTitleSection = $(st.productTitleSection);
  };
  subscribeEvents = function() {
    dom.icoOpenMenu.on("click", events.openCloseMenu);
    dom.icoCloseMenu.on("click", events.closeMenu);
    dom.selOffer.on("change", events.redirectToCategory);
    dom.chkCategory.on("change", events.toggleCategoryAccordion);
    $('body').on("click", ".btn_filter", events.toggleFilterMobile);
    $('body').on("keyup", ".txt_search_brand", events.filterBrands);
    $('body').on("click", ".lnk_see_all_brands", events.toggleSeeAllBrands);
    $('body').on("click", ".lnk_see_all_sizes", events.toggleSeeAllSizes);
    $('body').on("click", ".box_product .product_details .dotdotdot-keep", events.animateScrolling);
    $('body').on("click", ".filter_mobile .navigation-tabs h5, .filter_mobile .navigation-tabs h3", events.toggleFilterTitlesMobile);
    dom.productTitleSection.on("click", events.toggleProductSections);
    $('.box_product .product_details .buy-button').on("click", events.checkSelectedProductSize);
    $('.product_details .buy-in-page-quantity').on("keypress blur", events.removeLetters);
    $(window).on("resize", functions.moveSubscription);
    $(window).on("resize", functions.cutLongTextLines);
    $(window).on("resize", functions.addBreadcrumbResultNumber);
    $(window).on("resize", functions.addBrandAutocomplete);
  };
  events = {
    openCloseMenu: function() {
      dom.menuContainer.slideToggle();
      $(this).hide();
      dom.icoCloseMenu.show();
    },
    closeMenu: function() {
      dom.menuContainer.slideUp();
      $(this).hide();
      dom.icoOpenMenu.show();
    },
    toggleProductSections: function() {
      $(this).parent().find('.container').stop().slideToggle();
      $(this).toggleClass('collapsed');
    },
    changeBackNewsletterText: function() {
      $('.newsletter-button-back').val('REGRESAR');
    },
    toggleSeeAllBrands: function() {
      $('.filter_sidebar .txt_search_brand').val('');
      $('.filter_sidebar .search-single-navigator .Marca li').fadeIn().attr('style', 'display: block');
      $(this).hide();
    },
    toggleSeeAllSizes: function() {
      $('.filter_sidebar .search-single-navigator .Talla li').fadeIn().attr('style', 'display: block');
      $(this).hide();
    },
    redirectToCategory: function() {
      var selectedOptionUrl;
      selectedOptionUrl = $(this).children('option:selected').data('url');
      if (selectedOptionUrl) {
        window.location = selectedOptionUrl;
      }
    },
    filterBrands: function() {
      var filter;
      filter = $.trim($(this).val());
      $('.filter_sidebar .search-single-navigator .Marca li').each(function() {
        if ($(this).text().search(new RegExp(filter, 'i')) < 0) {
          $(this).fadeOut(100);
        } else {
          $(this).fadeIn(100).attr('style', 'display: block');
        }
      });
      if ($(this).val() <= 0) {
        $('.filter_sidebar .search-single-navigator .Marca li:nth-child(n+6)').hide();
      }
      if (!$('.filter_sidebar .lnk_see_all_brands').is(':visible')) {
        $('.filter_sidebar .lnk_see_all_brands').show();
      }
    },
    toggleCategoryAccordion: function() {
      var categoryTitleTopPosition;
      $(this).siblings(st.boxCollapsableCategory).stop().slideToggle();
      dom.boxCollapsableCategory.not($(this).siblings(st.boxCollapsableCategory)).hide();
      dom.chkCategory.not($(this)).attr('checked', false);
      categoryTitleTopPosition = $(this).offset().top - 20;
      $('html, body').animate({
        scrollTop: categoryTitleTopPosition
      }, 200);
    },
    toggleFilterMobile: function() {
      if (!$('.filter_mobile').is(':visible')) {
        $(st.btnShowFiltersMobile).text('OCULTAR FILTROS');
      } else {
        $(st.btnShowFiltersMobile).text('FILTRAR');
      }
      $('.filter_mobile').slideToggle();
    },
    toggleFilterTitlesMobile: function() {
      $(this).toggleClass('active');
      $(this).next().stop().slideToggle();
    },
    animateScrolling: function(e) {
      var $target, target;
      e.preventDefault();
      target = this.hash;
      $target = $(target);
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top - 20
      }, 900, 'swing');
    },
    removeLetters: function(event) {
      $(this).val($(this).val().replace(/[^\d].+/, ''));
      if (event.which < 48 || event.which > 57) {
        event.preventDefault();
      }
    },
    checkSelectedProductSize: function() {
      if ($(this).attr('href').indexOf('javascript:alert') === 0) {
        $(this).attr('href', 'javascript:alert("Seleccione su talla")');
      }
    }
  };
  functions = {
    changeSubscriptionText: function() {
      $('.newsletter-button-ok').val('SUSCRIBIRME');
    },
    runSliderHome: function() {
      dom.sliderHome.slick({
        dots: true,
        autoplay: true
      });
      return;
      $('.slider_product_nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: st.sliderProduct,
        focusOnSelect: true
      });
    },
    cloneFilterSidebarMobile: function() {
      var clone;
      if ($('.filter_sidebar')) {
        clone = $('.filter_sidebar').clone().html();
        $('.search_result_layout .sub:first-of-type').after("<div class='filter_mobile'>" + clone + "</div>");
      }
    },
    createFilterTags: function() {
      var tags;
      if ($('.breadcrumb .bread-crumb li').length > 2 && ($('.box_category') || $('.box_search_results'))) {
        tags = $(".breadcrumb .bread-crumb ul").html();
        $('.filter_sidebar').prepend("<div class='filter_tags'>" + tags + "</div>");
      }
    },
    createFilterBtn: function() {
      if ($('.box_category') || $('.box_search_results')) {
        $('.search_result_layout .sub:first-of-type .resultado-busca-filtro').prepend('<a href="javascript:;" class="btn btn_filter">FILTRAR</a>');
      }
    },
    createRemoveFilterTagBtn: function() {
      if ($('.filter_tags')) {
        $(".filter_tags li").append("<span class='remove'>&times;</span>");
      }
    },
    moveSubcategoriesFilter: function() {
      var categoryName;
      $('.filter_sidebar .search-single-navigator .productClusterSearchableIds').remove();
      $('.filter_sidebar .search-single-navigator > *:first-child').after("<div class='subcategorias'></div>");
      categoryName = $('.filter_sidebar .search-single-navigator').children().eq(0).attr('class');
      $(".filter_sidebar .search-single-navigator ." + categoryName + ":not(:first-child)").each(function() {
        $('.filter_sidebar .subcategorias').append($(this).html());
        $(this).detach();
      });
    },
    formatProductSizes: function() {
      if ($('.Talla')) {
        $(".filter_sidebar .search-single-navigator .Talla li a ").each(function() {
          var txt;
          txt = $(this).attr('title');
          $(this).html(txt);
        });
      }
    },
    moveSubscription: function() {
      if (window.outerWidth < st.ruptureMobileCutoff) {
        dom.mobileLayoutHome.prepend(dom.newsletterHome);
      } else {
        dom.boxHomeTop.after(dom.newsletterHome);
      }
    },
    runCarouselOffers: function() {
      dom.offersCarousel.slick({
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          }, {
            breakpoint: st.ruptureMobileCutoff,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
        ]
      });
    },
    hidePagination: function() {
      if ($('.pgEmpty').length === 8) {
        $('.pgEmpty').parents('.pages').hide();
      }
    },
    runSliderCategory: function() {
      dom.sliderCategory.slick({
        dots: true
      });
    },
    runCarouselCategory: function() {
      dom.categoryCarousel.slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          }
        ]
      });
    },
    cutLongTextLines: function() {
      $(st.ellipsis).dotdotdot();
    },
    cutProductDescription: function() {
      var productDescription;
      productDescription = $('.box_product .product_details .productDescription');
      productDescription.dotdotdot({
        wrap: 'word',
        height: 70,
        callback: function(isTruncated, orgContent) {
          if (isTruncated) {
            productDescription.append('<a href="#boxDescription" class="dotdotdot-keep"> Ver más</a>');
          }
        }
      });
    },
    changeSelectText: function() {
      $('.box_category .resultado-busca-filtro select option:first-child').text('Ordenar por');
      $('.box_category .resultado-busca-filtro select option:last-child').text('Mejor Descuento');
      $('.box_product .sku-selector option:first-child').text('Seleccionar');
    },
    changeBreadcrumbText: function() {
      $('.breadcrumb li:first-child a').text('Home').attr('title', 'Home');
    },
    addBreadcrumbResultNumber: function() {
      if (window.outerWidth < st.ruptureMobileCutoff) {
        if ($('.breadcrumb .last').children('.number').length === 0) {
          $('.breadcrumb .last').append("<span class='number'> (" + $('.resultado-busca-numero:gt(0) .value').text() + ")</span>");
        }
      } else {
        $('.breadcrumb .last .number').remove();
      }
    },
    addSeeAllFilters: function() {
      if ($('.Marca') && ($('.filter_sidebar .search-single-navigator .Marca li').length > 5) && (window.outerWidth > st.ruptureMobileCutoff)) {
        $('.filter_sidebar .search-single-navigator .Marca').append('<b class="lnk_see_all_brands">Ver todas las marcas</b>');
      }
    },
    addSeeAllSizes: function() {
      if ($('.Talla') && ($('.filter_sidebar .search-single-navigator .Talla li').length > 6) && (window.outerWidth > st.ruptureMobileCutoff)) {
        $('.filter_sidebar .search-single-navigator .Talla').append('<b class="lnk_see_all_sizes">Ver todas las tallas</b>');
      }
    },
    addBrandAutocomplete: function() {
      if (window.outerWidth > st.ruptureMobileCutoff) {
        if ($('ul.Marca').length > 0) {
          if ($('.txt_search_brand').length === 0) {
            $('.filter_sidebar .search-single-navigator .Marca').before("<input class='txt_search_brand' type='text' placeholder='Buscar una marca'>");
          }
        }
        if ($('h5.Marca').length > 0) {
          if ($('.txt_search_brand').length === 0) {
            $('.filter_sidebar .search-single-navigator .Marca').after("<input class='txt_search_brand' type='text' placeholder='Buscar una marca'>");
          }
        }
      }
    },
    tweakSliderProduct: function() {
      if ($('.box_product .thumbs li').length > 4) {
        $('.box_product .thumbs').slick({
          slidesToShow: 4,
          slidesToScroll: 4,
          vertical: true,
          verticalSwiping: true,
          infinite: false,
          responsive: [
            {
              breakpoint: st.ruptureMobileCutoff,
              settings: {
                vertical: false,
                verticalSwiping: false
              }
            }
          ]
        });
      }
    },
    hideProductEmptyContent: function() {
      if (!$('.box_product .box_related .list_products').length) {
        $('.box_product .box_related').hide();
      }
      if (!$('.box_product .box_specifications #caracteristicas table').length) {
        $('.box_product .box_specifications').hide();
      }
      if (!$('.box_product .box_description .productDescription').length) {
        $('.box_product .box_description').hide();
      }
      if ($('.box_product .size .sku-selector-container').is(':empty')) {
        $('.box_product .size').hide();
      }
      if (!$.trim($('.box_product .productReference').text()).length) {
        $('.box_product .product_reference').hide();
      }
    },
    resizeProductPage: function() {
      if (window.outerWidth < st.ruptureMobileCutoff) {
        $('.box_product .thumbs').css('width', '90%');
      } else {
        $('.box_product .thumbs').removeAttr("style");
      }
    },
    addProductColor: function() {
      var productClone, productTitle;
      productClone = $('.thumbs li:first-child').clone();
      productTitle = $('.box_product .product_details .productName').text();
      productClone.removeAttr('class style data-slick-index aria-hidden tabindex');
      productClone.find('a').addClass('color_box active');
      productClone.find('a').attr('title', productTitle);
      productClone.find('img').removeAttr('title');
      $('.product_options .color ul').prepend(productClone);
    },
    addProductUrl: function() {
      $('.box_product .see_more').attr('href', $('.box_product .bread-crumb li').last().find('a').attr('href'));
    },
    addSearchTermBreadcrumb: function() {
      var searchTerm;
      searchTerm = $($('.searchResultsTime .resultado-busca-termo .value')[0]).text();
      if (dom.boxSearchResults) {
        $('.box_search_results .breadcrumb li:first-child').after("<span class='lbl_result'>Resultado para la búsqueda: " + searchTerm + "</span>");
      }
    },
    lazyLoad: function() {
      $('.unveil').unveil(200, function() {
        return $(this).load(function() {
          return this.style.opacity = 1;
        });
      });
    },
    replaceBrandImage: function() {
      var brandName, imageUrl;
      if ($('body').hasClass('Rediseno-Product')) {
        brandName = $('.box_product .product_details .brandName').attr('class').split(' ')[1].toLowerCase();
        imageUrl = '/arquivos/marca-' + brandName + '.jpg';
        $.get(imageUrl).done(function() {
          $('.box_product .brand_image img').attr('src', imageUrl);
        }).fail(function() {
          return $('.box_product .brand_image img').attr('src', '/arquivos/default_brand.jpg');
        });
        return;
      }
    },
    changeProductTextNotification: function() {
      $('.box_product .product_details .notifyme-form p').html('¿Quieres que te avisemos cuando tengamos stock? <b>Déjanos tu nombre y correo electrónico.</b>');
      $('.box_product .product_details .sku-notifyme-client-name').attr('placeholder', 'Escriba su nombre');
      $('.box_product .product_details .sku-notifyme-client-email').attr('placeholder', 'Escriba su email');
      $('.box_product .product_details #notifymeButtonOK').attr('value', 'NOTIFICARME');
    }
  };
  initialize = function() {
    catchDom();
    $(function() {
      subscribeEvents();
      functions.runSliderHome();
      functions.runCarouselOffers();
      functions.runCarouselCategory();
      functions.runSliderCategory();
      functions.changeSubscriptionText();
      functions.moveSubscription();
      functions.cutLongTextLines();
      functions.changeSelectText();
      functions.changeBreadcrumbText();
      functions.moveSubcategoriesFilter();
      functions.addBreadcrumbResultNumber();
      functions.addSeeAllFilters();
      functions.addSeeAllSizes();
      functions.addSearchTermBreadcrumb();
      functions.changeProductTextNotification();
      functions.replaceBrandImage();
      functions.lazyLoad();
      functions.hidePagination();
      functions.hideProductEmptyContent();
      functions.addProductColor();
      functions.cutProductDescription();
      functions.formatProductSizes();
      functions.createFilterTags();
      functions.createRemoveFilterTagBtn();
      functions.createFilterBtn();
      functions.addProductUrl();
      functions.addBrandAutocomplete();
      functions.cloneFilterSidebarMobile();
    });
  };
  return {
    init: initialize
  };
})();

App.init();
