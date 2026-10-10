-- Apply once to databases created before email password reset was added.
USE heroboxd;
CREATE TABLE IF NOT EXISTS password_reset_tokens (
 token_hash BINARY(32) PRIMARY KEY,
 user_id BIGINT UNSIGNED NOT NULL,
 expires_at DATETIME NOT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT fk_password_reset_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
 INDEX idx_password_reset_user(user_id),
 INDEX idx_password_reset_expiry(expires_at)
) ENGINE=InnoDB;
