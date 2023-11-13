import axios from "axios";
import { randomUUID } from "node:crypto";

it.skip("should use api request to purchase a new Ticket", async () => {
  const ticketCode = randomUUID();
  await axios.post("http://localhost:3000/purchases", {
    ticketCode,
    participantName: "John Doe",
    participantEmail: "john.doe@acme.com",
    eventCode: "event_001",
    creditCard: {
      token: "tok_1OAkqH2eZvKYlo2CABllC5Jt",
      vendor: "stripe",
    },
  });
  const response = await axios.get(
    `http://localhost:3000/tickets/${ticketCode}`,
  );
  expect(response.data.ticketCode).toBe(ticketCode);
  expect(response.data.status).toBe("approved");
});
