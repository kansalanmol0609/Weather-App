const express = require('express')
const app = express()
const hbs = require('hbs')
const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//__dirname contains the current directory information
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates')
const parttialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(parttialsPath)

//Main page
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anmol Kansal'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send(error)
        }
        forecast(longitude, latitude, (err, forcstdata) => {
            if (err) {
                return res.send(err)
            }
            res.send({
                Address: req.query.address,
                location,
                forecast: forcstdata
            })
        })
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Anmol Kansal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Anmol Kansal'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error: 404 Page',
        name: 'Anmol Kansal'
    })
})

//Listening on any port
app.listen(3000, () => {
    console.log('App is running on sever port: 3000')
})