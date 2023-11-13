import axios from "axios";
import { randomUUID } from "node:crypto";

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), time);
  });
}

it("should use api request to purchase a new Ticket", async () => {
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
  await sleep(500);
  const response = await axios.get(
    `http://localhost:3000/tickets/${ticketCode}`,
  );
  expect(response.data.ticketCode).toBe(ticketCode);
  expect(response.data.status).toBe("approved");
});
