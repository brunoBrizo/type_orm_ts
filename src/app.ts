import express from "express";
import cors from "cors";
import clientRoutes from "./routes/client_routes";
import bankerRoutes from "./routes/banker_routes";
import config from "./utils/config";
import { createConnection } from "typeorm";

export class App {
  private express: express.Application;
  private port = 8080;

  constructor() {
    this.express = express();
    this.middlewares();
    this.database();
    this.routes();
    this.listen();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private async database() {
    try {
      await createConnection(config.getConnectionOptions());
      console.log("Connected to SQL");
    } catch (error) {
      console.log("Error SQL: " + error);
    }
  }

  private routes(): void {
    this.express.use("/client", clientRoutes);
    this.express.use("/banker", bankerRoutes);
  }

  private listen(): void {
    this.express.listen(this.port, () => {
      console.log("Now running on port 8080");
    });
  }

  public getApp(): express.Application {
    return this.express;
  }
}
