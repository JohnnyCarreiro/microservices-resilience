import { Event } from "@/domain/entities/event";
import { PurchaseTicket } from "./application/use-cases/purchase-ticket";
import { TicketMemoryRepository } from "./infra/repository/ticket-memory-repository";
import { EventMemoryRepository } from "./infra/repository/event-memory-repository";
import { GetTicketById } from "./application/use-cases/get-ticket-by-id";
import { ExpressAdapter } from "./infra/http/express-adapter";
import { RabbitMQAdapter } from "./infra/queue/rabbit_mq_adapter";
import { TicketConsumer } from "./infra/consumer/ticket-consumer";
import { ConfirmTicket } from "./application/use-cases/confirm-ticket";

async function init() {
  const httpServer = new ExpressAdapter();
  const queue = new RabbitMQAdapter();
  await queue.connect();
  const ticketRepository = new TicketMemoryRepository();
  const eventRepository = new EventMemoryRepository();
  const purchaseTicket = new PurchaseTicket(
    ticketRepository,
    eventRepository,
    queue,
  );
  new TicketConsumer(
    queue,
    new ConfirmTicket(ticketRepository),
    purchaseTicket,
  );

  const getTicketById = new GetTicketById(ticketRepository, eventRepository);
  eventRepository.save(new Event("Event Name", 100, "event_001"));

  httpServer.on("post", "/purchases", async (params: any, data: any) => {
    // await purchaseTicket.execute(data);
    // Process Ticket purchase could be a command
    await queue.publish("purchaseTicket", data);
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
}

init();
