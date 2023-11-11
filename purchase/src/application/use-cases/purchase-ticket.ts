import { Ticket } from "@/domain/entities/ticket";
import { EventRepository } from "@/domain/repository/event-repository";
import { TicketRepository } from "@/domain/repository/ticket-repository";

export class PurchaseTicket {
  constructor(
    private ticketRepository: TicketRepository,
    private eventRepository: EventRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const event = await this.eventRepository.findByCode(input.eventCode);
    const ticket = new Ticket(
      input.participantName,
      input.participantEmail,
      event,
    );
    await this.ticketRepository.save(ticket);
    return {
      ticketCode: ticket.id,
    };
  }
}

type Input = {
  participantName: string;
  participantEmail: string;
  eventCode: string;
  creditCard: {
    token: string;
    vendor: string;
  };
};

type Output = {
  ticketCode: string;
};
