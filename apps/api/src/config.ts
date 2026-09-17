import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  API_HOST: z.string().default("127.0.0.1"),
  API_PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  ALLOWED_ORIGINS: z.string().default("http://localhost:5173"),
  RATE_LIMIT_MAX: z.coerce.number().int().min(1).max(10_000).default(100)
});

export type AppConfig = {
  nodeEnv: "development" | "test" | "production";
  host: string;
  port: number;
  allowedOrigins: ReadonlySet<string>;
  rateLimitMax: number;
};

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const parsed = envSchema.parse(env);
  const origins = parsed.ALLOWED_ORIGINS.split(",").map((value) => value.trim()).filter(Boolean);
  if (parsed.NODE_ENV === "production" && origins.some((origin) => origin === "*")) {
    throw new Error("ALLOWED_ORIGINS nao pode conter '*' em producao");
  }
  return {
    nodeEnv: parsed.NODE_ENV,
    host: parsed.API_HOST,
    port: parsed.API_PORT,
    allowedOrigins: new Set(origins),
    rateLimitMax: parsed.RATE_LIMIT_MAX
  };
}
