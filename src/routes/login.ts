import fastify, { FastifyHttpOptions, FastifyInstance, FastifyServerOptions, RouteShorthandOptions, RouteShorthandOptionsWithHandler } from "fastify";

async function authRoute(fastify: FastifyInstance, options: RouteShorthandOptionsWithHandler) {
    options.onError = async (req, res) => {
    }

}

export default authRoute
