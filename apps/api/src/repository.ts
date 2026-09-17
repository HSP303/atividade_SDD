import type { CreateExperiment, Experiment, UpdateExperiment } from "@labspec/contracts";
import { randomUUID } from "node:crypto";

export interface ExperimentRepository {
  list(): Promise<Experiment[]>;
  findById(id: string): Promise<Experiment | undefined>;
  create(input: CreateExperiment): Promise<Experiment>;
  update(id: string, input: UpdateExperiment): Promise<Experiment | undefined>;
  delete(id: string): Promise<boolean>;
}

export class InMemoryExperimentRepository implements ExperimentRepository {
  readonly #items = new Map<string, Experiment>();

  async list(): Promise<Experiment[]> {
    return [...this.#items.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  async findById(id: string): Promise<Experiment | undefined> { return this.#items.get(id); }
  async create(input: CreateExperiment): Promise<Experiment> {
    const now = new Date().toISOString();
    const experiment: Experiment = { id: randomUUID(), title: input.title, description: input.description, status: "draft", createdAt: now, updatedAt: now };
    this.#items.set(experiment.id, experiment);
    return experiment;
  }
  async update(id: string, input: UpdateExperiment): Promise<Experiment | undefined> {
    const current = this.#items.get(id);
    if (!current) return undefined;
    const updated: Experiment = {
      ...current,
      title: input.title ?? current.title,
      description: input.description ?? current.description,
      status: input.status ?? current.status,
      id,
      updatedAt: new Date().toISOString()
    };
    this.#items.set(id, updated);
    return updated;
  }
  async delete(id: string): Promise<boolean> { return this.#items.delete(id); }
}
