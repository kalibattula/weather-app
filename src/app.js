const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Paths for public dir and views dir
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Serving Static folders
app.use(express.static(publicDirPath))

//Setting up views dir and view engine
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// app.get('/', (req, res) => {
//     res.send('Hello Express')
// })
app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Kali Battula'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About page',
        name: 'Kali Battula'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help Page',
        name: 'Kali Battula'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You didn\' entered the search term'
        })
    }
    // res.send({
    //     address: req.query.address,
    //     forecast: 'It is really hot'
    // })
    geocode(req.query.address, (error,data) => {
        
        if(error){
            // console.log('Error:',error)
            // console.table(data)
            return res.send({
                error
            })
        }
        forecast(data.lattitude, data.longitude, (error,forecastData) => {
            if(error){
                // return console.log(error+'error')
                return res.send({
                    error
                })
            }
            // console.log(data.place)
            // console.log(forecastData)  
            res.send({
                place: data.place,
                forecastData: forecastData
            }) 
        })
    })
})
// app.get('/products', (req, res) => {
//     if(!req.query.search){
//         return res.send({
//             error: 'You didn\' entered the search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products: [req.query.search]
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help Error Page',
        name: 'Kali Battula Error',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        title: 'Error Page',
        name: 'Kali Battula Error',
        errorMessage: 'Page Not Found'
    })
})


// app.get('/help', (req, res) => {
//     res.send('This is help page')
// })

// app.get('/about', (req, res) => {
//     res.send(`<h1 style='color:red'>ABOUT PAGE</h1>
    
//         <h3 style='color:blue'>I am B.Hanumath Kali Prasad Babu</h3>
//     `)
// })




app.listen(port, () => {
    console.log('Starting server')
})