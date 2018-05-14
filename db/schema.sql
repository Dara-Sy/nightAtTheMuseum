DROP DATABASE dalp_museum;
CREATE DATABASE dalp_museum;

\c dalp_museum

DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS favemuseum CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username TEXT UNIQUE,
  password_digest VARCHAR(255),
  fname TEXT,
  lname TEXT
);

CREATE TABLE comments (
  comments_id SERIAL PRIMARY KEY,
  museum_id VARCHAR(255),
  museum_location TEXT,
  comments TEXT,
  rating TEXT,
  user_id INTEGER REFERENCES users(user_id),
  isfave BOOLEAN DEFAULT false
);

CREATE TABLE favemuseums (
museum_id TEXT PRIMARY KEY,
name TEXT,
address TEXT,
user_id INTEGER REFERENCES users(user_id)
);
