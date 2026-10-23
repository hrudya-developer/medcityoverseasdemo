import Link from "next/link";

import CommunityPostsClient from "./CommunityPostsClient";
import { communityFaqs } from "./communityFaqData";
import OfficialSources from "@/components/seo/OfficialSources";
import PageSchema from "@/components/seo/PageSchema";
import QuestionAnswer from "@/components/seo/QuestionAnswer";
import QuickAnswer from "@/components/seo/QuickAnswer";
import { queryOne } from "@/lib/db";
import { callLegacy } from "@/lib/legacy";
import { STUDY_ABROAD_SOURCES } from "@/lib/officialSources";
import { applySeoOverrides, withPageSeoFaqs } from "@/lib/pageSeo";
import { faqPageNode, jsonLdString, latestDate } from "@/lib/seoSchema";

// Read from the database on each request, like the posts API.
export const dynamic = "force-dynamic";

// Update when this page's own text is reviewed.
const TEMPLATE_UPDATED = "2026-10-24";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_PATH = "/community-posts";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE_PATH =
    "/og-images/community-posts-og.webp";

const PAGE_TITLE =
    "Study Abroad Community Stories and Updates";

const PAGE_DESCRIPTION =
    "Explore student stories, study abroad opportunities, international education updates and community announcements from Medcity Overseas.";

const pageMetadata = {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,

    keywords: [
        "study abroad community",
        "international student stories",
        "study abroad opportunities",
        "overseas education updates",
        "student community posts",
        "Medcity Overseas community",
    ],

    alternates: {
        canonical: PAGE_PATH,
    },

    openGraph: {
        type: "website",
        locale: "en_IN",
        url: PAGE_PATH,
        siteName: "Medcity Overseas",
        title:
            "Study Abroad Community Stories and Updates | Medcity Overseas",
        description:
            "Read student stories, overseas education updates, study opportunities and announcements from the Medcity Overseas community.",
        images: [
            {
                url: OG_IMAGE_PATH,
                width: 1200,
                height: 630,
                alt:
                    "Study abroad community stories and updates from Medcity Overseas",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title:
            "Study Abroad Community Stories | Medcity Overseas",
        description:
            "Explore student experiences, international education updates and study abroad opportunities.",
        images: [OG_IMAGE_PATH],
    },

    robots: {
        index: true,
        follow: true,

        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
};

async function loadFirstPage() {
    try {
        const [result, totals] = await Promise.all([
            callLegacy("getCommunityPosts", { uid: "0", offset: "0" }),
            queryOne(
                `SELECT COUNT(*) AS posts, MAX(p.created_at) AS latest
                 FROM tb_community_post p
                 JOIN tb_students s ON s.id = p.uid
                 WHERE p.status = '1'`
            ),
        ]);

        return {
            // The same shape the posts API sends the browser.
            initial: JSON.parse(
                JSON.stringify({
                    posts: Array.isArray(result?.posts) ? result.posts : [],
                    imagePath: result?.post_image_path ?? "",
                    nextOffset: result?.nextoffset ?? null,
                })
            ),
            total: Number(totals?.posts) || 0,
            latest: totals?.latest ?? null,
        };
    } catch (error) {
        // The page still loads; the posts then load in the browser.
        console.error("Community posts could not be loaded:", error);

        return { initial: null, total: 0, latest: null };
    }
}

export default async function CommunityPostsPage() {
    const { initial, total, latest } = await loadFirstPage();
    const dateModified = latestDate(TEMPLATE_UPDATED, latest);

    const faqSchema = await withPageSeoFaqs({
        "@context": "https://schema.org",
        ...faqPageNode(PAGE_PATH, communityFaqs),
    });

    return (
        <>
            <PageSchema
                path={PAGE_PATH}
                type="CollectionPage"
                name={`${PAGE_TITLE} | Medcity Overseas`}
                description={PAGE_DESCRIPTION}
                dateModified={dateModified}
                image={OG_IMAGE_PATH}
                about={{ "@type": "Thing", name: "Study abroad student community" }}
                breadcrumbs={[
                    { name: "Home", path: "/" },
                    { name: "Community Posts", path: PAGE_PATH },
                ]}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLdString(faqSchema) }}
            />

            <CommunityPostsClient
                initial={initial}
                intro={
                    <QuickAnswer updated={dateModified} className="py-10">
                        {total > 0
                            ? `The Medcity Overseas study abroad community has ${total} ${total === 1 ? "post" : "posts"} from students: announcements, opportunities and updates on their journeys abroad, newest first. Read them below, or book free counselling to start your own study abroad plan.`
                            : "Community posts from Medcity Overseas students share announcements, opportunities and updates on their journeys abroad. Book free counselling to start your own study abroad plan."}
                    </QuickAnswer>
                }
                beforeFaq={
                    <QuestionAnswer
                        className="pb-12"
                        eyebrow="About the community"
                        question="What are Medcity Overseas community posts?"
                        answer="Community posts are short updates shared by students in the Medcity Overseas community. They include announcements, study abroad opportunities and news from students about their applications, visas and life abroad. Posts are personal experiences, so check official sources and talk to a counsellor before you make decisions based on them."
                        points={[
                            "Announcements and opportunities",
                            "Student updates on applications and visas",
                            "Experiences of studying and living abroad",
                        ]}
                    />
                }
                afterFaq={
                    <>
                        <OfficialSources className="py-12" links={STUDY_ABROAD_SOURCES} />

                        <p className="mx-auto max-w-5xl px-4 pb-16 text-sm leading-7 text-slate-600 sm:px-6 lg:px-8">
                            Read our{" "}
                            <Link href="/blogs" className="font-bold text-primary hover:underline">
                                study abroad blogs
                            </Link>
                            , see{" "}
                            <Link href="/all-testimonials" className="font-bold text-primary hover:underline">
                                student testimonials
                            </Link>{" "}
                            or{" "}
                            <Link href="/contact-us" className="font-bold text-primary hover:underline">
                                contact Medcity Overseas
                            </Link>{" "}
                            for free counselling.
                        </p>
                    </>
                }
            />
        </>
    );
}

// Search details edited in the admin apply on top of these.
export async function generateMetadata() {
  return applySeoOverrides(pageMetadata);
}
