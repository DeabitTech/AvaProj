const fastify = require('fastify')()


async function routes (fastify, options) {
const collection = fastify.mongo.db.collection('test_collection')


 fastify.get('/', async (req, reply) => {
    reply.view('index.html')
  })

  fastify.get('/administration', async (request, reply) => {
    const result = await collection.find().toArray()
    if (result.length === 0) {
      throw new Error('No documents found')
    }
    return result
  })

  fastify.get('/administration:administration', async (request, reply) => {
    const result = await collection.findOne({ animal: request.params.animal })
    if (result === null) {
      throw new Error('Invalid value')
    }
    return result
  })
}

module.exports = routes