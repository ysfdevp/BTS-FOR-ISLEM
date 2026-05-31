import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import ElectricBorder from "./reactbits/ElectricBorder";
import GlareHover from '../components/reactbits/GlareHover';


const stats = [
  { value: "13", suffix: "yrs", label: "Since debut, 2013" },
  { value: "7", suffix: "souls", label: "Voices, one harmony" },
  { value: "∞", suffix: "armys", label: "Across every timezone" },
  { value: "1", suffix: "Color", label: "Color of a promise : Purple" },
];

export default function GlobalImpactSection() {
  return (
    <section className="relative w-full px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-15%" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 max-w-3xl"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.6em] text-violet-300/70">
            004 — Global Impact
          </p>
          <h2 className="font-serif text-4xl tracking-tight text-white sm:text-6xl">
            A frequency that <em className="italic text-violet-200">crosses oceans</em>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              
              <ElectricBorder
                color="#A855F7"
                speed={1.7}
                chaos={0.08}
                thickness={2}
                style={{ borderRadius: 16 }}
              >
                <GlassCard>
                  <div className="flex flex-col gap-8">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-violet-300/70">
                      Info · 0{i + 1}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-6xl text-white sm:text-7xl">{s.value}</span>
                      <span className="text-xs uppercase tracking-[0.3em] text-violet-300/80">
                        {s.suffix}
                      </span>
                    </div>
                    <p className="text-sm text-white/55">{s.label}</p>
                  </div>
                </GlassCard>
              </ElectricBorder>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
