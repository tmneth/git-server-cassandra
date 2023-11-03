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
  is_private: boolean,
  created_at: string
) => {
  const queries = [
    {
      query: `
          INSERT INTO repositories (
            repository_id, 
            user_id, 
            name, 
            description, 
            is_private, 
            created_at
          ) VALUES (?, ?, ?, ?, ?, ?)`,
      params: [
        repository_id,
        user_id,
        name,
        description,
        is_private,
        created_at,
      ],
    },
    {
      query: `
          INSERT INTO repositories_by_user (
            user_id, 
            created_at, 
            repository_id, 
            name
          ) VALUES (?, ?, ?, ?)`,
      params: [user_id, created_at, repository_id, name],
    },
  ];

  await client.batch(queries, {
    prepare: true,
  });
};

export const getRepository = async (repository_id: string) => {
  const query = "SELECT * FROM repositories WHERE repository_id = ?";

  const { rows: repository } = await client.execute(query, [repository_id], {
    prepare: true,
  });
  return repository[0];
};

export const getRepositories = async () => {
  const query = "SELECT * FROM repositories";

  const { rows: repositories } = await client.execute(query);
  return repositories;
};

export const getRepositoriesByUser = async (user_id: string) => {
  const query = "SELECT * FROM repositories_by_user WHERE user_id = ?";

  const { rows: repositories } = await client.execute(query, [user_id], {
    prepare: true,
  });

  return repositories;
};

export const deleteRepository = async (
  repository_id: string,
  user_id: string,
  name: string
) => {
  const queries = [
    {
      query: "DELETE FROM repositories WHERE repository_id = ?",
      params: [repository_id],
    },
    {
      query:
        "DELETE FROM repositories_by_user WHERE user_id = ? AND repository_id = ?",
      params: [user_id, repository_id],
    },
    {
      query: "DELETE FROM repositories_by_name WHERE user_id = ? AND name = ?",
      params: [user_id, name],
    },
  ];

  await client.batch(queries, {
    prepare: true,
  });
};
