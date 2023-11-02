import express, { Router } from "express";

const router: Router = express.Router();

import {
  addRepository,
  getRepository,
  getRepositories,
  deleteRepository,
} from "../controllers/repositories";

router.post("/", addRepository);
router.get("/", getRepositories);
router.get("/:id", getRepository);
router.delete("/:id", deleteRepository);

export default router;
