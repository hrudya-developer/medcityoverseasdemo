import {
    breadcrumbNode,
    faqPageNode,
    jsonLdString,
    organizationNode,
    webPageNode,
    websiteNode,
} from "@/lib/seoSchema";

/*
 * One JSON-LD graph per page: the Medcity Overseas organisation, the
 * website, this page (publisher, author and dateModified) and its
 * breadcrumb, plus whatever the template describes (a course, a
 * university, a country) in `entities` and its FAQs in `faqs`.
 *
 * breadcrumbs: [{ name, path }], starting with Home and ending with
 * this page.
 */
export default function PageSchema({
    path,
    name,
    description,
    breadcrumbs,
    dateModified,
    image,
    type = "WebPage",
    about,
    mainEntity,
    entities = [],
    faqs = [],
    includeOrganization = true,
}) {
    const graph = [
        ...(includeOrganization ? [organizationNode(), websiteNode()] : []),
        webPageNode({ path, type, name, description, dateModified, image, about, mainEntity, breadcrumb: Boolean(breadcrumbs?.length) }),
        ...(breadcrumbs?.length ? [breadcrumbNode(path, breadcrumbs)] : []),
        ...entities.filter(Boolean),
        ...(faqs.length ? [faqPageNode(path, faqs)] : []),
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
