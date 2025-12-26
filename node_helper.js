/* MagicMirror²
 * Node Helper: MMM-FoodTrucks
 *
 * By Stefan Nachtrab
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var https = require("node:https");
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
			const url = new URL(payload.config.foodTruckUrl + payload.config.foodTrucksDuration);
			const requestOptions = { headers: {} };
			//call the api
			const req = https.request(url, requestOptions, function (response) {
				let body = "";
				response.on("data", (chunk) => {
					body += chunk;
				});
				response.on("end", () => {
					//return the api response
					if (response.statusCode === 200) {
						var parsedBody = JSON.parse(body);
						parsedBody.result.forEach((r) => (r.date.start.formatedDate = dayjs(r.date.start.date).format(payload.config.dateFormat)));
						parsedBody.result.forEach((r) => (r.date.start.formatedTime = dayjs(r.date.start.date).format(payload.config.timeFormat)));
						parsedBody.result.forEach((r) => (r.date.end.formatedDate = dayjs(r.date.end.date).format(payload.config.dateFormat)));
						parsedBody.result.forEach((r) => (r.date.end.formatedTime = dayjs(r.date.end.date).format(payload.config.timeFormat)));
						self.sendSocketNotification("MMM-FoodTrucks-NOTIFICATION_FOODTRUCK_DATA_RECEIVED", parsedBody);
					}
				});
			});
			req.on("error", (error) => {
				console.error("MMM-FoodTrucks https request failed:", error);
			});
			req.end();
		}
	}
});
