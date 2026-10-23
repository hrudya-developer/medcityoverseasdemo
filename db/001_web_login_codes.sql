-- Login codes for the website's email sign-in.
--
-- Run once in Hostinger phpMyAdmin (database u467768679_mioc, SQL tab)
-- before deploying the version of the website that uses it.
-- Additive only: it creates one new table and touches nothing else.
--
-- Codes are stored as SHA-256 hashes, expire after 10 minutes and allow
-- at most 5 wrong attempts. The old tb_students.otp column is no longer
-- used by the website.

CREATE TABLE IF NOT EXISTS web_login_codes (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    email VARCHAR(191) NOT NULL,
    code_hash CHAR(64) NOT NULL,
    attempts INT NOT NULL DEFAULT 0,
    expires_at DATETIME NOT NULL,
    created_at DATETIME NOT NULL,
    ip VARCHAR(64) NOT NULL DEFAULT '',
    PRIMARY KEY (id),
    KEY web_login_codes_email (email),
    KEY web_login_codes_ip_created (ip, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
