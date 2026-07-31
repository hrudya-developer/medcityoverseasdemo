"use client";

import {
  memo,
  useCallback,
  useState,
} from "react";

import FAQItem from "./FAQItem";

const FAQRight = ({ items = [] }) => {
  const [activeId, setActiveId] =
    useState(null);

  const handleToggle = useCallback(
    (itemId) => {
      setActiveId((currentId) =>
        currentId === itemId
          ? null
          : itemId
      );
    },
    []
  );

  if (!Array.isArray(items) || !items.length) {
    return null;
  }

  return (
    <div
      className="
        grid w-full grid-cols-1
        items-start gap-4
        md:grid-cols-2 md:gap-5
        xl:gap-6
      "
      data-aos="fade-up"
    >
      {items.map((item, index) => {
        const itemId =
          item.id ??
          item.question ??
          index;

        return (
          <FAQItem
            key={itemId}
            item={item}
            index={index}
            isOpen={activeId === itemId}
            onToggle={() =>
              handleToggle(itemId)
            }
          />
        );
      })}
    </div>
  );
};

export default memo(FAQRight);