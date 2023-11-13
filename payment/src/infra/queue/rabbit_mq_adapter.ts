import { Queue } from "./queue";
import amqplib from "amqplib";
import type { Connection } from "amqplib";

export class RabbitMQAdapter implements Queue {
  connection: any;

  async connect(): Promise<void> {
    this.connection = await amqplib.connect(
      "amqp://admin:admin@localhost:5672",
    );
  }

  async close(): Promise<void> {
    await (this.connection as Connection).close();
  }

  async consume(
    eventName: string,
    callback: (input: any) => Promise<void>,
  ): Promise<void> {
    const channel = await (this.connection as Connection).createChannel();
    await channel.assertQueue(eventName, { durable: true });
    await channel.consume(eventName, async (msg) => {
      if (msg) {
        const input = JSON.parse(msg.content.toString());
        await callback(input);
        // Check before;
        channel.ack(msg);
      }
    });
  }

  async publish(eventName: string, data: any): Promise<void> {
    const channel = await (this.connection as Connection).createChannel();
    await channel.assertQueue(eventName, { durable: true });
    channel.sendToQueue(eventName, Buffer.from(JSON.stringify(data)));
    // In real Live ensure message delivering;
  }
}
