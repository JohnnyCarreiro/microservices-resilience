import { HttpClient } from "../http/http-client";

export class PaymentGateway {
  constructor(private httpClient: HttpClient) {}
  async execute(input: Input): Promise<Output> {
    const { data } = await this.httpClient.post<Input, { data: Output }>(
      "http://localhost:3001/transactions",
      input,
    );
    return data;
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
