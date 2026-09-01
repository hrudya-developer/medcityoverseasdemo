import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createSlug } from "@/lib/slug";

import {
  buildImageUrl,
  FALLBACK_IMAGE,
} from "./germanProgramsHelpers";

export default function GermanProgramCard({
  item,
  imagePath,
  priority = false,
}) {
  const programId = item?.id;
  const programName =
    item?.name ||
    item?.program_name ||
    "German Program";

  const mainImage =
    buildImageUrl(imagePath, item?.icon) ||
    FALLBACK_IMAGE;

  const secondaryImage = item?.image
    ? buildImageUrl(imagePath, item.image)
    : "";

  if (!programId) {
    return null;
  }

  const programSlug = createSlug(programName);

  return (
    <Link
      href={`/study-in-germany/${programSlug}`}
      aria-label={`View details for ${programName}`}
      className="group block h-full rounded-[30px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
    >
      <article
        id={`german-program-${programId}`}
        itemScope
        itemType="https://schema.org/Course"
        className="flex h-full min-h-[520px] flex-col overflow-hidden rounded-[30px] border border-slate-100 bg-white shadow-[0_16px_45px_rgba(15,23,42,0.10)] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_28px_65px_rgba(99,26,51,0.18)]"
      >
        <meta
          itemProp="url"
          content={`/study-in-germany/${programSlug}`}
        />

        <div className="relative h-56 overflow-hidden bg-slate-100 sm:h-64">
          <Image
            itemProp="image"
            src={mainImage}
            alt={`${programName} German study program`}
            fill
            priority={priority}
            sizes="
              (max-width: 639px) 100vw,
              (max-width: 1023px) 50vw,
              33vw
            "
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
          />

          <span className="absolute left-5 top-5 max-w-[75%] truncate rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold uppercase text-darkPrimary shadow-sm backdrop-blur-sm">
            {programName}
          </span>

          {secondaryImage && (
            <div className="absolute bottom-4 right-4 h-20 w-20 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl">
              <Image
                src={secondaryImage}
                alt="German Program"
                fill
                sizes="80px"
                className="object-contain"
              />
            </div>
          )}
        </div>

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

          {item?.titleWhy && (
            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-primary">
              {item.titleWhy}
            </p>
          )}

          {item?.why && (
            <p
              itemProp="description"
              className="mt-4 line-clamp-4 text-sm leading-7 text-slate-600"
            >
              {item.why}
            </p>
          )}

          <span className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-bold text-primary transition group-hover:text-darkPrimary">
            Explore Program

            <ArrowRight
              aria-hidden="true"
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>

        <div
          aria-hidden="true"
          className="h-2 bg-darkPrimary"
        />
      </article>
    </Link>
  );
}