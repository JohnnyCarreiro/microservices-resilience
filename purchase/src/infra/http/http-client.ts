export interface HttpClient {
  get<TOutput = any>(url: string): Promise<TOutput>;
  post<TData = any, TOutput = any>(url: string, data: TData): Promise<TOutput>;
}
