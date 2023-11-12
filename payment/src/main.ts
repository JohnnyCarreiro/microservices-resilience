import { ProcessTransaction } from "./application/process-transaction";
import { ExpressAdapter } from "./infra/http/express-adapter";

const httpServer = new ExpressAdapter();

const processTransaction = new ProcessTransaction();

httpServer.on("post", "/transactions", async (params: any, data: any) => {
  const output = await processTransaction.execute(data);
  return output;
});

httpServer.listen(3001);
