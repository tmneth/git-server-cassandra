import client from "../dbclient";

export const addRepositoryByName = async (
  user_id: string,
  name: string,
  repository_id: string
) => {
  const query =
    "INSERT INTO repositories_by_name (user_id, name, repository_id) VALUES (?, ?, ?) IF NOT EXISTS";

  const { rows: result } = await client.execute(
    query,
    [user_id, name, repository_id],
    {
      prepare: true,
    }
  );
  return result;
};

export const addRepository = async (
  repository_id: string,
  user_id: string,
  name: string,
  description: string,
  stars: number,
  tags: string[],
  is_private: boolean,
  created_at: string
) => {
  const query = `
    INSERT INTO repositories (
      repository_id, 
      user_id, 
      name, 
      description, 
      stars, 
      tags, 
      is_private, 
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const params = [
    repository_id,
    user_id,
    name,
    description,
    stars,
    tags,
    is_private,
    created_at,
  ];

  const { rows: result } = await client.execute(query, params, {
    prepare: true,
  });
  return result;
};

export const getRepository = async (repository_id: string) => {
  const query = "SELECT * FROM repositories WHERE repository_id = ?";

  const { rows: repository } = await client.execute(query, [repository_id], {
    prepare: true,
  });
  return repository;
};

export const getRepositories = async () => {
  const query = "SELECT * FROM repositories";

  const { rows: repositories } = await client.execute(query);
  return repositories;
};

export const deleteRepository = async (repository_id: string) => {
  const query = "DELETE FROM repositories WHERE repository_id = ?";

  const { rows: repositories } = await client.execute(query, [repository_id], {
    prepare: true,
  });
  return repositories;
};
