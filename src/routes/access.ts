import { PrismaClient } from "@prisma/client";
import { FastifyInstance, RouteShorthandOptionsWithHandler } from "fastify";
import {  FastifyRequestDb } from "../modules/reqModule";

async function addDataLayer(fastify: FastifyInstance, options: RouteShorthandOptionsWithHandler){

    const db = new PrismaClient();
    fastify.decorateRequest('db')

    fastify.addHook('onRequest', (req: FastifyRequestDb, _res, done) => {
        req.db = db
        console.log(req.db)
        done()
    })
}


export default addDataLayer