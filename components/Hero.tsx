"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const trustBadges = ["22.000+ Sender", "Ultra HD & 4K", "Fußball Live", "Sofortiger Zugang"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section
      id="iptv-kaufen"
      aria-label="IPTV kaufen in Deutschland"
      className="relative isolate flex min-h-[90vh] items-center justify-center overflow-hidden bg-[#050505] px-5 pb-20 pt-36 text-center sm:px-8 lg:px-10"
    >
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/iptv-kaufen-hero-football.webp')" }}
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(5,5,5,0.38)_0%,rgba(5,5,5,0.5)_48%,rgba(5,5,5,0.84)_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_38%,rgba(107,255,42,0.08),transparent_34rem)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.12)_44%,rgba(5,5,5,0.66)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#050505] to-transparent" />

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
        className="mx-auto max-w-[950px]"
      >
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mx-auto mb-5 inline-flex rounded-full border border-[#A6FF00]/30 bg-[#111111]/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#A6FF00] [text-shadow:0_2px_20px_rgba(0,0,0,0.45)]"
        >
          Premium IPTV Deutschland
        </motion.p>

        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="text-balance text-5xl font-black tracking-[-0.06em] text-[#F5F5F5] [text-shadow:0_2px_20px_rgba(0,0,0,0.45)] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          IPTV Kaufen in Deutschland
          <span className="mt-3 block bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent">
            Premium Streaming in Ultra HD
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="mx-auto mt-7 max-w-3xl text-pretty text-lg leading-8 text-[#B8B8B8] sm:text-xl"
        >
          Jetzt IPTV kaufen und über 22.000 Live-TV Sender, Filme, Serien und Fußball in HD, Full HD und
          4K auf allen Geräten genießen.
        </motion.p>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="#iptv-kaufen"
            className="w-full rounded-full bg-[#A6FF00] px-8 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-[#000000] shadow-[0_0_18px_rgba(166,255,0,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(166,255,0,0.45)] sm:w-auto"
          >
            Jetzt IPTV Kaufen
          </Link>
          <Link
            href="#senderliste"
            className="w-full rounded-full border border-[#A6FF00]/35 bg-[#111111]/55 px-8 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-[#F5F5F5] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#A6FF00] hover:text-[#A6FF00] hover:shadow-[0_0_36px_rgba(107,255,42,0.2)] sm:w-auto"
          >
            Senderliste Ansehen
          </Link>
        </motion.div>

        <motion.ul
          variants={fadeUp}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
          aria-label="Vorteile von Premium IPTV"
        >
          {trustBadges.map((badge) => (
            <li
              key={badge}
              className="rounded-2xl border border-[#1F1F1F] bg-[#111111]/62 px-4 py-3 text-sm font-semibold text-[#F5F5F5] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_0_28px_rgba(107,255,42,0.08)] backdrop-blur-xl transition duration-300 hover:border-[#A6FF00]/50 hover:text-[#A6FF00]"
            >
              {badge}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
