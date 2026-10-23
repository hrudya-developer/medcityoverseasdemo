-- Website admin: images uploaded from the blog editor.
--
-- Run once in Hostinger phpMyAdmin (database u467768679_mioc, SQL tab)
-- before deploying the version of the website with the blog admin.
-- Additive only: it creates one new table and touches nothing else.
--
-- Who can sign in to /admin is not stored here: it is the ADMIN_EMAILS
-- environment variable in hPanel. Admin sign-in codes reuse the
-- web_login_codes table from 001.

CREATE TABLE IF NOT EXISTS web_media (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    mime VARCHAR(50) NOT NULL,
    width INT NOT NULL DEFAULT 0,
    height INT NOT NULL DEFAULT 0,
    bytes INT NOT NULL DEFAULT 0,
    data MEDIUMBLOB NOT NULL,
    original_name VARCHAR(191) NOT NULL DEFAULT '',
    uploaded_by VARCHAR(191) NOT NULL DEFAULT '',
    created_at DATETIME NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
