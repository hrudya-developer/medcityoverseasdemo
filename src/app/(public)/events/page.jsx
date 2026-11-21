
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Phone,
  Video,
  Users,
  PlayCircle,
  GraduationCap,
  CalendarClock,
} from "lucide-react";

import EventsCarousel from "./EventsCarousel";

import PageSchema from "@/components/seo/PageSchema";
import {
  eventDateTimeLabel,
  eventShortDateLabel,
} from "@/lib/eventFormat";
import {
  absoluteEventUrl,
  getPublishedEvents,
} from "@/lib/events";
import { applySeoOverrides } from "@/lib/pageSeo";
import {
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  pageUrl,
} from "@/lib/seoSchema";

// Keep dynamic fetching unchanged.
export const dynamic = "force-dynamic";

const PAGE_PATH = "/events";
const PAGE_TITLE = "Events and Webinars";
const PAGE_DESCRIPTION =
  "Upcoming events and live webinars by Medcity Overseas for students and nurses planning to study or work abroad. See the dates and register online.";

export async function generateMetadata() {
  return applySeoOverrides({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    alternates: { canonical: PAGE_PATH },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: pageUrl(PAGE_PATH),
      siteName: "Medcity Overseas",
      title: `${PAGE_TITLE} | Medcity Overseas`,
      description: PAGE_DESCRIPTION,
    },
    twitter: {
      card: "summary_large_image",
      title: `${PAGE_TITLE} | Medcity Overseas`,
      description: PAGE_DESCRIPTION,
    },
  });
}

