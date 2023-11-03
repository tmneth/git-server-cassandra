import client from "../dbclient";

export const addStar = async (
  repository_id: string,
  user_id: string,
  starred_on: string,
  owner_id: string,
  name: string
) => {
  const queries = [
    {
      query:
        "INSERT INTO stars_by_repository (repository_id, user_id, starred_on) VALUES (?, ?, ?)",
      params: [repository_id, user_id, starred_on],
    },
    {
      query:
        "INSERT INTO stars_by_user (user_id, owner_id , repository_id, name) VALUES (?, ?, ?, ?)",
      params: [user_id, owner_id, repository_id, name],
    },
  ];

  await client.batch(queries, {
    prepare: true,
  });
};

export const removeStar = async (repository_id: string, user_id: string) => {
  const queries = [
    {
      query:
        "DELETE FROM stars_by_repository WHERE repository_id = ? AND user_id = ?",
      params: [repository_id, user_id],
    },
    {
      query:
        "DELETE FROM stars_by_user WHERE user_id = ? AND repository_id = ?",
      params: [user_id, repository_id],
    },
  ];

  await client.batch(queries, {
    prepare: true,
  });
};

export const getStarsByRepository = async (repository_id: string) => {
  const query = "SELECT * FROM stars_by_repository WHERE repository_id = ?";

  const { rows: repositories } = await client.execute(query, [repository_id], {
    prepare: true,
  });
  return repositories;
};

export const getStarsByUser = async (user_id: string) => {
  const query = "SELECT * FROM stars_by_user WHERE user_id = ?";

  const { rows: users } = await client.execute(query, [user_id], {
    prepare: true,
  });
  return users;
};
