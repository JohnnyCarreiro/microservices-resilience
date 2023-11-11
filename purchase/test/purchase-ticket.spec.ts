import { Event } from "@/domain/entities/event";
import { GetTicketById } from "@/application/use-cases/get-ticket-by-id";
import { PurchaseTicket } from "@/application/use-cases/purchase-ticket";
import { EventMemoryRepository } from "@/infra/repository/event-memory-repository";
import { TicketMemoryRepository } from "@/infra/repository/ticket-memory-repository";

it("should purchase a Ticket", async () => {
  const ticketRepository = new TicketMemoryRepository();
  const eventRepository = new EventMemoryRepository();
  const eventCode = "event_001";
  eventRepository.save(new Event("Event Name", 100, "event_001"));
  const purchaseTicket = new PurchaseTicket(ticketRepository, eventRepository);
  const input = {
    participantName: "John Doe",
    participantEmail: "john.doe@acme.com",
    eventCode,
    creditCard: {
      token: "tok_1OAkqH2eZvKYlo2CABllC5Jt",
      vendor: "stripe",
    },
  };
  const { ticketCode } = await purchaseTicket.execute(input);
  const getTicketById = new GetTicketById(ticketRepository, eventRepository);
  const output = await getTicketById.execute(ticketCode);
  expect(output.ticketCode).toBe(ticketCode);
  expect(output.total).toBe(100);
  expect(output.status).toBe("waiting_payment");
  expect(output.eventName).toBe("Event Name");
});
