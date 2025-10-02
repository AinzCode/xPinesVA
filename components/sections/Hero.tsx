"use client";

import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import SplitText from "../SplitText";
import { useEffect, useState } from "react";

// Lazy load SparklesText to improve initial load
const SparklesText = dynamic(() => 
  import("../ui/sparkles-text").then((mod) => ({ default: mod.SparklesText })),
  { ssr: false }
);

export default function Hero() {
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    // Wait for SplitText animation to complete, then show sparkles
    const timer = setTimeout(() => {
      setShowSparkles(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-[#097969]/20 py-12 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-6 items-center">
          <div className="mb-10 lg:mb-0">
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              <div className="flex flex-col">
                <SplitText
                  text="Welcome to"
                  tag="span"
                  className="text-3xl lg:text-5xl font-bold text-gray-900 block"
                  delay={110}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-110px"
                  textAlign="left"
                />
                <div className="relative">
                  <SplitText
                    text="PinesVA"
                    tag="span"
                    className="text-3xl lg:text-6xl font-bold text-green-600 block"
                    delay={250}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-110px"
                    textAlign="left"
                  />
                  {showSparkles && (
                    <div className="absolute inset-0 pointer-events-none">
                      <SparklesText 
                        className="text-3xl lg:text-6xl font-bold text-transparent block"
                        colors={{ first: "#059669", second: "#f59e0b" }}
                        sparklesCount={12}
                      >
                        PinesVA
                      </SparklesText>
                    </div>
                  )}
                </div>
              </div>
            </h1>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Strengthen your organization with professional Virtual Assistance. 
              Our team delivers consistent, high-quality support to optimize performance across all levels.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/connect"
                className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Why Choose Pines VA?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">
                    Highly skilled professionals
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">24/7 dedicated support</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">
                    Cost-effective solutions
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">
                    Rapid scaling capabilities
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
