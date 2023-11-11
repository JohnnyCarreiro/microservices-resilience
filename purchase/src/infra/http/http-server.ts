export interface HttpServer {
  on<TParams = any, TData = any>(
    method: HttpMethod,
    url: string,
    callback: (params?: TParams, data?: TData) => void,
  ): void;
  listen(port: number): void;
}

export type HttpMethod = "get" | "post" | "put" | "delete";
