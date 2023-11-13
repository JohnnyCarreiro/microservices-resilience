import { ConfirmTicket } from "@/application/use-cases/confirm-ticket";
import { Queue } from "../queue/queue";
import { PurchaseTicket } from "@/application/use-cases/purchase-ticket";

export class TicketConsumer {
  constructor(
    private queue: Queue,
    private confirmTicket: ConfirmTicket,
    private purchaseTicket: PurchaseTicket,
  ) {
    this.queue.consume("transactionApproved", async (msg: any) => {
      try {
        await this.confirmTicket.execute(msg.ticketCode);
      } catch (error) {
        console.log((error as Error).message);
      }
    });

    this.queue.consume("purchaseTicket", async (msg: any) => {
      try {
        await this.purchaseTicket.execute(msg);
      } catch (error) {
        console.log((error as Error).message);
      }
    });
  }
}
