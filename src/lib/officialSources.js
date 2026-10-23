/*
 * Official websites the public pages link to as sources: government
 * visa and immigration services and national study portals. Only
 * home pages or long-standing sections, so the links stay valid.
 */

export const OFFICIAL_SOURCES = {
    germany: [
        {
            label: "Study in Germany (DAAD)",
            href: "https://www.study-in-germany.de/en/",
            note: "The DAAD's official guide to studying in Germany.",
        },
        {
            label: "Make it in Germany",
            href: "https://www.make-it-in-germany.com/en/",
            note: "The German Federal Government's portal for students, trainees and skilled workers.",
        },
    ],
    uk: [
        {
            label: "UK Student visa (GOV.UK)",
            href: "https://www.gov.uk/student-visa",
            note: "The UK government's Student visa rules and application.",
        },
        {
            label: "UKCISA",
            href: "https://www.ukcisa.org.uk/",
            note: "The UK Council for International Student Affairs.",
        },
    ],
    canada: [
        {
            label: "Immigration, Refugees and Citizenship Canada",
            href: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
            note: "Canada's official study permit information.",
        },
    ],
    australia: [
        {
            label: "Study Australia",
            href: "https://www.studyaustralia.gov.au/",
            note: "The Australian Government's guide for international students.",
        },
    ],
    ireland: [
        {
            label: "Irish Immigration Service",
            href: "https://www.irishimmigration.ie/",
            note: "Ireland's official study visa information.",
        },
        {
            label: "Education in Ireland",
            href: "https://www.educationinireland.com/en/",
            note: "The Irish Government's guide for international students.",
        },
    ],
    "new-zealand": [
        {
            label: "Immigration New Zealand",
            href: "https://www.immigration.govt.nz/",
            note: "New Zealand's official student visa information.",
        },
    ],
    malta: [
        {
            label: "Identità (Malta)",
            href: "https://identita.gov.mt/",
            note: "The Maltese government agency for residence permits and visas.",
        },
    ],
    usa: [
        {
            label: "EducationUSA",
            href: "https://educationusa.state.gov/",
            note: "The U.S. Department of State's network for international students.",
        },
    ],
};

/** The main sources across the countries students ask about most. */
export const STUDY_ABROAD_SOURCES = [
    OFFICIAL_SOURCES.germany[0],
    OFFICIAL_SOURCES.uk[0],
    OFFICIAL_SOURCES.canada[0],
    OFFICIAL_SOURCES.australia[0],
];

const SLUG_ALIASES = {
    "united-kingdom": "uk",
    "united-states": "usa",
    "united-states-of-america": "usa",
};

/**
 * Sources for a country slug (as in /study-in-uk). A country we have no
 * sources for gets none, so its page hides the section rather than
 * showing other countries' sites under its name.
 */
export function officialSourcesFor(slug) {
    const key = String(slug ?? "").toLowerCase();

    return OFFICIAL_SOURCES[SLUG_ALIASES[key] ?? key] ?? [];
}

const COUNTRY_WORDS = [
    ["germany", /\b(germany|german|ausbildung|studienkolleg)\b/i],
    ["uk", /\b(uk|united kingdom|britain|england|scotland)\b/i],
    ["canada", /\bcanad(a|ian)\b/i],
    ["australia", /\baustralia(n)?\b/i],
    ["ireland", /\b(ireland|irish)\b/i],
    ["new-zealand", /\bnew zealand\b/i],
    ["malta", /\bmalta\b/i],
    ["usa", /\b(usa|united states|america)\b/i],
];

/** The sources for the first country a text names, or the general list. */
export function officialSourcesForText(text) {
    const value = String(text ?? "");
    const match = COUNTRY_WORDS.find(([, pattern]) => pattern.test(value));

    return match ? OFFICIAL_SOURCES[match[0]] : STUDY_ABROAD_SOURCES;
}
