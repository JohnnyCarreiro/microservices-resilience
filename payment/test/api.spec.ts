import axios from "axios";
import { randomUUID } from "node:crypto";

it("should make a  Payment via API", async () => {
  const ticketCode = randomUUID();
  const output = await axios.post("http://localhost:3001/transaction", {
    ticketCode,
    price: 100,
    creditCard: {
      token: "tok_1OAkqH2eZvKYlo2CABllC5Jt",
      vendor: "stripe",
    },
  });
  expect(output.data.ticketCode).toBe(ticketCode);
  expect(output.data.success).toBe(true);
});
