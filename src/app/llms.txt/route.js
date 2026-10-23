import { centers, getCenterUrl } from "@/app/(public)/branches/data/centersData";
import { blogPublicSlug } from "@/lib/blogSlug";
import { query } from "@/lib/db";
import { getGermanProgramsList } from "@/lib/germanPrograms";
import { createSlug } from "@/lib/slug";
import { countrySlug, SITE_URL } from "@/lib/sitemapData";

export const dynamic = "force-dynamic";

/*
 * llms.txt: a plain-text guide to the site for AI assistants and answer
 * engines. The fixed part describes Medcity Overseas; the lists of
 * destinations, programmes, guides and branches come from the database
 * and branch data, so they stay current on their own.
 */

const INTRO = `# Medcity Overseas (Medcity Study Abroad)

> Medcity International Overseas Corporation is a study-abroad consultancy headquartered in Kannur, Kerala, India, operating since 2012 under the Medcity Study Abroad and Medcity Overseas brands. It helps students from Kerala and across India choose a course and university abroad and guides them through admissions, student visas, funding and pre-departure, for destinations including Germany, the United Kingdom, Ireland, Australia, Canada and New Zealand.

## About

- Operating since 2012.
- 18 branches across Kerala and in Mangalore.
- Reports guiding 185,000+ students, with 1,500+ partner universities across 50+ countries.
- Chairman: Rahul Chakrapani.
- Part of the Medcity group, which also runs Medcity International Academy (German, IELTS, OET and PTE training) at https://medcityacademy.com.

## Services

- University and course selection counselling based on academic profile, budget and career goals
- University applications and admission documents
- Student visa guidance and documentation
- Scholarship, funding and education loan guidance
- German pathways: university, Studienkolleg, Ausbildung (paid vocational training) and Au Pair
- UK nursing placement guidance for nurses from Kerala
- Language preparation through Medcity International Academy
- Pre-departure support

## Contact

- Phone and WhatsApp: +91 90729 82555
- Email: info@mioc.in
- Head office: Chettipeedika, Kannur, Kerala 670004, India
- Free counselling: ${SITE_URL}/contact-us
`;

function line(title, url, note = "") {
    return `- [${title}](${url})${note ? `: ${note}` : ""}`;
}

export async function GET() {
    const [destinations, programs, posts] = await Promise.all([
        query(
            `SELECT d.country,
                    (SELECT COUNT(*) FROM tb_universities u WHERE u.d_id = d.id AND u.status = '1') AS universities
             FROM tb_destinations d
             WHERE d.status = '1'
             ORDER BY d.order ASC`
        ),
        getGermanProgramsList(6, { throwOnError: true }),
        query(
            `SELECT title, slug, meta_description, summary FROM tb_blog_web
             WHERE status IS NULL OR status <> '0'
             ORDER BY created_date DESC, id DESC
             LIMIT 50`
        ),
    ]);

    const sections = [INTRO];

    sections.push(
        [
            "## Key pages",
            "",
            line("Home", SITE_URL),
            line("Study destinations", `${SITE_URL}/destinations`),
            line("Universities", `${SITE_URL}/universities`),
            line("Course search", `${SITE_URL}/courses`),
            line("Study in Germany", `${SITE_URL}/study-in-germany`),
            line("UK nursing placement", `${SITE_URL}/placement-assistance-nursing`),
            line("Migrate to Canada", `${SITE_URL}/migrate-to-canada`),
            line("Migrate to Australia", `${SITE_URL}/migrate-to-australia`),
            line("Study abroad guides", `${SITE_URL}/blogs`),
            line("Branches", `${SITE_URL}/branches`),
            line("About us", `${SITE_URL}/about-us`),
            line("Contact and free counselling", `${SITE_URL}/contact-us`),
            "",
        ].join("\n")
    );

    sections.push(
        [
            "## Study destinations",
            "",
            ...destinations.flatMap((destination) => {
                const slug = countrySlug(destination.country);
                const count = Number(destination.universities) || 0;

                return [
                    line(`Study in ${destination.country}`, `${SITE_URL}/study-in-${slug}`),
                    ...(count > 0
                        ? [line(`Universities in ${destination.country}`, `${SITE_URL}/universities-in-${slug}`, `${count} ${count === 1 ? "university" : "universities"} listed`)]
                        : []),
                ];
            }),
            "",
        ].join("\n")
    );

    const programLines = (programs?.programs ?? [])
        .map((program) => {
            const name = String(program?.name ?? "").trim();

            return name ? line(name, `${SITE_URL}/study-in-germany/${createSlug(name)}`) : "";
        })
        .filter(Boolean);

    if (programLines.length) {
        sections.push(["## German pathways", "", ...programLines, ""].join("\n"));
    }

    if (posts.length) {
        sections.push(
            [
                "## Guides",
                "",
                ...posts.map((post) => {
                    const note = String(post.meta_description || post.summary || "").replace(/\s+/g, " ").trim();

                    return line(String(post.title).trim(), `${SITE_URL}/blog-details/${blogPublicSlug(post)}`, note.slice(0, 200));
                }),
                "",
            ].join("\n")
        );
    }

    sections.push(
        [
            "## Branches",
            "",
            ...centers.map((center) => line(center.name || center.city, `${SITE_URL}${getCenterUrl(center)}`, center.address || "")),
            "",
        ].join("\n")
    );

    sections.push(
        "## Notes\n\nFees, intakes and visa rules change. Course pages show the details held for each course; where a figure is not recorded it is left out rather than estimated. Please link to the page you quote.\n"
    );

    return new Response(sections.join("\n"), {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
        },
    });
}
