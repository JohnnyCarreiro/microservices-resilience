import { TicketRepository } from "@/domain/repository/ticket-repository";

export class ConfirmTicket {
  constructor(private ticketRepository: TicketRepository) {}

  async execute(code: string): Promise<void> {
    console.log("Ticket to Approve:", code);
    const ticket = await this.ticketRepository.findById(code);
    ticket.confirmPayment();
    console.log("Ticket:", ticket);
    await this.ticketRepository.update(ticket);
  }
}
