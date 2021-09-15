import { Router } from "express";
import clientController from "../controllers/client_controller";

const router = Router();
router.get("/", clientController.fetch);
router.post("/", clientController.create);
router.post("/:id/transaction", clientController.createTransaction);
router.delete("/:id", clientController.delete);

export default router;
