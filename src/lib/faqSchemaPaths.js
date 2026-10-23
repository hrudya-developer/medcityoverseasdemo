/*
 * Pages whose template outputs its own FAQPage structured data. On
 * these, FAQs written in the admin's SEO manager are added to the
 * template's FAQPage (see faqsWithPageSeo in lib/pageSeo.js) and
 * components/seo/PageSeoExtras.jsx shows them without a second
 * FAQPage block, so a page never carries two.
 *
 * A template listed here must build its FAQPage from
 * faqsWithPageSeo(), even when it has no FAQs of its own.
 */
const PATTERNS = [
    /^\/$/,
    /^\/privacy-policy$/,
    /^\/destinations$/,
    /^\/popular-courses$/,
    /^\/all-testimonials$/,
    /^\/study-in-[^/]+$/,
    /^\/study-in-germany\/[^/]+$/,
    /^\/universities$/,
    /^\/universities-in-[^/]+$/,
    /^\/universities\/[^/]+$/,
    /^\/courses$/,
    /^\/courses\/[^/]+$/,
    /^\/branch\/[^/]+$/,
    /^\/branches$/,
    /^\/about-us$/,
    /^\/contact-us$/,
    /^\/add-on-services$/,
    /^\/blogs$/,
    /^\/community-posts$/,
    /^\/placement-assistance-nursing$/,
    /^\/migrate-to-canada$/,
    /^\/migrate-to-australia$/,
    /^\/msc-nursing-in-uk$/,
    /^\/nursing-in-germany-for-indian-nurses$/,
    /^\/study-abroad-for-nurses$/,
    /^\/study-abroad-without-ielts$/,
    /^\/study-abroad-after-12th$/,
    /^\/student-visa-guidance$/,
    /^\/scholarships-for-indian-students$/,
    /^\/course-guides\/[^/]+$/,
];

export function templateOutputsFaqSchema(path) {
    return PATTERNS.some((pattern) => pattern.test(String(path ?? "")));
}
