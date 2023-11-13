import { Queue } from "@/infra/queue/queue";

export class ProcessTransaction {
  constructor(private queue: Queue) {}
  async execute(input: Input): Promise<void> {
    console.log("Purchase to Process", input);
    await this.queue.publish("transactionApproved", {
      ticketCode: input.ticketCode,
      success: true,
    });
  }
}

type Input = {
  ticketCode: string;
  price: number;
  creditCard: {
    token: string;
    vendor: string;
  };
};

type Output = {
  ticketCode: string;
  success: boolean;
};
