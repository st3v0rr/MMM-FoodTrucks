/* global Module */

/* MagicMirror²
 * Module: MMM-FoodTrucks
 *
 * By Stefan Nachtrab
 * MIT Licensed.
 */

Module.register("MMM-FoodTrucks", {
	defaults: {
		updateInterval: 1000 * 60 * 60 * 4, //every 4 hours
		foodTruckUrl: "",
		foodTrucksDuration: "week",
		limitResult: 2,
		showLogo: true,
		showPaymentOptions: true,
		showLocation: true,
		dateFormat: "DD.MM.YYYY",
		timeFormat: "HH:mm"
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function () {
		var self = this;

		console.log("Starting module MMM-FoodTrucks");

		//Flag for check if module is loaded
		this.loaded = false;

		self.getData();
		setInterval(function () {
			self.getData();
			self.updateDom();
		}, this.config.updateInterval);

		this.loaded = true;
	},

	getData: function () {
		this.sendSocketNotification("MMM-FoodTrucks-NOTIFICATION_FOODTRUCK_DATA_REQUESTED", {
			config: this.config
		});
	},

	getHeader: function () {
		return this.translate("TITLE");
	},

	getTemplate: function () {
		if (!this.loaded) {
			return "templates/error.njk";
		}
		return "templates/default.njk";
	},

	getTemplateData: function () {
		if (this.config.foodTruckUrl === "" || this.config.foodTrucksDuration === "") {
			return {
				status: "Missing configuration for MMM-NewEmployees.",
				config: this.config
			};
		}
		if (!this.loaded) {
			return {
				status: "Loading MMM-FoodTrucks...",
				config: this.config
			};
		}
		if (this.dataBackend !== undefined) {
			this.dataBackend.result = this.dataBackend.result.slice(0, this.config.limitResult);
			return {
				config: this.config,
				translations: {
					title: this.translate("TITLE"),
					notfound: this.translate("NOT_FOUND")
				},
				data: this.dataBackend
			};
		}

		return {
			status: "Loading MMM-FoodTrucks...",
			config: this.config
		};
	},

	getScripts: function () {
		return [];
	},

	getStyles: function () {
		return ["MMM-FoodTrucks.css", "font-awesome.css"];
	},

	// Load translations files
	getTranslations: function () {
		return {
			en: "translations/en.json",
			de: "translations/de.json"
		};
	},

	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {
		if (notification === "MMM-FoodTrucks-NOTIFICATION_FOODTRUCK_DATA_RECEIVED") {
			console.log(payload);
			// set dataNotification
			this.dataBackend = payload;
			this.updateDom();
		}
	}
});
