import { Router } from "express";
import bankerController from "../controllers/banker_controller";

const router = Router();
router.get("/", bankerController.getAll);
router.post("/", bankerController.create);
router.put("/:bankerId/client/:clientId", bankerController.connectToClient);
router.delete("/", bankerController.delete);

export default router;
