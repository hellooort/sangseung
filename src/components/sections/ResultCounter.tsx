"use client";

import { useEffect, useState, useRef } from "react";

interface Props {
  label: string;
  end: number;
  suffix?: string;
  color?: string;
  duration?: number;
}

export default function ResultCounter({ label, end, suffix = "", color = "text-white", duration = 2000 }: Props) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number;
    let animationFrame: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return (
    <div ref={ref} className="text-center">
      <span className="text-[#888] text-sm block mb-2">{label}</span>
      <span className={`${color} text-6xl md:text-7xl lg:text-8xl font-bold block`}>
        {count}+
      </span>
      {suffix && <span className="text-[#888] text-lg block mt-2">{suffix}</span>}
    </div>
  );
}
