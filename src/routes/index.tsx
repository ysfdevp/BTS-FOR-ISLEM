import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import { useActiveSection } from "@/hooks/useActiveSection";
import MotionTypography from "@/components/MotionTypography";
import BirthdayLetterSection from "@/components/BirthdayLetterSection";
import BTSLegacySection from "@/components/BTSLegacySection";
import GlobalImpactSection from "@/components/GlobalImpactSection";
import BirthdayWishSection from "@/components/BirthdayWishSection";
import ShinyText from "@/components/reactbits/ShinyText";
import CurvedLoop from "@/components/reactbits/CurvedLoop";
import TextPressure from "@/components/reactbits/TextPressure";
import GradualBlur from "@/components/reactbits/GradualBlur";
import GooeyNav from '@/components/GooeyNav';
import LiquidEther from '../components/reactbits/LiquidEther';

const HeroScene = lazy(() => import("@/components/HeroScene"));

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useLenis();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    // Reset URL hash on page load
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
      window.scrollTo(0, 0);
    }
  }, []);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 1.1]);
  
  const sectionIds = ['prelude', 'legacy', 'letter', 'impact', 'wish'];
  const activeIndex = useActiveSection(sectionIds);
  
  const items = [
    {label: "Prelude", href: "#prelude"},
    { label: "Legacy", href: "#legacy" },
    { label: "Letter", href: "#letter" },
    { label: "Impact", href: "#impact" },
    {label: "Wish", href: "#wish"}
  ];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#06030f] text-white antialiased selection:bg-violet-400/40">
      {/* ✨ NEW: Liquid Ether background – sits behind everything */}
  <div className="fixed inset-0 pointer-events-none">
    <LiquidEther
      colors={['#5227FF', '#FF9FFC', '#B497CF']}
      mouseForce={20}
      cursorSize={100}
      isViscous
      viscous={30}
      iterationsViscous={32}
      iterationsPoisson={32}
      resolution={0.5}
      isBounce={false}
      autoDemo
      autoSpeed={0.5}
      autoIntensity={2.2}
      takeoverDuration={0.25}
      autoResumeDelay={3000}
      autoRampDuration={0.6}
    />
  </div>
      {/* Fixed atmospheric R3F backdrop */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="fixed inset-0 -z-10"
      >
        {mounted && (
          <Suspense fallback={<div className="h-full w-full bg-[#06030f]" />}>
            <HeroScene />
          </Suspense>
        )}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#06030f_85%)]" />
      </motion.div>

      {/* Static gradient veil behind all sections after hero */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-gradient-to-b from-[#06030f] via-[#0c0721] to-[#06030f]" />

      {/* Top nav – only GooeyNav, styled to match old design */}
<header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference">
  <span className="font-serif text-lg italic tracking-wide text-white" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
    ⟁ purple.archive
  </span>

  {/* Only GooeyNav – old nav removed */}
  <div className="hidden md:block">
    <div className="gooey-nav-custom">
      <GooeyNav
        items={items}
        activeIndex={activeIndex}
        particleCount={15}
        particleDistances={[90, 10]}
        particleR={100}
        initialActiveIndex={0}
        animationTime={500}
        timeVariance={300}
        colors={[1, 2, 3, 1, 2, 3, 1, 5]}
      />
    </div>
  </div>

  <span className="text-[10px] uppercase tracking-[0.4em] text-white/70">
    MMXXVI · ∞
  </span>
</header>

      {/* Custom styles to make GooeyNav look like the original nav */}
      <style>{`
        .gooey-nav-custom ul {
          gap: 2rem !important; /* matches old gap-8 */
        }
        .gooey-nav-custom li a {
          font-size: 10px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.4em !important;
          color: rgba(255, 255, 255, 0.7) !important;
          font-family: inherit !important;
          transition: color 0.2s ease !important;
        }
        .gooey-nav-custom li a:hover {
          color: white !important;
        }
        /* Preserve gooey effect active state (text turns black) but keep it readable */
        .gooey-nav-custom li.active a {
          color: black !important;
        }
        /* Ensure the pill behind active item doesn't break the design */
        .gooey-nav-custom li.active::after {
          background: white !important;
        }
      `}</style>

      {/* HERO */}
      <section id="prelude" className="relative flex min-h-[100svh] w-full items-center justify-center px-6 py-32">
        <div className="pointer-events-none absolute left-8 top-32 text-[10px] uppercase tracking-[0.5em] text-violet-300/70 sm:left-12">
          001 — Prelude
        </div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8 text-[10px] uppercase tracking-[0.6em] text-violet-200/80"
          >
            A cinematic letter · for seven · since 2013
          </motion.p>

          <h1 className="font-serif text-[14vw] leading-[0.95] tracking-tight text-white sm:text-[10vw] lg:text-[8.5rem]">
            <MotionTypography text="A PURPLE" triggerOnScroll />
            <br />
            <em className="italic text-violet-100/95">
              <MotionTypography text="MEMORY" delay={0.6} triggerOnScroll />
            </em>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, delay: 1.6 }}
            className="mt-10 flex flex-col items-center gap-8"
          >
            <ShinyText
              text="An interactive birthday exhibition. Composed in seven movements, one orbit, and a color that never asked for permission."
              speed={4}
              color="rgba(255,255,255,0.45)"
              shineColor="#e9d5ff"
              spread={100}
              className="max-w-md text-sm leading-relaxed"
            />

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#letter"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/20 bg-white/[0.04] px-7 py-3 text-[11px] uppercase tracking-[0.4em] text-white backdrop-blur-xl transition-all hover:border-violet-300/60 hover:bg-white/10"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_15px_#b388ff]" />
                <ShinyText text="Enter the wish" speed={3} color="#e9d5ff" shineColor="#ffffff" spread={140} />
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-500/0 via-violet-500/30 to-violet-500/0 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
              </a>
              <a
                href="#legacy"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[11px] uppercase tracking-[0.4em] text-white/60 transition-colors hover:text-white"
              >
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 2.4, duration: 1 }}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-white/40"
        >
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-px bg-gradient-to-b from-violet-300/80 to-transparent"
          />
        </motion.div>
      </section>

      <div id="legacy">
        <BTSLegacySection />
      </div>

      <div className="relative z-20 isolate my-32 min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh]">
        <div className="relative h-full w-full">
          <TextPressure
            text="ISLEM"
            flex
            alpha={false}
            stroke={false}
            width
            weight
            italic
            textColor="#e9d5ff"
            minFontSize={64}
          />
        </div>
      </div>



      <div id="letter">
        <BirthdayLetterSection />
      </div>

      <section aria-hidden className="relative w-full overflow-hidden py-16 text-violet-200/80">
        <CurvedLoop
          marqueeText="Happy ✦ Birthday ✦ Islem ✦ إسلام ✦ Sealed ✦ In ✦ Purple ✦"
          speed={1.2}
          curveAmount={300}
          direction="left"
          interactive={true}
        />
      </section>

      <div id="impact">
        <GlobalImpactSection />
      </div>

      <div id="wish">
        <BirthdayWishSection />
      </div>

      <footer className="relative border-t border-white/5 px-6 py-10 text-center text-[10px] uppercase tracking-[0.4em] text-white/30">
        ⟁ purple for Islem · a non-commercial cinematic tribute · made with reverence
      </footer>

      {/* Cinematic page-level gradual blur — fades scrolling content into the viewport edge */}
      <GradualBlur
        target="page"
        position="bottom"
        height="8rem"
        strength={2.4}
        divCount={8}
        curve="bezier"
        exponential
        opacity={1}
      />
    </main>
  );
}