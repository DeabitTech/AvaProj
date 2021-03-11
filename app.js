// Imports
const express = require('express');
const app = express()
const port = 3000;  //port number 


// Static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

//Set Views
app.set('views', './views')
app.set('view engine','ejs')    //set ejs as default render

        //route index
app.get('', (req, res) => {
    //res.sendFile(__dirname + '/views/index.html')
    res.render("index", {text: 'Index Page'}) //render index.ejs
})
        //route about
app.get('/about', (req, res) => {
    //res.sendFile(__dirname + '/views/index.html')
    res.render("about", {about: 'About Page'}) //render index.ejs
})

//Listen on port 3000
app.listen(port, () => console.info('Listening on port http://127.0.0.1:3000'))