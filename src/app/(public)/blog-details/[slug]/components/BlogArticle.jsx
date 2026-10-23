import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  ExternalLink,
  ListChecks,
  MessageCircle,
  Phone,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import { DEFAULT_AUTHOR, displayDate } from "@/lib/blogPosts";

const PHONE_DISPLAY = "+91 90729 82555";
const PHONE_LINK = "tel:+919072982555";
const WHATSAPP_LINK = "https://wa.me/919072982555";

/* Images uploaded in the admin are optimised by Next.js; older images on
   the previous server are shown as they are, so the site never fetches
   them server-side. */
function PostImage({ src, alt, className, sizes, priority = false }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={!src.startsWith("/media/")}
      className={className}
    />
  );
}

function Byline({ post }) {
  const author = post.author || DEFAULT_AUTHOR;

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-600">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
          <UserRound size={18} aria-hidden="true" />
        </span>
        <div className="leading-tight">
          <p className="font-bold text-slate-900">{author}</p>
          {post.reviewer && (
            <p className="flex items-center gap-1 text-xs text-slate-500">
              <ShieldCheck size={13} className="text-green-600" aria-hidden="true" />
              Reviewed by {post.reviewer}
            </p>
          )}
        </div>
      </div>

      {post.published && (
        <span className="flex items-center gap-1.5">
          <CalendarDays size={15} className="text-primary" aria-hidden="true" />
          <time dateTime={post.published}>{displayDate(post.published)}</time>
        </span>
      )}

      {post.updated && (
        <span className="flex items-center gap-1.5">
          <RefreshCw size={15} className="text-primary" aria-hidden="true" />
          Updated <time dateTime={post.updated}>{displayDate(post.updated)}</time>
        </span>
      )}

      {post.readingTime && (
        <span className="flex items-center gap-1.5">
          <Clock3 size={15} className="text-primary" aria-hidden="true" />
          {post.readingTime}
        </span>
      )}
    </div>
  );
}

function TableOfContents({ headings, mobile = false }) {
  const items = headings.filter((heading) => heading.level === 2);

  if (items.length < 3) {
    return null;
  }

  const list = (
    <ol className="mt-3 space-y-2 text-sm">
      {items.map((heading, index) => (
        <li key={heading.id} className="flex gap-2">
          <span className="w-5 shrink-0 text-right font-bold text-primary">{index + 1}.</span>
          <a href={`#${heading.id}`} className="text-slate-700 hover:text-primary hover:underline">
            {heading.text.replace(/^\d+[.)]\s*/, "")}
          </a>
        </li>
      ))}
    </ol>
  );

  if (mobile) {
    return (
      <details className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:hidden">
        <summary className="flex cursor-pointer items-center gap-2 font-bold text-slate-900">
          <ListChecks size={18} className="text-primary" aria-hidden="true" />
          In this article
        </summary>
        {list}
      </details>
    );
  }

  return (
    <nav aria-label="In this article" className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="flex items-center gap-2 font-bold text-slate-900">
        <ListChecks size={18} className="text-primary" aria-hidden="true" />
        In this article
      </p>
      {list}
    </nav>
  );
}

