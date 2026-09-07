import Link from "next/link";

export default function HeroBreadcrumb({
  location,
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="
        mb-7
        flex
        flex-wrap
        items-center
        justify-center
        gap-2
        text-xs
        font-semibold
        text-slate-500
        xl:justify-start
      "
    >
      <Link
        href="/"
        className="
          transition-colors
          duration-200
          hover:text-primary
        "
      >
        Home
      </Link>

      <span className="text-slate-300">
        /
      </span>

      <Link
        href="/branches"
        className="
          transition-colors
          duration-200
          hover:text-primary
        "
      >
        Branches
      </Link>

      <span className="text-slate-300">
        /
      </span>

      <span
        className="
          font-bold
          text-primary
        "
      >
        {location}
      </span>
    </nav>
  );
}