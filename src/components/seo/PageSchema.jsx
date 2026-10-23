import {
    breadcrumbNode,
    faqPageNode,
    jsonLdString,
    organizationNode,
    webPageNode,
    websiteNode,
} from "@/lib/seoSchema";
import { faqsWithPageSeo } from "@/lib/pageSeo";

/*
 * One JSON-LD graph per page: the Medcity Overseas organisation, the
 * website, this page (publisher, author and dateModified) and its
 * breadcrumb, plus whatever the template describes (a course, a
 * university, a country) in `entities` and its FAQs in `faqs`. When
 * `faqs` is passed (even empty), the FAQPage also carries the FAQs added
 * in the admin's SEO manager; leave it out when FaqList marks them up.
 *
 * breadcrumbs: [{ name, path }], starting with Home and ending with
 * this page.
 */
export default async function PageSchema({
    path,
    name,
    headline,
    description,
    breadcrumbs,
    dateModified,
    image,
    type = "WebPage",
    about,
    mainEntity,
    entities = [],
    faqs,
    includeOrganization = true,
}) {
    const faqList = Array.isArray(faqs) ? await faqsWithPageSeo(faqs) : [];
    const graph = [
        ...(includeOrganization ? [organizationNode(), websiteNode()] : []),
        webPageNode({ path, type, name, headline, description, dateModified, image, about, mainEntity, breadcrumb: Boolean(breadcrumbs?.length) }),
        ...(breadcrumbs?.length ? [breadcrumbNode(path, breadcrumbs)] : []),
        ...entities.filter(Boolean),
        ...(faqList.length ? [faqPageNode(path, faqList)] : []),
    ];

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: jsonLdString({ "@context": "https://schema.org", "@graph": graph }),
            }}
        />
    );
}
