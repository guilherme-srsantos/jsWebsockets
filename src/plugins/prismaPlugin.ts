import { PrismaClient } from "@prisma/client";
import fp from "fastify-plugin";
import type { FastifyPluginCallback } from "fastify";
const db = new PrismaClient();

declare module 'fastify' {
    interface FastifyRequest {
      db: PrismaClient | null
    }
  }
  

interface MyPluginOptions{

}

const prismaPlugin: FastifyPluginCallback<MyPluginOptions> = (fastify, options, done) => {
    console.log("entrou no plugin")
    fastify.decorateRequest('db', {
      getter() {
        return db;
      },
    })
    done()
  }


export default fp(prismaPlugin, '5.x')
