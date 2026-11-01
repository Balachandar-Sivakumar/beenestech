"use client";

import { useEffect, useState } from "react";

// Every item is rendered invisibly in the same grid cell so the box is always as wide
// as the longest item: rotating never shifts layout (CLS stays 0). Static under reduced motion.
export function RotatingText({ items, interval = 2200 }: { items: readonly string[]; interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [items.length, interval]);

  return (
    <span className="inline-grid align-bottom whitespace-nowrap">
      {items.map((item) => (
        <span key={item} className="invisible col-start-1 row-start-1">
          {item}
        </span>
      ))}
      <span key={index} className="col-start-1 row-start-1 animate-rotate-in text-honey-400 motion-reduce:animate-none">
        {items[index]}
      </span>
    </span>
  );
}
