import { Hero } from "@/components/hero";
import { SocialInfiniteSlider } from "@/components/social-infinite-slider";

import { Demo } from "@/components/demo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <Hero />
      <SocialInfiniteSlider />

      <Demo />
    </main>
  );
}
