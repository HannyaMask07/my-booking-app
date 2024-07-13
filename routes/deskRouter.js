import { Router } from "express";
const router = Router();

import {
  getAllDesks,
  getDesk,
  deleteDesk,
  updateDesk,
  createDesk,
  BookDesk,
  getUserBookedDesk,
} from "../controllers/deskController.js";
import {
  validateDeskInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

//router.get('/',getAllDesks)
router.route("/booked").get(getUserBookedDesk);
router.route("/").get(getAllDesks).post(createDesk, validateDeskInput);

router
  .route("/:id")
  .get(validateIdParam, getDesk)
  .patch(validateIdParam, updateDesk)
  .delete(validateIdParam, deleteDesk);

router.patch("/:id/book", validateIdParam, BookDesk);

export default router;
