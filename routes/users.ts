import express, { Router } from "express";

const router: Router = express.Router();

import {
  addUser,
  getUser,
  getUsers,
  deleteUser,
  getStarsByUser,
} from "../controllers/users";

router.post("/", addUser);
router.delete("/:user_id", deleteUser);
router.get("/", getUsers);
router.get("/:user_id", getUser);

router.get("/:user_id/stars/", getStarsByUser);

export default router;
