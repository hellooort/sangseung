"use client";

import { useEffect, useState, useRef } from "react";

function useCountUp(end: number, duration: number = 2000) {
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
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

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

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return { count, ref };
}

export default function ResultSection() {
  const projects = useCountUp(200, 2000);
  const clients = useCountUp(120, 2000);

  return (
    <section className="w-full bg-[#0A0A0A] py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-16">
          <div className="lg:w-1/3">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-6 block">
              RESULT
            </span>
            <p className="text-[#888] text-sm leading-loose">
              2001년 창립 이후, 다양한 산업 분야에서 사이트 환경에 최적화된 솔루션과 높은
              품질의 서비스를 제공하며 새로운 고객경험을 창출하고 역량을 입증해왔으며,
              현재는 사업 영역을 확장하며 지속적인 성장을 이어가고 있습니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-16 lg:gap-24">
            <div ref={projects.ref} className="text-center">
              <span className="text-[#888] text-sm block mb-2">프로젝트</span>
              <span className="text-white text-6xl md:text-7xl lg:text-8xl font-bold block">
                {projects.count}+
              </span>
              <span className="text-[#888] text-lg block mt-2">건</span>
            </div>
            <div ref={clients.ref} className="text-center">
              <span className="text-[#888] text-sm block mb-2">고객사</span>
              <span className="text-[#4A90D9] text-6xl md:text-7xl lg:text-8xl font-bold block">
                {clients.count}+
              </span>
              <span className="text-[#888] text-lg block mt-2">개사</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
