"use client";

import { memo } from "react";
import cn from "@/lib/cn";

import { ChevronDown } from "lucide-react";

const FAQItem = ({
  item,
  index,
  isOpen,
  onToggle,
}) => {
  const Icon = item.icon;

  const itemId = item.id ?? index;
  const contentId = `faq-answer-${itemId}`;
  const triggerId = `faq-question-${itemId}`;

  return (
    <article
      className={cn(
        "min-w-0 self-start overflow-hidden rounded-2xl border bg-white/90 shadow-[0_10px_28px_rgba(15,23,42,0.07)] backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5",
        isOpen
          ? "border-primary/40 shadow-[0_16px_38px_rgba(192,31,83,0.13)]"
          : "border-slate-200/80 hover:border-primary/20"
      )}
    >
      <h3>
        <button
          id={triggerId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={contentId}
          className="flex w-full min-w-0 items-center gap-3 px-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:gap-4 sm:px-5"
        >
          <span
            className={cn(`
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl
              shadow-[0_8px_18px_rgba(15,23,42,0.14)]
              ${item.iconClass ?? "bg-primary text-white"}
            `)}
          >
            {Icon && (
              <Icon
                aria-hidden="true"
                className="h-5 w-5"
              />
            )}
          </span>

          <span
            className={cn(`
              min-w-0 flex-1 break-words
              text-sm font-extrabold
              leading-5 sm:text-[15px]
              ${isOpen
                ? "text-primary"
                : "text-slate-900"
              }
            `)}
          >
            {index + 1}. {item.question}
          </span>

          <ChevronDown
            aria-hidden="true"
            className={cn(`
              h-5 w-5 shrink-0
              transition-transform duration-300
              ${isOpen
                ? "rotate-180 text-primary"
                : "text-slate-500"
              }
            `)}
          />
        </button>
      </h3>

      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        className={cn(`
          grid overflow-hidden
          transition-[grid-template-rows,opacity]
          duration-300 ease-out
          ${isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
          }
        `)}
      >
        <div className="overflow-hidden">
          <p
            className="border-t border-dashed border-slate-200 px-4 pb-5 pt-4 text-sm leading-6 text-slate-600 sm:px-5"
          >
            {item.answer}
          </p>
        </div>
      </div>
    </article>
  );
};

export default memo(FAQItem);