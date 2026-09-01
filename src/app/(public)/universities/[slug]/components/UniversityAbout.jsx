"use client";

import {
  ArrowRight,
} from "lucide-react";

import FAQ from "@/components/home/FAQ/FAQ";

import UniversityFactRow from "./UniversityFactRow";
import UniversityInfoBadge from "./UniversityInfoBadge";
import UniversityMap from "./UniversityMap";
import UniversityStats from "./UniversityStats";

export default function UniversityAbout({
  data,
  onCourses,
}) {
  if (!data) {
    return null;
  }

  return (
    <div
      id="about-panel"
      role="tabpanel"
      aria-labelledby="about-tab"
    >
      <section
        className="
          mx-auto
          grid
          max-w-7xl
          gap-6
          px-4
          py-10
          sm:px-8
          lg:grid-cols-2
          lg:px-10
        "
      >
        <article
          className="
            rounded-[28px]
            border
            border-slate-100
            bg-white
            p-6
            shadow-[0_16px_40px_rgba(15,23,42,0.08)]
            sm:p-8
          "
        >
          <p
            className="
              text-xs
              font-black
              uppercase
              tracking-[0.15em]
              text-secondary
            "
          >
            About the University
          </p>

          <h2
            className="
              mt-4
              text-2xl
              font-black
              text-[#081c47]
              sm:text-3xl
            "
          >
            Study at{" "}
            <span
              className="
                text-darkPrimary
              "
            >
              {
                data.universityName
              }
            </span>
          </h2>

          <p
            className="
              mt-5
              whitespace-pre-line
              leading-7
              text-[#51607d]
            "
          >
            {
              data.aboutText
            }
          </p>

          <div
            className="
              mt-7
              grid
              gap-3
              sm:grid-cols-2
            "
          >
            <UniversityInfoBadge
              label="Scholarship"
              value={
                data.scholarship
              }
            />

            <UniversityInfoBadge
              label="IELTS"
              value={
                data.withoutIelts
              }
            />

            <UniversityInfoBadge
              label="GRE"
              value={
                data.withoutGre
              }
            />

            <UniversityInfoBadge
              label="GMAT"
              value={
                data.withoutGmat
              }
            />
          </div>

          <button
            type="button"
            onClick={
              onCourses
            }
            className="
              mt-7
              inline-flex
              items-center
              gap-3
              rounded-xl
              bg-primary
              px-6
              py-3.5
              font-bold
              text-white
              transition
              hover:bg-darkPrimary
            "
          >
            Explore Courses

            <ArrowRight
              className="
                size-4
              "
            />
          </button>
        </article>

        <article
          className="
            rounded-[28px]
            border
            border-slate-100
            bg-white
            p-6
            shadow-[0_16px_40px_rgba(15,23,42,0.08)]
            sm:p-8
          "
        >
          <p
            className="
              text-xs
              font-black
              uppercase
              tracking-[0.15em]
              text-secondary
            "
          >
            Quick Info
          </p>

          <div
            className="
              mt-5
              space-y-3
            "
          >
            <UniversityFactRow
              label="Country"
              value={
                data.countryName
              }
            />

            <UniversityFactRow
              label="Location"
              value={
                data.locationText
              }
            />

            <UniversityFactRow
              label="Type"
              value={
                data.universityType
              }
            />

            <UniversityFactRow
              label="Ranking"
              value={
                data.ranking
              }
            />

            {Array.isArray(
              data.infoItems
            ) &&
              data.infoItems.map(
                (
                  item,
                  index
                ) => {
                  const content =
                    item?.text ||
                    item?.description ||
                    "";

                  if (!content) {
                    return null;
                  }

                  const [
                    label,
                    ...rest
                  ] =
                    String(
                      content
                    ).split(
                      ":"
                    );

                  return (
                    <UniversityFactRow
                      key={
                        item?.id ||
                        index
                      }
                      label={
                        label?.trim() ||
                        `Info ${index + 1}`
                      }
                      value={
                        rest.length
                          ? rest
                              .join(
                                ":"
                              )
                              .trim()
                          : content
                      }
                    />
                  );
                }
              )}
          </div>
        </article>
      </section>

      <UniversityStats
        data={
          data
        }
      />

      <UniversityMap
        data={
          data
        }
      />

      <section
        className="
          mt-4
          bg-white
          pt-5
        "
      >
        <FAQ />
      </section>
    </div>
  );
}