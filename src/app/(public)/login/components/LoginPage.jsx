import LoginForm from "./LoginForm";
import LoginMobileApp from "./LoginMobileApp";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.medcity.overseas";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-full w-full fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]"
    >
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </svg>
  );
}

function BackgroundEffects() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_12%_18%,rgba(220,9,84,0.2),transparent_30%),radial-gradient(circle_at_88%_82%,rgba(120,70,210,0.2),transparent_32%),linear-gradient(135deg,#08050f_0%,#10091d_50%,#07040d_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-20 -z-20 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:42px_42px] animate-[loginGrid_24s_linear_infinite] motion-reduce:animate-none"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[540px] w-[980px] -translate-x-1/2 -translate-y-1/2 rounded-[80px] bg-[radial-gradient(circle_at_28%_50%,rgba(213,9,84,0.24),transparent_42%),radial-gradient(circle_at_75%_50%,rgba(118,73,216,0.24),transparent_44%)] blur-3xl"
      />
    </>
  );
}

function DownloadAppButton() {
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-[54px] w-full items-center justify-between gap-3 rounded-xl border border-[#d30b55]/15 bg-gradient-to-r from-[#d30b55] via-[#b40a50] to-[#79053a] px-4 text-white no-underline shadow-[0_10px_26px_rgba(196,12,78,0.28)] transition duration-200 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_16px_32px_rgba(196,12,78,0.4)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#d30b55]/25"
    >
      <span className="min-w-0">
        <strong className="block text-[0.78rem] font-bold">
          Download our Mobile App
        </strong>

        <small className="mt-0.5 block truncate text-[0.65rem] leading-4 text-white/75">
          Find universities and courses on the go.
        </small>
      </span>

      <span
        aria-hidden="true"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-[#c81759] shadow-sm transition-transform duration-200 group-hover:translate-x-1"
      >
        <span className="h-3.5 w-3.5">
          <ArrowIcon />
        </span>
      </span>
    </a>
  );
}

function MobilePanel() {
  return (
    <aside
      aria-label="Medcity mobile application"
      className="hidden h-full min-h-0 bg-white lg:grid lg:grid-rows-[minmax(0,1fr)_66px]"
    >
      <div
        className="relative min-h-0 overflow-hidden bg-[radial-gradient(circle_at_50%_55%,rgba(224,25,93,0.08),transparent_42%),#fff]"
      >
        <div className="absolute inset-0">
          <LoginMobileApp />
        </div>
      </div>

      <div className="relative z-20 flex items-center px-4 pb-3 pt-1">
        <DownloadAppButton />
      </div>
    </aside>
  );
}

export default function LoginPage({
  onSubmit,
  loading = false,
  error = "",
}) {
  return (
    <main
      className="relative isolate flex min-h-[calc(100dvh-140px)] items-center justify-center overflow-hidden bg-[#08050f] px-4 py-6 lg:px-6"
    >
      <BackgroundEffects />

      <section
        className="relative mx-auto grid w-full max-w-[940px] grid-cols-1 overflow-hidden rounded-[22px] border border-white/15 bg-white/[0.04] shadow-[0_0_38px_rgba(213,9,84,0.25),0_0_80px_rgba(118,73,216,0.2),0_25px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl lg:h-[490px] lg:grid-cols-[0.9fr_1fr]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 translate-x-[-120%] bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.04)_45%,transparent_70%)] animate-[loginShine_8s_ease-in-out_infinite] motion-reduce:animate-none"
        />

        <MobilePanel />

        <LoginForm
          onSubmit={onSubmit}
          loading={loading}
          error={error}
        />
      </section>
    </main>
  );
}