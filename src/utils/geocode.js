const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoia2Fuc2FsYW5tb2wwNjA5IiwiYSI6ImNqd2RjMG52eDA1emk0M21vbHFycmhocXIifQ.UR0xKQIvxcoQtVsY8_3w2A&limit=1'
    //Requesting data from GEOMAPS API
    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect!!', undefined)
        }
        else if (body.features.length === 0) {
            callback('Please enter some valid input.', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geocode