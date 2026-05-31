import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import CircularGallery from "./reactbits/CircularGallery";

const members = [
  { name: "RM", role: "Leader · Philosopher", year: "1994" , image: "/src/images/RM.jpg"},
  { name: "Jin", role: "Worldwide Handsome", year: "1992", image: "/src/images/Jin.jpg" },
  { name: "SUGA", role: "Producer · Poet", year: "1993" , image: "/src/images/Suga.jpg"},
  { name: "j-hope", role: "Sunshine · Choreo", year: "1994" , image: "/src/images/J-Hope.jpg"},
  { name: "Jimin", role: "Stage · Silk", year: "1995" , image: "/src/images/Jimin.jpg"},
  { name: "V", role: "Painter of Voice", year: "1995" , image: "/src/images/V.jpg"},
  { name: "Jung Kook", role: "Golden Maknae", year: "1997" , image: "/src/images/Jungkook.jpg"},
];

// Gallery items mapped from members — each item pairs an image with the member's name.
// Using reliable, high-quality placeholder images (Picsum) with unique IDs per member.
// In a production environment, these should be replaced with actual BTS member photos.
const galleryItems = members.map((member, idx) => ({
  image: member.image, // varied, cinematic aspect ratio
  text: member.name
}));

const eras = [
  "Wings",
  "Love Yourself",
  "Map of the Soul",
  "BE",
  "Proof",
  "Spring Day",
  "Dynamite",
  "Butter",
  "Fake Love",
  "MIC Drop",
  "Blood Sweat & Tears",
];

export default function BTSLegacySection() {
  return (
    <section className="relative w-full px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-7xl">
        {/* Header & description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-15%" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.6em] text-violet-300/70">
              002 — Legacy
            </p>
            <h2 className="font-serif text-4xl tracking-tight text-white sm:text-6xl">
              Seven names, <em className="italic text-violet-200">one constellation</em>.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/55">
            Since 2013, a quiet revolution in sound, choreography and devotion. Every era a chapter,
            every chapter a window into a generation.
          </p>
        </motion.div>

        {/* Single Circular Gallery – showcases each member's image + name */}
        <div className="mb-24 h-[500px] w-full overflow-hidden rounded-2xl sm:h-[65vh]">
          <CircularGallery
            items={galleryItems}
            bend={1.8}                // gentle curvature, feels elegant
            textColor="#f5f3ff"       // soft violet-white for member names
            borderRadius={0.12}       // subtle rounded corners on images
            font="600 1.1rem 'Figtree', system-ui, sans-serif"
            scrollSpeed={1.8}
            scrollEase={0.045}
            imageOffsets={{ Jin: [0, 0.1] }}
          />
        </div>

        {/* Scrolling eras marquee – infinite rotation */}
        <div className="mt-20 overflow-hidden border-y border-white/10 py-8">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 60, ease: "linear", repeat: Infinity }}
            className="flex w-max gap-16 whitespace-nowrap font-serif text-2xl italic text-white/30 sm:text-4xl"
          >
            {[...eras, ...eras].map((era, i) => (
              <span key={i} className="flex items-center gap-16">
                {era}
                <span className="text-violet-400">✦</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}