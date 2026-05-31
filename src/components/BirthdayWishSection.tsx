import { motion } from "framer-motion";

export default function BirthdayWishSection() {
  return (
    <section className="relative w-full px-6 py-40">
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
          className="mb-6 text-xs uppercase tracking-[0.6em] text-violet-300/70"
        >
          005 — A Wish, In Closing
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl tracking-tight text-white sm:text-7xl"
        >
          Happy Birthday, <br />
          <em className="italic text-violet-200">to a forever we keep choosing.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-white/55"
        >
          Today the lightsticks rise a little higher. The room becomes a sky and
          the sky becomes a memory. May this orbit around the sun be soft, loud,
          golden, and entirely yours. From every continent — with one quiet word:
        </motion.p>

        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.4, delay: 0.7 }}
          className="mt-12 font-serif text-6xl italic text-violet-100 sm:text-8xl"
          style={{ textShadow: "0 0 60px rgba(180,130,255,0.5)" }}
        >
          보라해 — Forever.
        </motion.p>

        <div className="mt-20 flex flex-col items-center gap-4">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-violet-300/60 to-transparent" />
          <p className="text-[10px] uppercase tracking-[0.55em] text-white/35">
            BTS · 2013 → ∞ · A.R.M.Y
          </p>
        </div>
      </div>
    </section>
  );
}
