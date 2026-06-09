"use client";

import Image from "next/image";
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
      className="relative isolate flex min-h-0 items-center justify-center overflow-hidden bg-[#000000] px-5 pb-[clamp(1.5rem,3vh,2.5rem)] pt-[clamp(5.5rem,calc(4.5rem+3vh),9rem)] text-center sm:min-h-[clamp(620px,88vh,900px)] sm:px-8 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-0 -z-30 overflow-hidden">
        <Image
          src="/images/iptv-kaufen-hero-football.webp"
          alt=""
          fill
          preload
          sizes="100vw"
          aria-hidden="true"
          className="h-full w-full object-cover object-[42%_center] sm:object-center"
        />
      </div>
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(5,5,5,0.26)_0%,rgba(5,5,5,0.42)_48%,rgba(5,5,5,0.78)_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_70%_18%,rgba(30,76,110,0.2),transparent_28rem)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.08)_42%,rgba(5,5,5,0.7)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#000000] to-transparent" />
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
        className="relative z-10 mx-auto w-full max-w-[950px] py-[clamp(0.25rem,1.5vh,1rem)]"
      >
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mx-auto mb-[18px] inline-flex rounded-full border border-[#A6FF00]/30 bg-[#111111]/70 px-4 py-[9px] text-[11px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] [text-shadow:0_2px_20px_rgba(0,0,0,0.45)] sm:mb-5 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.28em]"
        >
          Premium IPTV Deutschland
        </motion.p>

        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="text-balance text-[clamp(2.25rem,4.2vw+1.1rem,5.25rem)] font-black leading-[0.95] tracking-[-0.06em] text-[#F5F5F5] [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]"
        >
          IPTV Kaufen in Deutschland
          <span className="mt-2 block bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none] sm:mt-3">
            Premium Streaming in Ultra HD
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="mx-auto mt-[clamp(1rem,2.5vh,1.75rem)] max-w-[92%] text-pretty text-[clamp(0.9rem,0.35vw+0.8rem,1.25rem)] leading-[1.55] text-[#F5F5F5] [text-shadow:0_2px_14px_rgba(0,0,0,0.55)] sm:max-w-3xl sm:leading-8"
        >
          Jetzt IPTV kaufen und über 22.000 Live-TV Sender, Filme, Serien und Fußball in HD, Full HD und
          4K auf allen Geräten genießen.
        </motion.p>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative mt-[clamp(1.5rem,3vh,2.5rem)] flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <div className="absolute inset-x-8 -inset-y-7 -z-10 rounded-full bg-[#6BFF2A]/12 blur-3xl" />
          <Link
            href="#iptv-kaufen"
            className="inline-flex min-h-11 w-[calc(100%_-_88px)] max-w-[285px] items-center justify-center rounded-full bg-[#A6FF00] px-[18px] py-2.5 text-center text-[11px] font-extrabold leading-none uppercase tracking-[0.10em] !text-[#000000] whitespace-nowrap shadow-[0_0_14px_rgba(166,255,0,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_22px_rgba(166,255,0,0.38)] sm:w-auto sm:min-h-0 sm:max-w-none sm:px-[22px] sm:py-3 sm:text-[13px] sm:tracking-[0.16em] [&_*]:flex [&_*]:items-center [&_*]:justify-center [&_*]:!text-[#000000]"
          >
            Jetzt IPTV Kaufen
          </Link>
          <Link
            href="#senderliste"
            className="inline-flex min-h-11 w-[calc(100%_-_88px)] max-w-[285px] items-center justify-center rounded-full border border-[#A6FF00]/35 bg-[#111111]/55 px-[18px] py-2.5 text-center text-[11px] font-extrabold leading-none uppercase tracking-[0.10em] text-[#F5F5F5] whitespace-nowrap backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#A6FF00] hover:text-[#A6FF00] hover:shadow-[0_0_22px_rgba(107,255,42,0.16)] sm:w-auto sm:min-h-0 sm:max-w-none sm:px-[22px] sm:py-3 sm:text-[13px] sm:tracking-[0.16em] [&_*]:flex [&_*]:items-center [&_*]:justify-center"
          >
            Senderliste Ansehen
          </Link>
        </motion.div>

        <motion.ul
          variants={fadeUp}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="mx-auto mt-[clamp(1.25rem,3.5vh,3.5rem)] grid max-w-[92%] grid-cols-2 gap-2 sm:max-w-3xl sm:grid-cols-4 sm:gap-2.5"
          aria-label="Vorteile von Premium IPTV"
        >
          {trustBadges.map((badge) => (
            <li
              key={badge}
              className="rounded-2xl border border-[#1F1F1F]/90 bg-[#111111]/48 px-3 py-2.5 text-[11px] font-medium text-[#F5F5F5]/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] backdrop-blur-md transition duration-300 hover:border-[#A6FF00]/45 hover:text-[#F5F5F5] sm:px-3 sm:py-2 sm:text-xs"
            >
              {badge}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
