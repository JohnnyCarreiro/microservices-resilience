import express from "express";
import type {
  Express,
  Request,
  Response,
  NextFunction,
  IRouterMatcher,
} from "express";
import { HttpMethod, HttpServer } from "./http-server";

export class ExpressAdapter implements HttpServer {
  app: Express;
  constructor() {
    this.app = express();
    this.app.use(express.json());
  }
  on<TParams = any, TData = any, TOutput = any>(
    method: HttpMethod,
    url: string,
    callback: (params?: TParams, data?: TData) => TOutput,
  ): void {
    (this.app[method] as IRouterMatcher<this>)(
      url,
      async (req: Request, res: Response, next: NextFunction) => {
        const output = await callback(req.params as TParams, req.body);
        res.json(output);
        next();
      },
    );
  }
  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`🚀 Server is listening on port ${port}`);
    });
  }
}
