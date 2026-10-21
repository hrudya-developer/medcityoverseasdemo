import { CheckCircle2 } from "lucide-react";

export default function BranchesInfo({
  branch,
}) {
  if (!branch) {
    return null;
  }

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <article className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_15px_50px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-primary">
            About Our Branch
          </p>

          <h2 className="mt-3 text-2xl font-black leading-tight text-secondary sm:text-3xl">
            {branch.heading}
          </h2>

          <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
            <p>{branch.introduction}</p>
            <p>{branch.coverage}</p>
          </div>

          <h3 className="mt-8 text-lg font-black text-secondary">
            Our services include:
          </h3>

          <ul className="mt-4 space-y-3">
            {branch.services.map((service) => (
              <li
                key={service}
                className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-700"
              >
                <CheckCircle2
                  size={19}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-primary"
                />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
