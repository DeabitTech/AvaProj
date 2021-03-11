const fastifyPlugin = require('fastify-plugin')

async function dbConnector (fastify, options) {
  fastify.register(require('fastify-mongodb'), {
    url: 'mongodb+srv://avaxuser:avaxuser@avax.4zi93.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators    
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector)