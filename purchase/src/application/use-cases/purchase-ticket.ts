import { Ticket } from "@/domain/entities/ticket";
import { EventRepository } from "@/domain/repository/event-repository";
import { TicketRepository } from "@/domain/repository/ticket-repository";
import { PaymentGateway } from "@/infra/gateway/payment-gateway";
import { Queue } from "@/infra/queue/queue";

export class PurchaseTicket {
  constructor(
    private ticketRepository: TicketRepository,
    private eventRepository: EventRepository,
    // private paymentGateway: PaymentGateway,
    private queue: Queue,
  ) {}

  async execute(input: Input): Promise<void> {
    const event = await this.eventRepository.findByCode(input.eventCode);
    const ticket = new Ticket(
      input.participantName,
      input.participantEmail,
      event,
      input.ticketCode,
    );
    // const paymentOutput = await this.paymentGateway.execute({
    //   ticketCode: ticket.id,
    //   price: event.price,
    //   creditCard: {
    //     token: input.creditCard.token,
    //     vendor: input.creditCard.vendor,
    //   },
    // });
    await this.ticketRepository.save(ticket);
    this.queue.publish("ticketPurchased", {
      ticketCode: ticket.id,
      price: event.price,
      creditCard: {
        token: input.creditCard.token,
        vendor: input.creditCard.vendor,
      },
    });
    // return {
    //   ticketCode: ticket.id,
    // };
  }
}

type Input = {
  ticketCode?: string;
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
