import Link from "next/link";
import { ArrowRight } from "lucide-react";

function buildImageUrl(basePath, file) {
  if (!file) return "";
  if (/^https?:\/\//i.test(String(file))) return String(file);
  return `${basePath || ""}${file}`;
}

export default function GermanProgramCard({
  item,
  imagePath,
  priority = false,
}) {
  const programId =
    item?.id ?? item?.program_id ?? item?.programId;

  const programName =
    item?.name || item?.program_name || "German Program";

  const mainImage =
    item?.iconUrl ||
    item?.imageUrl ||
    buildImageUrl(imagePath, item?.icon) ||
    buildImageUrl(imagePath, item?.image);

  const secondaryImage = buildImageUrl(imagePath, item?.image);

  if (!programId) return null;

  const detailsHref = `/german-programs/${encodeURIComponent(
    String(programId)
  )}`;

  return (
    <article
      id={`german-program-${programId}`}
      itemScope
      itemType="https://schema.org/Course"
      className="group flex h-full min-h-[520px] flex-col overflow-hidden rounded-[30px] border border-slate-100 bg-white shadow-[0_16px_45px_rgba(15,23,42,0.10)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_65px_rgba(99,26,51,0.18)]"
    >
      <meta itemProp="url" content={detailsHref} />

      <Link
        href={detailsHref}
        aria-label={`View ${programName} details`}
        className="relative block h-56 overflow-hidden bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset sm:h-64"
      >
        {mainImage ? (
          <img
            itemProp="image"
            src={mainImage}
            alt={`${programName} German study program`}
            width="800"
            height="500"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#111943] via-[#342052] to-[#b51d58]" />
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
        />

        <span className="absolute left-5 top-5 max-w-[75%] truncate rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold uppercase text-darkPrimary shadow-sm backdrop-blur-sm">
          {programName}
        </span>

        {secondaryImage ? (
          <div className="absolute bottom-4 right-4 h-20 w-20 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl">
            <img
              src={secondaryImage}
              alt=""
              width="80"
              height="80"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain"
            />
          </div>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h2
          itemProp="name"
          className="text-2xl font-extrabold text-slate-950"
        >
          {programName}
        </h2>

        <div
          aria-hidden="true"
          className="mt-3 h-1 w-14 rounded-full bg-primary"
        />

        {item?.titleWhy ? (
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-primary">
            {item.titleWhy}
          </p>
        ) : null}

        {item?.why ? (
          <p
            itemProp="description"
            className="mt-4 line-clamp-4 text-sm leading-7 text-slate-600"
          >
            {item.why}
          </p>
        ) : null}

        <Link
          href={detailsHref}
          className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-bold text-primary transition hover:text-darkPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Explore Program
          <ArrowRight
            aria-hidden="true"
            size={17}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div aria-hidden="true" className="h-2 bg-darkPrimary" />
    </article>
  );
}