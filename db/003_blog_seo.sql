-- Blog posts: search and AI-answer fields for the website admin editor.
--
-- Run once in Hostinger phpMyAdmin (database u467768679_mioc, SQL tab)
-- before deploying the version of the website with the SEO editor.
-- Additive only: it adds empty columns to tb_blog_web and changes no
-- existing data.

ALTER TABLE tb_blog_web
    ADD COLUMN slug VARCHAR(191) NULL,
    ADD COLUMN old_slugs TEXT NULL,
    ADD COLUMN meta_title VARCHAR(255) NULL,
    ADD COLUMN meta_description VARCHAR(400) NULL,
    ADD COLUMN focus_keyword VARCHAR(191) NULL,
    ADD COLUMN summary TEXT NULL,
    ADD COLUMN faqs MEDIUMTEXT NULL,
    ADD COLUMN gallery MEDIUMTEXT NULL,
    ADD COLUMN author_name VARCHAR(191) NULL,
    ADD COLUMN reviewer_name VARCHAR(191) NULL,
    ADD COLUMN updated_at DATETIME NULL,
    ADD INDEX tb_blog_web_slug (slug);
