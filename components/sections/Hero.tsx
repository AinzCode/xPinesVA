"use client";

import { ArrowRight, Rocket, PlayCircle } from "lucide-react";
import Link from "next/link";
import SplitText from "../SplitText";
export default function Hero() {

  return (
    <section className="relative bg-[#F9F9F7] pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden">
      {/* Subtle Wavy Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wave-pattern" x="0" y="0" width="100" height="50" patternUnits="userSpaceOnUse">
              <path d="M0,25 Q25,10 50,25 T100,25" stroke="#4C8B4A" strokeWidth="0.5" fill="none" opacity="0.6" />
              <path d="M0,35 Q25,20 50,35 T100,35" stroke="#C7A97B" strokeWidth="0.3" fill="none" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave-pattern)" />
        </svg>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="mb-10 lg:mb-0">
            <h1 className="text-4xl lg:text-6xl font-bold text-[#2D2D2D] mb-6 leading-tight">
              <SplitText
                text="Empower Your Business with Dedicated Virtual Assistants"
                tag="span"
                className="text-4xl lg:text-6xl font-bold text-[#2D2D2D] block"
                delay={110}
                duration={0.6}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-110px"
                textAlign="left"
              />
            </h1>

            <p className="text-xl text-[#2D2D2D]/80 mb-8 leading-relaxed">
              Streamline your operations with top-tier professionals in admin, medical, and executive support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/connect"
                className="bg-[#4C8B4A] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#4C8B4A]/90 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/guides"
                className="bg-[#C7A97B] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#C7A97B]/90 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-5 h-5" />
                See How It Works
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right side - Business Metrics & Social Proof */}


          {/* Floating accent card */}
        </div>
      </div>
    </section>
  );
}
