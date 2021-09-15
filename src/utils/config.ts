import { Banker } from "../entities/banker";
import { Client } from "../entities/client";
import { Transaction } from "../entities/transaction";
import { ConnectionOptions } from "typeorm";
import { root } from "./path";

class Config {
  public getConnectionOptions(): ConnectionOptions {
    return {
      type: "sqlite",
      database: `${root}/data/typeorm.sqlite`,
      synchronize: true,
      dropSchema: false,
      logging: false,
      entities: [Banker, Client, Transaction],
    };
  }
}

export default new Config();
