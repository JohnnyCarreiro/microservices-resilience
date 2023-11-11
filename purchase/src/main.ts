import { Event } from "@/domain/entities/event";
import { PurchaseTicket } from "./application/use-cases/purchase-ticket";
import { TicketMemoryRepository } from "./infra/repository/ticket-memory-repository";
import { EventMemoryRepository } from "./infra/repository/event-memory-repository";
import { GetTicketById } from "./application/use-cases/get-ticket-by-id";
import { ExpressAdapter } from "./infra/http/express-adapter";

const httpServer = new ExpressAdapter();
const ticketRepository = new TicketMemoryRepository();
const eventRepository = new EventMemoryRepository();
const purchaseTicket = new PurchaseTicket(ticketRepository, eventRepository);
const getTicketById = new GetTicketById(ticketRepository, eventRepository);
eventRepository.save(new Event("Event Name", 100, "event_001"));

httpServer.on("post", "/purchases", async (params: any, data: any) => {
  await purchaseTicket.execute(data);
});

httpServer.on<{ code: string }, any>(
  "get",
  "/tickets/:code",
  async (params: any, data: any) => {
    const output = await getTicketById.execute(params.code);
    return output;
  },
);

httpServer.listen(3000);
