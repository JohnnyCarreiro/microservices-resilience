import axios from "axios";
import { HttpClient } from "./http-client";

export class AxiosHttpClient implements HttpClient {
  get<TOutput = any>(url: string): Promise<TOutput> {
    throw new Error("Method not implemented.");
  }
  async post<TData = any, TOutput = any>(
    url: string,
    data: TData,
  ): Promise<TOutput> {
    return await axios.post(url, data);
  }
}
