-- Apply once to databases created before age was added to registration.
-- Existing account ages remain NULL; new registrations must provide a valid age.
USE heroboxd;
ALTER TABLE users ADD COLUMN age TINYINT UNSIGNED NULL AFTER email;
ALTER TABLE users MODIFY COLUMN username VARCHAR(64) NOT NULL;
