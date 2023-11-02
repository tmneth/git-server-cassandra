import express, { Router } from "express";

const router: Router = express.Router();

import { addUser, getUser, getUsers, deleteUser } from "../controllers/users";

router.post("/", addUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

export default router;
