import client from "../dbclient";

export const addUserByEmail = async (email: string, user_id: string) => {
  const query =
    "INSERT INTO users_by_email (email, user_id) VALUES (?, ?) IF NOT EXISTS";

  const { rows: result } = await client.execute(query, [email, user_id], {
    prepare: true,
  });
  return result;
};

export const addUser = async (
  user_id: string,
  username: string,
  email: string,
  created_at: string
) => {
  const query =
    "INSERT INTO users (user_id, username, email, created_at) VALUES (?, ?, ?, ?)";

  const { rows: result } = await client.execute(
    query,
    [user_id, username, email, created_at],
    {
      prepare: true,
    }
  );
  return result;
};

export const getUser = async (user_id: string) => {
  const query = "SELECT * FROM users WHERE user_id = ?";

  const { rows: user } = await client.execute(query, [user_id], {
    prepare: true,
  });
  return user;
};

export const getUsers = async () => {
  const query = "SELECT * FROM users";

  const { rows: users } = await client.execute(query);
  return users;
};

export const deleteUser = async (user_id: string) => {
  const query = "DELETE FROM users WHERE user_id = ?";

  const { rows: users } = await client.execute(query, [user_id], {
    prepare: true,
  });
  return users;
};
