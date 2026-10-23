import Link from "next/link";
import { notFound } from "next/navigation";

import FaqList from "@/components/seo/FaqList";
import OfficialSources from "@/components/seo/OfficialSources";
import PageSchema from "@/components/seo/PageSchema";
import QuickAnswer from "@/components/seo/QuickAnswer";
import {
    AcademyNote,
    ContactBand,
    GuideHero,
    GuideSection,
    LoadError,
    NOT_RECORDED,
    PointList,
    Prose,
    RelatedLinks,
    TableWrap,
    TextLink,
    tbodyClass,
    th,
    theadClass,
} from "@/components/landing/Guide";
import { getCourseGuide } from "@/lib/courseGuideData";
import {
    GUIDE_TABLE_LIMIT,
    MIN_GUIDE_COURSES,
    fieldCount,
    findCourseGuide,
    guideCountry,
    guideFaqs,
    guideHeading,
    guidePath,
    guideSummaryText,
    mostOften,
    passesGuideGate,
    visaPhrase,
} from "@/lib/courseGuides";
import { destinationStatusLookup } from "@/lib/destinationSummary";
import { guideMetadata } from "@/lib/guideMeta";
import { intakeList } from "@/lib/recordValue";
import { pageUrl } from "@/lib/seoSchema";

/*
 * A course guide, /course-guides/<subject>-in-<country>, from the
 * config in lib/courseGuides.js and the matching tb_courses rows
 * (lib/courseGuideData.js). Every course value is shown as recorded or
 * as "Not recorded"; fees are never turned into yearly figures. A guide
 * with fewer than MIN_GUIDE_COURSES courses, or whose courses could not
 * be read, is noindex and stays out of the sitemap. The visa text comes
 * from the official pages in GUIDE_COUNTRIES, checked on UPDATED.
 */

const UPDATED = "2026-10-24";

function value(text) {
    return text || NOT_RECORDED;
}

function englishText(course) {
    const parts = [
        course.ielts && `IELTS ${course.ielts}`,
        course.pte && `PTE ${course.pte}`,
        course.toefl && `TOEFL ${course.toefl}`,
        course.duolingo && `Duolingo ${course.duolingo}`,
    ].filter(Boolean);

    return parts.length ? parts.join("; ") : NOT_RECORDED;
}

async function loadPage(slug) {
    const guide = findCourseGuide(slug);

    if (!guide) {
        notFound();
    }

    const { data, error } = await getCourseGuide(guide.slug);

    return { guide, data, error, indexable: !error && Boolean(data) && passesGuideGate(data.total) };
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const { guide, indexable } = await loadPage(slug);
    const country = guideCountry(guide);
    const metadata = await guideMetadata({
        path: guidePath(guide),
        title: guideHeading(guide),
        description: guide.description,
        imageAlt: `${guide.subject} in ${country.fullName} with Medcity Overseas`,
    });

    // Thin, or unknown because the database could not be read: keep it
    // out of the index until the courses are there.
    return indexable ? metadata : { ...metadata, robots: { index: false, follow: true } };
}

