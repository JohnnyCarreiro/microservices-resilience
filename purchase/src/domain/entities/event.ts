import { randomUUID } from "node:crypto";

export class Event {
  readonly name: string;
  readonly price: number;
  readonly code: string;
  constructor(name: string, price: number, code?: string) {
    this.name = name;
    this.price = price;
    this.code = code ?? randomUUID();
  }
}
