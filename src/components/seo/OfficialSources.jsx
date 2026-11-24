import { ExternalLink, ArrowUpRight, Plane } from "lucide-react";

/*
 * Official sources
 * links: [{ label, href, note? }]
 */

export default function OfficialSources({
  links,
  title = "Official sources",
  intro,
  className = "",
}) {
  const list = (links ?? []).filter(
    (link) => link?.href && /^https:\/\//i.test(link.href)
  );

  if (!list.length) return null;

  const cardStyles = [
    {
      iconBg: "bg-pink-50",
      iconColor: "text-pink-600",
      arrowBg: "bg-pink-50",
      glow: "bg-pink-100/50",
      border: "hover:border-pink-200",
    },
    {
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      arrowBg: "bg-blue-50",
      glow: "bg-blue-100/50",
      border: "hover:border-blue-200",
    },
    {
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      arrowBg: "bg-amber-50",
      glow: "bg-amber-100/50",
      border: "hover:border-amber-200",
    },
    {
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      arrowBg: "bg-violet-50",
      glow: "bg-violet-100/50",
      border: "hover:border-violet-200",
    },
  ];

  return (
    <section
      className={`relative isolate mx-auto w-full max-w-6xl bg-gray-50 border border-gray-100 rounded-4xl min-w-0 overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20 ${className}`}
    >
     
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-20 -z-10 h-64 w-64 rounded-full bg-pink-50/60 blur-3xl"
      />

      {/* Heading */}
      <div className="mb-7 sm:mb-9 lg:mb-11">
        <div className="mb-4 h-1.5 w-14 rounded-full bg-primary sm:w-16" />

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-[26px] font-black leading-tight tracking-tight text-[#071D49] sm:text-3xl lg:text-[42px]">
              {title}
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
              {intro ??
                "Rules, fees and requirements change. Check the latest details on these official websites before you apply."}
            </p>
          </div>

          <div
            aria-hidden="true"
            className="hidden shrink-0 -rotate-12 rounded-2xl bg-blue-50 border border-blue-50 shadow-sm p-4 text-primary lg:flex"
          >
            <Plane size={32} strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Responsive cards */}
      <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        {list.map((link, index) => {
          const style = cardStyles[index % cardStyles.length];

          return (
            <li key={link.href} className="min-w-0">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex h-full min-w-0 items-center gap-3 overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.1)] sm:gap-4 sm:p-5 lg:min-h-[150px] lg:rounded-[26px] lg:p-6 ${style.border}`}
              >
                {/* Background glow */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -bottom-16 -right-12 h-32 w-40 rounded-full blur-2xl ${style.glow}`}
                />

                {/* Icon */}
                <div
                  className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl sm:h-16 sm:w-16 sm:rounded-2xl lg:h-[76px] lg:w-[76px] ${style.iconBg} ${style.iconColor}`}
                >
                  <ExternalLink
                    size={24}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className="sm:h-7 sm:w-7"
                  />
                </div>

                {/* Divider - hidden on small screens */}
                <div className="hidden h-16 w-px shrink-0 bg-slate-200 sm:block lg:h-20" />

                {/* Text content */}
                <div className="relative min-w-0 flex-1">
                  <h3 className="break-words text-sm font-extrabold leading-snug text-[#071D49] transition-colors group-hover:text-pink-600 sm:text-base lg:text-lg">
                    {link.label}
                  </h3>

                  {link.note && (
                    <p className="mt-1.5 break-words text-xs leading-5 text-slate-500 sm:mt-2 sm:text-sm sm:leading-6">
                      {link.note}
                    </p>
                  )}
                </div>

                {/* Arrow */}
                <div
                  className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1 sm:h-10 sm:w-10 ${style.arrowBg} ${style.iconColor}`}
                >
                  <ArrowUpRight
                    size={18}
                    strokeWidth={2.2}
                    aria-hidden="true"
                    className="sm:h-5 sm:w-5"
                  />
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}