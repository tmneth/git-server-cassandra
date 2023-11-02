import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import * as userQueries from "../db/user.queries";

export const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      res.status(400).json({ message: "Required fields are missing." });
      return;
    }

    const user_id = uuidv4();
    const created_at = new Date().toISOString();

    try {
      const emailInsertResult = await userQueries.addUserByEmail(
        email,
        user_id
      );

      if (!emailInsertResult[0]["[applied]"]) {
        throw new Error("A user with the given email already exists.");
      }
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(409).json({ message: error.message });
      return;
    }

    await userQueries.addUser(user_id, username, email, created_at);
    res.status(201).json({ message: "User added successfully." });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id = req.params.id;

    if (!user_id) {
      res.status(400).json({ message: "User ID is missing." });
      return;
    }

    const user = await userQueries.getUser(user_id);
    if (!user.length) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userQueries.getUsers();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user_id = req.params.id;

    if (!user_id) {
      res.status(400).json({ message: "User ID is missing." });
      return;
    }

    const user = await userQueries.getUser(user_id);
    if (!user.length) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    await userQueries.deleteUser(user_id);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
