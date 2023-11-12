import { Ticket } from "@/domain/entities/ticket";
import { EventRepository } from "@/domain/repository/event-repository";
import { TicketRepository } from "@/domain/repository/ticket-repository";
import { PaymentGateway } from "@/infra/gateway/payment-gateway";

export class PurchaseTicket {
  constructor(
    private ticketRepository: TicketRepository,
    private eventRepository: EventRepository,
    private paymentGateway: PaymentGateway,
  ) {}

  async execute(input: Input): Promise<void> {
    const event = await this.eventRepository.findByCode(input.eventCode);
    const ticket = new Ticket(
      input.participantName,
      input.participantEmail,
      event,
      input.ticketCode,
    );
    const paymentOutput = await this.paymentGateway.execute({
      ticketCode: ticket.id,
      price: event.price,
      creditCard: {
        token: input.creditCard.token,
        vendor: input.creditCard.vendor,
      },
    });
    if (paymentOutput.success) {
      ticket.confirmPayment();
      await this.ticketRepository.save(ticket);
    } else {
      throw new Error("Payment Rejected");
    }
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
