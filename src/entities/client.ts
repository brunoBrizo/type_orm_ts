import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Banker } from "./banker";
import { Transaction } from "./transaction";
import { Person } from "./utils/person";

@Entity("client")
export class Client extends Person {
  @Column({
    type: "numeric",
  })
  balance: number;

  @Column({
    name: "active",
    default: true,
  })
  is_active: boolean;

  @ManyToMany((type) => Banker, {
    cascade: true,
  })
  bankers: Banker[];

  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
