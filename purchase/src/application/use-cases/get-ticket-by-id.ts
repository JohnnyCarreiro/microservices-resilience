import { EventRepository } from "@/domain/repository/event-repository";
import { TicketRepository } from "@/domain/repository/ticket-repository";

export class GetTicketById {
  constructor(
    private ticketRepository: TicketRepository,
    private eventRepository: EventRepository,
  ) {}

  async execute(ticketCode: string): Promise<Output> {
    const ticket = await this.ticketRepository.findById(ticketCode);
    const event = await this.eventRepository.findByCode(ticket.eventCode);
    return {
      eventName: event.name,
      ticketCode: ticket.id,
      total: ticket.total,
      status: ticket.getStatus(),
    };
  }
}

type Output = {
  eventName: string;
  ticketCode: string;
  total: number;
  status: string;
};
