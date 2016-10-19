App = (->
	dom = {}
	st =
		body: "body"
		frmParsley: ".frm-parsley"

	catchDom = ->
		dom.body = $(st.body)
		dom.frmParsley = $(st.frmParsley)
		return

	subscribeEvents = ->
		$("#btnNext").on "click", events.showStep2
		$("#lnkOpenMenu").on "click", events.toggleMenu
		$("#btnCreateGame").on "click", events.tmp1
		return

	events =
		showStep2: ->
			$(".c-create-game__step1").hide()
			$(".c-create-game__step2").fadeIn()
			return
		toggleMenu: ->
			$(this).toggleClass("l-header__menu-icon--active")
			$("#headerNav").slideToggle()
			return
		tmp1: ->
			setTimeout ( ->
				if $("#frmSignUp").parsley().isValid() or not $("#frmSignUp").parsley().isValid()
					window.location.href = "confirmar.html"
				return 
				), 3000
			
			return

	functions =
		formValidation: ->
			dom.frmParsley.parsley()
			return 
		focusTxt: ->
			$("#txtGameName").focus()
			return
		

		dates: ->
			currentYear = new Date().getFullYear()
			$('.datedropper').dateDropper({
				lang: 'es'
				minYear: currentYear
				maxYear: currentYear+1
				lock: "from"
				lang: "es"
				format: "d/m/Y"
				dropPrimaryColor: "#F15252"
				dropTextColor: "#535353"
				dropBorder: "none"#"1px solid #C19600"
				dropShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)"
				})

			return

	initialize = ->
		catchDom()
		subscribeEvents()
		functions.focusTxt()
		functions.dates()
		functions.formValidation()
		
		return

	return {
		init: initialize
	}

)()
App.init()
