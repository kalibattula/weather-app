const request = require('request')

const forecast = (lat, long, callback) => {
    url =  'https://api.darksky.net/forecast/926a156f97c00aaf5115698c8c3736e8/'+ lat +','+ long +'?units=si&exclude=[minutely,hourly]'
    
    request({url: url, json: true}, (error,request,body) => {
        if(error){
            callback('Unable to Connect to the internet')
        }else if(body.error){
            callback('Unable to fimd the locations')
        }else{
            const place = 'Place is '+body.timezone
            callback(undefined,place+'\n'+body.daily.data[0].summary +'It is currently ' + body.currently.temperature + ' degree Celsius out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}


module.exports=forecast