export default async function CourseGuidePage({ params }) {
    const { slug } = await params;
    const [{ guide, data, error, indexable }, status] = await Promise.all([loadPage(slug), destinationStatusLookup()]);
    const country = guideCountry(guide);
    const path = guidePath(guide);
    const title = guideHeading(guide);
    // Unknown (the summaries could not be read) keeps the links, as on the other guides.
    const countryStatus = status ? status(country.slug) : { live: true, universitiesIndexable: true };
    const countryGuide = countryStatus.live ? `/study-in-${country.slug}` : "";
    const searchHref = guide.search ? `/courses?q=${encodeURIComponent(guide.search)}` : "/courses";
    const summary = data ?? null;
    const rows = summary?.rows ?? [];
    const faqs = indexable ? guideFaqs(guide, summary) : [];
    // Field counts are "at least" counts when the rows read were capped.
    const count = (value) => (summary ? fieldCount(summary, value) : String(value));
    const listItems = indexable
        ? rows
              .filter((course) => course.href)
              .slice(0, 30)
              .map((course, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  url: pageUrl(course.href),
                  name: `${course.course}, ${course.university}`,
              }))
        : [];

    const breadcrumbs = [
        { name: "Home", path: "/" },
        { name: "Popular courses", path: "/popular-courses" },
        { name: `${guide.subject} in ${country.name}`, path },
    ];

    return (
        <div className="bg-white">
            <PageSchema
                path={path}
                type="Article"
                headline={title}
                name={`${title} | Medcity Overseas`}
                description={guide.description}
                dateModified={UPDATED}
                image="/og-images/default.webp"
                breadcrumbs={breadcrumbs}
                entities={
                    listItems.length
                        ? [
                              {
                                  "@type": "ItemList",
                                  "@id": `${pageUrl(path)}#courses`,
                                  name: `${guide.subject} courses in ${country.fullName} listed by Medcity Overseas`,
                                  numberOfItems: listItems.length,
                                  itemListElement: listItems,
                              },
                          ]
                        : []
                }
                faqs={indexable ? faqs : undefined}
            />

            <GuideHero
                eyebrow={`Study in ${country.fullName}`}
                title={title}
                breadcrumbs={breadcrumbs}
                intro={`Planning ${guide.subjectPhrase} in ${country.fullName}? Here are the courses we can help you apply to, their entry and English requirements and intakes exactly as recorded, and the steps for ${visaPhrase(country)}.`}
            />

            <div className="space-y-14 py-12 sm:py-14">
                <QuickAnswer updated={UPDATED}>
                    {error ? `Our ${guide.subject} course list for ${country.fullName} could not be loaded just now. Call us and a counsellor will share the current options.` : guideSummaryText(guide, summary)}
                </QuickAnswer>

                {error ? (
                    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <LoadError />
                    </section>
                ) : !indexable ? (
                    <GuideSection title={`${guide.subject} courses in ${country.fullName}`}>
                        <Prose>
                            <p>
                                We list fewer than {MIN_GUIDE_COURSES} {guide.subject} courses in {country.fullName} right now, so this guide is still being built.{" "}
                                {countryGuide ? (
                                    <>
                                        Read our <TextLink href={countryGuide}>study in {country.name} guide</TextLink> or{" "}
                                    </>
                                ) : null}
                                <TextLink href="/contact-us">contact us</TextLink> and a counsellor will check the current options with you.
                            </p>
                        </Prose>
                    </GuideSection>
                ) : null}

                {indexable && (
                    <>
                        <GuideSection
                            title={`${guide.subject} courses in ${country.fullName} we can help you apply to`}
                            intro="Read from our course records. Each value is shown exactly as recorded; an empty field shows Not recorded. Fees are the figures stored on the course record with their currency, not yearly totals, so open the course page to see their basis."
                        >
                            <TableWrap
                                minWidth={900}
                                caption={
                                    summary.total > rows.length
                                        ? `Showing ${rows.length} of ${summary.total} matching courses, spread across universities.`
                                        : undefined
                                }
                            >
                                <thead className={theadClass}>
                                    <tr>
                                        <th scope="col" className={th}>University</th>
                                        <th scope="col" className={th}>Course</th>
                                        <th scope="col" className={th}>Level</th>
                                        <th scope="col" className={th}>Duration</th>
                                        <th scope="col" className={th}>Intakes</th>
                                        <th scope="col" className={th}>English requirement</th>
                                        <th scope="col" className={th}>Fee as recorded</th>
                                    </tr>
                                </thead>
                                <tbody className={tbodyClass}>
                                    {rows.map((course) => (
                                        <tr key={course.id}>
                                            <td className={th}>
                                                <Link href={course.universityHref} className="font-semibold text-primary hover:underline">
                                                    {course.university}
                                                </Link>
                                                {course.location && <span className="mt-1 block text-xs text-slate-500">{course.location}</span>}
                                            </td>
                                            <th scope="row" className={`${th} font-bold text-slate-900`}>
                                                {course.href ? (
                                                    <Link href={course.href} className="hover:text-primary hover:underline">
                                                        {course.course}
                                                    </Link>
                                                ) : (
                                                    course.course
                                                )}
                                            </th>
                                            <td className={th}>{value(course.level)}</td>
                                            <td className={th}>{value(course.duration)}</td>
                                            <td className={th}>{value(intakeList(course.intakes).join(", "))}</td>
                                            <td className={th}>{englishText(course)}</td>
                                            <td className={th}>{value(course.fee)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </TableWrap>
                            <Prose>
                                <p>
                                    {summary.total > GUIDE_TABLE_LIMIT ? "See every matching course in the " : "See more options in the "}
                                    <TextLink href={searchHref}>course finder</TextLink>
                                    {countryStatus.universitiesIndexable ? (
                                        <>
                                            {" "}or the <TextLink href={`/universities-in-${country.slug}`}>list of universities in {country.fullName}</TextLink>
                                        </>
                                    ) : null}
                                    .
                                </p>
                            </Prose>
                        </GuideSection>

                        <GuideSection title={`Entry requirements and English tests for ${guide.subject} in ${country.fullName}`}>
                            <Prose>
                                <p>
                                    Each university sets its own entry requirements. Of the {summary.total} courses we list, an entry requirement is recorded for{" "}
                                    {count(summary.withEntry)}, an IELTS score for {count(summary.english.ielts)}, a PTE score for {count(summary.english.pte)}, a TOEFL score for{" "}
                                    {count(summary.english.toefl)} and a Duolingo score for {count(summary.english.duolingo)}.
                                    {summary.ielts.length ? ` ${mostOften("IELTS value", summary.ielts)}.` : ""}
                                    {summary.english.lowerScore > 0
                                        ? ` ${count(summary.english.lowerScore)} ${summary.english.lowerScore === 1 ? "course records" : "courses record"} a lower IELTS, PTE or TOEFL score as well.`
                                        : ""}
                                </p>
                            </Prose>
                            {summary.entries.length > 0 && (
                                <PointList
                                    items={summary.entries.map((entry) => ({
                                        title: `${entry.course}, ${entry.university}`,
                                        text: entry.entry,
                                    }))}
                                />
                            )}
                            <Prose>
                                <p>Where a field is empty, check the course page or ask a counsellor before you apply.</p>
                            </Prose>
                            <AcademyNote lead="Preparing for an English test?" subjects={guide.country === "australia" ? "IELTS, PTE and OET" : "IELTS and PTE"} />
                        </GuideSection>

                        <GuideSection title={`Intakes for ${guide.subject} in ${country.fullName}`}>
                            <Prose>
                                <p>
                                    {summary.intakes.length
                                        ? `The courses we list record these intakes: ${summary.intakes.join(", ")}. Intakes can change each year, so check the course page and apply early.`
                                        : "Intakes are not recorded for these courses yet. Each course page shows the intake once the university confirms it."}
                                </p>
                            </Prose>
                        </GuideSection>
                    </>
                )}

                <GuideSection
                    title={`How to apply and the ${country.visaName}`}
                    intro="The steps below follow the official pages, checked on 24 October 2026. Universities decide admissions and the immigration authorities decide visas."
                >
                    <PointList ordered items={country.visaSteps} />
                    <Prose>
                        <p>
                            {countryGuide ? (
                                <>
                                    Our <TextLink href={countryGuide}>study in {country.name} guide</TextLink> covers the country as a whole, and{" "}
                                </>
                            ) : null}
                            <TextLink href="/student-visa-guidance">student visa guidance</TextLink> explains how we prepare visa files.
                        </p>
                    </Prose>
                </GuideSection>

                {faqs.length > 0 && <FaqList path={path} faqs={faqs} schema={false} title={`${guide.subject} in ${country.fullName}: frequently asked questions`} />}

                <OfficialSources links={country.sources} intro="Rules, fees and requirements change. These are the official pages behind this guide, checked on 24 October 2026." />

                <RelatedLinks
                    links={[
                        ...(countryGuide ? [{ href: countryGuide, title: `Study in ${country.fullName}`, text: `Our full country guide for ${country.fullName}.` }] : []),
                        { href: "/student-visa-guidance", title: "Student visa guidance", text: "How we prepare visa files for each country." },
                        { href: "/popular-courses", title: "Popular courses", text: "Course areas students from Kerala choose most." },
                        { href: "/contact-us", title: "Contact us", text: "Book a counselling session with Medcity Overseas." },
                    ]}
                />

                <ContactBand />
            </div>
        </div>
    );
}
