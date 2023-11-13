export interface Queue {
  connect(): Promise<void>;
  close(): Promise<void>;
  consume(
    eventName: string,
    callback: (input: any) => Promise<void>,
  ): Promise<void>;
  publish(eventName: string, data: any): Promise<void>;
}
