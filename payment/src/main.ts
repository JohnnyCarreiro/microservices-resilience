import { ProcessTransaction } from "./application/process-transaction";
import { PaymentQueueConsumer } from "./infra/consumer/queue/payment-queue-consumer";
import { ExpressAdapter } from "./infra/http/express-adapter";
import { RabbitMQAdapter } from "./infra/queue/rabbit_mq_adapter";

(async function init() {
  const httpServer = new ExpressAdapter();
  const queue = new RabbitMQAdapter();
  await queue.connect();
  const processTransaction = new ProcessTransaction(queue);
  new PaymentQueueConsumer(queue, processTransaction);

  httpServer.on("post", "/transactions", async (params: any, data: any) => {
    const output = await processTransaction.execute(data);
    return output;
  });

  httpServer.listen(3001);
})();
