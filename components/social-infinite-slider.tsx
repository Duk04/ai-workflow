"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

function SocialTile({
  label,
  icon: Icon,
  className,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 rounded-2xl border bg-white/5 px-8 py-6",
        "backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
        "min-w-[220px] md:min-w-[260px]",
        className
      )}
    >
      <Icon className="h-8 w-8 text-white/90" />
      <span className="text-lg font-semibold tracking-tight text-white/90">
        {label}
      </span>
    </div>
  );
}

export function SocialInfiniteSlider() {
  return (
    <section className="w-full bg-[#030303] border-t border-white/10">
      <div className="container px-4 mx-auto py-8 md:py-10">
        <div className="flex items-center justify-between gap-6 mb-6">
          <h3 className="text-base md:text-lg font-semibold text-white/80">
            Connect with us
          </h3>
          <p className="text-sm text-white/50 hidden md:block">
            Facebook • Instagram • Messenger
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-rose-500/10 blur-2xl" />

          <InfiniteSlider
            gap={24}
            reverse
            duration={22}
            durationOnHover={60}
            className="relative"
          >
            <SocialTile
              label="Facebook"
              icon={Facebook}
              className="border-sky-500/20"
            />
            <SocialTile
              label="Instagram"
              icon={Instagram}
              className="border-pink-500/20"
            />
            <SocialTile
              label="Messenger"
              icon={MessageCircle}
              className="border-indigo-500/20"
            />
            <SocialTile
              label="Facebook"
              icon={Facebook}
              className="border-sky-500/20"
            />
            <SocialTile
              label="Instagram"
              icon={Instagram}
              className="border-pink-500/20"
            />
            <SocialTile
              label="Messenger"
              icon={MessageCircle}
              className="border-indigo-500/20"
            />
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}
