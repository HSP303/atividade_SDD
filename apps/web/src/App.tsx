import type { Experiment } from "@labspec/contracts";
import { type FormEvent, useCallback, useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export function App() {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/experiments`);
      if (!response.ok) throw new Error("Falha ao consultar a API");
      const body = await response.json() as { data: Experiment[] };
      setExperiments(body.data);
      setError("");
    } catch {
      setError("Nao foi possivel carregar os experimentos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    try {
      const response = await fetch(`${apiUrl}/api/v1/experiments`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, description })
      });
      if (!response.ok) throw new Error("Falha ao criar");
      setTitle("");
      setDescription("");
      await load();
    } catch {
      setError("Revise os campos e tente novamente.");
    }
  }

  return (
    <main>
      <header>
        <span className="eyebrow">SDD LAB / 001</span>
        <h1>Experimentos com<br />intencao verificavel.</h1>
        <p>Da especificacao ao teste, sem perder o fio.</p>
        <p className="notice">Ambiente local e efemero. Nao insira dados pessoais, credenciais ou segredos.</p>
      </header>
      <section className="panel" aria-labelledby="new-title">
        <h2 id="new-title">Novo experimento</h2>
        <form onSubmit={(event) => void submit(event)}>
          <label>Titulo<input value={title} onChange={(event) => setTitle(event.target.value)} minLength={3} maxLength={100} required /></label>
          <label>Descricao<textarea value={description} onChange={(event) => setDescription(event.target.value)} maxLength={1000} rows={4} /></label>
          <button type="submit">Registrar experimento</button>
        </form>
      </section>
      <section aria-labelledby="list-title">
        <div className="section-heading"><h2 id="list-title">Registro</h2><span>{experiments.length.toString().padStart(2, "0")}</span></div>
        {error && <p className="error" role="alert">{error}</p>}
        {loading ? <p>Carregando...</p> : experiments.length === 0 ? <p className="empty">Nenhum experimento ainda. Comece com uma hipotese pequena.</p> : (
          <ul>{experiments.map((item) => <li key={item.id}><span className="status">{item.status}</span><h3>{item.title}</h3><p>{item.description || "Sem descricao"}</p></li>)}</ul>
        )}
      </section>
    </main>
  );
}
