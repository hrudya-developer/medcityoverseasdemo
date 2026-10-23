-- SEO manager: separate SEO, AEO and GEO scores and the main aspect
-- scores for every page.
--
-- Run once in Hostinger phpMyAdmin (database u467768679_mioc, SQL tab)
-- before deploying the version of the website with pillar scores.
-- Additive only: new nullable columns on web_page_audit. Pages checked
-- before this show "Check again" until they are checked again.

ALTER TABLE web_page_audit
    ADD COLUMN score_seo INT NULL AFTER score,
    ADD COLUMN score_aeo INT NULL AFTER score_seo,
    ADD COLUMN score_geo INT NULL AFTER score_aeo,
    ADD COLUMN aspect_scores TEXT NULL AFTER score_geo,
    ADD INDEX web_page_audit_seo (score_seo),
    ADD INDEX web_page_audit_aeo (score_aeo),
    ADD INDEX web_page_audit_geo (score_geo);
