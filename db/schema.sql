DROP DATABASE dalp_museum;
CREATE DATABASE dalp_museum;

\c dalp_museum

DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS faves CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username TEXT UNIQUE,
  password_digest VARCHAR(255),
  fname TEXT,
  lname TEXT
);

-- CREATE TABLE faves (
--   faves_id SERIAL PRIMARY KEY,
--   user_id INTEGER REFERENCES users(user_id),
--   museum_id VARCHAR(255)
-- );

CREATE TABLE comments (
  comments_id SERIAL PRIMARY KEY,
  museum_id VARCHAR(255),
  comments TEXT,
  rating INTEGER DEFAULT 0,
  user_id INTEGER REFERENCES users(user_id),
  isfave BOOLEAN DEFAULT false
);
