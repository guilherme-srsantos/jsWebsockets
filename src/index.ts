import Fastify from "fastify";
import StatusCode from "status-code-enum";
import { PrismaClient } from '@prisma/client'
import addDataLayer from "./routes/access";
import userRoutes from "./routes/users";
import addSwagger from "./modules/swagger";
import prismaPlugin from "./plugins/prismaPlugin";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";

const app = Fastify({
  logger: true
})

const prisma = new PrismaClient()

const start = async () => {
  try {
    // Register data layer
    await app.register(import(`@fastify/swagger`))
    await app.register(import(`@fastify/swagger-ui`), {
        routePrefix: "/docs"
    })


    await app.register(fastifyCookie, {
  
    })
    await app.register(fastifySession, {
      secret: "ABC12345678910111213141516171819202122232425262728292",
      cookieName: "testeAuth",
      cookie: {
        secure: false,
        
      }
    })
    // Register routes
    await app.register(prismaPlugin)
    await app.register(userRoutes)

    // Register Swagger after all routes have been added
    await app.register(addSwagger)

    // Call ready to ensure all plugins are loaded
    await app.ready()

    // Start listening
    await app.listen({ port: 3000 })

    console.log('Server is running on http://localhost:3000')
    console.log('Swagger documentation is available at http://localhost:3000/documentation')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()