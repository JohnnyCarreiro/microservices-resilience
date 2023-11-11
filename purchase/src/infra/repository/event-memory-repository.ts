import { Event } from "@/domain/entities/event";
import { EventRepository } from "@/domain/repository/event-repository";

export class EventMemoryRepository implements EventRepository {
  private events: Event[];
  constructor() {
    this.events = [];
  }
  async save(event: Event): Promise<void> {
    this.events.push(event);
  }
  async findByCode(code: string): Promise<Event> {
    const event = this.events.find((event) => event.code === code);
    if (!event) throw new Error("Event not found");
    return event;
  }
}
