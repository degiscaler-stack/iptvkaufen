"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const trustBadges = ["22.000+ Sender", "Ultra HD & 4K", "Fußball Live", "Sofortiger Zugang"];

const particles = [
  { left: "12%", top: "28%", delay: 0, duration: 6.8 },
  { left: "24%", top: "72%", delay: 1.2, duration: 7.6 },
  { left: "68%", top: "24%", delay: 0.7, duration: 7.2 },
  { left: "82%", top: "58%", delay: 1.8, duration: 8.2 },
  { left: "46%", top: "18%", delay: 2.2, duration: 7.4 },
  { left: "58%", top: "78%", delay: 0.4, duration: 8 },
];

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
        className="absolute inset-0 -z-30 scale-[1.02] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/iptv-kaufen-hero-football.webp')" }}
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(5,5,5,0.26)_0%,rgba(5,5,5,0.42)_48%,rgba(5,5,5,0.78)_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_70%_18%,rgba(30,76,110,0.2),transparent_28rem)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.08)_42%,rgba(5,5,5,0.7)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#050505] to-transparent" />
      <motion.div
        aria-hidden="true"
        initial={{ x: "-35%", opacity: 0 }}
        animate={{ x: "135%", opacity: [0, 0.16, 0] }}
        transition={{ duration: 9, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
        className="absolute inset-y-0 -z-10 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-2xl"
      />
      {particles.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          aria-hidden="true"
          initial={{ opacity: 0.08, y: 0 }}
          animate={{ opacity: [0.08, 0.32, 0.08], y: [-6, 8, -6] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -z-10 h-1 w-1 rounded-full bg-[#A6FF00]/60 shadow-[0_0_10px_rgba(166,255,0,0.28)]"
          style={{ left: particle.left, top: particle.top }}
        />
      ))}

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
          className="text-balance text-[2.65rem] font-black leading-[0.95] tracking-[-0.06em] text-[#F5F5F5] [text-shadow:0_2px_16px_rgba(0,0,0,0.55)] sm:text-[3.35rem] md:text-[4.15rem] lg:text-[5.25rem]"
        >
          IPTV Kaufen in Deutschland
          <span className="mt-3 block bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
            Premium Streaming in Ultra HD
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="mx-auto mt-7 max-w-3xl text-pretty text-lg leading-8 text-[#F5F5F5] [text-shadow:0_2px_14px_rgba(0,0,0,0.55)] sm:text-xl"
        >
          Jetzt IPTV kaufen und über 22.000 Live-TV Sender, Filme, Serien und Fußball in HD, Full HD und
          4K auf allen Geräten genießen.
        </motion.p>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <div className="absolute inset-x-8 -inset-y-7 -z-10 rounded-full bg-[#6BFF2A]/12 blur-3xl" />
          <Link
            href="#iptv-kaufen"
            className="w-full rounded-full bg-[#A6FF00] px-[22px] py-3 text-[13px] font-extrabold leading-none uppercase tracking-[0.16em] !text-[#000000] shadow-[0_0_14px_rgba(166,255,0,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_22px_rgba(166,255,0,0.38)] sm:w-auto [&_*]:!text-[#000000]"
          >
            Jetzt IPTV Kaufen
          </Link>
          <Link
            href="#senderliste"
            className="w-full rounded-full border border-[#A6FF00]/35 bg-[#111111]/55 px-[22px] py-3 text-[13px] font-extrabold leading-none uppercase tracking-[0.16em] text-[#F5F5F5] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#A6FF00] hover:text-[#A6FF00] hover:shadow-[0_0_22px_rgba(107,255,42,0.16)] sm:w-auto"
          >
            Senderliste Ansehen
          </Link>
        </motion.div>

        <motion.ul
          variants={fadeUp}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-2.5 sm:grid-cols-4"
          aria-label="Vorteile von Premium IPTV"
        >
          {trustBadges.map((badge) => (
            <li
              key={badge}
              className="rounded-2xl border border-[#1F1F1F]/90 bg-[#111111]/48 px-3 py-2 text-xs font-medium text-[#F5F5F5]/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] backdrop-blur-md transition duration-300 hover:border-[#A6FF00]/45 hover:text-[#F5F5F5]"
            >
              {badge}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
