import {
  ArrowUpRight,
  Globe2,
  GraduationCap,
  Sparkles,
} from "lucide-react";

export default function UniversitiesSeoContent() {
  return (
      <section
          className="
              relative
              isolate
              overflow-hidden
              border-y
              border-slate-200/80
              bg-[#f8fafc]
          "
      >
          {/* =================================================
              BACKGROUND DECOR
          ================================================= */}

          <div
              aria-hidden="true"
              className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-[linear-gradient(rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.025)_1px,transparent_1px)]
                  bg-[size:34px_34px]
              "
          />

          <div
              aria-hidden="true"
              className="
                  pointer-events-none
                  absolute
                  -left-36
                  top-10
                  h-[340px]
                  w-[340px]
                  rounded-full
                  bg-primary/10
                  blur-[110px]
              "
          />

          <div
              aria-hidden="true"
              className="
                  pointer-events-none
                  absolute
                  -right-32
                  bottom-0
                  h-[360px]
                  w-[360px]
                  rounded-full
                  bg-secondary/10
                  blur-[120px]
              "
          />

          {/* =================================================
              CONTENT
          ================================================= */}

          <div
              className="
                  relative
                  z-10
                  mx-auto
                  grid
                  max-w-7xl
                  gap-10
                  px-5
                  py-16

                  lg:grid-cols-[0.92fr_1.08fr]
                  lg:items-center
                  lg:gap-16
                  lg:px-8
                  lg:py-24
              "
          >
              {/* =================================================
                  LEFT
              ================================================= */}

              <div
                  className="
                      relative
                      overflow-hidden
                      rounded-[32px]
                      border
                      border-white/80
                      bg-white/80
                      p-7
                      shadow-[0_18px_55px_rgba(15,23,42,0.08)]
                      backdrop-blur-xl

                      sm:p-9
                      lg:p-10
                  "
              >
                  {/* accent line */}

                  <div
                      aria-hidden="true"
                      className="
                          absolute
                          left-0
                          top-8
                          h-20
                          w-1.5
                          rounded-r-full
                          bg-gradient-to-b
                          from-primary
                          via-secondary
                          to-logoYellow
                      "
                  />

                  {/* glow */}

                  <div
                      aria-hidden="true"
                      className="
                          pointer-events-none
                          absolute
                          -right-20
                          -top-20
                          h-56
                          w-56
                          rounded-full
                          bg-primary/10
                          blur-3xl
                      "
                  />

                  <span
                      className="
                          relative
                          inline-flex
                          items-center
                          gap-2
                          rounded-full
                          border
                          border-secondary/15
                          bg-secondary/10
                          px-4
                          py-2
                          text-xs
                          font-black
                          uppercase
                          tracking-[0.14em]
                          text-secondary
                      "
                  >
                      <Globe2
                          size={15}
                          aria-hidden="true"
                      />

                      Study Abroad
                  </span>

                  <h2
                      className="
                          relative
                          mt-6
                          max-w-xl
                          text-3xl
                          font-black
                          leading-[1.12]
                          tracking-[-0.035em]
                          text-[#071641]

                          sm:text-4xl
                          lg:text-[2.7rem]
                      "
                  >
                      Find the Right
                      International University
                      for Your Future
                  </h2>

                  <p
                      className="
                          relative
                          mt-5
                          max-w-lg
                          text-sm
                          leading-7
                          text-slate-500
                          sm:text-base
                      "
                  >
                      Explore universities that
                      align with your academic
                      goals, preferred destination,
                      budget and long-term career
                      plans.
                  </p>

                  {/* small feature strip */}

                  <div
                      className="
                          relative
                          mt-8
                          grid
                          gap-3
                          sm:grid-cols-2
                      "
                  >
                      <div
                          className="
                              flex
                              items-center
                              gap-3
                              rounded-2xl
                              border
                              border-slate-200/80
                              bg-white
                              p-4
                              shadow-sm
                          "
                      >
                          <span
                              className="
                                  grid
                                  size-10
                                  shrink-0
                                  place-items-center
                                  rounded-xl
                                  bg-primary/10
                                  text-primary
                              "
                          >
                              <GraduationCap
                                  size={18}
                                  aria-hidden="true"
                              />
                          </span>

                          <div>
                              <p
                                  className="
                                      text-sm
                                      font-black
                                      text-darkPrimary
                                  "
                              >
                                  Compare Options
                              </p>

                              <p
                                  className="
                                      mt-0.5
                                      text-xs
                                      text-slate-500
                                  "
                              >
                                  Courses & universities
                              </p>
                          </div>
                      </div>

                      <div
                          className="
                              flex
                              items-center
                              gap-3
                              rounded-2xl
                              border
                              border-slate-200/80
                              bg-white
                              p-4
                              shadow-sm
                          "
                      >
                          <span
                              className="
                                  grid
                                  size-10
                                  shrink-0
                                  place-items-center
                                  rounded-xl
                                  bg-secondary/10
                                  text-secondary
                              "
                          >
                              <Sparkles
                                  size={18}
                                  aria-hidden="true"
                              />
                          </span>

                          <div>
                              <p
                                  className="
                                      text-sm
                                      font-black
                                      text-darkPrimary
                                  "
                              >
                                  Expert Guidance
                              </p>

                              <p
                                  className="
                                      mt-0.5
                                      text-xs
                                      text-slate-500
                                  "
                              >
                                  Plan with confidence
                              </p>
                          </div>
                      </div>
                  </div>
              </div>

              {/* =================================================
                  RIGHT
              ================================================= */}

              <div
                  className="
                      grid
                      gap-5
                  "
              >
                  <article
                      className="
                          group
                          relative
                          overflow-hidden
                          rounded-[28px]
                          border
                          border-slate-200/80
                          bg-white
                          p-6
                          shadow-[0_14px_40px_rgba(15,23,42,0.06)]
                          transition-all
                          duration-300

                          hover:-translate-y-1
                          hover:border-primary/20
                          hover:shadow-[0_22px_55px_rgba(99,26,51,0.10)]

                          sm:p-7
                      "
                  >
                      <div
                          aria-hidden="true"
                          className="
                              pointer-events-none
                              absolute
                              -right-12
                              -top-12
                              size-32
                              rounded-full
                              bg-primary/10
                              blur-3xl
                          "
                      />

                      <div
                          className="
                              relative
                              flex
                              items-start
                              gap-4
                          "
                      >
                          <span
                              className="
                                  grid
                                  size-12
                                  shrink-0
                                  place-items-center
                                  rounded-2xl
                                  bg-gradient-to-br
                                  from-primary
                                  to-darkPrimary
                                  text-white
                                  shadow-lg
                                  shadow-primary/20
                              "
                          >
                              <span
                                  className="
                                      text-sm
                                      font-black
                                  "
                              >
                                  01
                              </span>
                          </span>

                          <div
                              className="
                                  min-w-0
                              "
                          >
                              <p
                                  className="
                                      text-xs
                                      font-black
                                      uppercase
                                      tracking-[0.14em]
                                      text-primary
                                  "
                              >
                                  Make the Right Choice
                              </p>

                              <p
                                  className="
                                      mt-2
                                      text-base
                                      leading-7
                                      text-slate-600
                                  "
                              >
                                  Choosing a university
                                  abroad is an important
                                  decision for Indian
                                  students. The right
                                  university should match
                                  your academic interests,
                                  budget and career plans.
                              </p>
                          </div>
                      </div>
                  </article>

                  <article
                      className="
                          group
                          relative
                          overflow-hidden
                          rounded-[28px]
                          border
                          border-slate-200/80
                          bg-gradient-to-br
                          from-[#eef7ff]
                          via-white
                          to-[#fff3f7]
                          p-6
                          shadow-[0_14px_40px_rgba(15,23,42,0.06)]
                          transition-all
                          duration-300

                          hover:-translate-y-1
                          hover:border-secondary/20
                          hover:shadow-[0_22px_55px_rgba(4,102,175,0.10)]

                          sm:p-7
                      "
                  >
                      <div
                          aria-hidden="true"
                          className="
                              pointer-events-none
                              absolute
                              -bottom-12
                              -left-12
                              size-36
                              rounded-full
                              bg-secondary/10
                              blur-3xl
                          "
                      />

                      <div
                          className="
                              relative
                              flex
                              items-start
                              gap-4
                          "
                      >
                          <span
                              className="
                                  grid
                                  size-12
                                  shrink-0
                                  place-items-center
                                  rounded-2xl
                                  bg-gradient-to-br
                                  from-secondary
                                  to-[#074c84]
                                  text-white
                                  shadow-lg
                                  shadow-secondary/20
                              "
                          >
                              <span
                                  className="
                                      text-sm
                                      font-black
                                  "
                              >
                                  02
                              </span>
                          </span>

                          <div
                              className="
                                  min-w-0
                              "
                          >
                              <p
                                  className="
                                      text-xs
                                      font-black
                                      uppercase
                                      tracking-[0.14em]
                                      text-secondary
                                  "
                              >
                                  Explore with Medcity
                              </p>

                              <p
                                  className="
                                      mt-2
                                      text-base
                                      leading-7
                                      text-slate-600
                                  "
                              >
                                  Medcity Overseas helps
                                  students explore
                                  international
                                  universities, compare
                                  courses and understand
                                  study opportunities across
                                  leading destinations.
                              </p>
                          </div>
                      </div>
                  </article>

                  {/* bottom mini CTA visual */}

                  <div
                      className="
                          flex
                          flex-col
                          gap-4
                          rounded-[24px]
                          border
                          border-primary/10
                          bg-darkPrimary
                          p-5
                          text-white
                          shadow-[0_16px_40px_rgba(99,26,51,0.18)]

                          sm:flex-row
                          sm:items-center
                          sm:justify-between
                      "
                  >
                      <div>
                          <p
                              className="
                                  text-xs
                                  font-black
                                  uppercase
                                  tracking-[0.14em]
                                  text-white/60
                              "
                          >
                              Your Study Journey
                          </p>

                          <p
                              className="
                                  mt-1
                                  text-base
                                  font-black
                              "
                          >
                              Explore universities with clarity
                          </p>
                      </div>

                      <span
                          aria-hidden="true"
                          className="
                              grid
                              size-11
                              shrink-0
                              place-items-center
                              rounded-full
                              bg-white/10
                              text-logoYellow
                          "
                      >
                          <ArrowUpRight
                              size={18}
                          />
                      </span>
                  </div>
              </div>
          </div>
      </section>
  );
}