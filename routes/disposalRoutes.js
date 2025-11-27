import { Router } from "express";
const router = Router();
import { createDisposal, fetchDisposed } from "../controllers/disposalController.js";

router.post("/disposal", createDisposal);
router.get("/disposal", fetchDisposed);

export default router;
