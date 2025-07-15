import { useState, useEffect, useRef } from "react";
import backgroundImage from "./ourimpact.jpg"

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

const StatItem = ({ value, label, suffix = "", delay = 0 }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const formatNumber = (val: number): string => {
    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1).replace(/\.0$/, "")}M+`;
    if (val >= 1_000) return `${(val / 1_000).toFixed(1).replace(/\.0$/, "")}K+`;
    return `${val}`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          setTimeout(() => {
            let start = 0;
            const duration = 1000;
            const step = (timestamp: number) => {
              if (!start) start = timestamp;
              const progress = Math.min((timestamp - start) / duration, 1);
              const currentCount = Math.floor(progress * value);
              setCount(currentCount);

              if (progress < 1) {
                window.requestAnimationFrame(step);
              } else {
                setCount(value);
              }
            };

            window.requestAnimationFrame(step);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [value, delay]);

  return (
    <div className="text-center">
      <div className="flex justify-center items-baseline">
        <span ref={countRef} className="text-4xl md:text-5xl font-bold text-white">
          {formatNumber(count)}
        </span>
        <span className="text-2xl md:text-3xl font-bold text-white ml-1">{suffix}</span>
      </div>
      <p className="text-white mt-2">{label}</p>
    </div>
  );
};


export function StatsSection() {
  return (
    <section
      className="py-16 text-white relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div> {/* Overlay */}
      
      <div className="container relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Our Impact</h2>
          <p className="text-white/80">The numbers speak for themselves</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem value={3091645} label="Account Reach" delay={0} />
          <StatItem value={5792093} label="Impressions" delay={200} />
          <StatItem value={10000} label="Followers" delay={400} />
          <StatItem value={38513} label="Profile Visits" delay={600} />
        </div>

      </div>
    </section>
  );
}