function EventCard({ event }) {
  const online = event.mode !== "offline";
  return (
    <li className="flex w-[min(88vw,360px)] shrink-0 snap-start sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)]">
      <article className="group flex w-full min-w-0 flex-col overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_12px_32px_-20px_rgba(15,23,42,0.35)] transition-shadow hover:shadow-[0_18px_40px_-18px_rgba(15,23,42,0.3)]">
        <Link href={event.url} tabIndex={-1} aria-hidden="true" className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
          {event.poster && (
            <Image src={event.poster} unoptimized={/^https?:/i.test(event.poster)} alt="" fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 88vw"
              className={`object-cover object-top transition-transform duration-500 group-hover:scale-[1.04] ${event.isPast ? "grayscale-[60%]" : ""}`} />
          )}
          {event.isPast && <span className="absolute left-4 top-4 rounded-full bg-[#243c63]/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white">Past event</span>}
        </Link>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="flex items-center gap-2 text-sm font-semibold text-[#d41462]">
            <CalendarDays size={17} aria-hidden="true" />
            <time dateTime={event.startsAtIso}>{event.isPast ? eventShortDateLabel(event.startsAtIso) : eventDateTimeLabel(event.startsAtIso)}</time>
          </p>
          <h3 className="mt-3 font-nunito text-lg font-extrabold leading-snug text-[#101b3c] sm:text-xl">
            <Link href={event.url} className="transition hover:text-[#d41462] focus:outline-none focus-visible:underline">{event.title}</Link>
          </h3>
          {event.subtitle && <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{event.subtitle}</p>}
          <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            {online ? <Video size={17} aria-hidden="true" /> : <MapPin size={17} aria-hidden="true" />}
            <span>{event.venue || (online ? "Online" : "Venue to be announced")}</span>
          </p>
          <div className="mt-auto pt-5">
            {event.isPast ? (
              <Link href={event.url} aria-label={`View details: ${event.title}`}
                className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#d41462] transition hover:gap-3 hover:underline">
                View details <ArrowRight size={17} aria-hidden="true" />
              </Link>
            ) : (
              <Link href={event.registrationOpen ? `${event.url}#register` : event.url}
                aria-label={`${event.registrationOpen ? "Register" : "View details"}: ${event.title}`}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#d41462] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#a70e4a] focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-200">
                {event.registrationOpen ? "Register" : "View details"} <ArrowRight size={17} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </article>
    </li>
  );
}


function Feature({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-[#ff79ab] backdrop-blur-sm sm:size-12">
        <Icon size={21} strokeWidth={2} aria-hidden="true" />
      </span>

      <span className="text-sm font-extrabold text-white sm:text-base">
        {children}
      </span>
    </div>
  );
}

function SectionHeading({ id, icon: Icon, title, description, count, blue = false }) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-3">
      <span className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${blue ? "bg-[#edf3ff] text-[#315d99]" : "bg-[#fff0f5] text-[#d41462]"}`}><Icon size={23} aria-hidden="true" /></span>
      <div className="min-w-0 flex-1">
        <h2 id={id} className="font-nunito text-xl font-black text-[#101b3c] sm:text-2xl">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      {count > 0 && <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600">{count} {count === 1 ? "Event" : "Events"}</span>}
    </div>
  );
}

export default async function EventsPage() {
  const events = await getPublishedEvents();
  const upcoming = events.filter((event) => !event.isPast);
  const past = events.filter((event) => event.isPast);

  const itemList = {
    "@type": "ItemList",
    "@id": `${pageUrl(PAGE_PATH)}#events`,
    name: PAGE_TITLE,
    numberOfItems: events.length,
    itemListElement: events.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteEventUrl(event),
      name: event.title,
    })),
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fff8fb] via-white to-[#f8faff]">
      <PageSchema path={PAGE_PATH} type="CollectionPage" name={PAGE_TITLE} description={PAGE_DESCRIPTION}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Events", path: PAGE_PATH }]}
        mainEntity={{ "@id": itemList["@id"] }} entities={[itemList]} />

      <div className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:px-10 lg:pb-24">
       
<header className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#07152f] via-darkPrimary to-[#123e70] px-6 py-9 shadow-[0_20px_60px_rgba(4,20,48,0.18)] sm:px-10 sm:py-12 lg:px-14">

  {/* Grid Pattern */}
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.12]"
    style={{
      backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.25) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.25) 1px, transparent 1px)
      `,
      backgroundSize: "42px 42px",
    }}
  />

  {/* Decorative Gradient Glows */}
  <div className="pointer-events-none absolute -right-20 -top-28 size-72 rounded-full bg-blue-400/20 blur-3xl" />
  <div className="pointer-events-none absolute -bottom-28 left-1/3 size-72 rounded-full bg-pink-500/10 blur-3xl" />

  {/* Content */}
  <div className="relative z-10 max-w-4xl">

    {/* Eyebrow */}
    <div className="flex items-center gap-3">
      <span className="h-1.5 w-9 rounded-full bg-[#f72575]" />
      <span className="h-1.5 w-3 rounded-full bg-yellow-400" />

      <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-pink-200">
        Medcity Overseas
      </span>
    </div>

    {/* Heading */}
    <h1 className="mt-5 font-nunito text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
      Events and{" "}
      <span className="text-[#ff5b9a]">
        Webinars
      </span>
    </h1>

    {/* Description */}
    <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">
      Join our live webinars and events to learn about studying
      and working abroad, ask our counsellors your questions
      and plan your next steps. Register online for any
      upcoming event.
    </p>

    {/* Features */}
    <div className="mt-7 flex flex-wrap gap-x-7 gap-y-4">
      <Feature icon={Video}>Live Sessions</Feature>
      <Feature icon={GraduationCap}>Expert Guidance</Feature>
      <Feature icon={Users}>
        Q&amp;A with Counsellors
      </Feature>
    </div>

  </div>
</header>

        {events.length === 0 ? (
          <section className="mt-12 rounded-[28px] border border-pink-100 bg-white p-8 text-center shadow-sm sm:p-12">
            <span className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-[#fff0f5] text-[#d41462]"><CalendarDays size={38} aria-hidden="true" /></span>
            <h2 className="mt-5 font-nunito text-2xl font-black text-[#101b3c]">No events scheduled right now</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">New webinars are added here when they are announced. Meanwhile, our team is happy to answer your questions.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={`tel:${CONTACT_PHONE}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#d41462] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a70e4a]"><Phone size={17} aria-hidden="true" />{CONTACT_PHONE_DISPLAY}</a>
              <Link href="/contact-us" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#d41462] px-6 py-3 text-sm font-bold text-[#d41462] transition hover:bg-[#fff0f5]">Contact us</Link>
            </div>
          </section>
        ) : (
          <div className="mt-12 space-y-12 sm:mt-14 sm:space-y-16">
            <section aria-labelledby="events-upcoming">
              <SectionHeading id="events-upcoming" icon={CalendarDays} title="Upcoming Events" description="Discover upcoming sessions and webinars." count={upcoming.length} />
              {upcoming.length ? (
                <EventsCarousel label="Upcoming Events" count={upcoming.length}>
                  {upcoming.map((event) => <EventCard key={event.slug} event={event} />)}
                </EventsCarousel>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-[24px] border border-dashed border-pink-200 bg-[#fff8fb] px-5 py-12 text-center sm:py-14">
                  <span className="flex size-16 items-center justify-center rounded-2xl bg-white text-[#d41462] shadow-sm"><CalendarClock size={32} aria-hidden="true" /></span>
                  <h3 className="mt-5 font-nunito text-lg font-black text-[#101b3c]">No upcoming events right now.</h3>
                  <p className="mt-2 max-w-sm text-sm leading-7 text-[#657089]">New webinars are added here when they are announced.</p>
                </div>
              )}
            </section>
            {past.length > 0 && (
              <section aria-labelledby="events-past">
                <SectionHeading id="events-past" icon={PlayCircle} title="Past Events" description="Explore previous events and webinars." count={past.length} blue />
                <EventsCarousel label="Past Events" count={past.length}>
                  {past.map((event) => <EventCard key={event.slug} event={event} />)}
                </EventsCarousel>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
