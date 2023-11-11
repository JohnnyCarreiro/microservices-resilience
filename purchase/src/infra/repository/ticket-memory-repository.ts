import { Ticket } from "@/domain/entities/ticket";
import { TicketRepository } from "@/domain/repository/ticket-repository";

export class TicketMemoryRepository implements TicketRepository {
  private tickets: Ticket[];
  constructor() {
    this.tickets = [];
  }
  async save(ticket: Ticket): Promise<void> {
    this.tickets.push(ticket);
  }
  async findById(ticketId: string): Promise<Ticket> {
    const ticket = this.tickets.find((ticket) => ticket.id === ticketId);
    if (!ticket) throw new Error("Ticket not Found");
    return ticket;
  }
}
