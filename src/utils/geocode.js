const request = require('request')


const geocode = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoia2FsaWJhdHR1bGEiLCJhIjoiY2swZzhhb3d5MDRrNjNubnFmazdldXpidCJ9.7cx6vGo5qFzoImXm7j3X-A&limit=1'

    request({url: url, json: true}, (error,response,body) => {
        if(error){
            callback('Unable to connect to Geocoding service')
        }else if(body.features.length === 0){
            callback('Couldn\'t find the location. Try with different search words.')
        }else if(body.message){
            callback(body.message)
        }else{
            callback(undefined,{
                place: body.features[0].place_name,
                lattitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports=geocode