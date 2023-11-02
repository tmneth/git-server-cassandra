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
router.get("/:repoId", getRepository);
router.get("/user/:userId", getUserRepositories);
router.delete("/:repoId", deleteRepository);

export default router;
