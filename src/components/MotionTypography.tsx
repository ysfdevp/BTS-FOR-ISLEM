import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  triggerOnScroll?: boolean;
}

export default function MotionTypography({ text, className, delay = 0, stagger = 0.04, triggerOnScroll = false }: Props) {
  const words = text.split(" ");
  return (
    <span className={cn("inline-block", className)} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.25em] whitespace-nowrap">
          {Array.from(word).map((ch, ci) => (
            <motion.span
              key={ci}
              initial={{ y: "110%", opacity: 0, filter: "blur(12px)" }}
              {...(triggerOnScroll 
                ? { whileInView: { y: 0, opacity: 1, filter: "blur(0px)" }, viewport: { once: false } }
                : { animate: { y: 0, opacity: 1, filter: "blur(0px)" } }
              )}
              transition={{
                delay: delay + (wi * 0.12) + ci * stagger,
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}
