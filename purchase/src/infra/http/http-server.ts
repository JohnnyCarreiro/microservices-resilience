export interface HttpServer {
  on<TParams = any, TData = any, TOutput = any>(
    method: HttpMethod,
    url: string,
    callback: (params?: TParams, data?: TData) => TOutput,
  ): void;
  listen(port: number): void;
}

export type HttpMethod = "get" | "post" | "put" | "delete";
