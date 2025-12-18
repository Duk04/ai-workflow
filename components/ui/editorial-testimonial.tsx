"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  XCircle,
  type LucideIcon,
} from "lucide-react";

export type EditorialCarouselItem = {
  id: number | string;
  quote: string;
  author?: string;
  role?: string;
  company?: string;
  icon?: LucideIcon;
  iconName?: "clock" | "x-circle" | "users" | "alert-triangle";
};

const ICONS: Record<
  NonNullable<EditorialCarouselItem["iconName"]>,
  LucideIcon
> = {
  clock: Clock,
  "x-circle": XCircle,
  users: Users,
  "alert-triangle": AlertTriangle,
};

export type EditorialTestimonialProps = {
  items: EditorialCarouselItem[];
  className?: string;
  initialIndex?: number;
  showArrows?: boolean;
};

/**
 * Editorial-style carousel adapted from the provided testimonial component.
 * This version is data-driven (items props) and does not require images.
 */
export function EditorialTestimonial({
  items,
  className,
  initialIndex = 0,
  showArrows = true,
}: EditorialTestimonialProps) {
  const safeItems = useMemo(() => items ?? [], [items]);

  const [active, setActive] = useState(() =>
    Math.min(Math.max(initialIndex, 0), Math.max(safeItems.length - 1, 0))
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleChange = (index: number) => {
    if (index === active || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActive(index);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  const handlePrev = () => {
    if (safeItems.length === 0) return;
    const newIndex = active === 0 ? safeItems.length - 1 : active - 1;
    handleChange(newIndex);
  };

  const handleNext = () => {
    if (safeItems.length === 0) return;
    const newIndex = active === safeItems.length - 1 ? 0 : active + 1;
    handleChange(newIndex);
  };

  const current = safeItems[active];

  if (!current) return null;

  const IndexIcon =
    current.icon ?? (current.iconName ? ICONS[current.iconName] : undefined);

  return (
    <div className={cn("w-full max-w-3xl mx-auto px-6 py-16", className)}>
      <div className="flex items-start gap-8">
        <span
          className="text-[120px] font-light leading-none text-foreground/10 select-none transition-all duration-500"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          {String(active + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 pt-6">
          <blockquote
            className={cn(
              "text-2xl md:text-3xl font-light leading-relaxed text-foreground tracking-tight transition-all duration-300",
              isTransitioning
                ? "opacity-0 translate-x-4"
                : "opacity-100 translate-x-0"
            )}
          >
            {current.quote}
          </blockquote>

          <div
            className={cn(
              "mt-10 group transition-all duration-300 delay-100",
              isTransitioning ? "opacity-0" : "opacity-100"
            )}
          >
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-foreground/10 group-hover:ring-foreground/30 transition-all duration-300 bg-foreground/5 flex items-center justify-center">
                {IndexIcon ? (
                  <IndexIcon className="h-6 w-6 text-foreground/70" />
                ) : (
                  <span className="text-xs text-foreground/40">
                    #{active + 1}
                  </span>
                )}
              </div>

              <div>
                <p className="font-medium text-foreground">
                  {current.author ?? current.company ?? "Асуудал"}
                </p>
                {(current.role || current.company) && (
                  <p className="text-sm text-muted-foreground">
                    {current.role ?? ""}
                    {current.role && current.company && (
                      <span className="mx-2 text-foreground/20">/</span>
                    )}
                    {current.company && (
                      <span className="group-hover:text-foreground transition-colors duration-300">
                        {current.company}
                      </span>
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {safeItems.map((_, index) => (
              <button
                key={index}
                onClick={() => handleChange(index)}
                className="group relative py-4"
                aria-label={`Go to item ${index + 1}`}
              >
                <span
                  className={cn(
                    "block h-px transition-all duration-500 ease-out",
                    index === active
                      ? "w-12 bg-foreground"
                      : "w-6 bg-foreground/20 group-hover:w-8 group-hover:bg-foreground/40"
                  )}
                />
              </button>
            ))}
          </div>

          <span className="text-xs text-muted-foreground tracking-widest uppercase">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(safeItems.length).padStart(2, "0")}
          </span>
        </div>

        {showArrows && (
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full text-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full text-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
