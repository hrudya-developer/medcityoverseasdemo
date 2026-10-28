-- Events and webinars on medcityoverseas.com, with their registrations.
--
-- Run once in Hostinger phpMyAdmin (database u467768679_mioc, SQL tab)
-- before deploying the version of the website with events. It creates
-- two tables and adds the UK nursing webinar of 5 November 2026.

CREATE TABLE IF NOT EXISTS web_events (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(191) NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255) NULL,
    summary TEXT NULL,
    description MEDIUMTEXT NULL,
    starts_at DATETIME NOT NULL,
    duration_minutes INT NOT NULL DEFAULT 60,
    mode VARCHAR(20) NOT NULL DEFAULT 'online',
    venue VARCHAR(255) NULL,
    poster VARCHAR(500) NULL,
    poster_alt VARCHAR(255) NULL,
    contact_phone VARCHAR(32) NULL,
    popup_enabled TINYINT(1) NOT NULL DEFAULT 0,
    registration_open TINYINT(1) NOT NULL DEFAULT 1,
    status TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    UNIQUE KEY web_events_slug (slug),
    KEY web_events_starts (status, starts_at)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS web_event_registrations (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    name VARCHAR(191) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    email VARCHAR(191) NULL,
    qualification VARCHAR(100) NULL,
    city VARCHAR(100) NULL,
    source VARCHAR(20) NOT NULL DEFAULT 'page',
    ip VARCHAR(64) NULL,
    created_at DATETIME NULL,
    UNIQUE KEY web_event_registrations_phone (event_id, phone),
    KEY web_event_registrations_event (event_id, created_at)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO web_events
    (slug, title, subtitle, summary, description, starts_at, duration_minutes, mode, venue,
     poster, poster_alt, contact_phone, popup_enabled, registration_open, status, created_at, updated_at)
SELECT
    'uk-nursing-jobs-2027-webinar',
    'UK Nursing Jobs 2027: Free Live Webinar',
    'Jobs? Higher studies? Career growth? Discover your opportunities in the UK, with or without IELTS.',
    'A free live webinar by Medcity Study Abroad for Kerala nurses planning a nursing career in the UK in 2027. Learn the routes, the English test options and the steps, and ask our counsellors your questions.',
    '<p>Planning a nursing career in the UK? Join our free live webinar on 5 November 2026 at 7:00 PM (India time) and get expert guidance from the Medcity Study Abroad team.</p><h2>What we will cover</h2><ul><li>The routes for Indian nurses to work or study in the UK in 2027</li><li>English test options: IELTS and OET, both accepted by the UK Nursing and Midwifery Council</li><li>Higher studies, including the UK pre-registration MSc nursing route</li><li>The steps, documents and timeline</li><li>Your questions, answered live</li></ul><h2>Who should attend</h2><p>GNM and BSc nurses, nursing students and their families from Kerala.</p><p>Register below. We will send the joining link to your phone before the webinar. Terms and conditions apply.</p>',
    '2026-11-05 19:00:00',
    60,
    'online',
    'Online (live webinar)',
    '/events/uk-nursing-jobs-2027-webinar.webp',
    'UK Nursing Jobs 2027 free live webinar by Medcity Study Abroad on 5 November 2026 at 7 PM',
    '+91 90729 82555',
    1,
    1,
    1,
    NOW(),
    NOW()
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM web_events WHERE slug = 'uk-nursing-jobs-2027-webinar');
