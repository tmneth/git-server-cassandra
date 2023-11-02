import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import * as repositoryQueries from "../db/repository.queries";
import * as userQueries from "../db/user.queries";

export const addRepository = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user_id, name, description, tags, is_private } = req.body;

    if (!user_id || !name) {
      res.status(400).json({ message: "Required fields are missing." });
      return;
    }

    const user = await userQueries.getUser(user_id);
    if (!user.length) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const repository_id = uuidv4();
    const created_at = new Date().toISOString();
    const stars = 0;

    try {
      const nameInsertResult = await repositoryQueries.addRepositoryByName(
        user_id,
        name,
        repository_id
      );

      if (!nameInsertResult[0]["[applied]"]) {
        throw new Error("A repository with the given name already exists.");
      }
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(409).json({ message: error.message });
      return;
    }

    await repositoryQueries.addRepository(
      repository_id,
      user_id,
      name,
      description,
      stars,
      tags,
      is_private,
      created_at
    );

    await repositoryQueries.addRepositoryForUser(
      user_id,
      repository_id,
      name,
      created_at
    );

    res
      .status(201)
      .json({ message: "Repository added successfully.", repository_id });
  } catch (error) {
    console.error("Error adding repository:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const getRepository = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const repository_id = req.params.id;

    if (!repository_id) {
      res.status(400).json({ message: "Repository ID is missing." });
      return;
    }

    const repository = await repositoryQueries.getRepository(repository_id);
    if (!repository.length) {
      res.status(404).json({ message: "Repository not found." });
      return;
    }

    if (repository) {
      res.status(200).json(repository);
    } else {
      res.status(404).json({ message: "Repository not found." });
    }
  } catch (error) {
    console.error("Error fetching repository:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const getUserRepositories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user_id = req.params.userId;

    if (!user_id) {
      res.status(400).json({ message: "User ID is missing." });
      return;
    }

    const user = await userQueries.getUser(user_id);
    if (!user.length) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const repositories = await repositoryQueries.getRepositoriesByUser(user_id);

    if (repositories) {
      res.status(200).json(repositories);
    } else {
      res.status(404).json({ message: "Repositories not found." });
    }
  } catch (error) {
    console.error("Error fetching repositories:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const getRepositories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const repositories = await repositoryQueries.getRepositories();

    res.status(200).json(repositories);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteRepository = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const repository_id = req.params.id;

    if (!repository_id) {
      res.status(400).json({ message: "Repository ID is missing." });
      return;
    }

    const repository = await repositoryQueries.getRepository(repository_id);

    if (!repository.length) {
      res.status(404).json({ message: "Repository not found." });
      return;
    }

    await repositoryQueries.deleteRepository(repository_id);
    res.status(200).json({ message: "Repository deleted successfully." });
  } catch (error) {
    console.error("Error deleting repository", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
