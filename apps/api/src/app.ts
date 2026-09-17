import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { createExperimentSchema, experimentIdSchema, updateExperimentSchema } from "@labspec/contracts";
import Fastify, { type FastifyReply } from "fastify";
import { ZodError } from "zod";
import { loadConfig, type AppConfig } from "./config.js";
import { InMemoryExperimentRepository, type ExperimentRepository } from "./repository.js";

type Dependencies = { config?: AppConfig; repository?: ExperimentRepository };

function problem(reply: FastifyReply, status: number, title: string, detail: string) {
  return reply.code(status).type("application/problem+json").send({ type: "about:blank", title, status, detail });
}

export async function buildApp(dependencies: Dependencies = {}) {
  const config = dependencies.config ?? loadConfig();
  const repository = dependencies.repository ?? new InMemoryExperimentRepository();
  const app = Fastify({ logger: config.nodeEnv !== "test", bodyLimit: 16 * 1024, trustProxy: false, requestIdHeader: false });

  await app.register(helmet, {
    contentSecurityPolicy: { directives: { defaultSrc: ["'none'"], frameAncestors: ["'none'"] } }
  });
  await app.register(cors, {
    origin(origin, callback) {
      if (!origin || config.allowedOrigins.has(origin)) return callback(null, true);
      return callback(null, false);
    },
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["content-type"],
    maxAge: 600
  });
  await app.register(rateLimit, { global: true, max: config.rateLimitMax, timeWindow: "1 minute" });

  app.get("/health", async () => ({ status: "ok" }));
  app.get("/api/v1/experiments", async () => ({ data: await repository.list() }));

  app.get<{ Params: { id: string } }>("/api/v1/experiments/:id", async (request, reply) => {
    const id = experimentIdSchema.parse(request.params.id);
    const item = await repository.findById(id);
    return item ? { data: item } : problem(reply, 404, "Nao encontrado", "Experimento inexistente");
  });

  app.post("/api/v1/experiments", async (request, reply) => {
    const input = createExperimentSchema.parse(request.body);
    const item = await repository.create(input);
    return reply.code(201).header("location", `/api/v1/experiments/${item.id}`).send({ data: item });
  });

  app.patch<{ Params: { id: string } }>("/api/v1/experiments/:id", async (request, reply) => {
    const id = experimentIdSchema.parse(request.params.id);
    const input = updateExperimentSchema.parse(request.body);
    const item = await repository.update(id, input);
    return item ? { data: item } : problem(reply, 404, "Nao encontrado", "Experimento inexistente");
  });

  app.delete<{ Params: { id: string } }>("/api/v1/experiments/:id", async (request, reply) => {
    const id = experimentIdSchema.parse(request.params.id);
    return (await repository.delete(id)) ? reply.code(204).send() : problem(reply, 404, "Nao encontrado", "Experimento inexistente");
  });

  app.setNotFoundHandler((_request, reply) => problem(reply, 404, "Nao encontrado", "Rota inexistente"));
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) return problem(reply, 400, "Requisicao invalida", "Formato ou campos invalidos");
    const statusCode = typeof error === "object" && error !== null && "statusCode" in error ? error.statusCode : undefined;
    if (statusCode === 413) return problem(reply, 413, "Corpo muito grande", "O limite da requisicao foi excedido");
    if (statusCode === 429) return problem(reply, 429, "Muitas requisicoes", "Tente novamente mais tarde");
    request.log.error({ err: error, requestId: request.id }, "request failed");
    return problem(reply, 500, "Erro interno", "A requisicao nao pode ser processada");
  });
  return app;
}
