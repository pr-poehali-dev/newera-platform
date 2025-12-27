ALTER TABLE t_p51465160_newera_platform.users 
ADD COLUMN IF NOT EXISTS first_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS last_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS photo_url TEXT;

CREATE INDEX IF NOT EXISTS idx_users_telegram_id ON t_p51465160_newera_platform.users(telegram_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON t_p51465160_newera_platform.users(email);
