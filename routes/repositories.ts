import express, { Router } from "express";

const router: Router = express.Router();

import {
  addRepository,
  getRepository,
  getRepositories,
  getUserRepositories,
  deleteRepository,
  starRepository,
  getStarsByRepository,
  unstarRepository,
} from "../controllers/repositories";

router.post("/", addRepository);
router.delete("/", deleteRepository);
router.get("/", getRepositories);
router.get("/:repository_id", getRepository);
router.get("/user/:user_id", getUserRepositories);

router.post("/:repository_id/star/", starRepository);
router.delete("/:repository_id/unstar", unstarRepository);
router.get("/:repository_id/stars/", getStarsByRepository);

export default router;
