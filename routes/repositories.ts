import express, { Router } from "express";

const router: Router = express.Router();

import {
  addRepository,
  getRepository,
  getRepositories,
  getUserRepositories,
  deleteRepository,
} from "../controllers/repositories";

router.post("/", addRepository);
router.get("/", getRepositories);
router.get("/:id", getRepository);
router.get("/user/:userId", getUserRepositories);
router.delete("/:id", deleteRepository);

export default router;