function QuickAnswer({ text }) {
  if (!text) {
    return null;
  }

  return (
    <section
      aria-label="Quick answer"
      className="mb-10 rounded-2xl border border-secondary/20 bg-gradient-to-br from-secondary/[0.07] to-primary/[0.05] p-5 sm:p-6"
    >
      <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-secondary">
        <Sparkles size={15} aria-hidden="true" />
        Quick answer
      </p>
      <div className="mt-2 space-y-3 text-[1.05rem] leading-8 text-slate-800">
        {text.split(/\n\s*\n/).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function Gallery({ photos }) {
  if (!photos.length) {
    return null;
  }

  return (
    <section aria-labelledby="gallery-heading" className="mt-12">
      <h2 id="gallery-heading" className="text-2xl font-black text-secondary">
        Photos
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {photos.map((photo, index) => (
          <figure key={`${photo.src}-${index}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <div className="relative aspect-[4/3]">
              <PostImage
                src={photo.src}
                alt={photo.alt}
                sizes="(max-width: 640px) 100vw, 400px"
                className="object-cover"
              />
            </div>
            <figcaption className="px-4 py-3 text-sm text-slate-600">{photo.alt}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Faqs({ faqs }) {
  if (!faqs.length) {
    return null;
  }

  return (
    <section aria-labelledby="faq-heading" className="mt-14">
      <h2 id="faq-heading" className="text-2xl font-black text-secondary sm:text-3xl">
        Frequently asked questions
      </h2>
      <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200">
        {faqs.map((faq, index) => (
          <details key={index} open={index === 0} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-start justify-between gap-4 text-left">
              <h3 className="text-base font-bold leading-snug text-slate-900 sm:text-lg">{faq.question}</h3>
              <ChevronRight
                size={20}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-primary transition-transform group-open:rotate-90"
              />
            </summary>
            <div className="mt-3 space-y-3 leading-7 text-slate-600">
              {faq.answer.split(/\n\s*\n/).map((paragraph, position) => (
                <p key={position}>{paragraph}</p>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

function CounsellingCard({ compact = false }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-darkPrimary via-primary to-primary p-6 text-white shadow-lg">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">Free counselling</p>
      <p className={`mt-2 font-black leading-snug ${compact ? "text-lg" : "text-xl"}`}>
        Planning to study abroad? Talk to a Medcity counsellor.
      </p>
      <p className="mt-2 text-sm text-white/80">
        Course, university, visa and funding guidance from our 18 branches across Kerala.
      </p>
      <div className="mt-5 space-y-2.5">
        <a
          href={PHONE_LINK}
          className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-primary hover:bg-white/90"
        >
          <Phone size={16} aria-hidden="true" />
          Call {PHONE_DISPLAY}
        </a>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-white/40 px-4 py-2.5 text-sm font-bold text-white hover:bg-white/10"
        >
          <MessageCircle size={16} aria-hidden="true" />
          WhatsApp us
        </a>
        <Link
          href="/contact-us"
          className="flex items-center justify-center gap-1.5 text-sm font-semibold text-white/90 hover:text-white"
        >
          Book a free session <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

function AuthorCard({ post }) {
  const author = post.author || DEFAULT_AUTHOR;

  return (
    <section className="mt-14 flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
        <UserRound size={22} aria-hidden="true" />
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Written by</p>
        <p className="mt-1 font-bold text-slate-900">{author}</p>
        {post.reviewer && (
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-600">
            <ShieldCheck size={15} className="text-green-600" aria-hidden="true" />
            Reviewed by {post.reviewer}
          </p>
        )}
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Medcity Overseas has guided students from Kerala to universities abroad since 2012. Rules on visas,
          fees and admissions change often: always check the official source linked in the article, or ask
          our counsellors before you apply.
        </p>
      </div>
    </section>
  );
}

function RelatedPosts({ posts }) {
  if (!posts.length) {
    return null;
  }

  return (
    <section aria-labelledby="related-heading" className="border-t border-slate-100 bg-slate-50 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="related-heading" className="text-2xl font-black text-secondary sm:text-3xl">
            Keep reading
          </h2>
          <Link href="/blogs" className="flex items-center gap-1 text-sm font-bold text-primary hover:underline">
            All articles <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((item) => (
            <Link
              key={item.slug}
              href={`/blog-details/${item.slug}`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[1200/630] bg-slate-100">
                {item.cover && (
                  <PostImage
                    src={item.cover}
                    alt={item.coverAlt}
                    sizes="(max-width: 640px) 100vw, 360px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold text-slate-500">
                  {[displayDate(item.published), item.readingTime].filter(Boolean).join(" · ")}
                </p>
                <h3 className="mt-2 line-clamp-2 font-black leading-snug text-slate-900 group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{item.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BlogArticle({ post, related, replacementBody = null }) {
  return (
    <>
      <article>
        {/* HEADER */}
        <header className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(192,31,83,0.08),transparent_35%),radial-gradient(circle_at_88%_10%,rgba(4,102,175,0.08),transparent_35%)]"
          />

          <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pt-10 lg:px-8">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-primary">Home</Link>
                </li>
                <li aria-hidden="true"><ChevronRight size={14} /></li>
                <li>
                  <Link href="/blogs" className="hover:text-primary">Blogs</Link>
                </li>
                <li aria-hidden="true"><ChevronRight size={14} /></li>
                <li className="line-clamp-1 max-w-[16rem] text-slate-700 sm:max-w-md" aria-current="page">
                  {post.title}
                </li>
              </ol>
            </nav>

            <div className="mt-6 max-w-4xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-primary">
                <Sparkles size={13} aria-hidden="true" />
                Study abroad guide
              </span>

              <h1 className="mt-4 text-3xl font-black leading-[1.15] tracking-tight text-secondary sm:text-4xl lg:text-[2.9rem]">
                {post.title}
              </h1>

              {post.intro && (
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{post.intro}</p>
              )}

              <div className="mt-6">
                <Byline post={post} />
              </div>
            </div>

            {post.cover && (
              <figure className="relative mt-8 aspect-[1200/630] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
                <PostImage
                  src={post.cover}
                  alt={post.coverAlt}
                  priority
                  sizes="(max-width: 1152px) 100vw, 1104px"
                  className="object-cover"
                />
              </figure>
            )}
          </div>
        </header>

        {/* BODY */}
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="min-w-0">
              {replacementBody ?? (
                <>
                  <QuickAnswer text={post.summary} />
                  <TableOfContents headings={post.headings} mobile />

                  <div className="blog-body" dangerouslySetInnerHTML={{ __html: post.html }} />

                  {post.legacySections.map((section, index) => (
                    <section key={index} className="blog-body mt-10">
                      {section.heading && <h2>{section.heading}</h2>}
                      {section.text && <p>{section.text}</p>}
                    </section>
                  ))}

                  <Gallery photos={post.gallery} />
                  <Faqs faqs={post.faqs} />

                  {post.link && (
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-10 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-darkPrimary"
                    >
                      Learn more <ExternalLink size={15} aria-hidden="true" />
                    </a>
                  )}

                  <AuthorCard post={post} />
                </>
              )}

              <div className="mt-10 lg:hidden">
                <CounsellingCard compact />
              </div>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-6">
                {!replacementBody && <TableOfContents headings={post.headings} />}
                <CounsellingCard />
              </div>
            </aside>
          </div>
        </div>
      </article>

      <RelatedPosts posts={related} />
    </>
  );
}
