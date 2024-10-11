import type { FastifyInstance, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import StatusCode from "status-code-enum";

async function userRoutes(fastify: FastifyInstance, options: RouteShorthandOptionsWithHandler) {
  fastify.post("/user/add", {
    schema: {
      description: 'Create a new user',
      tags: ['users'],
      body: {
        type: 'object',
        required: ['email', 'name', 'username'],
        properties: {
          email: { type: 'string', format: 'email' },
          name: { type: 'string' },
          username: { type: 'string' }
        }
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            id: { type: 'number' },
            email: { type: 'string' },
            name: { type: 'string' },
            username: { type: 'string' }
          }
        }
      }
    }
  }, async (req: FastifyRequest, res) => {
    const logger = fastify.log;
    console.log(JSON.stringify(req))
    if (req.db) {
      console.log(req.session.data)
      const user = await req.db.user.create({
        data: {
          email: (req.body as any).email,
          username: (req.body as any).username,
          name: (req.body as any).name,
        }

      })
      res.statusCode = StatusCode.SuccessCreated
      return user
    }
  })
}

export default userRoutes;