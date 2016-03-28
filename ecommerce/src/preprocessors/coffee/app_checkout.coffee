App = (->
	dom = {}
	st =
		body: "body"
	catchDom = ->
		dom.body = $(st.body)
		return 

	suscribeEvents = ->
		#dom.body.on "click", events.myFunction
		$(window).on "hashchange", functions.removeEmailStepClass
		$(window).on "hashchange", functions.addPagoEfectivoRadioBtn
		$(window).on "hashchange", functions.emailStep
		return

	events =
		myFunction: ->
			#dom.body.css 'background', 'red'
			return

	functions = 
		replaceTextOrderPlaced: ->

			if $('.body-order-placed').length != 0
				str8 = $('.body-order-placed tfoot .monetary').html()
				str7 = $('.body-order-placed .Discounts.monetary').html()
				str6 = $('.body-order-placed .Shipping .monetary').html()
				str5 = $('.body-order-placed .Items .monetary' ).html()
				str4 = $('.body-order-placed .payment-value-monetary').html()
				str3 = $('.body-order-placed .total-selling-price').html()
				str2 = $('.body-order-placed .product-price .new-product-price').html()
				str  = $('.body-order-placed .bank-invoice-print-text strong').html() 

				numberWithCommas = (x) ->
				  x.toString().replace /\B(?=(?:\d{3})+(?!\d))/g, ','
				

				if $('.body-order-placed .bank-invoice-print-text strong').length != 0
					num = str.replace(/\s/g, '').replace('S/.', '')
					num2 = num.replace('.', '')
					withDeci = num2.split(',')

					withDeci = num2.replace(',', '.')
					num = numberWithCommas(withDeci)
					$('.body-order-placed .bank-invoice-print-text strong').html 'S/. ' + num
				
				#str2
				if $('.body-order-placed .product-price .new-product-price').length != 0
					num_2 = str2.replace(/\s/g, '').replace('S/.', '')
					num_22 = num_2.replace('.', '')
					withDeci2 = num_22.split(',')

					withDeci2 = num_22.replace(',', '.')
					num_2 = numberWithCommas(withDeci2)

					$('.body-order-placed .product-price .new-product-price').html 'S/. ' + num_2

				#str3
				if $('.body-order-placed .total-selling-price').length != 0
					num_3 = str3.replace(/\s/g, '').replace('S/.', '')
					num_33 = num_3.replace('.', '')
					withDeci3 = num_33.split(',')

					withDeci3 = num_33.replace(',', '.')
					num_3 = numberWithCommas(withDeci3)
					$('.body-order-placed .total-selling-price').html 'S/. ' + num_3

				#str4
				if $('.body-order-placed .payment-value-monetary').length != 0
					num_4 = str4.replace(/\s/g, '').replace('S/.', '')
					num_44 = num_4.replace('.', '')
					withDeci4 = num_44.split(',')

					withDeci4 = num_44.replace(',', '.')
					num_4 = numberWithCommas(withDeci4)
					$('.body-order-placed .payment-value-monetary').html 'S/. ' + num_4
	
				#str5
				if $('.body-order-placed .Items .monetary').length != 0
					num_5 = str5.replace(/\s/g, '').replace('S/.', '')
					num_55 = num_5.replace('.', '')
					withDeci5 = num_55.split(',')
					
					withDeci5 = num_55.replace(',', '.')
					num_5 = numberWithCommas(withDeci5)
					$('.body-order-placed .Items .monetary').html 'S/. ' + num_5

				#str6
				if $('.body-order-placed .Shipping .monetary').length != 0
					num_6 = str6.replace(/\s/g, '').replace('S/.', '')
					num_66 = num_6.replace('.', '')
					withDeci6 = num_66.split(',')

					withDeci6 = num_66.replace(',', '.')
					num_6 = numberWithCommas(withDeci6)
					$('.body-order-placed .Shipping .monetary').html 'S/. ' + num_6

				#str7
				if $('.body-order-placed .Discounts.monetary').length != 0
					num_7 = str7.replace(/\s/g, '').replace('S/.', '')
					num_77 = num_7.replace('.', '')
					withDeci7 = num_77.split(',')

					withDeci7 = num_77.replace(',', '.')
					num_7 = numberWithCommas(withDeci7)
					$('.body-order-placed .Discounts.monetary').html 'S/. ' + num_7
			
				#str8
				if $('.body-order-placed tfoot .monetary').length != 0
					num_8 = str8.replace(/\s/g, '').replace('S/.', '')
					num_88 = num_8.replace('.', '')
					withDeci8 = num_88.split(',')
					
					withDeci8 = num_88.replace(',', '.')
					num_8= numberWithCommas(withDeci8)

					$('.body-order-placed tfoot .monetary').html 'S/. ' + num_8			

			return 
		changeText: ->
			$('#go-to-shipping').text('CONTINUAR')
			$('#orderform-title').text('FINALIZAR COMPRA')
			$('.btn-go-to-payment').text('CONTINUAR')
			$(".shipping-reset .info").text('Costo de envío')
			$(".link-coupon-add").text("CUPÓN DE DESCUENTO")
			$("#orderform-to-cart").text("Regresar al carrito")
			$('#cart-coupon-remove').text ''
			$('#cart-coupon-remove').addClass 'icon-remove'
			$('#orderform-minicart-to-cart').text('Volver al carrito')
			$('#payment-group-creditCardPaymentGroup span').text('Tarjeta de crédito o débito')
			$('.order-details .section-info-title').after('<h3 class="section-info-title">Medio de envío: Delivery</h3>')
			return 

		deleteFiles: ->
			$("link[href='//io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap-responsive.min.css']").remove()
			return 

		checkPaymentMethod: ->
			if $('.orderplaced .payment-subtitle').text().toLowerCase() is 'pagoefectivo'
				$('.orderplaced .payment-subtitle').parents('body').addClass('pagoefectivo')

			$('.orderplaced .orderplaced-alert-content').css('visibility', 'visible') # show alert after page is loaded
			return

		emailStep: ->
			if window.location.href.indexOf('#/email') > 0
				$('body').addClass('email_step')
	
			return

		removeEmailStepClass: ->
			if window.location.href.indexOf('payment') > 0 or window.location.href.indexOf('profile') > 0
				$('body').removeClass('email_step')
			return 

		addPagoEfectivoRadioBtn: ->
			if window.location.href.indexOf('payment') > 0
				if $('.pagoefectivo_custom').length is 0
					$('#payment-data .PagoEfectivoPaymentGroup').prepend("
						<div class='pagoefectivo_custom'>
							<label>
								<input type='radio' checked name='pe'>
								<img src='http://estilomio.vteximg.com.br/arquivos/icoPE1.png'>
								<p>
									<b>Banca por Internet</b>
									Paga a través de tu banca por internet en BBVA, BCP, INTERBANK, SCOTIABANK y BANBIF. Debítalo de tu cuenta o cárgalo a tu tarjeta de crédito asociada.
								</p>
							</label>
							<label>
								<input type='radio' name='pe'>
								<img src='http://estilomio.vteximg.com.br/arquivos/icoPE2.png'>
								<p>
									<b>Agentes y Agencias</b>
									Acércate a cualquier punto del BBVA, BCP, INTERBANK, SCOTIABANK y BANBIF. Agentes corresponsales KASNET, WESTERN UNION - Pago de Servicios y FULLCARGA
								</p>
							</label>
						</div>")
			return 

		replacePaymentText: ->
			paymentType = $('.orderplaced .payment-method-info .payment-subtitle').text() 
			cardInfo = $('.orderplaced .payment-method-info .card-info').text()
			total = $('.orderplaced .payment-method-info .payment-value-monetary').text()
			console.log paymentType, cardInfo, total 

			if $('body').hasClass 'pagoefectivo'
				$('.orderplaced .payment').prepend("<span class='text'>#{paymentType}:  </span>")
			else
				$('.orderplaced .payment').prepend("<span class='text'>#{paymentType} #{cardInfo}:  </span>")
			return 

		getCIPdata: ->
			Date::addHours = (h) ->
				@setHours @getHours() + h
				this

			paymentDate = new Date().addHours(29) # pay within 29 hours
			days = ['0','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
			dia = days[paymentDate.getDay()]
			hora = paymentDate.toLocaleTimeString()
			fecha = paymentDate.getDate() # 1-31
			mes  = paymentDate.getMonth() + 1  # 1 -12
			anio = paymentDate.getFullYear()

			if $('body').hasClass('pagoefectivo')
				$.ajax
					method: 'GET'
					url: 'https://www.estilomio.com/api/checkout/pub/orders/order-group/' + parseInt(window.location.search.split('?og=')[1])
					dataType: 'JSON'
					success: (data) ->
						$(".orderplaced .orderplaced-alert").after(
							"<div class='mobile_payment_summary'>
								<div class='info_code'>
									<p class='title'>Código de pago (CIP): <span>#{data[0].paymentData.payments[0].tid}</span></p>
									<span class='lbl_total'>Total a pagar: <b>S/. #{parseFloat(data[0].value / 100)}</b></span>
									<span class='igv'>(Incluido IGV)</span>
									<span class='payment_date'>#{dia} #{fecha}/#{mes}/#{anio} / #{hora}</span>
								</div>
								<div class='restrictions'>
									Este código de pago no constituye una reserva confirmada sino hasta la realización del pago a través de los canales mencionados.<br>Estilomio se reserva el derecho a finalizar un pedido antes del tiempo indicado; en este caso el código CIP quedaría sin efecto
								</div>
								<div class='warning_info'>
									<span class='logo_info'></span>
									<p>Indique que va realizar un <b>Pago a la Empresa PAGOEFECTIVO</b><br>(*) La cuenta de recaudación NO corresponde a Estilomio, corresponde a la empresa <b>PAGOEFECTIVO</b></p>
									<span class='logo_info right'></span>
								</div>
							</div>")
						return 
			return

	initialize = ->
		catchDom()
		suscribeEvents()
		functions.replaceTextOrderPlaced()
		functions.changeText()
		functions.deleteFiles()
		$(window).load ->
			functions.checkPaymentMethod()
			functions.replacePaymentText() # depends on checkPaymentMethod
			functions.getCIPdata() # depends on checkPaymentMethod
			functions.removeEmailStepClass()
			functions.addPagoEfectivoRadioBtn()
			functions.emailStep()
			return
		return 
	init: initialize
)()
App.init()