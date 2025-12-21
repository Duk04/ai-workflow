import { Hero } from "@/components/hero";

import { Demo } from "@/components/demo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <Hero />
      <Demo />
    </main>
  );
}
