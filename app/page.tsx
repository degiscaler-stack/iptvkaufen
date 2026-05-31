import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ChannelLogos from "@/components/ChannelLogos";
import MoviesSeriesSlider from "@/components/MoviesSeriesSlider";
import PremiumExperience from "@/components/PremiumExperience";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PremiumExperience />
        <ChannelLogos />
        <MoviesSeriesSlider />
      </main>
    </>
  );
}
