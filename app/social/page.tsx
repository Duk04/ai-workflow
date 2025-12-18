import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { SocialInfiniteSlider } from "@/components/social-infinite-slider";

export default function SocialPage() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <HeroGeometric
        badge="Social Channels"
        title1="Facebook • Instagram"
        title2="Messenger"
      />
    </main>
  );
}
