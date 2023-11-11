import { randomUUID } from "node:crypto";
import { Event } from "./event";

export class Ticket {
  readonly id: string;
  readonly participantName: string;
  readonly participantEmail: string;
  readonly eventCode: string;
  readonly total: number;
  private status: string;

  constructor(
    participantName: string,
    participantEmail: string,
    event: Event,
    id?: string,
  ) {
    this.id = id ?? randomUUID();
    this.participantName = participantName;
    this.participantEmail = participantEmail;
    this.eventCode = event.code;
    this.total = event.price;
    this.status = "waiting_payment";
  }

  getStatus(): string {
    return this.status;
  }
}
