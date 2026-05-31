import React, { useEffect, useRef, useState, useMemo } from "react";
import "./GradualBlur.css";

interface GradualBlurProps {
  position?: "top" | "bottom" | "left" | "right";
  strength?: number;
  height?: string;
  width?: string;
  divCount?: number;
  exponential?: boolean;
  curve?: "linear" | "bezier" | "ease-in" | "ease-out" | "ease-in-out";
  opacity?: number;
  animated?: boolean | "scroll";
  duration?: string;
  easing?: string;
  hoverIntensity?: number;
  target?: "parent" | "page";
  preset?: "top" | "bottom" | "left" | "right" | "subtle" | "intense" | "smooth" | "sharp" | "header" | "footer" | "sidebar" | "page-header" | "page-footer";
  responsive?: boolean;
  zIndex?: number;
  onAnimationComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_CONFIG: Required<Omit<GradualBlurProps, "onAnimationComplete" | "className" | "style" | "preset" | "hoverIntensity" | "width">> = {
  position: "bottom",
  strength: 2,
  height: "6rem",
  divCount: 5,
  exponential: false,
  zIndex: 1000,
  animated: false,
  duration: "0.3s",
  easing: "ease-out",
  opacity: 1,
  curve: "linear",
  responsive: false,
  target: "parent",
};

const PRESETS: Record<string, Partial<GradualBlurProps>> = {
  top: { position: "top", height: "6rem" },
  bottom: { position: "bottom", height: "6rem" },
  left: { position: "left", height: "6rem" },
  right: { position: "right", height: "6rem" },
  subtle: { height: "4rem", strength: 1, opacity: 0.8, divCount: 3 },
  intense: { height: "10rem", strength: 4, divCount: 8, exponential: true },
  smooth: { height: "8rem", curve: "bezier" as const, divCount: 10 },
  sharp: { height: "5rem", curve: "linear" as const, divCount: 4 },
  header: { position: "top", height: "8rem", curve: "ease-out" as const },
  footer: { position: "bottom", height: "8rem", curve: "ease-out" as const },
  sidebar: { position: "left", height: "6rem", strength: 2.5 },
  "page-header": { position: "top", height: "10rem", target: "page", strength: 3 },
  "page-footer": { position: "bottom", height: "10rem", target: "page", strength: 3 },
};

const CURVE_FUNCTIONS: Record<string, (p: number) => number> = {
  linear: (p) => p,
  bezier: (p) => p * p * (3 - 2 * p),
  "ease-in": (p) => p * p,
  "ease-out": (p) => 1 - Math.pow(1 - p, 2),
  "ease-in-out": (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2),
};

const mergeConfigs = (...configs: Array<Partial<GradualBlurProps>>) =>
  configs.reduce<Partial<GradualBlurProps>>((acc, c) => ({ ...acc, ...c }), {});

const getGradientDirection = (position: string) =>
  ({
    top: "to top",
    bottom: "to bottom",
    left: "to left",
    right: "to right",
  })[position] || "to bottom";

const debounce = <T extends (...args: unknown[]) => void>(fn: T, wait: number) => {
  let t: ReturnType<typeof setTimeout>;
  return (...a: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), wait);
  };
};

const useResponsiveDimension = (responsive: boolean, config: Record<string, unknown>, key: string) => {
  const [value, setValue] = useState<string>(config[key] as string);
  useEffect(() => {
    if (!responsive) return;
    const calc = () => {
      const w = window.innerWidth;
      let v = config[key] as string;
      const mobileKey = `mobile${key[0].toUpperCase() + key.slice(1)}`;
      const tabletKey = `tablet${key[0].toUpperCase() + key.slice(1)}`;
      const desktopKey = `desktop${key[0].toUpperCase() + key.slice(1)}`;
      if (w <= 480 && config[mobileKey]) v = config[mobileKey] as string;
      else if (w <= 768 && config[tabletKey]) v = config[tabletKey] as string;
      else if (w <= 1024 && config[desktopKey]) v = config[desktopKey] as string;
      setValue(v);
    };
    const debounced = debounce(calc, 100);
    calc();
    window.addEventListener("resize", debounced);
    return () => window.removeEventListener("resize", debounced);
  }, [responsive, config, key]);
  return responsive ? value : (config[key] as string);
};

const useIntersectionObserver = (ref: React.RefObject<HTMLElement | null>, shouldObserve = false) => {
  const [isVisible, setIsVisible] = useState(!shouldObserve);

  useEffect(() => {
    if (!shouldObserve || !ref.current) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, shouldObserve]);

  return isVisible;
};

