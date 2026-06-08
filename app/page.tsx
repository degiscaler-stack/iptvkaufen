import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ChannelLogos from "@/components/ChannelLogos";
import IptvBenefits from "@/components/IptvBenefits";
import IptvHowItWorks from "@/components/IptvHowItWorks";
import IptvPricing from "@/components/IptvPricing";
import MoviesSeriesSlider from "@/components/MoviesSeriesSlider";
import PremiumEntertainment from "@/components/PremiumEntertainment";
import PremiumExperience from "@/components/PremiumExperience";
import ServiceHighlightsBar from "@/components/ServiceHighlightsBar";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PremiumExperience />
        <IptvBenefits />
        <ChannelLogos />
        <MoviesSeriesSlider />
        <ServiceHighlightsBar />
        <PremiumEntertainment />
        <IptvPricing />
        <IptvHowItWorks />
      </main>
    </>
  );
}
