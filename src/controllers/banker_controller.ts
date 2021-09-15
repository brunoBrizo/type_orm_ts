import { Request, Response } from "express";
import { Client } from "../entities/client";
import { Banker } from "../entities/banker";

class BankerController {
  public async getAll(req: Request, res: Response) {
    res.status(200).json({
      ok: " ok",
    });
  }

  public async delete(req: Request, res: Response) {}

  public async create(req: Request, res: Response) {
    try {
      const { first_name, last_name, email, card_number, employee_number } =
        req.body;
      const banker = Banker.create({
        first_name,
        last_name,
        email,
        card_number,
        employee_number,
      });
      await banker.save();
      return res.status(201).json({ banker });
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  }

  public async connectToClient(req: Request, res: Response) {
    try {
      const { bankerId, clientId } = req.params;
      const banker = await Banker.findOne(bankerId);
      if (!banker) {
        return res.status(400).json({
          msg: "Banker not found",
        });
      }
      const client = await Client.findOne(clientId);
      if (!client) {
        return res.status(400).json({
          msg: "Client not found",
        });
      }
      banker.clients = [client];
      await banker.save();
      return res.status(201).json({ banker });
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  }
}

export default new BankerController();
