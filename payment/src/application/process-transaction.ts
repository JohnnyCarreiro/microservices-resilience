export class ProcessTransaction {
  async execute(input: Input): Promise<Output> {
    return {
      ticketCode: input.ticketCode,
      success: true,
    };
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