-- Drop and recreate maps table
DROP TABLE IF EXISTS maps CASCADE;
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_date DATE DEFAULT NOW(),
  delete_status BOOLEAN DEFAULT FALSE,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
  );
