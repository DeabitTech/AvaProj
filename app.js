// Imports
const express = require('express');
const app = express()
const port = 3000;  //port number 

const fastify = require('fastify')({
    logger: true
  })

  fastify.register(require('point-of-view'), {
    engine: {
      ejs: require('ejs')
    }
  })

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

//Fastify connection to DB
fastify.register(require('./fastify_modules/mongodb-connector'))
fastify.register(require('./fastify_modules/routes'))


fastify.listen(3000, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
  })


//Listen on port 3000
app.listen(port, () => console.info('Listening on port http://127.0.0.1:3000'))
