/* Magic Mirror
 * Node Helper: MMM-FoodTrucks
 *
 * By Stefan Nachtrab
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var request = require("request");
const dayjs = require("dayjs");

module.exports = NodeHelper.create({
	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function (notification, payload) {
		var self = this;
		if (notification === "MMM-FoodTrucks-NOTIFICATION_FOODTRUCK_DATA_REQUESTED") {
			//initiate api call
			const requestOptions = {
				url: payload.config.foodTruckUrl + payload.config.foodTrucksDuration,
				headers: {}
			};
			//call the api
			request(requestOptions, function (error, response, body) {
				//return the api response
				if (!error && response.statusCode === 200) {
					var parsedBody = JSON.parse(body);
					parsedBody.result.forEach((r) => (r.date.start.formatedDate = dayjs(r.date.start.date).format(payload.config.dateFormat)));
					parsedBody.result.forEach((r) => (r.date.start.formatedTime = dayjs(r.date.start.date).format(payload.config.timeFormat)));
					parsedBody.result.forEach((r) => (r.date.end.formatedDate = dayjs(r.date.end.date).format(payload.config.dateFormat)));
					parsedBody.result.forEach((r) => (r.date.end.formatedTime = dayjs(r.date.end.date).format(payload.config.timeFormat)));
					self.sendSocketNotification("MMM-FoodTrucks-NOTIFICATION_FOODTRUCK_DATA_RECEIVED", parsedBody);
				}
			});
		}
	}
});
