/*
 * Pages whose template shows its own "In short" box near the top. On
 * these, a summary written in the admin's SEO manager replaces the
 * template's text inside that box (see components/seo/QuickAnswer.jsx)
 * instead of being shown a second time at the bottom of the page.
 */
const PATTERNS = [
    /^\/$/,
    /^\/privacy-policy$/,
    /^\/destinations$/,
    /^\/popular-courses$/,
    /^\/all-testimonials$/,
    /^\/study-in-[^/]+$/,
    /^\/study-in-germany\/[^/]+$/,
    /^\/universities-in-[^/]+$/,
    /^\/universities\/[^/]+$/,
    /^\/courses\/[^/]+$/,
    /^\/branch\/[^/]+$/,
    /^\/msc-nursing-in-uk$/,
    /^\/nursing-in-germany-for-indian-nurses$/,
    /^\/study-abroad-for-nurses$/,
    /^\/study-abroad-without-ielts$/,
    /^\/study-abroad-after-12th$/,
    /^\/student-visa-guidance$/,
    /^\/scholarships-for-indian-students$/,
    /^\/course-guides\/[^/]+$/,
    /^\/courses$/,
    /^\/universities$/,
    /^\/blogs$/,
    /^\/about-us$/,
    /^\/contact-us$/,
    /^\/add-on-services$/,
    /^\/branches$/,
    /^\/community-posts$/,
    /^\/placement-assistance-nursing$/,
    /^\/migrate-to-canada$/,
    /^\/migrate-to-australia$/,
];

export function templateShowsQuickAnswer(path) {
    return PATTERNS.some((pattern) => pattern.test(String(path ?? "")));
}
