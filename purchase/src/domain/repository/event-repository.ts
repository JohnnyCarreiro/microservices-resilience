import { Event } from "../entities/event";

export interface EventRepository {
  save(event: Event): Promise<void>;
  findByCode(code: string): Promise<Event>;
}
