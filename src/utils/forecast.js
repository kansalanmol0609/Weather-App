const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/57e8a1c94e488618ab6e3dcedf477aed/' + latitude + ',' + longitude + '?units=si'
    //Requesting data from Weather API
    //Destructivity ESJ6
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to Connect', undefined);
        }
        else if (body.error) {
            callback('Information not available', undefined);
        }
        else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of precipitation.')
        }
    })
}

module.exports = forecast