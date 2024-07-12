import { Router } from "express";
const router = Router();

import {
  getAllDesks,
  getDesk,
  deleteDesk,
  updateDesk,
  createDesk,
} from "../controllers/deskController.js";

//router.get('/',getAllDesks)

router.route("/").get(getAllDesks).post(createDesk);
router.route("/:id").get(getDesk).patch(updateDesk).delete(deleteDesk);

export default router;
