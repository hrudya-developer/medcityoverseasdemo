-- SEO manager: search and AI-answer edits for any page, and page scores.
--
-- Run once in Hostinger phpMyAdmin (database u467768679_mioc, SQL tab)
-- before deploying the version of the website with the SEO manager.
-- Additive only: two new tables.

CREATE TABLE IF NOT EXISTS web_page_seo (
    path VARCHAR(255) NOT NULL,
    meta_title VARCHAR(255) NULL,
    meta_description VARCHAR(400) NULL,
    focus_keyword VARCHAR(191) NULL,
    og_image VARCHAR(500) NULL,
    og_image_alt VARCHAR(250) NULL,
    summary TEXT NULL,
    faqs MEDIUMTEXT NULL,
    gallery MEDIUMTEXT NULL,
    updated_by VARCHAR(191) NULL,
    updated_at DATETIME NULL,
    PRIMARY KEY (path)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS web_page_audit (
    path VARCHAR(255) NOT NULL,
    page_type VARCHAR(40) NOT NULL DEFAULT '',
    status_code INT NOT NULL DEFAULT 0,
    score INT NOT NULL DEFAULT 0,
    title VARCHAR(300) NULL,
    checks MEDIUMTEXT NULL,
    checked_at DATETIME NOT NULL,
    PRIMARY KEY (path),
    KEY web_page_audit_score (score)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
