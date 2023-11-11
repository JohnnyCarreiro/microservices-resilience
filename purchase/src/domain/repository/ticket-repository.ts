import { Ticket } from "../entities/ticket";

export interface TicketRepository {
  save(ticket: Ticket): Promise<void>;
  findById(ticketId: string): Promise<Ticket>;
}
