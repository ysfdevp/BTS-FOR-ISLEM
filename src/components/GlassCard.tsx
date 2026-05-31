import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

export default function GlassCard({ children, className, ...rest }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-8 backdrop-blur-2xl",
        "shadow-[0_30px_120px_-30px_rgba(140,90,255,0.45)]",
        "before:absolute before:inset-px before:rounded-[15px] before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none",
        className
      )}
      {...rest}
    >
      <div className="relative z-10">{children}</div>
      <div className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-[#7c5cff] opacity-20 blur-3xl" />
    </motion.div>
  );
}
