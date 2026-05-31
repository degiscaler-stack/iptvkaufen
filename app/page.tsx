import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ChannelLogos from "@/components/ChannelLogos";
import PremiumExperience from "@/components/PremiumExperience";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PremiumExperience />
        <ChannelLogos />
      </main>
    </>
  );
}
