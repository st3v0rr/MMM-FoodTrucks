# MMM-FoodTrucks

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

A Module for MagicMirror2 designed to integrate with the Craftplaces API.
In order to use the API you need to register at [Craftplaces](https://api.craftplaces.com/) and create an Endpoint for your region.

## Installation

Go to your MagicMirror folder.

```bash
cd modules
git clone https://github.com/st3v0rr/MMM-FoodTrucks.git
cd MMM-FoodTrucks
npm i
```

Wait until npm has finished.

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:

```js
var config = {
  modules: [
    {
      module: 'MMM-FoodTrucks',
      position: 'bottom_left',
      config: {
        foodTruckUrl: "https://api.craftplaces.com/api/v1/..."
      }
    },
  ]
}
```

## Configuration options

| Option               | Description
|----------------------|-----------
| `foodTruckUrl`       | *Required* A created Endpoint at the Craftplaces portal without the duration
| `foodTrucksDuration` | *Optional* Default `week` Duration for food-truck forecast - possible values are `today`, `tomorrow`, `twodays`, `week`, `twoweeks`, `month`
| `limitResult`        | *Optional* Default `2` Maximum number of results to be displayed
| `showLogo`           | *Optional* Default `true` Shows the logo of the foodtruck - set to false if you need more space
| `showPaymentOptions` | *Optional* Default `true` Shows the payment options of the foodtruck - set to false if you need more space
| `showLocation`       | *Optional* Default `true` Shows the location of the foodtruck - set to false if you need more space
| `dateFormat`         | *Optional* Default `DD.MM.YYYY` A custom date format
| `timeFormat`         | *Optional* Default `HH:MM` A custom time format

## Samples

![alt text](https://github.com/st3v0rr/MMM-FoodTrucks/raw/main/docs/Example.png "Example")