function GradualBlur(props: GradualBlurProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const config = useMemo(() => {
    const presetConfig = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};
    return mergeConfigs(DEFAULT_CONFIG, presetConfig, props);
  }, [props]);

  const responsiveHeight = useResponsiveDimension(config.responsive || false, config as Record<string, unknown>, "height");
  const responsiveWidth = useResponsiveDimension(config.responsive || false, config as Record<string, unknown>, "width");

  const isVisible = useIntersectionObserver(containerRef, config.animated === "scroll");

  const blurDivs = useMemo(() => {
    const divs: React.ReactNode[] = [];
    const divCount = config.divCount || 5;
    const increment = 100 / divCount;
    const currentStrength = isHovered && config.hoverIntensity
      ? (config.strength || 2) * config.hoverIntensity
      : (config.strength || 2);

    const curveFunc = CURVE_FUNCTIONS[config.curve || "linear"] || CURVE_FUNCTIONS.linear;

    for (let i = 1; i <= divCount; i++) {
      let progress = i / divCount;
      progress = curveFunc(progress);

      let blurValue: number;
      if (config.exponential) {
        blurValue = Math.pow(2, progress * 4) * 0.0625 * currentStrength;
      } else {
        blurValue = 0.0625 * (progress * divCount + 1) * currentStrength;
      }

      const p1 = Math.round((increment * i - increment) * 10) / 10;
      const p2 = Math.round(increment * i * 10) / 10;
      const p3 = Math.round((increment * i + increment) * 10) / 10;
      const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;

      const direction = getGradientDirection(config.position || "bottom");

      const divStyle: React.CSSProperties = {
        position: "absolute",
        inset: 0,
        maskImage: `linear-gradient(${direction}, ${gradient})`,
        WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        opacity: config.opacity,
        transition:
          config.animated && config.animated !== "scroll"
            ? `backdrop-filter ${config.duration} ${config.easing}`
            : undefined,
      };

      divs.push(
        <div key={i} style={divStyle} />
      );
    }

    return divs;
  }, [config, isHovered]);

  const containerStyle = useMemo(() => {
    const isVertical = ["top", "bottom"].includes(config.position || "bottom");
    const isHorizontal = ["left", "right"].includes(config.position || "bottom");
    const isPageTarget = config.target === "page";

    const baseStyle: React.CSSProperties = {
      position: isPageTarget ? "fixed" : "absolute",
      pointerEvents: config.hoverIntensity ? "auto" : "none",
      opacity: isVisible ? 1 : 0,
      transition: config.animated ? `opacity ${config.duration} ${config.easing}` : undefined,
      zIndex: isPageTarget ? (config.zIndex || 1000) + 100 : config.zIndex || 1000,
      ...config.style,
    };

    if (isVertical) {
      baseStyle.height = responsiveHeight;
      baseStyle.width = responsiveWidth || "100%";
      baseStyle[config.position as "top" | "bottom"] = 0;
      baseStyle.left = 0;
      baseStyle.right = 0;
    } else if (isHorizontal) {
      baseStyle.width = responsiveWidth || responsiveHeight;
      baseStyle.height = "100%";
      baseStyle[config.position as "left" | "right"] = 0;
      baseStyle.top = 0;
      baseStyle.bottom = 0;
    }

    return baseStyle;
  }, [config, responsiveHeight, responsiveWidth, isVisible]);

  const { hoverIntensity, animated, onAnimationComplete, duration } = config;

  useEffect(() => {
    if (isVisible && animated === "scroll" && onAnimationComplete) {
      const ms = parseFloat(duration || "0.3s") * 1000;
      const t = setTimeout(() => onAnimationComplete(), ms);
      return () => clearTimeout(t);
    }
  }, [isVisible, animated, onAnimationComplete, duration]);

  return (
    <div
      ref={containerRef}
      className={`gradual-blur ${config.className || ""}`}
      style={containerStyle}
      onMouseEnter={hoverIntensity ? () => setIsHovered(true) : undefined}
      onMouseLeave={hoverIntensity ? () => setIsHovered(false) : undefined}
    >
      <div className="gradual-blur-inner">
        {blurDivs}
      </div>
    </div>
  );
}

const GradualBlurMemo = React.memo(GradualBlur);
GradualBlurMemo.displayName = "GradualBlur";
(GradualBlurMemo as unknown as Record<string, unknown>).PRESETS = PRESETS;
(GradualBlurMemo as unknown as Record<string, unknown>).CURVE_FUNCTIONS = CURVE_FUNCTIONS;
export default GradualBlurMemo;
