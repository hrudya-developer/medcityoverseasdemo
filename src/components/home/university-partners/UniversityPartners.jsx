"use client";

import { useEffect, useState } from "react";
import CarouselButton from "./CarouselButton";
import CarouselDots from "./CarouselDots";
import PartnerCard from "./PartnerCard";
import { universityPartners } from "./partners";
import Link from "next/link";

function getCardsPerPage(width) {
  if (width < 640) return 1;
  if (width < 900) return 2;
  if (width < 1200) return 3;

  return 5;
}

export default function UniversityPartners() {
  const [activePage, setActivePage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(5);

  useEffect(() => {
    const updateCards = () => {
      setCardsPerPage(getCardsPerPage(window.innerWidth));
      setActivePage(0);
    };

    updateCards();

    window.addEventListener("resize", updateCards);

    return () => {
      window.removeEventListener("resize", updateCards);
    };
  }, []);

  const pageCount = Math.ceil(
    universityPartners.length / cardsPerPage
  );

  const nextSlide = () => {
    setActivePage((current) =>
      current === pageCount - 1 ? 0 : current + 1
    );
  };

  const previousSlide = () => {
    setActivePage((current) =>
      current === 0 ? pageCount - 1 : current - 1
    );
  };

  return (
    <section className="relative overflow-hidden bg-[#f4f4f4] py-16 lg:py-20">
      <BackgroundDecor />

      <div className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-8">
        <Header />

        <div className="mt-10 flex items-center gap-2 sm:gap-5">
          <CarouselButton
            direction="left"
            onClick={previousSlide}
          />

          <div className="min-w-0 flex-1 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${activePage * 100}%)`,
              }}
            >
              {Array.from({ length: pageCount }).map(
                (_, pageIndex) => {
                  const start = pageIndex * cardsPerPage;

                  const partners = universityPartners.slice(
                    start,
                    start + cardsPerPage
                  );

                  return (
                    <div
                      key={pageIndex}
                      className="grid w-full shrink-0 gap-4 lg:gap-5"
                      style={{
                        gridTemplateColumns: `repeat(${cardsPerPage}, minmax(0, 1fr))`,
                      }}
                    >
                      {partners.map((partner) => (
                        <PartnerCard
                          key={partner.id}
                          partner={partner}
                        />
                      ))}
                    </div>
                  );
                }
              )}
            </div>
          </div>

          <CarouselButton
            direction="right"
            onClick={nextSlide}
          />
        </div>

        {pageCount > 1 && (
          <CarouselDots
            count={pageCount}
            active={activePage}
            onChange={setActivePage}
          />
        )}
      </div>

      <div><Link href="/universities" className="text-center text-sm font-semibold leading-6 text-primary hover:text-darkPrimary mt-8 block underline">View All University Partners →</Link></div>
    </section>

  );
}

function Header() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
        Our Global Network
      </p>

      <div className="mx-auto mt-3 h-px w-12 bg-pink-300" />

      <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-darkPrimary">
        Our University{" "}
        <span className="text-primary">
          Partners
        </span>
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
        We collaborate with leading universities around
        the world to provide life-changing study abroad
        opportunities.
      </p>
    </div>
  );
}

function BackgroundDecor() {
  return (
    <>
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-pink-100/50 blur-3xl" />

      <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-pink-100/50 blur-3xl" />
    </>
  );
}