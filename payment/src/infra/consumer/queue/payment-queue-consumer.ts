import { ProcessTransaction } from "@/application/process-transaction";
import { Queue } from "@/infra/queue/queue";

export class PaymentQueueConsumer {
  constructor(
    private queue: Queue,
    private processTransaction: ProcessTransaction,
  ) {
    this.queue.consume("ticketPurchased", async (msg: any) => {
      await this.processTransaction.execute(msg);
    });
  }
}
