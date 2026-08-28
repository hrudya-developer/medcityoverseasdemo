"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Check,
  ChevronDown,
} from "lucide-react";

export default function FilterSelect({
  label,
  value,
  onChange,
  placeholder,
  options = [],
  disabled = false,
}) {
  const [open, setOpen] =
    useState(false);

  const dropdownRef =
    useRef(null);

  const validOptions =
    options.filter(
      (item) =>
        item?.value !== undefined &&
        item?.value !== null &&
        String(
          item.value
        ).trim() !== "" &&
        item?.label !== undefined &&
        item?.label !== null &&
        String(
          item.label
        ).trim() !== ""
    );

  const selected =
    validOptions.find(
      (item) =>
        String(item.value) ===
        String(value)
    );

  useEffect(() => {
    const closeDropdown = (
      event
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      closeDropdown
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        closeDropdown
      );
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      {label && (
        <label className="mb-2 block text-xs font-black uppercase tracking-[0.1em] text-slate-500">
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() =>
          setOpen(
            (current) =>
              !current
          )
        }
        className="
          flex h-11 w-full
          items-center justify-between
          rounded-xl
          border border-slate-200
          bg-white px-4
          text-left text-sm
          shadow-sm
          transition
          hover:border-[#c01f53]/50
          focus:border-[#c01f53]
          focus:outline-none
          disabled:cursor-not-allowed
          disabled:bg-slate-50
          disabled:text-slate-400
        "
      >
        <span className="min-w-0 flex-1 truncate">
          {selected?.label ||
            placeholder}
        </span>

        <ChevronDown
          size={17}
          className={`
            ml-3 shrink-0
            transition-transform
            ${
              open
                ? "rotate-180 text-[#c01f53]"
                : "text-slate-400"
            }
          `}
        />
      </button>

      {open && !disabled && (
        <div
          className="
            custom-scrollbar
            absolute left-0 right-0
            top-full z-[80]
            mt-2
            max-h-56
            overflow-y-auto
            rounded-xl
            border border-slate-200
            bg-white
            p-1.5
            shadow-2xl
          "
        >
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-slate-400 transition hover:bg-slate-50"
          >
            {placeholder}
          </button>

          {validOptions.map(
            (item) => {
              const active =
                String(
                  item.value
                ) ===
                String(value);

              return (
                <button
                  key={`${item.value}-${item.label}`}
                  type="button"
                  onClick={() => {
                    onChange(
                      item.value
                    );

                    setOpen(
                      false
                    );
                  }}
                  className={`
                    flex w-full
                    items-center
                    justify-between
                    gap-3
                    rounded-lg
                    px-3 py-2.5
                    text-left text-sm
                    font-semibold
                    transition
                    ${
                      active
                        ? "bg-[#c01f53] text-white"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                    }
                  `}
                >
                  <span className="min-w-0 truncate">
                    {
                      item.label
                    }
                  </span>

                  {active && (
                    <Check
                      size={15}
                      className="shrink-0"
                    />
                  )}
                </button>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}