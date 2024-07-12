import { Router } from "express";
const router = Router();

import {
  getAllDesks,
  getDesk,
  deleteDesk,
  updateDesk,
  createDesk,
} from "../controllers/deskController.js";
import {
  validateDeskInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

//router.get('/',getAllDesks)

router.route("/").get(getAllDesks).post(createDesk, validateDeskInput);
router
  .route("/:id")
  .get(validateIdParam, getDesk)
  .patch(validateIdParam, updateDesk)
  .delete(validateIdParam, deleteDesk);

export default router;
