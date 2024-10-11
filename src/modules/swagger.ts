import { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

async function addSwagger(fastify: FastifyInstance) {
  await fastify.register(swagger, {
    swagger: {
      info: {
        title: "My API",
        description: "API documentation",
        version: "1.0.0"
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here"
      },
      host: "localhost:3000",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"]
    }
  });

  await fastify.register(swaggerUi, {
    routePrefix: "/documentation",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
  });
}

export default addSwagger;