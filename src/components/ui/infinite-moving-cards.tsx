"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

// "White theme" version: removes all dark: classes and enforces white/light backgrounds and text
export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      // Clone items for seamless infinite scroll
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Make sure we have enough items to create a seamless loop
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      // Set animation direction
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }

      // Set animation speed
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "30s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "45s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "60s");
      }

      // Start animation
      setStart(true);
    }
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          width: "max-content",
          display: "flex",
          flexWrap: "nowrap"
        }}
      >
        {items.map((item, idx) => (
          <li
            className="relative flex-shrink-0 rounded-2xl border border-zinc-200 bg-white shadow-md px-8 py-6 max-w-[450px] transition-all duration-300 hover:shadow-lg hover:scale-[1.01] flex flex-col"
            key={`${item.name}-${idx}`}
            style={{ minWidth: "300px" }}
          >
            <blockquote className="flex flex-col h-full">
              <span className="relative z-20 text-sm leading-[1.6] font-normal text-neutral-800 mb-auto">
                "{item.quote}"
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 font-semibold text-lg mr-3">
                  {item.name.charAt(0)}
                </div>
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] font-semibold text-neutral-700">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] font-normal text-neutral-500">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
