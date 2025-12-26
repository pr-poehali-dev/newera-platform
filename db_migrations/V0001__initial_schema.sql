-- Создание таблицы ролей
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    level INTEGER NOT NULL,
    permissions JSONB DEFAULT '{}',
    can_create_discussions BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка системных ролей
INSERT INTO roles (name, display_name, level, can_create_discussions, permissions) VALUES
('founder', 'Основатель', 100, TRUE, '{"all": true}'::jsonb),
('director', 'Руководитель', 90, TRUE, '{"manage_admins": true, "manage_content": true, "manage_users": true}'::jsonb),
('admin', 'Администратор', 80, TRUE, '{"manage_moderators": true, "manage_content": true, "moderate_all": true}'::jsonb),
('moderator', 'Модератор', 70, TRUE, '{"moderate_content": true, "manage_users_limited": true}'::jsonb),
('media_partner', 'Медиа-партнер', 50, FALSE, '{"publish_priority": true, "upload_mods": true}'::jsonb),
('author', 'Автор', 40, FALSE, '{"upload_mods": true, "manage_own_mods": true}'::jsonb),
('authority', 'Авторитет', 30, TRUE, '{"trusted_member": true}'::jsonb),
('veteran', 'Бывалый', 20, FALSE, '{"auto_status": true}'::jsonb),
('settled', 'Освоившийся', 15, FALSE, '{"auto_status": true}'::jsonb),
('user', 'Пользователь', 10, FALSE, '{"auto_status": true}'::jsonb),
('newbie', 'Новичок', 5, FALSE, '{"auto_status": true}'::jsonb)
ON CONFLICT (name) DO NOTHING;

-- Создание таблицы пользователей
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255),
    username VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    role_id INTEGER REFERENCES roles(id),
    auto_status_id INTEGER REFERENCES roles(id),
    total_time_seconds INTEGER DEFAULT 0,
    email_verified BOOLEAN DEFAULT FALSE,
    is_blocked BOOLEAN DEFAULT FALSE,
    telegram_id VARCHAR(100),
    vk_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    session_start TIMESTAMP
);

-- Создание индексов для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role_id);

-- Создание таблицы категорий модификаций
CREATE TABLE IF NOT EXISTS mod_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка стандартных категорий
INSERT INTO mod_categories (name, slug, description) VALUES
('Глобальные сборки', 'global-builds', 'Комплексные модификации, меняющие игру целиком'),
('Транспорт', 'transport', 'Новые автомобили, мотоциклы и другой транспорт'),
('Скины', 'skins', 'Скины персонажей и NPC'),
('Скрипты', 'scripts', 'Игровые скрипты и механики'),
('Карты', 'maps', 'Новые локации и модификации карты'),
('Оружие', 'weapons', 'Модификации оружия'),
('Графика', 'graphics', 'Улучшения графики и визуальных эффектов')
ON CONFLICT (slug) DO NOTHING;

-- Создание таблицы версий игр
CREATE TABLE IF NOT EXISTS game_versions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    short_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка версий GTA
INSERT INTO game_versions (name, short_name) VALUES
('Grand Theft Auto V', 'GTA V'),
('Grand Theft Auto IV', 'GTA IV'),
('Grand Theft Auto: San Andreas', 'GTA SA'),
('Grand Theft Auto: Vice City', 'GTA VC'),
('Grand Theft Auto III', 'GTA III')
ON CONFLICT (name) DO NOTHING;

-- Создание таблицы модификаций
CREATE TABLE IF NOT EXISTS mods (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    full_description TEXT,
    author_id INTEGER REFERENCES users(id),
    category_id INTEGER REFERENCES mod_categories(id),
    game_version_id INTEGER REFERENCES game_versions(id),
    price INTEGER DEFAULT 0,
    is_free BOOLEAN DEFAULT TRUE,
    download_url TEXT,
    video_url TEXT,
    version VARCHAR(50),
    system_requirements TEXT,
    rating DECIMAL(3,2) DEFAULT 0.0,
    downloads_count INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_mods_slug ON mods(slug);
CREATE INDEX IF NOT EXISTS idx_mods_author ON mods(author_id);
CREATE INDEX IF NOT EXISTS idx_mods_category ON mods(category_id);
CREATE INDEX IF NOT EXISTS idx_mods_published ON mods(is_published);

-- Создание таблицы изображений модификаций
CREATE TABLE IF NOT EXISTS mod_images (
    id SERIAL PRIMARY KEY,
    mod_id INTEGER REFERENCES mods(id),
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_mod_images_mod ON mod_images(mod_id);

-- Создание таблицы покупок
CREATE TABLE IF NOT EXISTS purchases (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    mod_id INTEGER REFERENCES mods(id),
    amount INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'completed',
    payment_method VARCHAR(100),
    transaction_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, mod_id)
);

CREATE INDEX IF NOT EXISTS idx_purchases_user ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_mod ON purchases(mod_id);

-- Создание таблицы отзывов
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    mod_id INTEGER REFERENCES mods(id),
    user_id INTEGER REFERENCES users(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(mod_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_reviews_mod ON reviews(mod_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);

-- Создание таблицы постов на стене
CREATE TABLE IF NOT EXISTS wall_posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    content TEXT NOT NULL,
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_wall_posts_user ON wall_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_wall_posts_created ON wall_posts(created_at DESC);

-- Создание таблицы комментариев к постам
CREATE TABLE IF NOT EXISTS wall_comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES wall_posts(id),
    user_id INTEGER REFERENCES users(id),
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_wall_comments_post ON wall_comments(post_id);

-- Создание таблицы обсуждений
CREATE TABLE IF NOT EXISTS discussions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    author_id INTEGER REFERENCES users(id),
    content TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_locked BOOLEAN DEFAULT FALSE,
    views_count INTEGER DEFAULT 0,
    replies_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_discussions_slug ON discussions(slug);
CREATE INDEX IF NOT EXISTS idx_discussions_author ON discussions(author_id);

-- Создание таблицы ответов в обсуждениях
CREATE TABLE IF NOT EXISTS discussion_replies (
    id SERIAL PRIMARY KEY,
    discussion_id INTEGER REFERENCES discussions(id),
    user_id INTEGER REFERENCES users(id),
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_discussion_replies_discussion ON discussion_replies(discussion_id);

-- Создание таблицы личных сообщений
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id),
    receiver_id INTEGER REFERENCES users(id),
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);

-- Создание таблицы настроек витрины
CREATE TABLE IF NOT EXISTS showcase_settings (
    id SERIAL PRIMARY KEY,
    section_name VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255),
    description TEXT,
    featured_mod_ids INTEGER[],
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);