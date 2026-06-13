import Hero from "@/components/Hero";
import ChannelLogos from "@/components/ChannelLogos";
import IptvBenefits from "@/components/IptvBenefits";
import IptvHowItWorks from "@/components/IptvHowItWorks";
import IptvFaq from "@/components/IptvFaq";
import IptvPricing from "@/components/IptvPricing";
import MoviesSeriesSlider from "@/components/MoviesSeriesSlider";
import SportsTeamsSlider from "@/components/SportsTeamsSlider";
import CompatibleDevicesSlider from "@/components/CompatibleDevicesSlider";
import PremiumEntertainment from "@/components/PremiumEntertainment";
import PremiumExperience from "@/components/PremiumExperience";
import ServiceHighlightsBar from "@/components/ServiceHighlightsBar";

export default function Home() {
  return (
    <main>
      <Hero />
      <PremiumExperience />
      <IptvBenefits />
      <ChannelLogos />
      <MoviesSeriesSlider />
      <SportsTeamsSlider />
      <ServiceHighlightsBar />
      <PremiumEntertainment />
      <CompatibleDevicesSlider />
      <IptvPricing />
      <IptvHowItWorks />
      <IptvFaq />
    </main>
  );
}
