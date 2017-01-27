var App = (() =>  {
	let catchDom, dom, events, functions, initialize, st, subscribeEvents, vars 

		st = {
			body: "body",
			header:"header.l-header",
			header_nav:"header .l-header__nav ",
			header_expand:".u-header-expand",
			ruptureMobileCutoff: 765,

			iconMenu: ".l-header .icon-menu",
			iconClose: ".l-header .icon-x-mark",
			iconBack: ".l-header .icon-arrow-right",
			headerNav: ".l-header .c-nav",
			headerNavItem: ".l-header .c-nav .c-nav__item",
			headerNavItemLink: ".l-header .c-nav .c-nav__item-link",
			classActiveNavItem: "c-nav__item--active",
			headerNavDropdown: ".c-nav__dropdown",
			headerAuthContainer: ".l-header__auth",
			headerAuthLoginLink: "#headerAuthLoginLink",
			headerAuthLoggedLink: "#headerAuthLoggedLink",
			headerMenuAccount: ".l-header .c-menu-account",
			loginForm: ".c-login-form",

			modal_howtobuy 			: '#modal_howtobuy',
			btnOpenLink: '#openModalHowToBuy, #openModalHowToBuyFooter',
			btnClose : '.fancybox-close',

			slider:".c-slider",

			tab: "[role='tab']",
			panel: "[role='tabpanel']",
			classActiveTab: "l-section-menu__filter-link--active",
			selHighlightedFilter: "#selHighlightedFilter",


			lnkHideNewsletter: "#lnkHideNewsletter",
			newsletterContainer: ".l-newsletter",
			frmNewsletter: "#frmNewsletter",
			classActiveNewsletter: "l-newsletter--active",
			mobileNewsletterContainer: ".c-special-collection",
			frmModalNewsletter: "#frmModalNewsletter",
			lnkOpenNewsletterModalMobile: ".l-newsletter__highlight",
			lnkOpenNewsletterModal: "#openModalNewsletter",
			btnNewsletterSubscribe: "#btnNewsletterSubscribe",
			txtNewsletterName: "#txtNewsletterName",
			txtModalNewsletterName: "#txtModalNewsletterName",
			txtNewsletterEmail: "#txtNewsletterEmail",
			txtModalNewsletterEmail: "#txtModalNewsletterEmail",
			rdNewsletterGenre: "#rdNewsletterGenre",
			rdModalNewsletterGender: "#rdModalNewsletterGender",
			rdGenderModal: "input[name='rdGenderModal']",
			chkCategory: ".c-checkbox__label .c-checkbox__input",
			subscribeButton: ".c-modal-newsletter__button",
			modalFormCSRF: "#csrfSubscribe",
			btnModalSubscribe: "#btnModalSubscribe",

			rangePriceSlider: "#rangePriceSlider",
			rangePriceMin: "#rangePriceMin",
			rangePriceMax: "#rangePriceMax",
			frmPriceRange: "#frmPriceRange"

		}
		vars = {
			initialPriceMin: $(st.rangePriceMin).val(),
			initialPriceMax: $(st.rangePriceMax).val()
		}
		dom = {}
		catchDom = () => {
			dom.body = $(st.body)
			dom.header = $(st.header)
			dom.header_nav = $(st.header_nav)
			dom.header_expand = $(st.header_expand)

			dom.iconMenu = $(st.iconMenu);
			dom.iconClose = $(st.iconClose);
			dom.iconBack = $(st.iconBack);
			dom.headerNav = $(st.headerNav);
			dom.headerNavItem = $(st.headerNavItem);
			dom.headerNavItemLink = $(st.headerNavItemLink);
			dom.headerNavDropdown = $(st.headerNavDropdown);
			dom.headerAuthContainer = $(st.headerAuthContainer);
			dom.headerAuthLoginLink = $(st.headerAuthLoginLink);
			dom.headerAuthLoggedLink = $(st.headerAuthLoggedLink);
			dom.headerMenuAccount = $(st.headerMenuAccount);
			dom.loginForm = $(st.loginForm);

			dom.btnOpenLink = $(st.btnOpenLink);
			dom.slider = $(st.slider);

			dom.tab = $(st.tab);
			dom.panel = $(st.panel);
			dom.selHighlightedFilter = $(st.selHighlightedFilter);

			dom.lnkHideNewsletter = $(st.lnkHideNewsletter);
			dom.newsletterContainer = $(st.newsletterContainer);
			dom.frmNewsletter = $(st.frmNewsletter);
			dom.mobileNewsletterContainer = $(st.mobileNewsletterContainer);
			dom.lnkOpenNewsletterModal = $(st.lnkOpenNewsletterModal);
			dom.lnkOpenNewsletterModalMobile = $(st.lnkOpenNewsletterModalMobile);
			dom.frmModalNewsletter = $(st.frmModalNewsletter);
			dom.btnNewsletterSubscribe = $(st.btnNewsletterSubscribe);
			dom.txtNewsletterName = $(st.txtNewsletterName);
			dom.txtModalNewsletterName = $(st.txtModalNewsletterName);
			dom.txtNewsletterEmail = $(st.txtNewsletterEmail);
			dom.txtModalNewsletterEmail = $(st.txtModalNewsletterEmail);
			dom.rdNewsletterGenre = $(st.rdNewsletterGenre);
			dom.rdModalNewsletterGender = $(st.rdModalNewsletterGender);
			dom.rdGenderModal = $(st.rdGenderModal);
			dom.chkCategory = $(st.chkCategory);
			dom.subscribeButton = $(st.subscribeButton);
			dom.modalFormCSRF = $(st.modalFormCSRF);
			dom.btnModalSubscribe = $(st.btnModalSubscribe);

			dom.rangePriceSlider = $(st.rangePriceSlider);
			dom.rangePriceMin = $(st.rangePriceMin);
			dom.rangePriceMax = $(st.rangePriceMax);
			dom.frmPriceRange = $(st.frmPriceRange);

		}
		subscribeEvents = () => {
			$(window).on('scroll', events.addScrollEffectsHeader);
			$(window).on('scroll', functions.addHeaderSpace);
			$(window).on("resizeEnd", functions.addHeaderSpace);

			dom.iconMenu.on("click" ,events.openMainMenu);
			dom.iconClose.on("click" ,events.closeMainMenu);
			dom.headerNavItemLink.on("click" ,events.toggleNavDropdown);
			dom.header.on("click", st.headerAuthLoggedLink, events.openMenuAccount); // created with fb
			dom.iconBack.on("click" ,events.closeMenues);
			dom.headerAuthLoginLink.on("click" ,events.showLoginForm);
			$(window).on("resizeEnd", events.fixHeaderInDesktop);

			dom.btnOpenLink.on('click', functions.showModal);

			dom.tab.on("click", events.togglePanel);
		 	dom.selHighlightedFilter.on("change", events.selPanel);

		 	dom.lnkHideNewsletter.on("click", events.hideNewsletter);
			$(window).on("resizeEnd", functions.repositionNewsletter);
			dom.lnkOpenNewsletterModal.on("click", events.showNewsletterModal);
			dom.btnNewsletterSubscribe.on("click", events.validateFormNewsletter);
			dom.lnkOpenNewsletterModalMobile.on("click", events.showNewsletterModal);
			dom.frmModalNewsletter.on("submit", events.subscribeAction);

			dom.rangePriceSlider.on("change", events.updateInputText);
			dom.rangePriceSlider.on("slideStop", events.reloadPage);
			dom.rangePriceMin.on("focusout", events.minPriceHasChanged);
			dom.rangePriceMax.on("focusout", events.maxPriceHasChanged);
			dom.rangePriceMin.on("keydown keypress keyup", events.removeLetters);
			dom.rangePriceMax.on("keydown keypress keyup", events.removeLetters);

		}
		events = {
			addScrollEffectsHeader(){
				let shrinkHeader;
				//if (yOSON.controller === "index") { // for homepage
					shrinkHeader = 460;
				// } else {
				// 	dom.header_nav.show();
				// 	shrinkHeader = 0;
				// }
				if($(window).width() <= st.ruptureMobileCutoff) {
					shrinkHeader = 150;
				}

				const scroll = window.pageYOffset || document.documentElement.scrollTop;

				if ( scroll >= shrinkHeader ) {
						dom.header.addClass('l-header--active');
				 }
				 else {
						 dom.header.removeClass('l-header--active');
				 }
			},

			openMainMenu() {
				dom.iconMenu.hide();
				dom.iconClose.show();
				dom.header.attr("style", "position: relative !important"); // reset position fixed
				$("html,body").animate({ scrollTop: 0 }, 100) // go to top
				dom.headerNav.fadeIn("fast");
				dom.headerAuthContainer.fadeIn("fast").css("display", "flex");
			},
			closeMainMenu() {
					dom.iconClose.hide();
					dom.iconMenu.show();
					dom.header.attr("style", "position: initial"); // reset position fixed
					dom.headerNav.fadeOut("fast");
					dom.headerAuthContainer.fadeOut("fast");
			},
			toggleNavDropdown(e) {
				if ( $(window).width() <= st.ruptureMobileCutoff ) {
					e.preventDefault();
					$(this).parents(".c-nav__item").toggleClass(st.classActiveNavItem);
					$(this).parents(".c-nav__item").find(st.headerNavDropdown).stop().slideToggle("fast");
				}
			},
			openMenuAccount() {
					dom.headerNav.hide();
					$(st.headerMenuAccount).css("visibility", "visible"); // created with fb
					dom.iconClose.hide();
					dom.iconBack.show();
			},
			closeMenues() {
					dom.iconBack.hide();
					dom.headerNav.fadeIn("fast");
					dom.headerMenuAccount.css("visibility", "hidden");
					dom.iconClose.show();
					dom.loginForm.hide();
			},
			showLoginForm() {
					dom.iconBack.show();
					dom.iconClose.hide();
					dom.headerNav.hide();
					dom.loginForm.show();
			},
			fixHeaderInDesktop() {
				if ( $(window).width() > st.ruptureMobileCutoff ) {
					dom.header.removeAttr("style"); // removes position relative
					dom.headerNavDropdown.removeAttr("style"); // removes display none
					dom.iconClose.trigger("click"); // close mobile menu when resizing window
					dom.headerNavItem.removeClass(st.classActiveNavItem);
					$(st.headerMenuAccount).removeAttr("style");
					dom.loginForm.removeAttr("style");
					dom.iconBack.hide();
				}

				// if (yOSON.controller !== "index" && $(window).width() > st.ruptureMobileCutoff) {
				// 	dom.header.addClass('l-header--active');
				// }
			},

			togglePanel() {
				dom.tab.removeClass(st.classActiveTab);
				$(this).addClass(st.classActiveTab);
				let tabPanelId = $(this).data("href");
				dom.panel.fadeOut("fast");
				$(tabPanelId).fadeIn("fast");
			},
			selPanel() {
				let tabPanelId = $(this).find("option:selected").val();
				dom.panel.fadeOut("fast");
				$(tabPanelId).fadeIn("fast");

			},


			hideNewsletter() {
				dom.newsletterContainer.slideUp("fast");
			},
			showNewsletterModal(){
				if (dom.newsletterContainer.length) {
					dom.rdGenderModal.filter("[value='" + $("input[name='rdGender']:checked").val() + "']").attr('checked', true);
					dom.txtModalNewsletterName.val(dom.txtNewsletterName.val())
					dom.txtModalNewsletterEmail.val(dom.txtNewsletterEmail.val())
				}

				let settings = {
						type 		: 'inline',
						href 		: st.frmModalNewsletter,
						closeBtn	: true,
						afterClose() {
							dom.frmModalNewsletter.parsley().reset()
						}
				};

				$.fancybox(settings);
			},
			validateFormNewsletter(event) {
				if (dom.frmNewsletter.parsley().isValid()) {
					event.preventDefault();
					events.showNewsletterModal();
				}
			},
			subscribeAction(e) {
				e.preventDefault();
				if ($(this).parsley().isValid()) {
					let genereOption = 0;
					if (parseInt($("input[name='rdGenderModal']:checked").val()) === 2) {
						genereOption = 2;
					}
					else if (parseInt($("input[name='rdGenderModal']:checked").val()) === 1) {
						genereOption = 1;
					}
					let requestData = {
						nombre: dom.txtModalNewsletterName.val(),
						email: dom.txtModalNewsletterEmail.val(),
						genero: genereOption,
						categorias: functions.getSelectedCategories(),
						csrf: dom.modalFormCSRF.val()
					};
					$.ajax({
						url: "/suscriptor/procesar-rediseno",
						data: requestData,
						type: 'post',
						beforeSend() {
							$.fancybox.showLoading();
							dom.btnModalSubscribe.prop("disabled", true);
						},
						success(data) {
							$.fancybox.hideLoading();
							dom.modalFormCSRF.val(data.data.csrf);
							dom.btnModalSubscribe.prop("disabled", false);
							if (data.status) {
								$("input[name='rdGender']").prop('checked', false);
								$("input[name='rdGenderModal']").prop('checked', false);
								$("input[name='chkCategory']").prop("checked", false)
								dom.txtNewsletterName.val('');
								dom.txtNewsletterEmail.val('');
								$.fancybox(`<h3 class="u-brandColor u-textCenter">¡Gracias por suscribirte a Ofertop!</h3>
									<p>Pronto nos contactaremos para ofrecerte las mejores ofertas.</p>`)
							} else {
								$.fancybox(`<p>${data.msg}</p>`);
							}
						},
						error() {
							$.fancybox.hideLoading();
							dom.btnModalSubscribe.prop("disabled", false)
						}
					});
				}
			},

			updateInputText() {
				dom.frmPriceRange.parsley().reset();
				let minVal = parseInt($(this).val().split(',')[0])
				let maxVal = parseInt($(this).val().split(',')[1])
				dom.rangePriceMin.val(minVal);
				dom.rangePriceMax.val(maxVal);
			},

			reloadPage() {
				let url = window.location.href;
				let minRange = dom.rangePriceMin.val();
				let maxRange = dom.rangePriceMax.val();

				if (dom.frmPriceRange.parsley().isValid()) {
					log("is valid");
					if (url.match(/min=\d+&max=\d+/) !== null) {
				 		let newMinMaxUrl = url.replace(/min=\d+&max=\d+/, `min=${minRange}&max=${maxRange}`);
				 		window.location.href = newMinMaxUrl;
				 	} else if(url.match(/\?/) !== null) {
						window.location.href = `${url}&min=${minRange}&max=${maxRange}`;
				 	} else {
						window.location.href = `${url}?min=${minRange}&max=${maxRange}`;
				 	}
				}
			},

			minPriceHasChanged() {
				if ( vars.initialPriceMin !== $(this).val() ) {
					events.reloadPage();
				}
			},

			maxPriceHasChanged() {
				if ( vars.initialPriceMax !== $(this).val() ) {
					events.reloadPage();
				}
			},

			setSliderValue() {
				let myRangeSlider = dom.rangePriceSlider.slider();
				let minVal = parseInt(dom.rangePriceMin.val());
				let maxVal = parseInt(dom.rangePriceMax.val());
				myRangeSlider.slider("setValue", [minVal, maxVal]);
			},
			removeLetters(evt) {
				let key, key_str, regex, theEvent;
				theEvent = evt || window.event;
				key = theEvent.keyCode || theEvent.which;
				key_str = String.fromCharCode(key);
				regex = /^[0-9\b.,]+$/;
				if (key >= 96 && key <= 105 || (key >= 37 && key <= 40) || key === 9 ) { // numeros, teclas direccionales o tab
				theEvent.returnValue = true;
				} else {
				if (!regex.test(key_str)) {
				theEvent.returnValue = false;
				if (theEvent.preventDefault) {
				theEvent.preventDefault();
				}
				}
				}
				}

		};
		functions = {
			inputRange() {
				dom.rangePriceSlider.slider({});
			},
			addHeaderSpace() {
				if (dom.header.css("position") === "fixed") {
					$(".u-header-expand").show();
				} else {
					$(".u-header-expand").hide();
				}
			},
			showModal(){
				let settings = {
						type 		: 'inline',
						href 		: st.modal_howtobuy,
						title		: false,
						padding 	: [0, 0, 0, 0],
						closeBtn	: true,
						overlayShow: true
				}
				$.fancybox(settings)
				return
			},

			validate() {
				window.Parsley.setLocale('es');
			},
			extraValidators() {
				window.Parsley.addValidator('notequalto', ((value, requirement) => value !== $(requirement).val()), 32).addMessage('es', 'notequalto', 'Este valor no deberia ser igual');
				window.Parsley.addValidator('gt', ((value, requirement) => parseFloat(value) > parseFloat($(requirement).val())), 32).addMessage('es', 'gt', 'Este valor deberia ser mayor');
				window.Parsley.addValidator('ge', ((value, requirement) => parseFloat(value) >= parseFloat($(requirement).val())), 32).addMessage('es', 'ge', 'Este número debería ser mayor o igual que el precio mínimo');
				window.Parsley.addValidator('lt', ((value, requirement) => parseFloat(value) < parseFloat($(requirement).val())), 32).addMessage('es', 'lt', 'Este valor deberia ser menor');
				window.Parsley.addValidator('le', ((value, requirement) => parseFloat(value) <= parseFloat($(requirement).val())), 32).addMessage('es', 'le', 'Este número debería ser menor o igual que el precio máximo');
			},
			addSlider(){
				dom.slider.slick({
					dots: true,
					autoplay: true,
					lazyLoad: 'ondemand',
					responsive: [
						{
							breakpoint: 900,
							settings:{
								slidesToShow: 1,
								slidesToScroll: 1
							}
						}
					]
				});
			}
		}
		initialize = () => {
			catchDom();
			subscribeEvents();
			functions.addHeaderSpace();
			functions.addSlider();
			functions.inputRange();
		};
	return {
		init: initialize
	};
})();
App.init();