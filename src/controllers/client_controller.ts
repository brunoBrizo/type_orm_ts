import { Request, Response } from "express";
import { Transaction } from "../entities/transaction";
import { Client } from "../entities/client";
import { createQueryBuilder } from "typeorm";

class ClientController {
  public async fetch(req: Request, res: Response) {
    try {
      const clients = await createQueryBuilder("client")
        .select("client.first_name")
        .from(Client, "client")
        //    .leftJoinAndSelect("client.transactions", "transaction")
        .where("client.id > 0")
        .getOne();

      return res.json(clients);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const response = await Client.delete(id);
    return res.status(200).json();
  }

  public async create(req: Request, res: Response) {
    try {
      const { first_name, last_name, email, card_number, balance } = req.body;
      const client = Client.create({
        first_name,
        last_name,
        email,
        card_number,
        balance,
      });
      await client.save();
      return res.status(201).json({
        client,
      });
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  }

  public async createTransaction(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const client = await Client.findOne(id);
      if (!client) {
        return res.status(400).json({
          msg: "Client not found",
        });
      }
      const { type, amount } = req.body;
      const transaction = Transaction.create({
        amount,
        type,
        client,
      });
      await transaction.save();
      if (transaction.type === "withdraw") {
        client.balance -= transaction.amount;
      } else {
        client.balance += transaction.amount;
      }
      await client.save();
      return res.status(201).json({
        id: transaction.id,
      });
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  }

  // const bankers = await createQueryBuilder(
  // 	'banker'
  // )
  // 	.where('id = :bankerId', { bankerId: 2 })
  // 	.getOne();

  // const clients = await createQueryBuilder(
  // 	'client'
  // )
  // 	.select('client')
  // 	.from(Client, 'client')
  // 	.leftJoinAndSelect(
  // 		'client.transactions',
  // 		'transaction'
  // 	)
  // 	.where('client.id = :clientId', {
  // 		clientId: 3,
  // 	})
  // 	.getOne();
}

export default new ClientController();
