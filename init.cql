CREATE KEYSPACE IF NOT EXISTS git_server WITH REPLICATION = { 'class': 'SimpleStrategy', 'replication_factor': 1 };

USE git_server;

CREATE TABLE IF NOT EXISTS users
(
    user_id UUID,
    username TEXT,
    email TEXT,
    created_at TIMESTAMP,
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS users_by_email
(
    email         TEXT,
    user_id       UUID,
    PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS repositories
(
    repository_id UUID,
    user_id UUID,
    name TEXT,
    description TEXT,
    is_private BOOLEAN,
    created_at TIMESTAMP,
    PRIMARY KEY (repository_id)
);

CREATE TABLE IF NOT EXISTS repositories_by_name
(
    user_id UUID,
    name TEXT,
    repository_id UUID,
    PRIMARY KEY (user_id, name)
);

CREATE TABLE IF NOT EXISTS repositories_by_user
(
    user_id UUID,
    created_at TIMESTAMP,
    repository_id UUID,
    name TEXT,
    PRIMARY KEY (user_id, repository_id)
) WITH CLUSTERING ORDER BY (repository_id DESC);

CREATE TABLE IF NOT EXISTS stars_by_repository
(
    repository_id UUID,
    user_id UUID,
    starred_on TIMESTAMP,
    PRIMARY KEY (repository_id, user_id)
);

CREATE TABLE IF NOT EXISTS stars_by_user
(
    user_id UUID,
    owner_id UUID,
    repository_id UUID,
    name TEXT,
    PRIMARY KEY (user_id, repository_id)
) WITH CLUSTERING ORDER BY (repository_id ASC);