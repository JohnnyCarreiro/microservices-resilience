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

  async update(ticket: Ticket): Promise<void> {
    const existingTicket = await this.findById(ticket.id);
    if (!existingTicket) throw new Error("Ticket no found");
    this.tickets.splice(this.tickets.indexOf(existingTicket), 1, ticket);
  }
  async findById(ticketId: string): Promise<Ticket> {
    const ticket = this.tickets.find((ticket) => ticket.id === ticketId);
    if (!ticket) throw new Error("Ticket not Found");
    return ticket;
  }
}
