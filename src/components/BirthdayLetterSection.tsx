import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";


/**
 * BirthdayLetterSection — "To Islem (إسلام)"
 * ---------------------------------------------------------------
 * A luxury editorial artifact: a personal letter preserved inside
 * a cinematic exhibition. Not decoration — the emotional climax.
 * ---------------------------------------------------------------
 */

const PARAGRAPHS: Array<Array<string | { mark: string }>> = [
  [
    "Today is not just another date on a calendar.",
    "\nIt is a quiet reminder that someone meaningful exists in the world.",
  ],
  [
    { mark: "Islem" },
    ", on this ",
    { mark: "2nd of June" },
    ", the world becomes slightly softer,",
    "\nas if time itself pauses for a moment to acknowledge you.",
  ],
  [
    "You are not defined by distance, nor by silence, nor by the space between moments.",
    "\nYou are defined by the way presence can exist without being seen.",
  ],
  [
    "If this message feels like it is arriving gently,",
    "\nit is because it was meant to feel that way.",
  ],
  ["No grand declarations are needed today."],
  ["Only sincerity."],
  ["Only warmth."],
  ["Only the simple truth that you are remembered."],
  [
    "And somewhere between all the noise of the world,",
    "\nthis small space was created just for you.",
  ],
];

function Mark({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block px-1 font-serif italic text-violet-100">
      <span className="relative z-10">{children}</span>
      <motion.span
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-0 h-[0.55em] rounded-sm bg-gradient-to-r from-violet-500/0 via-violet-400/30 to-violet-500/0 blur-[2px]"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </span>
  );
}

