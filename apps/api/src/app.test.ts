import { afterEach, describe, expect, it, vi } from "vitest";
import { buildApp } from "./app.js";
import { InMemoryExperimentRepository } from "./repository.js";

const apps: Awaited<ReturnType<typeof buildApp>>[] = [];
async function testApp() {
  const app = await buildApp({ config: { nodeEnv: "test", host: "127.0.0.1", port: 3000, allowedOrigins: new Set(["http://localhost:5173"]), rateLimitMax: 100 } });
  apps.push(app);
  return app;
}
afterEach(async () => { await Promise.all(apps.splice(0).map((app) => app.close())); });
afterEach(() => vi.useRealTimers());

describe("experiments API", () => {
  it("creates and lists an experiment", async () => {
    const app = await testApp();
    const created = await app.inject({ method: "POST", url: "/api/v1/experiments", payload: { title: "Teste de latencia", description: "Baseline" } });
    expect(created.statusCode).toBe(201);
    expect(created.headers.location).toMatch(/^\/api\/v1\/experiments\//);
    const listed = await app.inject({ method: "GET", url: "/api/v1/experiments" });
    expect(listed.statusCode).toBe(200);
    expect(listed.json().data).toHaveLength(1);
  });

  it("rejects unknown properties and invalid input without leaking details", async () => {
    const app = await testApp();
    const response = await app.inject({ method: "POST", url: "/api/v1/experiments", payload: { title: "x", admin: true } });
    expect(response.statusCode).toBe(400);
    expect(response.headers["content-type"]).toContain("application/problem+json");
    expect(response.body).not.toContain("admin");
  });

  it("enforces the CORS allowlist", async () => {
    const app = await testApp();
    const response = await app.inject({ method: "GET", url: "/health", headers: { origin: "https://evil.example" } });
    expect(response.statusCode).toBe(200);
    expect(response.headers["access-control-allow-origin"]).toBeUndefined();
  });

  it("gets, updates and deletes an experiment", async () => {
    const app = await testApp();
    const created = await app.inject({ method: "POST", url: "/api/v1/experiments", payload: { title: "Ciclo completo" } });
    const id = created.json().data.id as string;
    expect((await app.inject({ method: "GET", url: `/api/v1/experiments/${id}` })).statusCode).toBe(200);

    const updated = await app.inject({ method: "PATCH", url: `/api/v1/experiments/${id}`, payload: { status: "completed" } });
    expect(updated.json().data.status).toBe("completed");
    expect((await app.inject({ method: "DELETE", url: `/api/v1/experiments/${id}` })).statusCode).toBe(204);
    expect((await app.inject({ method: "GET", url: `/api/v1/experiments/${id}` })).statusCode).toBe(404);
  });

  it("lists newest experiments first", async () => {
    vi.useFakeTimers();
    const repository = new InMemoryExperimentRepository();
    vi.setSystemTime(new Date("2026-01-01T00:00:00.000Z"));
    await repository.create({ title: "Primeiro", description: "" });
    vi.setSystemTime(new Date("2026-01-01T00:01:00.000Z"));
    await repository.create({ title: "Segundo", description: "" });
    expect((await repository.list()).map((item) => item.title)).toEqual(["Segundo", "Primeiro"]);
  });

  it("rejects request bodies larger than 16 KiB safely", async () => {
    const app = await testApp();
    const response = await app.inject({ method: "POST", url: "/api/v1/experiments", payload: { title: "Grande", description: "x".repeat(17 * 1024) } });
    expect(response.statusCode).toBe(413);
    expect(response.headers["content-type"]).toContain("application/problem+json");
  });
});
