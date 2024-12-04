import { Router } from "express";
import { HabitoController } from "../Controllers/HabitoConrtoller";


const router = Router()

router.get("/habitos", HabitoController.getAll)
router.get("/habitos/:id", HabitoController.getById)
router.post("/habitos", HabitoController.create)
router.put("/habitos/:id", HabitoController.update)
router.delete("/habitos/:id", HabitoController.delete)

export default router