function Paragraph({
  parts,
  index,
}: {
  parts: Array<string | { mark: string }>;
  index: number;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-15%" }}
      transition={{
        duration: 1.8,
        delay: 0.15 + index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="font-serif text-[1.15rem] leading-[2] text-white/80 sm:text-[1.35rem] sm:leading-[2.05]"
    >
      {parts.map((p, i) =>
        typeof p === "string" ? (
          p.split("\n").map((line, j, arr) => (
            <span key={`${i}-${j}`}>
              {line}
              {j < arr.length - 1 && <br />}
            </span>
          ))
        ) : (
          <Mark key={i}>{p.mark}</Mark>
        )
      )}
    </motion.p>
  );
}

export default function BirthdayLetterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const dustY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // Slow drifting grain — analog film breath
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let last = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);
    const tick = (t: number) => {
      if (t - last > 90) {
        last = t;
        const { width, height } = canvas;
        const img = ctx.createImageData(width, height);
        const d = img.data;
        for (let i = 0; i < d.length; i += 4) {
          const v = Math.random() * 255;
          d[i] = v;
          d[i + 1] = v;
          d[i + 2] = v;
          d[i + 3] = 12;
        }
        ctx.putImageData(img, 0, 0);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Static dust particles (galaxy-like)
  const dust = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: `${(i * 53) % 100}%`,
    top: `${(i * 91) % 100}%`,
    size: 1 + ((i * 7) % 5) * 0.4,
    delay: (i % 11) * 0.7,
    duration: 8 + (i % 6),
  }));

  return (
    <section
      ref={sectionRef}
      id="letter"
      aria-label="Birthday letter to Islem"
      className="relative w-full overflow-hidden"
    >
      {/* Ambient field: violet → navy → black */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-30 bg-[linear-gradient(180deg,#06030f_0%,#100828_22%,#1a0f3d_50%,#0a0620_78%,#06030f_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_40%,_rgba(124,92,255,0.28)_0%,_rgba(6,3,15,0)_55%)]"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-20 h-[80rem] w-[80rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(150,110,255,0.18)_0%,_rgba(6,3,15,0)_60%)] blur-3xl"
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Drifting galaxy dust */}
      <motion.div
        aria-hidden
        style={{ y: dustY }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {dust.map((d) => (
          <motion.span
            key={d.id}
            className="absolute rounded-full bg-violet-100"
            style={{
              left: d.left,
              top: d.top,
              width: d.size,
              height: d.size,
              boxShadow: "0 0 6px rgba(200,170,255,0.7)",
            }}
            animate={{ opacity: [0.1, 0.7, 0.1], y: [0, -20, 0] }}
            transition={{
              duration: d.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: d.delay,
            }}
          />
        ))}
      </motion.div>

      {/* Grain canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full mix-blend-overlay opacity-40"
      />

      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(6,3,15,0.95)_100%)]"
      />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl items-center justify-center px-6 py-40 sm:py-56">
        {/* Editorial markers */}
        <div className="pointer-events-none absolute left-8 top-12 text-[10px] uppercase tracking-[0.55em] text-violet-300/60 sm:left-12">
          003 — Letter
        </div>
        <div className="pointer-events-none absolute right-8 top-12 text-[10px] uppercase tracking-[0.55em] text-violet-300/40 sm:right-12">
           MMVIII · mmxxvi
        </div>

        <motion.div
          style={{ y: parallaxY }}
          className="relative w-full max-w-3xl"
        >
          {/* Holographic ring */}
          <div
            aria-hidden
            className="absolute -inset-px rounded-[28px] bg-[conic-gradient(from_180deg_at_50%_50%,#7c5cff_0deg,#e0c8ff_90deg,#ff9ad5_180deg,#5a3aff_270deg,#7c5cff_360deg)] opacity-40 blur-[2px]"
          />
          <div
            aria-hidden
            className="absolute -inset-12 rounded-[40px] bg-[radial-gradient(ellipse_at_center,_rgba(180,130,255,0.35)_0%,_rgba(6,3,15,0)_70%)] blur-2xl"
          />

          {/* Glass letter panel */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[26px] border border-white/15 bg-white/[0.035] px-8 py-16 backdrop-blur-2xl shadow-[0_60px_180px_-40px_rgba(124,92,255,0.55)] sm:px-16 sm:py-24"
          >
            {/* Inner soft sheen */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_30%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.04)_100%)]"
            />


            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1.4 }}
              className="relative mb-14 text-center"
            >
              <p className="mb-5 text-[10px] uppercase tracking-[0.6em] text-violet-300/70">
                A Letter · Preserved in Purple
              </p>
              <div className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-violet-200/70 to-transparent" />
              <h2 className="font-serif text-2xl tracking-[0.35em] text-white sm:text-3xl">
                TO ISLEM
              </h2>
              <p
                lang="ar"
                dir="rtl"
                className="mt-3 font-serif text-3xl italic text-violet-100/90 sm:text-4xl"
              >
                إسلام
              </p>
            </motion.header>

            {/* Body */}
            <div className="relative space-y-9 text-center">
              {PARAGRAPHS.map((parts, i) => (
                <Paragraph key={i} parts={parts} index={i} />
              ))}
            </div>

            {/* Signature */}
            <motion.footer
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 1.6, delay: 0.3 }}
              className="relative mt-16 text-center"
            >
              <div className="mx-auto mb-8 h-px w-20 bg-gradient-to-r from-transparent via-violet-200/70 to-transparent" />
              <p className="font-serif text-2xl italic leading-[1.5] text-white sm:text-3xl">
                <Mark>Happy Birthday</Mark>, <Mark>Islem</Mark>{" "}
                <span lang="ar" dir="rtl" className="font-serif text-violet-100">
                  (إسلام)
                </span>
                .
              </p>
              <p className="mx-auto mt-6 max-w-xl font-serif text-base italic leading-[1.9] text-white/65 sm:text-lg">
                May this day return to you everything quietly beautiful
                <br className="hidden sm:block" />
                you have ever given to others.
              </p>
              <div className="mx-auto mt-10 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.55em] text-violet-300/60">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_15px_#b388ff]" />
                sealed in purple · ∞
                <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_15px_#b388ff]" />
              </div>
            </motion.footer>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
