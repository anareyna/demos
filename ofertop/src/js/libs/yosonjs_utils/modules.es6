yOSON.AppSchema.modules = {
	"default": {
		"controllers": {
			"index": {
				"actions": {
					"rediseno": function() {
						yOSON.AppCore.runModule("slider");
						yOSON.AppCore.runModule("newsletter_scroll");
						yOSON.AppCore.runModule("tabs");
						yOSON.AppCore.runModule("datalayer");
					},
					"by_default": function() {}
				},
				"all_actions": function() {}
			},
			"registro": {
				"actions": {
					"nuevo-usuario": function() {
						yOSON.AppCore.runModule("validate_registration");
					},
					"bienvenido": function() {

					}

				},
				"all_actions": function() {}
			},
			"buscador": {
				"actions": {
					"resultado": function() {
						yOSON.AppCore.runModule("price_slider");
						yOSON.AppCore.runModule("toggle_filters_mobile");
						yOSON.AppCore.runModule("order_result");
						yOSON.AppCore.runModule("infinite_scroll");
					}
				},
				"all_actions": function() {}
			},
			"categoria": {
				"actions": {
					"ver": function() {
						yOSON.AppCore.runModule("slider_category");
						yOSON.AppCore.runModule("price_slider");
						yOSON.AppCore.runModule("order_result");
						yOSON.AppCore.runModule("toggle_filters_mobile");
						yOSON.AppCore.runModule("infinite_scroll");
					}
				},
				"all_actions": function() {}
			},

			"by_default": function() {}
		},

		"all_controllers": function() {}
	},
	"by_default": function() {},
	"all_modules": function() {
		yOSON.AppCore.runModule("is");
		yOSON.AppCore.runModule("header_scroll");
		yOSON.AppCore.runModule("mobile_menu");
		yOSON.AppCore.runModule("autocomplete");
		yOSON.AppCore.runModule("facebook_connect");
		yOSON.AppCore.runModule("login");
		yOSON.AppCore.runModule("parsley_validation");
		yOSON.AppCore.runModule("newsletter");
		yOSON.AppCore.runModule("modal_how_buy");
		yOSON.AppCore.runModule("lazyload_img");
	}
};
