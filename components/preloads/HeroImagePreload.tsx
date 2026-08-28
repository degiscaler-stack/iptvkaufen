export default function HeroImagePreload() {
  return (
    <link
      rel="preload"
      href="/images/iptv-kaufen-hero-football.webp"
      as="image"
      type="image/webp"
      fetchPriority="high"
    />
  );
}
