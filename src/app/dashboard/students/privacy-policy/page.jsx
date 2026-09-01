"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ExternalLink,
  LoaderCircle,
  X,
} from "lucide-react";

  const PRIVACY_API_URL =
  "/api/dashboard/student/privacy-policy";

export default function PrivacyPolicyPage() {
  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (
      event
    ) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.body.style.overflow =
      "hidden";

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        "";

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open]);

  const openPolicy = () => {
    setLoading(true);
    setOpen(true);
  };

  const closePolicy = () => {
    setOpen(false);
    setLoading(false);
  };

  return (
    <>
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold text-darkPrimary">
            Privacy Policy
          </h2>

          <p className="mt-4 text-slate-600">
            Read our privacy policy to understand how we collect, use, and
            protect your information.
          </p>

          <button
            type="button"
            onClick={openPolicy}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-darkPrimary"
          >
            View Privacy Policy

            <ExternalLink
              size={18}
              aria-hidden="true"
            />
          </button>
        </div>
      </main>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-policy-title"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
          onMouseDown={closePolicy}
        >
          <div
            className="relative flex h-[92vh] w-[90%] max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <header className="flex items-center justify-between border-b border-primary/20 px-6 py-4">
              <h2
                id="privacy-policy-title"
                className="text-lg font-black text-black"
              >
                Privacy Policy
              </h2>

              <button
                type="button"
                onClick={closePolicy}
                aria-label="Close privacy policy"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white transition hover:bg-darkPrimary"
              >
                <X
                  size={16}
                  aria-hidden="true"
                />
              </button>
            </header>

            <div className="relative flex-1">
              {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
                  <LoaderCircle
                    className="animate-spin text-primary"
                    size={34}
                    aria-label="Loading privacy policy"
                  />
                </div>
              )}

<iframe
  src={PRIVACY_API_URL}
  title="Privacy Policy"
  className="h-full w-full border-0"
  onLoad={() =>
    setLoading(false)
  }
/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}