import { notFound, permanentRedirect } from "next/navigation";

import {
  absoluteUrl,
  DEFAULT_AUTHOR,
  findPostBySlug,
  SITE_URL,
} from "@/lib/blogPosts";

import BranchesInfo from "../../branches/components/BranchesInfo";
import { getBranchInfoForBlogTitle } from "../../branches/data/branchesInfo";

import BlogArticle from "./components/BlogArticle";
import { withSeoOverrides } from "@/lib/pageSeo";

export const dynamic = "force-dynamic";

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-images/default.webp`;

async function pageGenerateMetadata({ params }) {
  const { slug } = await params;
  const found = await findPostBySlug(slug);

  if (!found?.post) {
    return {
      title: { absolute: "Blog not found | Medcity Overseas" },
      robots: { index: false, follow: true },
    };
  }

  const { post } = found;
  const title = post.metaTitle || post.title;
  const url = `${SITE_URL}/blog-details/${post.slug}`;
  const image = absoluteUrl(post.cover) || DEFAULT_OG_IMAGE;

  return {
    title: { absolute: `${title} | Medcity Overseas` },
    description: post.metaDescription,
    ...(post.focusKeyword ? { keywords: [post.focusKeyword] } : {}),
    alternates: { canonical: `/blog-details/${post.slug}` },
    authors: [{ name: post.author || DEFAULT_AUTHOR }],
    openGraph: {
      type: "article",
      locale: "en_IN",
      url,
      siteName: "Medcity Overseas",
      title,
      description: post.metaDescription,
      publishedTime: post.published,
      modifiedTime: post.updated || post.published,
      authors: [post.author || DEFAULT_AUTHOR],
      images: [{ url: image, width: 1200, height: 630, alt: post.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.metaDescription,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

function structuredData(post) {
  const url = `${SITE_URL}/blog-details/${post.slug}`;
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Medcity Overseas",
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  };

  const images = [post.cover, ...post.gallery.map((photo) => photo.src)].map(absoluteUrl).filter(Boolean);

  const graph = [
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.title.slice(0, 110),
      description: post.metaDescription,
      ...(post.summary ? { abstract: post.summary } : {}),
      url,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      ...(images.length ? { image: images } : {}),
      datePublished: post.published,
      dateModified: post.updated || post.published,
      author: post.author
        ? { "@type": "Person", name: post.author, worksFor: { "@id": `${SITE_URL}/#organization` } }
        : organization,
      ...(post.reviewer ? { reviewedBy: { "@type": "Person", name: post.reviewer } } : {}),
      publisher: organization,
      ...(post.focusKeyword ? { keywords: post.focusKeyword } : {}),
      wordCount: post.wordCount,
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blogs", item: `${SITE_URL}/blogs` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  if (post.faqs.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: post.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;
  const found = await findPostBySlug(slug);

  if (found?.redirect) {
    permanentRedirect(`/blog-details/${found.redirect}`);
  }

  if (!found?.post) {
    notFound();
  }

  const { post, related } = found;

  // Same post under a differently written address (capitals, encoding).
  if (slug !== post.slug) {
    permanentRedirect(`/blog-details/${post.slug}`);
  }

  const branchInfo = getBranchInfoForBlogTitle(post.title);

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData(post)).replace(/</g, "\\u003c"),
        }}
      />

      <BlogArticle
        post={post}
        related={related}
        replacementBody={branchInfo ? <BranchesInfo branch={branchInfo} /> : null}
      />
    </main>
  );
}

// Search details edited in the admin apply on top of the page's own.
export const generateMetadata = withSeoOverrides(pageGenerateMetadata);
