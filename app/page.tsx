import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ChannelLogos from "@/components/ChannelLogos";
import ContentPreview from "@/components/ContentPreview";
import PremiumExperience from "@/components/PremiumExperience";
import SocialProof from "@/components/SocialProof";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PremiumExperience />
        <ChannelLogos />
        <SocialProof />
        <ContentPreview />
      </main>
    </>
  );
}
